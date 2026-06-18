// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Local Legal Database and RAG Search Engine
// ═══════════════════════════════════════════════════════════════

export const LEGAL_DATABASE = {
  acts: [
    {
      id: "bns_318",
      name: "Bharatiya Nyaya Sanhita, 2023",
      section: "Section 318",
      keywords: ["cheating", "fraud", "dishonest", "induce", "deceive", "bns", "misrepresentation", "318"],
      description: "Defines cheating and prescribes punishment, replacing Section 415 and 420 of the Indian Penal Code (IPC).",
      details: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, is said to 'cheat'. Punishable with up to 3 years imprisonment or fine."
    },
    {
      id: "ipc_420",
      name: "Indian Penal Code, 1860",
      section: "Section 420",
      keywords: ["cheating", "fraud", "dishonest", "induce", "property", "ipc", "420", "misrepresentation"],
      description: "Cheating and dishonestly inducing delivery of property. Replaced by Section 318 of BNS in 2023.",
      details: "Deals with cheating and dishonestly inducing delivery of property or alteration/destruction of a valuable security. Punishable with up to 7 years imprisonment and fine."
    },
    {
      id: "ni_138",
      name: "Negotiable Instruments Act, 1881",
      section: "Section 138",
      keywords: ["cheque", "check", "bounce", "dishonor", "insufficient", "negotiable", "ni act", "138", "bank"],
      description: "Criminal liability for dishonour of cheque due to insufficiency of funds.",
      details: "Where any cheque drawn by a person on an account maintained by him with a banker for payment of any amount of money to another person for the discharge of any debt or other liability, is returned by the bank unpaid, either because of insufficient funds or if it exceeds the amount arranged to be paid. Punishable with up to 2 years imprisonment or fine up to twice the cheque amount."
    },
    {
      id: "ni_141",
      name: "Negotiable Instruments Act, 1881",
      section: "Section 141",
      keywords: ["company", "director", "liability", "cheque", "bounce", "141", "vicarious", "partner"],
      description: "Vicarious liability of company directors and key personnel for cheque bounce.",
      details: "If the person committing an offence under Section 138 is a company, every person who, at the time the offence was committed, was in charge of, and was responsible to the company for the conduct of the business, shall be deemed guilty of the offence."
    },
    {
      id: "contract_2h",
      name: "Indian Contract Act, 1872",
      section: "Section 2(h)",
      keywords: ["contract", "agreement", "enforceable", "valid", "legal", "elements"],
      description: "Definition of contract: An agreement enforceable by law is a contract.",
      details: "An agreement enforceable by law is a contract. Essential elements include free consent, competent parties, lawful consideration, and a lawful object."
    },
    {
      id: "contract_73",
      name: "Indian Contract Act, 1872",
      section: "Section 73",
      keywords: ["breach", "damages", "compensation", "loss", "contract", "liquidated", "73"],
      description: "Compensation for loss or damage caused by breach of contract.",
      details: "When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things."
    },
    {
      id: "contract_56",
      name: "Indian Contract Act, 1872",
      section: "Section 56",
      keywords: ["frustration", "impossible", "force majeure", "void", "contract", "56", "supervening", "unlawful"],
      description: "Agreement to do impossible act and the doctrine of frustration of contract.",
      details: "A contract to do an act which, after the contract is made, becomes impossible, or, by reason of some event which the promisor could not prevent, unlawful, becomes void when the act becomes impossible or unlawful."
    },
    {
      id: "const_21",
      name: "Constitution of India",
      section: "Article 21",
      keywords: ["privacy", "liberty", "life", "personal liberty", "fundamental", "rights", "21"],
      description: "Protection of life and personal liberty.",
      details: "No person shall be deprived of his life or personal liberty except according to procedure established by law. The Supreme Court has expanded this to include privacy, clean air, livelihood, and speedy trial."
    },
    {
      id: "const_19",
      name: "Constitution of India",
      section: "Article 19",
      keywords: ["speech", "expression", "freedom", "assemble", "association", "trade", "restrictions", "19"],
      description: "Protection of freedom of speech, expression, assembly, movement, and trade.",
      details: "Guarantees six basic freedoms to citizens, subject to reasonable restrictions under Article 19(2) to 19(6) on grounds of state security, public order, decency, or morality."
    },
    {
      id: "const_32",
      name: "Constitution of India",
      section: "Article 32",
      keywords: ["writ", "petition", "supreme court", "remedies", "enforcement", "habeas", "mandamus", "32"],
      description: "Remedies for enforcement of fundamental rights via writs in the Supreme Court.",
      details: "The right to move the Supreme Court by appropriate proceedings for the enforcement of fundamental rights is guaranteed. Power to issue writs of habeas corpus, mandamus, prohibition, quo warranto, and certiorari."
    },
    {
      id: "arbitration_8",
      name: "Arbitration and Conciliation Act, 1996",
      section: "Section 8",
      keywords: ["arbitration", "refer", "agreement", "dispute", "court", "8"],
      description: "Power of a judicial authority to refer parties to arbitration where an agreement exists.",
      details: "A judicial authority before which an action is brought in a matter which is the subject of an arbitration agreement shall refer the parties to arbitration if a party applies not later than the date of submitting his first statement."
    },
    {
      id: "arbitration_9",
      name: "Arbitration and Conciliation Act, 1996",
      section: "Section 9",
      keywords: ["interim", "measures", "protection", "injunction", "arbitration", "9"],
      description: "Interim measures of protection that can be granted by the court.",
      details: "Allows parties to apply to a court for interim protection, including securing the amount in dispute, preservation of goods, or interim injunctions, before or during arbitral proceedings."
    },
    {
      id: "arbitration_11",
      name: "Arbitration and Conciliation Act, 1996",
      section: "Section 11",
      keywords: ["appointment", "arbitrator", "court", "11", "tribunal", "failure"],
      description: "Appointment of arbitrators by judicial intervention upon failure of party agreement.",
      details: "Provides that if parties fail to agree on an arbitrator or if the appointed arbitrators fail to agree on the presiding arbitrator, the appointment shall be made by the Supreme Court or High Court."
    },
    {
      id: "arbitration_34",
      name: "Arbitration and Conciliation Act, 1996",
      section: "Section 34",
      keywords: ["set aside", "award", "challenge", "public policy", "arbitral", "illegality", "34"],
      description: "Application for setting aside an arbitral award under narrow grounds.",
      details: "An arbitral award may be set aside by a court only if it conflicts with the public policy of India, is affected by fraud or corruption, or suffers from patent illegality on the face of the award."
    },
    {
      id: "rera_18",
      name: "Real Estate (Regulation and Development) Act, 2016",
      section: "Section 18",
      keywords: ["rera", "builder", "possession", "delay", "refund", "compensation", "flat", "buyer", "18"],
      description: "Liability of builder to return amount and pay compensation upon delayed possession.",
      details: "If the promoter fails to complete or give possession of an apartment, plot, or building in accordance with the agreement for sale, he is liable to refund the amount received with interest and compensation."
    },
    {
      id: "consumer_35",
      name: "Consumer Protection Act, 2019",
      section: "Section 35",
      keywords: ["consumer", "complaint", "defect", "service", "forum", "commission", "35"],
      description: "Manner in which complaints are filed with the District Consumer Commission.",
      details: "Enables consumers, recognized consumer associations, or central authority to file complaints regarding defective goods or deficient services with the District Commission."
    },
    {
      id: "it_43a",
      name: "Information Technology Act, 2000",
      section: "Section 43A",
      keywords: ["data", "privacy", "protection", "compensation", "sensitive", "breach", "security", "43a", "corporate"],
      description: "Compensation for corporate failure to protect sensitive personal data.",
      details: "Imposes liability on a body corporate that is negligent in implementing reasonable security practices, causing wrongful loss or wrongful gain while handling sensitive personal data."
    },
    {
      id: "it_66d",
      name: "Information Technology Act, 2000",
      section: "Section 66D",
      keywords: ["impersonation", "cheating", "computer", "internet", "phishing", "66d", "network"],
      description: "Punishment for cheating by personation using computer resources.",
      details: "Punishes cheating by personation through communication devices or computer resources with imprisonment up to 3 years and a fine up to 1 lakh rupees."
    },
    {
      id: "hm_13",
      name: "Hindu Marriage Act, 1955",
      section: "Section 13",
      keywords: ["divorce", "cruelty", "desertion", "adultery", "marriage", "dissolution", "13"],
      description: "Statutory grounds for divorce, including cruelty and desertion.",
      details: "Provides grounds for dissolution of marriage by divorce. Common grounds include physical or mental cruelty, desertion for a continuous period of at least two years, adultery, and conversion."
    },
    {
      id: "ipc_498a",
      name: "Indian Penal Code, 1860",
      section: "Section 498A",
      keywords: ["cruelty", "husband", "dowry", "harassment", "relative", "498a", "matrimonial"],
      description: "Criminal prosecution for subjecting a married woman to cruelty.",
      details: "A non-bailable offence penalizing the husband or his relatives for subjecting a woman to cruelty, particularly dowry harassment. Cruelty includes physical/mental harm driving her to suicide."
    }
  ],
  judgments: [
    {
      id: "bhajan_lal",
      name: "State of Haryana v. Bhajan Lal",
      citation: "1992 Supp (1) SCC 335",
      court: "Supreme Court of India",
      year: "1992",
      keywords: ["quashing", "fir", "482", "bhajan lal", "guidelines", "abuse", "process"],
      relevance: 98,
      snippet: "Lays down seven guidelines for quashing an FIR under Section 482 of CrPC to prevent malicious prosecution.",
      details: "The Supreme Court held that where the allegations made in the FIR or the complaint, even if taken at face value, do not constitute any offence, the High Court may quash the FIR under Section 482 of CrPC to prevent abuse of the process of any court."
    },
    {
      id: "arnesh_kumar",
      name: "Arnesh Kumar v. State of Bihar",
      citation: "(2014) 8 SCC 273",
      court: "Supreme Court of India",
      year: "2014",
      keywords: ["arrest", "498a", "cruelty", "guidelines", "police", "bail", "arnesh", "41a"],
      relevance: 97,
      snippet: "Strict guidelines against automatic arrest in cases under Section 498A IPC or offences with under 7 years imprisonment.",
      details: "The Supreme Court directed that police should not arrest accused persons automatically in matrimonial cruelty disputes. Instead, a notice of appearance under Section 41A of CrPC must be served, and arrest should only occur with written reasons approved by a magistrate."
    },
    {
      id: "sms_pharma",
      name: "S.M.S. Pharmaceuticals Ltd. v. Neeta Bhalla",
      citation: "(2005) 8 SCC 89",
      court: "Supreme Court of India",
      year: "2005",
      keywords: ["director", "liability", "cheque", "bounce", "sms", "138", "141", "active"],
      relevance: 95,
      snippet: "Determines the threshold of director liability under Section 141 of NI Act for company cheque bounce cases.",
      details: "The court clarified that merely holding a designation as a director does not trigger liability under Section 141 of the NI Act. The complaint must explicitly allege their operational charge and active role in the day-to-day business of the company."
    },
    {
      id: "puttaswamy",
      name: "K.S. Puttaswamy v. Union of India",
      citation: "(2017) 10 SCC 1",
      court: "Supreme Court of India",
      year: "2017",
      keywords: ["privacy", "fundamental", "article 21", "aadhaar", "puttaswamy", "surveillance"],
      relevance: 99,
      snippet: "Declares right to privacy as a fundamental right under Article 21 of the Constitution.",
      details: "A 9-judge bench declared privacy to be a constitutional core protection, intrinsic to personal liberty and individual dignity, overruling previous judgments in MP Sharma and Kharak Singh."
    },
    {
      id: "lalita_kumari",
      name: "Lalita Kumari v. Govt. of UP",
      citation: "(2014) 2 SCC 1",
      court: "Supreme Court of India",
      year: "2014",
      keywords: ["fir", "registration", "mandatory", "cognizable", "lalita kumari", "police"],
      relevance: 96,
      snippet: "Mandatory registration of FIR under Section 154 of CrPC if information discloses a cognizable offence.",
      details: "Established that the police are bound to register an FIR upon receiving a complaint of a cognizable offence. A preliminary inquiry is permitted only to verify if the offense is cognizable in specific cases like medical negligence or matrimonial disputes."
    },
    {
      id: "dk_basu",
      name: "D.K. Basu v. State of West Bengal",
      citation: "(1997) 1 SCC 416",
      court: "Supreme Court of India",
      year: "1997",
      keywords: ["custody", "arrest", "police", "torture", "rights", "dk basu", "arrest memo"],
      relevance: 98,
      snippet: "Imposes strict requirements and checks on police procedures during arrest and detention to prevent custodial torture.",
      details: "Created a set of 11 guidelines that arrest officers must follow, including preparing an arrest memo signed by witnesses, allowing the arrestee to contact a relative, and subjecting the arrestee to periodic medical examinations."
    },
    {
      id: "shreya_singhal",
      name: "Shreya Singhal v. Union of India",
      citation: "(2015) 5 SCC 1",
      court: "Supreme Court of India",
      year: "2015",
      keywords: ["66a", "it act", "free speech", "speech", "shreya singhal", "expression"],
      relevance: 95,
      snippet: "Strikes down Section 66A of the IT Act, 2000 as an unconstitutional restriction on free speech.",
      details: "The Supreme Court struck down Section 66A, which penalized sending offensive messages through communication services, holding it to be vague, overbroad, and violating Article 19(1)(a) of the Constitution."
    },
    {
      id: "vidya_drolia",
      name: "Vidya Drolia v. Durga Trading Corporation",
      citation: "(2021) 2 SCC 1",
      court: "Supreme Court of India",
      year: "2021",
      keywords: ["arbitration", "arbitrability", "dispute", "section 8", "section 11", "vidya drolia", "rem"],
      relevance: 94,
      snippet: "Establishes a four-fold test to evaluate whether disputes can be referred to arbitration under Indian law.",
      details: "Propounded tests for non-arbitrability (such as actions in rem, insolvency, patents, etc.) and ruled that tenant-landlord disputes under the Transfer of Property Act are arbitrable unless governed by rent control laws."
    },
    {
      id: "associate_builders",
      name: "Associate Builders v. Delhi Development Authority",
      citation: "(2015) 3 SCC 49",
      court: "Supreme Court of India",
      year: "2015",
      keywords: ["arbitration", "set aside", "section 34", "public policy", "patent illegality", "associate builders"],
      relevance: 93,
      snippet: "Restricts judicial interference under Section 34 of the Arbitration Act, clarifying the limits of public policy violations.",
      details: "Reaffirmed that courts cannot re-evaluate evidence or merits under Section 34. Challenging an award under 'Public Policy' is restricted to cases of justice, morality, or patent illegality that shocks the conscience of the court."
    },
    {
      id: "hridaya_ranjan",
      name: "Hridaya Ranjan Prasad Verma v. State of Bihar",
      citation: "(2000) 4 SCC 168",
      court: "Supreme Court of India",
      year: "2000",
      keywords: ["cheating", "contract", "breach", "intent", "hridaya ranjan", "deception"],
      relevance: 94,
      snippet: "Distinguishes between civil breach of contract and criminal cheating based on intent at the inception.",
      details: "To establish cheating, the complainant must prove dishonest or fraudulent intent existed at the time of making the representation. Subsequent failure to fulfill a contract is merely a breach of contract."
    }
  ]
};

// Simple keyword-based classifier
export function classifyQueryHeuristic(query) {
  const legalKeywords = [
    "law", "section", "act", "judgment", "court", "ipc", "bns", "crpc", "cpc",
    "constitution", "article", "breach", "contract", "agreement", "lease", "tenant", 
    "rent", "cheque", "138", "complaint", "fir", "bail", "arrest", "arbitration", 
    "suit", "damages", "legal", "precedent", "citation", "ruling", "appeal", "accused", 
    "prosecution", "offence", "crime", "divorce", "marriage", "custody", "property",
    "matrimonial", "cruelty", "cheating", "fraud", "sc", "hc", "supreme court", "high court",
    "rera", "builder", "flat", "buyer", "consumer", "forum", "commission", "negligence",
    "it act", "cyber", "data", "privacy", "statute", "penal", "bailable", "quash", "deed",
    "partnership", "probation"
  ];
  
  const queryLower = query.toLowerCase();
  const matched = legalKeywords.filter(keyword => {
    if (keyword.length <= 3) {
      const regex = new RegExp(`\\b${keyword}\\b`, "i");
      return regex.test(queryLower);
    }
    return queryLower.includes(keyword);
  });
  
  return {
    is_legal: matched.length > 0,
    matched_keywords: matched
  };
}

// Search legal database (RAG retrieval)
export function searchLegalDB(query) {
  const queryLower = query.toLowerCase();
  const queryTokens = queryLower.split(/\W+/).filter(t => t.length > 2);
  
  const matchedActs = [];
  const matchedJudgments = [];
  
  // Search Acts
  for (const act of LEGAL_DATABASE.acts) {
    let score = 0;
    
    // Check if section name matches exactly
    const sectionNum = act.section.toLowerCase().replace("section", "").trim();
    if (queryLower.includes(sectionNum) && sectionNum.length > 0) {
      score += 100;
    }
    
    // Check if act name is mentioned
    const actNameTokens = act.name.toLowerCase().split(/\W+/);
    actNameTokens.forEach(token => {
      if (token.length > 2 && queryLower.includes(token)) {
        score += 20;
      }
    });
    
    // Keyword matching
    act.keywords.forEach(kw => {
      if (queryLower.includes(kw)) {
        score += 15;
      }
    });
    
    // Description and Details search
    queryTokens.forEach(token => {
      if (act.description.toLowerCase().includes(token)) score += 5;
      if (act.details.toLowerCase().includes(token)) score += 2;
    });
    
    if (score > 0) {
      matchedActs.push({ ...act, score });
    }
  }
  
  // Search Judgments
  for (const j of LEGAL_DATABASE.judgments) {
    let score = 0;
    
    // Check name match
    const nameLower = j.name.toLowerCase();
    const nameTokens = nameLower.split(/\W+/);
    nameTokens.forEach(token => {
      if (token.length > 2 && queryLower.includes(token)) {
        score += 25;
      }
    });
    
    // Keyword matching
    j.keywords.forEach(kw => {
      if (queryLower.includes(kw)) {
        score += 15;
      }
    });
    
    // Snippet and details search
    queryTokens.forEach(token => {
      if (j.snippet.toLowerCase().includes(token)) score += 5;
      if (j.details.toLowerCase().includes(token)) score += 2;
    });
    
    if (score > 0) {
      matchedJudgments.push({ ...j, score });
    }
  }
  
  // Sort by score
  matchedActs.sort((a, b) => b.score - a.score);
  matchedJudgments.sort((a, b) => b.score - a.score);
  
  const topActs = matchedActs.slice(0, 3).map(({ score, ...a }) => a);
  const topJudgments = matchedJudgments.slice(0, 3).map(({ score, ...j }) => j);
  
  // Create a timeline based on the matched judgments
  const timeline = topJudgments
    .map(j => ({ year: j.year, event: `${j.name} (${j.citation}): ${j.snippet}` }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));
    
  // Build a simple citation connection graph based on the matched judgments
  const nodes = [];
  const links = [];
  topJudgments.forEach((j, index) => {
    nodes.push({ id: j.id, label: `${j.name} (${j.year})`, type: "supreme_court" });
    if (index > 0) {
      links.push({ source: topJudgments[index - 1].id, target: j.id, type: "cites" });
    }
  });
  
  return {
    sources_found: topActs.length > 0 || topJudgments.length > 0,
    acts: topActs,
    judgments: topJudgments,
    timeline,
    graph: { nodes, links }
  };
}
