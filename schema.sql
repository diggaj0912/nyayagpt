-- ═══════════════════════════════════════════════════════════════
-- NyayaGPT — Supabase PostgreSQL Production Schema
-- ═══════════════════════════════════════════════════════════════

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Organizations Table (For Enterprise Law Firms / Teams)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  billing_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'lawyer' CHECK (role IN ('lawyer', 'law_firm', 'student', 'researcher', 'founder')),
  bar_council_no TEXT,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Documents Table (For Research & Law Firm Knowledge Base)
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Extracted text representation
  file_url TEXT, -- Path in Supabase storage bucket
  doc_type TEXT NOT NULL CHECK (doc_type IN ('contract', 'pleading', 'legal_notice', 'judgment', 'user_upload')),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Document Chunks Table (For pgvector Semantic Search)
CREATE TABLE IF NOT EXISTS public.document_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(768) NOT NULL, -- Matches Gemini text-embedding-004 (768-dim)
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- HNSW Index for vector searches
CREATE INDEX IF NOT EXISTS document_chunks_hnsw_idx 
ON public.document_chunks 
USING hnsw (embedding vector_cosine_ops);

-- 6. Subscriptions Table (Razorpay Subscriptions & Quotas)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- Single developer / user billing fallback
  razorpay_subscription_id TEXT UNIQUE,
  plan_tier TEXT NOT NULL DEFAULT 'student' CHECK (plan_tier IN ('student', 'pro', 'firm', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'past_due', 'unpaid')),
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + INTERVAL '30 days') NOT NULL,
  usage_count_research INT DEFAULT 0,
  usage_count_summaries INT DEFAULT 0,
  usage_count_drafts INT DEFAULT 0,
  usage_count_analyses INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Research History Table (Conversations and Citations)
CREATE TABLE IF NOT EXISTS public.research_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  query TEXT NOT NULL,
  is_legal BOOLEAN NOT NULL DEFAULT true,
  sources JSONB DEFAULT '[]'::jsonb,
  answer TEXT NOT NULL,
  reasoning_summary TEXT,
  timeline JSONB DEFAULT '[]'::jsonb,
  citation_graph JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Drafts Table (Agreements, Questionnaires & Version Logs)
CREATE TABLE IF NOT EXISTS public.drafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  template_id TEXT NOT NULL,
  content TEXT NOT NULL,
  form_inputs JSONB NOT NULL,
  versions JSONB DEFAULT '[]'::jsonb, -- Array of previous text configurations
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Notifications Table (Live Operations Alerts)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g. 'research_completed', 'contract_generated', 'upload_processed', 'payment'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Analytics Activity Table (SaaS Metric Calculations)
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL, -- 'query', 'upload', 'draft', 'login'
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ═══════════════════════════════════════════════════════════════
-- Row Level Security (RLS) Policies
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Organizations Policies
CREATE POLICY "Allow view for organization members" 
ON public.organizations FOR SELECT 
USING (id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid()));

-- Profiles Policies
CREATE POLICY "Allow view/update for own profile" 
ON public.profiles FOR ALL 
USING (id = auth.uid());

-- Documents Policies
CREATE POLICY "Allow document access inside own organization" 
ON public.documents FOR ALL 
USING (
  organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid()) 
  OR uploaded_by = auth.uid()
);

-- Subscriptions Policies
CREATE POLICY "Allow subscription view for own org / user" 
ON public.subscriptions FOR SELECT 
USING (
  user_id = auth.uid() 
  OR organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
);

-- Research History Policies
CREATE POLICY "Allow search logs view for own user" 
ON public.research_history FOR ALL 
USING (user_id = auth.uid());

-- Drafts Policies
CREATE POLICY "Allow draft access for own user" 
ON public.drafts FOR ALL 
USING (user_id = auth.uid());

-- Notifications Policies
CREATE POLICY "Allow notification access for own user" 
ON public.notifications FOR ALL 
USING (user_id = auth.uid());

-- ═══════════════════════════════════════════════════════════════
-- Functions & Trigger Hooks
-- ═══════════════════════════════════════════════════════════════

-- Auto Profile creation upon Auth SignUp
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Advocate'),
    new.email,
    'lawyer'
  );
  
  -- Create starting free student subscription quota
  INSERT INTO public.subscriptions (user_id, plan_tier, status)
  VALUES (new.id, 'student', 'active');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Vector similarity search matching function
CREATE OR REPLACE FUNCTION match_document_chunks (
  query_embedding vector(768),
  match_threshold float,
  match_count int,
  filter_doc_type text DEFAULT NULL,
  filter_org_id uuid DEFAULT NULL
)
RETURNS TABLE (
  chunk_id uuid,
  document_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id AS chunk_id,
    dc.document_id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM public.document_chunks dc
  JOIN public.documents d ON dc.document_id = d.id
  WHERE (1 - (dc.embedding <=> query_embedding)) > match_threshold
    AND (filter_doc_type IS NULL OR d.doc_type = filter_doc_type)
    AND (filter_org_id IS NULL OR d.organization_id = filter_org_id)
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 11. Subscription Usage Incrementor Function
CREATE OR REPLACE FUNCTION public.increment_usage(sub_id uuid, column_name text)
RETURNS void AS $$
BEGIN
  EXECUTE format('UPDATE public.subscriptions SET %I = COALESCE(%I, 0) + 1 WHERE id = $1', column_name, column_name)
  USING sub_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

