export type LegalDomainId =
  | "property_revenue_reg"
  | "criminal_bns"
  | "civil_contract"
  | "consumer_cpa"
  | "corporate_nclt"
  | "banking_sarfaesi"
  | "insolvency_ibc"
  | "labour_employment"
  | "family_matrimonial"
  | "succession_wills"
  | "taxation_gst"
  | "cyber_it_act"
  | "constitutional_writ"
  | "arbitration_adr"
  | "fema_foreign_exchange"
  | "intellectual_property"
  | "environmental_ngt"
  | "general_triage";

export interface DomainQuestion {
  id: string;
  labelEn: string;
  labelTa: string;
  placeholderEn: string;
  placeholderTa: string;
  type: "text" | "number" | "select" | "date" | "boolean";
  options?: { value: string; labelEn: string; labelTa: string }[];
  required?: boolean;
  helpTextEn?: string;
  helpTextTa?: string;
}

export interface DomainEvidenceType {
  id: string;
  nameEn: string;
  nameTa: string;
  category: "Documentary" | "Electronic" | "Statutory" | "Witness" | "Official Record";
  mandatoryForStrongCase?: boolean;
}

export interface DomainAuthority {
  nameEn: string;
  nameTa: string;
  hierarchyLevel: "Initial Forum" | "First Appellate" | "High Court / Tribunal" | "Supreme Court";
  trackType: "Administrative" | "Quasi-Judicial" | "Civil Court" | "Criminal Court" | "Special Tribunal";
}

export interface DomainRemedy {
  remedyNameEn: string;
  remedyNameTa: string;
  category: "Interim" | "Final" | "Declaratory" | "Compensatory" | "Punitive" | "Restorative";
  description: string;
}

export interface LegalDomainPack {
  id: LegalDomainId;
  nameEn: string;
  nameTa: string;
  shortCode: string;
  badge: string;
  iconName: string;
  descriptionEn: string;
  descriptionTa: string;
  keyStatutes: string[];
  intakeQuestions: DomainQuestion[];
  evidenceTypes: DomainEvidenceType[];
  relevantAuthorities: DomainAuthority[];
  proceduralTracks: string[];
  remedyTypes: DomainRemedy[];
  specialistInstructions: string;
  precedentSearchStrategy: {
    statutes: string[];
    courtBenches: string[];
    keyTerms: string[];
  };
  domainValidationRules: string[];
}

export const LEGAL_DOMAIN_PACKS: Record<LegalDomainId, LegalDomainPack> = {
  general_triage: {
    id: "general_triage",
    nameEn: "Universal Legal Triage & Mixed Disputes",
    nameTa: "பொது சட்டப் பகுப்பாய்வு & பல்துறை கலப்பு வழக்குகள்",
    shortCode: "TRIAGE",
    badge: "⚖️ Universal Core",
    iconName: "Scale",
    descriptionEn: "Domain-neutral triage engine for hybrid, cross-cutting, or unclassified legal disputes.",
    descriptionTa: "அனைத்து வகையான பல்துறை மற்றும் சிக்கலான கலப்பு சட்டப் பிரச்சினைகளுக்கான முதன்மை AI மையம்.",
    keyStatutes: ["Constitution of India", "Code of Civil Procedure", "Bharatiya Nagarik Suraksha Sanhita (BNSS) / CrPC", "Specific Relief Act", "Limitation Act"],
    intakeQuestions: [
      {
        id: "urgencyTrigger",
        labelEn: "What triggered this immediate legal consultation?",
        labelTa: "உடனடி சட்ட ஆலோசனை தேவைப்பட முக்கிய காரணம் என்ன?",
        placeholderEn: "e.g. Received legal notice, Police summons, asset threatened, breach discovered...",
        placeholderTa: "எ.கா. சட்ட நோட்டீஸ் வந்தது, காவல் விசாரணை, சொத்து அச்சுறுத்தல், பண மோசடி...",
        type: "text",
        required: true
      },
      {
        id: "primaryObjective",
        labelEn: "Primary Relief / Outcome Desired",
        labelTa: "விரும்பும் முதன்மை நிவாரணம் / முடிவு",
        placeholderEn: "e.g. Monetary recovery, stop illegal action, cancellation of deed, quash FIR, compensation...",
        placeholderTa: "எ.கா. பணத்தை மீட்பது, சட்டவிரோத செயலைத் தடுப்பது, ஆவண ரத்து, இழப்பீடு...",
        type: "text",
        required: true
      }
    ],
    evidenceTypes: [
      { id: "written_agreements", nameEn: "Written Agreements & Correspondence", nameTa: "எழுத்துப்பூர்வ ஒப்பந்தங்கள் & கடிதங்கள்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "digital_records", nameEn: "Emails, WhatsApp & Bank Transactions", nameTa: "மின்னஞ்சல், வாட்ஸ்அப் & வங்கி பரிவர்த்தனைகள்", category: "Electronic", mandatoryForStrongCase: true },
      { id: "notices_replies", nameEn: "Legal Notices & Prior Communications", nameTa: "சட்ட நோட்டீஸ்கள் & பதில்கள்", category: "Documentary" }
    ],
    relevantAuthorities: [
      { nameEn: "Jurisdictional Civil / Criminal Court", nameTa: "உரிமையியல் / குற்றவியல் நீதிமன்றம்", hierarchyLevel: "Initial Forum", trackType: "Civil Court" },
      { nameEn: "High Court (Writ / Appeal)", nameTa: "உயர் நீதிமன்றம் (பேராணை / மேல்முறையீடு)", hierarchyLevel: "High Court / Tribunal", trackType: "Quasi-Judicial" }
    ],
    proceduralTracks: ["Direct Pre-Litigation Notice", "Urgent Interim Injunction / Protective Order", "Tribunal / Court Suit Filing"],
    remedyTypes: [
      { remedyNameEn: "Pre-Litigation Settlement Notice", remedyNameTa: "வழக்குக்கு முந்தைய சமரச நோட்டீஸ்", category: "Interim", description: "Formal statutory demand notice setting liability and timeline." },
      { remedyNameEn: "Comprehensive Injunctive & Restitution Relief", remedyNameTa: "தடை உத்தரவு & நிலை மீட்பு நிவாரணம்", category: "Final", description: "Court-enforced orders restraining adverse parties and restoring rights." }
    ],
    specialistInstructions: "Perform neutral legal triage. Identify all participating legal domains without bias. Decompose complex dispute narratives into actionable multi-statute issues.",
    precedentSearchStrategy: {
      statutes: ["Constitution of India", "CPC 1908", "Limitation Act 1963", "Specific Relief Act 1963"],
      courtBenches: ["Supreme Court of India", "Madras High Court", "High Courts Pan-India"],
      keyTerms: ["Cause of action", "Multiplicity of proceedings", "Maintainability", "Limitation period"]
    },
    domainValidationRules: ["Ensure limitation period is computed from the earliest trigger date", "Assess whether criminal and civil remedies run concurrently without abuse of process"]
  },

  property_revenue_reg: {
    id: "property_revenue_reg",
    nameEn: "Property, Land Revenue & Registration",
    nameTa: "நிலம், வருவாய்த் துறை & பத்திரப்பதிவு",
    shortCode: "PROP",
    badge: "🏛️ Real Estate & Land",
    iconName: "Landmark",
    descriptionEn: "Land ownership, survey & FMB, Patta/Chitta mutation, SRO fraud under Sec 77A, DTCP approvals, and title partition.",
    descriptionTa: "பட்டா, சிட்டா, சார்பதிவாளர் அலுவலக பத்திரப்பதிவு, 77A போலி ஆவண ரத்து, FMB சர்வே மற்றும் பாகப்பிரிவினை.",
    keyStatutes: ["Tamil Nadu Patta Pass Book Act 1983", "Registration Act 1908 (Sec 77A & Rules)", "Transfer of Property Act 1882", "Tamil Nadu Land Survey and Boundaries Act 1923", "Tamil Nadu Revenue Recovery Act", "Specific Relief Act 1963"],
    intakeQuestions: [
      {
        id: "surveyNumber",
        labelEn: "Survey Number / Town Survey Ward No.",
        labelTa: "சர்வே எண் / நகர நில அளவை எண்",
        placeholderEn: "e.g. 142/3B or Ward 4, Block 12, T.S. No. 45",
        placeholderTa: "எ.கா. 142/3B அல்லது வார்டு 4, டி.எஸ். எண் 45",
        type: "text",
        required: true
      },
      {
        id: "village",
        labelEn: "Village / Sub-Registry Jurisdiction",
        labelTa: "கிராமம் / சார்பதிவாளர் எல்லை",
        placeholderEn: "e.g. Melur Village, Madurai East SRO",
        placeholderTa: "எ.கா. மேலூர் கிராமம், மதுரை கிழக்கு சார்பதிவாளர்",
        type: "text",
        required: true
      },
      {
        id: "taluk",
        labelEn: "Taluk / Revenue Division",
        labelTa: "வட்டம் (தாலுகா) / வருவாய் கோட்டம்",
        placeholderEn: "e.g. Melur Taluk, Madurai District",
        placeholderTa: "எ.கா. மேலூர் வட்டம், மதுரை மாவட்டம்",
        type: "text",
        required: true
      },
      {
        id: "pattaStatus",
        labelEn: "Patta / Revenue Record Status",
        labelTa: "பட்டா / வருவாய் ஆவண நிலை",
        placeholderEn: "Select Patta Status",
        placeholderTa: "பட்டா நிலையைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "own_name", labelEn: "In Client's Name", labelTa: "வாடிக்கையாளர் பெயரில் உள்ளது" },
          { value: "joint_patta", labelEn: "Joint Patta with Disputing Party", labelTa: "கூட்டுப் பட்டா" },
          { value: "wrongly_mutated", labelEn: "Wrongly Mutated / Transferred to Opposite Party", labelTa: "எதிர் தரப்பினர் பெயருக்கு தவறாக மாற்றப்பட்டுள்ளது" },
          { value: "ancestral_udr", labelEn: "Ancestral / UDR Error", labelTa: "பூர்வீக சொத்து / UDR பிழை" },
          { value: "natham_poramboke", labelEn: "Grama Natham / Govt Land Issue", labelTa: "கிராம நத்தம் / அரசு நிலம்" },
          { value: "no_patta", labelEn: "No Patta / Applied & Pending", labelTa: "பட்டா இல்லை / விண்ணப்பம் நிலுவையில் உள்ளது" }
        ]
      }
    ],
    evidenceTypes: [
      { id: "parent_deed", nameEn: "Parent Title Deeds (30+ Year Chain)", nameTa: "தாய் பத்திரங்கள் (30 ஆண்டு தொடர்ச்சி)", category: "Documentary", mandatoryForStrongCase: true },
      { id: "ec_certificate", nameEn: "Encumbrance Certificate (EC 30+ Years)", nameTa: "வில்லங்கச் சான்றிதழ் (EC)", category: "Official Record", mandatoryForStrongCase: true },
      { id: "patta_chitta", nameEn: "Patta / Chitta / 'A' Register Extract", nameTa: "பட்டா / சிட்டா / 'அ' பதிவேடு நகல்", category: "Official Record", mandatoryForStrongCase: true },
      { id: "fmb_sketch", nameEn: "FMB Sketch & Town Survey Field Map", nameTa: "FMB வரைபடம் & சர்வே வரைபடம்", category: "Official Record" },
      { id: "sro_registration", nameEn: "Registered Sale/Settlement/Partition Deed", nameTa: "கிரைய / செட்டில்மென்ட் / பாகப்பிரிவினை பத்திரம்", category: "Documentary", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Tahsildar / Zonal Deputy Tahsildar (Patta Mutation)", nameTa: "வட்டாட்சியர் / மண்டல துணை வட்டாட்சியர்", hierarchyLevel: "Initial Forum", trackType: "Administrative" },
      { nameEn: "Sub-Registrar (SRO) / District Registrar (Registration Act 77A)", nameTa: "சார்பதிவாளர் / மாவட்ட பதிவாளர் (77A)", hierarchyLevel: "Initial Forum", trackType: "Quasi-Judicial" },
      { nameEn: "Revenue Divisional Officer (RDO Appeal)", nameTa: "வருவாய் கோட்டாட்சியர் (RDO மேல்முறையீடு)", hierarchyLevel: "First Appellate", trackType: "Administrative" },
      { nameEn: "District Revenue Officer (DRO Revision)", nameTa: "மாவட்ட வருவாய் அலுவலர் (DRO சீராய்வு)", hierarchyLevel: "First Appellate", trackType: "Administrative" },
      { nameEn: "District Munsif / Sub Court (Civil Suit for Declaration & Injunction)", nameTa: "மாவட்ட உரிமையியல் / சார் சார்பு நீதிமன்றம்", hierarchyLevel: "Initial Forum", trackType: "Civil Court" },
      { nameEn: "Madras High Court (Writ Article 226)", nameTa: "சென்னை உயர் நீதிமன்றம் (பேராணை பிரிவு 226)", hierarchyLevel: "High Court / Tribunal", trackType: "Quasi-Judicial" }
    ],
    proceduralTracks: ["Revenue Patta Appeal (Tahsildar -> RDO -> DRO)", "Registration Fraud Inquiry (District Registrar Sec 77A -> DIG -> IG Registration)", "Civil Title Suit (Declaration + Injunction + Recovery of Possession)", "High Court Mandamus for Revenue Survey & Boundary Demarcation"],
    remedyTypes: [
      { remedyNameEn: "Patta Transfer & Name Mutation Restoration", remedyNameTa: "பட்டா பெயர் மாற்றம் & உரிமை மீட்பு", category: "Restorative", description: "Rectifying revenue entries and cancelling wrongful unilateral mutation." },
      { remedyNameEn: "Cancellation of Fraudulent / Impersonated Deed under Sec 77A", remedyNameTa: "பிரிவு 77A கீழ் போலி பத்திரம் ரத்து", category: "Declaratory", description: "Declaration by District Registrar that registered instrument is fraudulent/null and void." },
      { remedyNameEn: "Permanent Injunction & Boundary Protection", remedyNameTa: "நிரந்தர தடை உத்தரவு & எல்லை பாதுகாப்பு", category: "Interim", description: "Restraining opposite party from trespassing, alienating, or creating encumbrances." }
    ],
    specialistInstructions: "Apply Tamil Nadu Revenue and Registration statutory framework. Thoroughly check UDR errors, Patta Pass Book Act Section 10/12/13, Sub-Registrar circulars, and Section 77A / 22A / 22B of Registration Act 1908.",
    precedentSearchStrategy: {
      statutes: ["Tamil Nadu Patta Pass Book Act 1983", "Registration Act 1908", "Transfer of Property Act 1882"],
      courtBenches: ["Madras High Court (Principal & Madurai Bench)", "Supreme Court of India"],
      keyTerms: ["Patta cancellation jurisdiction RDO vs Civil Court", "Section 77A Registration Act circulars", "Ancestral undivided coparcenary sale", "FMB boundary dispute survey"]
    },
    domainValidationRules: ["Verify if title is disputed; revenue authorities cannot decide complex civil title without court decree", "Check 30-year EC chain for gaps in transfer"]
  },

  criminal_bns: {
    id: "criminal_bns",
    nameEn: "Criminal Law, BNS & Special Penal Statutes",
    nameTa: "குற்றவியல் சட்டம், BNS & சிறப்பு குற்றப் பிரிவுகள்",
    shortCode: "CRIM",
    badge: "🛡️ Criminal & BNS",
    iconName: "ShieldAlert",
    descriptionEn: "FIR registration, Anticipatory Bail, Quash petitions under BNSS 528 / CrPC 482, Cheque Bounce (Sec 138 NI Act), Cheating & Forgery.",
    descriptionTa: "எஃப்.ஐ.ஆர் (FIR), முன்ஜாமீன், வழக்கை ரத்து செய்தல் (Quash), காசோலை மோசடி (138 NI Act) மற்றும் நம்பிக்கை மோசடி.",
    keyStatutes: ["Bharatiya Nyaya Sanhita 2023 (BNS) / IPC 1860", "Bharatiya Nagarik Suraksha Sanhita 2023 (BNSS) / CrPC 1973", "Bharatiya Sakshya Adhiniyam 2023 (BSA) / Indian Evidence Act", "Negotiable Instruments Act 1881 (Sec 138-142)", "Prevention of Corruption Act"],
    intakeQuestions: [
      {
        id: "policeStation",
        labelEn: "Jurisdictional Police Station / Investigating Agency",
        labelTa: "காவல் நிலையம் / விசாரணை அமைப்பு",
        placeholderEn: "e.g. Anna Nagar Crime Branch / CCB / CBI",
        placeholderTa: "எ.கா. அண்ணா நகர் குற்றப்பிரிவு / CCB",
        type: "text",
        required: true
      },
      {
        id: "firOrCscNumber",
        labelEn: "FIR Number / CSR / Case Crime No.",
        labelTa: "எஃப்.ஐ.ஆர் எண் / CSR எண்",
        placeholderEn: "e.g. Crime No. 124/2024 or CSR 89/2024 (or 'Not Registered')",
        placeholderTa: "எ.கா. குற்ற எண் 124/2024 அல்லது CSR 89/2024",
        type: "text"
      },
      {
        id: "allegationType",
        labelEn: "Specific Offense / Allegation",
        labelTa: "குற்றச்சாட்டு / பிரிவுகள்",
        placeholderEn: "Select offense type",
        placeholderTa: "குற்றப் பிரிவைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "cheque_bounce_138", labelEn: "Cheque Dishonour / Sec 138 NI Act", labelTa: "காசோலை திரும்புதல் / 138 NI Act" },
          { value: "cheating_forgery", labelEn: "Cheating, Forgery & Fraud (BNS 318 / 336 / 340)", labelTa: "மோசடி, போலி ஆவணம் தயாரித்தல்" },
          { value: "criminal_breach_trust", labelEn: "Criminal Breach of Trust / Misappropriation", labelTa: "நம்பிக்கை மோசடி" },
          { value: "assault_threat", labelEn: "Criminal Intimidation & Assault (BNS 351)", labelTa: "கொலை மிரட்டல் & தாக்குதல்" },
          { value: "dowry_domestic", labelEn: "Domestic Violence / Cruelty (BNS 85 / 86)", labelTa: "குடும்ப வன்முறை / வரதட்சணை கொடுமை" },
          { value: "cyber_fraud", labelEn: "Online Financial Theft & Impersonation", labelTa: "இணைய நிதி மோசடி" }
        ]
      },
      {
        id: "arrestThreat",
        labelEn: "Immediate Arrest Threat / Bail Requirement?",
        labelTa: "கைது அச்சுறுத்தல் உள்ளதா? முன்ஜாமீன் தேவையா?",
        placeholderEn: "Select bail urgency",
        placeholderTa: "ஜாமீன் அவசர நிலையைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "high_arrest_risk", labelEn: "High Risk - Anticipatory Bail urgently required", labelTa: "அதிக ஆபத்து - அவசர முன்ஜாமீன் தேவை" },
          { value: "custody_bail", labelEn: "Accused already remanded - Regular Bail required", labelTa: "கைது செய்யப்பட்டுள்ளார் - வழக்கமான ஜாமீன் தேவை" },
          { value: "complainant_seeking_fir", labelEn: "Client is Complainant - Seeking FIR registration", labelTa: "வாடிக்கையாளர் புகார்தாரர் - எஃப்.ஐ.ஆர் பதிவு செய்ய வேண்டும்" },
          { value: "seeking_quash", labelEn: "False FIR - Seeking Quash under BNSS 528 / CrPC 482", labelTa: "பொய் வழக்கு - வழக்கை ரத்து செய்ய வேண்டும் (Quash)" }
        ]
      }
    ],
    evidenceTypes: [
      { id: "dishonoured_cheque", nameEn: "Original Dishonoured Cheque & Bank Return Memo", nameTa: "திரும்பிய அசல் காசோலை & வங்கி குறிப்பாணை", category: "Documentary", mandatoryForStrongCase: true },
      { id: "statutory_legal_notice", nameEn: "15-Day Statutory Legal Demand Notice & Postal Receipt", nameTa: "15 நாள் சட்ட நோட்டீஸ் & தபால் ரசீது", category: "Documentary", mandatoryForStrongCase: true },
      { id: "cctv_call_records", nameEn: "CCTV / Call Logs / WhatsApp Chat (Sec 63 BSA / 65B)", nameTa: "சிசிடிவி, வாட்ஸ்அப் உரையாடல்கள் (63 BSA)", category: "Electronic" },
      { id: "fir_complaint_copy", nameEn: "Copy of Complaint & CSR / FIR", nameTa: "புகார் நகல் & எஃப்.ஐ.ஆர்", category: "Official Record", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Station House Officer / Cyber Crime Police", nameTa: "காவல் ஆய்வாளர் / சைபர் கிரைம்", hierarchyLevel: "Initial Forum", trackType: "Criminal Court" },
      { nameEn: "Judicial Magistrate / Fast Track Magistrate Court (Sec 138)", nameTa: "குற்றவியல் நீதித்துறை நடுவர் நீதிமன்றம்", hierarchyLevel: "Initial Forum", trackType: "Criminal Court" },
      { nameEn: "Principal Sessions Court (Anticipatory / Regular Bail)", nameTa: "முதன்மை அமர்வு நீதிமன்றம் (முன்ஜாமீன்)", hierarchyLevel: "First Appellate", trackType: "Criminal Court" },
      { nameEn: "High Court (Anticipatory Bail / BNSS 528 Quash / Criminal Revision)", nameTa: "உயர் நீதிமன்றம் (முன்ஜாமீன் / 528 Quash)", hierarchyLevel: "High Court / Tribunal", trackType: "Criminal Court" }
    ],
    proceduralTracks: ["Sec 138 NI Act: Return Memo -> 15-day Notice -> 15-day Grace -> 30-day Complaint filing", "Anticipatory Bail: Sessions Court -> High Court", "BNSS 175(3) / CrPC 156(3) Direction to Police for FIR Registration", "BNSS 528 / CrPC 482 Quashing of Frivolous FIR / Charge Sheet"],
    remedyTypes: [
      { remedyNameEn: "Anticipatory Bail / Pre-Arrest Protection", remedyNameTa: "முன்ஜாமீன் / கைது பாதுகாப்பு", category: "Interim", description: "High Court/Sessions Court order directing release on bail in the event of arrest." },
      { remedyNameEn: "FIR Registration via Judicial Direction (BNSS 175(3))", remedyNameTa: "நீதிமன்ற உத்தரவு மூலம் எஃப்.ஐ.ஆர் பதிவு", category: "Restorative", description: "Magistrate order directing police station to register criminal case and investigate." },
      { remedyNameEn: "Quashing of FIR / Criminal Proceedings", remedyNameTa: "குற்றவியல் வழக்கை ரத்து செய்தல் (Quash)", category: "Final", description: "High Court exercising inherent powers to quash abuse of judicial process." }
    ],
    specialistInstructions: "Apply new criminal codes (BNS, BNSS, BSA) alongside corresponding IPC/CrPC/IEA sections. Scrupulously check strict limitation windows for Section 138 NI Act (15 days notice, 30 days filing window).",
    precedentSearchStrategy: {
      statutes: ["Bharatiya Nagarik Suraksha Sanhita 2023", "Bharatiya Nyaya Sanhita 2023", "Negotiable Instruments Act 1881"],
      courtBenches: ["Supreme Court of India", "Madras High Court (Criminal Side)"],
      keyTerms: ["Anticipatory bail guidelines Arnesh Kumar", "Cheque bounce delay condonation Sec 142", "Quashing FIR civil dispute given criminal colour Bhajan Lal"]
    },
    domainValidationRules: ["Check statutory 15-day notice window for NI Act Section 138", "Verify whether offenses are cognizable or non-cognizable"]
  },

  consumer_cpa: {
    id: "consumer_cpa",
    nameEn: "Consumer Protection & Product Liability",
    nameTa: "நுகர்வோர் பாதுகாப்பு & தயாரிப்பு பொறுப்பு",
    shortCode: "CONS",
    badge: "🛍️ Consumer Rights",
    iconName: "ShoppingBag",
    descriptionEn: "Defective goods, deficient services, builder possession delays, insurance claim repudiation, medical negligence, and e-commerce unfair trade practices.",
    descriptionTa: "பழுதுள்ள பொருட்கள், சேவை குறைபாடு, கட்டட தாமதம், காப்பீட்டுத் தொகை நிராகரிப்பு மற்றும் நுகர்வோர் இழப்பீடு.",
    keyStatutes: ["Consumer Protection Act 2019", "Consumer Protection (E-Commerce) Rules 2020", "Insurance Regulatory and Development Authority Act", "Real Estate (Regulation and Development) Act 2016 (RERA)"],
    intakeQuestions: [
      {
        id: "transactionType",
        labelEn: "Product / Service Dispute Type",
        labelTa: "பொருள் / சேவை தகராறு வகை",
        placeholderEn: "Select dispute category",
        placeholderTa: "பிரிவைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "defective_goods", labelEn: "Defective Product / Hardware / Vehicle / Appliance", labelTa: "பழுதுள்ள தயாரிப்பு / வாகனம் / சாதனம்" },
          { value: "insurance_repudiation", labelEn: "Insurance Claim Unjustly Rejected (Health / Motor / Life)", labelTa: "காப்பீட்டுத் தொகை நியாயமின்றி நிராகரிப்பு" },
          { value: "builder_delay", labelEn: "Flat / Builder Delay in Handover & Undivided Share", labelTa: "கட்டட ஒப்படைப்பு தாமதம் & மனை ஒப்படைப்பு" },
          { value: "medical_negligence", labelEn: "Medical Negligence & Hospital Deficiency", labelTa: "மருத்துவ அலட்சியம் & மருத்துவமனை குறைபாடு" },
          { value: "ecommerce_fraud", labelEn: "E-Commerce / Online Delivery Non-refund", labelTa: "மின்-அங்காடி ரீஃபண்ட் மறுப்பு" },
          { value: "banking_telecom", labelEn: "Banking / Telecom / Airline Service Deficiency", labelTa: "வங்கி / தொலைத்தொடர்பு / விமான சேவை குறைபாடு" }
        ],
        required: true
      },
      {
        id: "invoiceAmount",
        labelEn: "Purchase / Claim Value (₹)",
        labelTa: "பொருளின் விலை / கோரப்படும் தொகை (₹)",
        placeholderEn: "e.g. 500000",
        placeholderTa: "எ.கா. 500000",
        type: "number",
        required: true
      },
      {
        id: "compensationClaimed",
        labelEn: "Total Compensation Claimed for Mental Agony & Costs (₹)",
        labelTa: "மன உளைச்சல் & இழப்பீடாக கோரப்படும் தொகை (₹)",
        placeholderEn: "e.g. 200000",
        placeholderTa: "எ.கா. 200000",
        type: "number"
      }
    ],
    evidenceTypes: [
      { id: "tax_invoice", nameEn: "Original Tax Invoice / Bill / Purchase Receipt", nameTa: "அசல் விற்பனை ரசீது / வரி இன்வாய்ஸ்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "warranty_card", nameEn: "Warranty / Guarantee Card / Policy Document", nameTa: "உத்தரவாத அட்டை / பாலிசி ஆவணம்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "service_job_sheet", nameEn: "Service Center Job Sheet / Inspection Report", nameTa: "சர்வீஸ் சென்டர் பணித்தாள் / ஆய்வு அறிக்கை", category: "Official Record" },
      { id: "complaint_emails", nameEn: "Customer Care Emails & WhatsApp Grievance Trail", nameTa: "மின்னஞ்சல்கள் & வாடிக்கையாளர் சேவை உரையாடல்", category: "Electronic", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "District Consumer Disputes Redressal Commission (Claims up to ₹50 Lakhs)", nameTa: "மாவட்ட நுகர்வோர் குறைதீர் ஆணையம் (₹50 லட்சம் வரை)", hierarchyLevel: "Initial Forum", trackType: "Quasi-Judicial" },
      { nameEn: "State Consumer Disputes Redressal Commission (Claims ₹50L - ₹2 Cr / Appeals)", nameTa: "மாநில நுகர்வோர் ஆணையம் (₹50 லட்சத்திற்கு மேல்)", hierarchyLevel: "First Appellate", trackType: "Quasi-Judicial" },
      { nameEn: "National Consumer Commission (NCDRC, New Delhi)", nameTa: "தேசிய நுகர்வோர் ஆணையம் (NCDRC)", hierarchyLevel: "High Court / Tribunal", trackType: "Quasi-Judicial" },
      { nameEn: "Supreme Court of India (Statutory Appeal under CPA 2019)", nameTa: "உச்ச நீதிமன்றம்", hierarchyLevel: "Supreme Court", trackType: "Special Tribunal" }
    ],
    proceduralTracks: ["Pre-litigation Statutory Notice to Manufacturer/Seller (15 Days)", "Filing Consumer Complaint before District Commission under Sec 35 CPA 2019", "Execution Application under Sec 71/72 CPA 2019 for non-compliance with recovery warrant"],
    remedyTypes: [
      { remedyNameEn: "Full Refund with 12-18% Interest", remedyNameTa: "வட்டியுடன் முழுத் தொகையை திரும்பப் பெறுதல்", category: "Compensatory", description: "Directing refund of consideration paid along with commercial interest." },
      { remedyNameEn: "Replacement with Brand New Defect-Free Unit", remedyNameTa: "புதிய தயாரிப்பு மாற்றி வழங்குதல்", category: "Restorative", description: "Directing replacement of defective merchandise." },
      { remedyNameEn: "Exemplary Compensation for Mental Agony & Litigation Costs", remedyNameTa: "மன உளைச்சலுக்கான நஷ்டஈடு & வழக்கு செலவு", category: "Compensatory", description: "Awarding damages for distress, harassment, and legal expenditure." }
    ],
    specialistInstructions: "Apply Consumer Protection Act 2019 provisions: Sec 2(11) Deficiency in Service, Sec 2(10) Defect in Goods, Sec 2(47) Unfair Trade Practice, Chapter VI Product Liability. Calculate pecuniary jurisdiction accurately (up to 50 Lakhs District, up to 2 Crores State, above 2 Crores NCDRC).",
    precedentSearchStrategy: {
      statutes: ["Consumer Protection Act 2019", "Consumer Protection Act 1986"],
      courtBenches: ["NCDRC New Delhi", "Supreme Court of India", "Tamil Nadu State Consumer Commission"],
      keyTerms: ["Insurance repudiation pre-existing disease exclusion", "Builder delayed possession interest award Fortune Infrastructure", "Medical negligence standard of care Bolam test"]
    },
    domainValidationRules: ["Limitation period is strictly 2 years from date on which cause of action arose (Sec 69 CPA 2019)", "Verify client falls within 'Consumer' definition under Sec 2(7) and not commercial resale"]
  },

  corporate_nclt: {
    id: "corporate_nclt",
    nameEn: "Corporate, Company Law & NCLT",
    nameTa: "நிறுவனச் சட்டம், இயக்குநர் தகராறு & NCLT",
    shortCode: "CORP",
    badge: "🏢 Corporate & M&A",
    iconName: "Building",
    descriptionEn: "Shareholder disputes, Oppression & Mismanagement (Sec 241/242), Director disqualification, Board deadlocks, Mergers, and ROC filings.",
    descriptionTa: "பங்களிப்பாளர்கள் தகராறு, அடக்குமுறை மற்றும் தவறான மேலாண்மை (241/242), இயக்குநர் தகுதிநீக்கம் மற்றும் NCLT மனுக்கள்.",
    keyStatutes: ["Companies Act 2013", "SEBI Act 1992 & LODR Regulations", "Competition Act 2002", "National Company Law Tribunal Rules 2016"],
    intakeQuestions: [
      {
        id: "cinOrCompanyName",
        labelEn: "Company Name & CIN (Corporate Identification Number)",
        labelTa: "நிறுவனத்தின் பெயர் & CIN எண்",
        placeholderEn: "e.g. U72900TN2020PTC123456",
        placeholderTa: "எ.கா. U72900TN2020PTC123456",
        type: "text",
        required: true
      },
      {
        id: "shareholdingPercentage",
        labelEn: "Client's Shareholding Percentage / Status",
        labelTa: "வாடிக்கையாளரின் பங்கு சதவீதம் / பதவி",
        placeholderEn: "e.g. 26% Equity Shareholder & Director",
        placeholderTa: "எ.கா. 26% பங்குதாரர் & இயக்குநர்",
        type: "text",
        required: true
      },
      {
        id: "corporateDisputeType",
        labelEn: "Nature of Corporate Grievance",
        labelTa: "நிறுவன தகராறின் தன்மை",
        placeholderEn: "Select grievance type",
        placeholderTa: "தகராறு வகையைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "oppression_mismanagement", labelEn: "Oppression & Mismanagement (Sec 241/242)", labelTa: "அடக்குமுறை மற்றும் தவறான மேலாண்மை (241/242)" },
          { value: "director_removal_fraud", labelEn: "Illegal Removal as Director / Siphoning Funds", labelTa: "சட்டவிரோத இயக்குநர் நீக்கம் / நிதி கையாடல்" },
          { value: "share_transfer_refusal", labelEn: "Rectification of Register of Members (Sec 59)", labelTa: "பங்குப் பதிவேடு திருத்தம் (பிரிவு 59)" },
          { value: "merger_compromise", labelEn: "Scheme of Arrangement & Demerger (Sec 230-232)", labelTa: "நிறுவன இணைப்பு & மறுசீரமைப்பு" }
        ]
      }
    ],
    evidenceTypes: [
      { id: "moa_aoa", nameEn: "Memorandum & Articles of Association (MoA / AoA)", nameTa: "நிறுவன விதிமுறைகள் & அமைப்பு ஒப்பந்தம்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "sha_agreement", nameEn: "Shareholders Agreement (SHA) & Term Sheet", nameTa: "பங்குதாரர்கள் ஒப்பந்தம் (SHA)", category: "Documentary" },
      { id: "roc_filings", nameEn: "ROC MCA Filings (Form DIR-12, MGT-7, Financial Statements)", nameTa: "ROC filings (MCA இணையதள ஆவணங்கள்)", category: "Official Record", mandatoryForStrongCase: true },
      { id: "board_minutes", nameEn: "Board Meeting Notices, Agendas & Minutes", nameTa: "இயக்குநர் குழு கூட்ட குறிப்புகள்", category: "Documentary", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "National Company Law Tribunal (NCLT Chennai / Regional Bench)", nameTa: "தேசிய நிறுவன சட்ட தீர்ப்பாயம் (NCLT)", hierarchyLevel: "Initial Forum", trackType: "Special Tribunal" },
      { nameEn: "National Company Law Appellate Tribunal (NCLAT, New Delhi / Chennai)", nameTa: "தேசிய நிறுவன சட்ட மேல்முறையீட்டு தீர்ப்பாயம் (NCLAT)", hierarchyLevel: "First Appellate", trackType: "Special Tribunal" },
      { nameEn: "Supreme Court of India (Sec 423 Companies Act)", nameTa: "உச்ச நீதிமன்றம்", hierarchyLevel: "Supreme Court", trackType: "Special Tribunal" }
    ],
    proceduralTracks: ["Company Petition under Sec 241/242 Companies Act 2013 for Oppression/Mismanagement", "Sec 59 Application for Rectification of Share Register", "Sec 130/131 Reopening of Accounts on Grounds of Fraud"],
    remedyTypes: [
      { remedyNameEn: "Interim Injunction against Altering Shareholding / Board Structure", remedyNameTa: "பங்கு அல்லது இயக்குநர் மாற்றத்திற்கு இடைக்கால தடை", category: "Interim", description: "Restraining directors from issuing further shares, transferring assets, or removing key directors." },
      { remedyNameEn: "Appointment of Independent Administrator / Forensic Auditor", remedyNameTa: "தனி அதிகாரி / தடயவியல் தணிக்கையாளர் நியமனம்", category: "Restorative", description: "Ordering forensic audit of company books to investigate siphoning of capital." }
    ],
    specialistInstructions: "Evaluate eligibility under Section 244 (minimum 10% shareholding or 100 members). Analyze minority shareholder rights, fiduciary duties of directors under Sec 166, and ROC compliance.",
    precedentSearchStrategy: {
      statutes: ["Companies Act 2013", "Companies Act 1956"],
      courtBenches: ["NCLAT Chennai Bench", "Supreme Court of India"],
      keyTerms: ["Oppression Tata Consultancy Services Cyrus Mistry", "Fiduciary duty breach director", "Section 59 rectification of register"]
    },
    domainValidationRules: ["Check 10% shareholding threshold under Section 244 or prepare waiver application under proviso", "Verify bar on civil court jurisdiction under Section 430 Companies Act"]
  },

  banking_sarfaesi: {
    id: "banking_sarfaesi",
    nameEn: "Banking, Debt Recovery & SARFAESI",
    nameTa: "வங்கி கடன், கடன் வசூல் & SARFAESI",
    shortCode: "BANK",
    badge: "🏦 Banking & SARFAESI",
    iconName: "Briefcase",
    descriptionEn: "NPA classification disputes, SARFAESI Section 13(2) and 13(4) possession notices, DRT Securitization Applications (SA), and loan restructuring.",
    descriptionTa: "NPA கடன் வகைப்பாடு, SARFAESI 13(2)/13(4) சொத்து கையகப்படுத்தல் நோட்டீஸ் மற்றும் DRT தீர்ப்பாய வழக்குகள்.",
    keyStatutes: ["SARFAESI Act 2002", "Recovery of Debts and Bankruptcy Act 1993 (RDBA)", "RBI Master Directions on Prudential Norms on NPA", "Banking Regulation Act 1949"],
    intakeQuestions: [
      {
        id: "bankNameAndBranch",
        labelEn: "Lending Bank / Financial Institution / ARC",
        labelTa: "கடன் வழங்கிய வங்கி / நிதி நிறுவனம்",
        placeholderEn: "e.g. State Bank of India, SME Branch",
        placeholderTa: "எ.கா. ஸ்டேட் பாங்க் ஆஃப் இந்தியா",
        type: "text",
        required: true
      },
      {
        id: "loanOutstandingAmount",
        labelEn: "Total Outstanding Demand (₹)",
        labelTa: "கோரப்படும் மொத்த கடன் நிலுவை (₹)",
        placeholderEn: "e.g. 7500000",
        placeholderTa: "எ.கா. 7500000",
        type: "number",
        required: true
      },
      {
        id: "sarfaesiStage",
        labelEn: "Current SARFAESI Notice Stage",
        labelTa: "தற்போதைய வங்கி நோட்டீஸ் நிலை",
        placeholderEn: "Select notice stage",
        placeholderTa: "நோட்டீஸ் நிலையைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "npa_pre_notice", labelEn: "NPA Threat / Loan Recall Notice", labelTa: "NPA எச்சரிக்கை / கடன் திரும்பப்பெறும் நோட்டீஸ்" },
          { value: "sec_13_2_notice", labelEn: "Sec 13(2) Demand Notice Received (60 Days to Object)", labelTa: "பிரிவு 13(2) 60 நாள் டிமாண்ட் நோட்டீஸ் வந்துள்ளது" },
          { value: "sec_13_4_possession", labelEn: "Sec 13(4) Symbolic / Physical Possession Notice", labelTa: "பிரிவு 13(4) சொத்து கையகப்படுத்தும் நோட்டீஸ்" },
          { value: "sec_14_cjm_order", labelEn: "Section 14 CJM / Collector Physical Possession Order", labelTa: "பிரிவு 14 நீதிபதி/கலெக்டர் சொத்து பறிமுதல் உத்தரவு" },
          { value: "auction_sale_notice", labelEn: "E-Auction Sale Notice Issued (30/15 Days Notice)", labelTa: "சொத்து ஏல அறிவிப்பு (E-Auction Notice)" }
        ]
      }
    ],
    evidenceTypes: [
      { id: "loan_sanction_modt", nameEn: "Sanction Letter & MODT (Registered Mortgage Deed)", nameTa: "கடன் அனுமதி கடிதம் & MODT அடமான பத்திரம்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "sarfaesi_notices", nameEn: "Sec 13(2) / 13(4) Notices & Bank Account Statement", nameTa: "13(2) மற்றும் 13(4) நோட்டீஸ்கள் & வங்கி அறிக்கை", category: "Official Record", mandatoryForStrongCase: true },
      { id: "representation_13_3a", nameEn: "Borrower's Statutory Objection under Sec 13(3A)", nameTa: "பிரிவு 13(3A) கீழ் வாடிக்கையாளர் அளித்த ஆட்சேபனை", category: "Documentary" }
    ],
    relevantAuthorities: [
      { nameEn: "Authorised Officer / Grievance Redressal Committee", nameTa: "வங்கி அங்கீகரிக்கப்பட்ட அதிகாரி", hierarchyLevel: "Initial Forum", trackType: "Administrative" },
      { nameEn: "Debts Recovery Tribunal (DRT-1 / DRT-2 / DRT-3 Chennai / Madurai / Coimbatore)", nameTa: "கடன் மீட்பு தீர்ப்பாயம் (DRT)", hierarchyLevel: "Initial Forum", trackType: "Special Tribunal" },
      { nameEn: "Debts Recovery Appellate Tribunal (DRAT Chennai)", nameTa: "கடன் மீட்பு மேல்முறையீட்டு தீர்ப்பாயம் (DRAT)", hierarchyLevel: "First Appellate", trackType: "Special Tribunal" },
      { nameEn: "High Court (Writ Jurisdiction for Jurisdictional Violation)", nameTa: "உயர் நீதிமன்றம்", hierarchyLevel: "High Court / Tribunal", trackType: "Quasi-Judicial" }
    ],
    proceduralTracks: ["Statutory Objection under Sec 13(3A) within 60 days of 13(2) notice", "Securitisation Application (SA) under Sec 17 SARFAESI Act before DRT within 45 days of Sec 13(4) action", "Stay Petition against Auction / Physical Eviction before DRT"],
    remedyTypes: [
      { remedyNameEn: "Interim Stay of Auction Sale & Physical Possession", remedyNameTa: "ஏல விற்பனை & சொத்து பறிமுதலுக்கு இடைக்கால தடை", category: "Interim", description: "DRT order restraining bank from executing e-auction or taking physical possession." },
      { remedyNameEn: "Quashing of NPA Classification for Violation of RBI Prudential Norms", remedyNameTa: "RBI விதிமீறலுக்காக NPA வகைப்பாட்டை ரத்து செய்தல்", category: "Declaratory", description: "Declaration that NPA classification is premature or invalid." }
    ],
    specialistInstructions: "Scrutinize Section 13(3A) mandatory response requirement (bank must reply within 15 days). Calculate 45-day limitation to approach DRT under Section 17. Check agricultural land exemption under Section 31(i) SARFAESI Act.",
    precedentSearchStrategy: {
      statutes: ["SARFAESI Act 2002", "RBI Prudential Norms"],
      courtBenches: ["DRAT Chennai", "Supreme Court of India", "Madras High Court"],
      keyTerms: ["Section 13(3A) mandatory compliance Mardia Chemicals", "Agricultural land exemption Section 31(i)", "E-auction notice 30 days mandatory Mathew Varghese"]
    },
    domainValidationRules: ["Verify if property is agricultural land (strictly exempt under Sec 31(i))", "Ensure Sec 17 SA before DRT is filed within 45 days of possession measure"]
  },

  insolvency_ibc: {
    id: "insolvency_ibc",
    nameEn: "Insolvency, Bankruptcy & IBC",
    nameTa: "திவால் சட்டம் & IBC நடவடிக்கைகள்",
    shortCode: "IBC",
    badge: "⚖️ Insolvency & IBC",
    iconName: "FileCheck",
    descriptionEn: "Corporate Insolvency Resolution Process (CIRP Sec 7/9), Moratorium under Sec 14, Operational vs Financial Creditors, and liquidation.",
    descriptionTa: "நிறுவன திவால் தீர்வு நடவடிக்கை (CIRP பிரிவு 7/9), பிரிவு 14 தற்காலிக தடை மற்றும் NCLT திவால் மனுக்கள்.",
    keyStatutes: ["Insolvency and Bankruptcy Code 2016 (IBC)", "IBBI (Insolvency Resolution Process for Corporate Persons) Regulations 2016", "Companies Act 2013"],
    intakeQuestions: [
      {
        id: "creditorType",
        labelEn: "Client Role / Position",
        labelTa: "வாடிக்கையாளரின் நிலை",
        placeholderEn: "Select role",
        placeholderTa: "நிலையைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "financial_creditor", labelEn: "Financial Creditor (Bank / NBFC / Homebuyer - Sec 7)", labelTa: "நிதி கடன் அளித்தவர் (வங்கி / வீட்டுக் கொள்முதல் - பிரிவு 7)" },
          { value: "operational_creditor", labelEn: "Operational Creditor (Vendor / Supplier / Employee - Sec 9)", labelTa: "செயல்பாட்டுக் கடன் அளித்தவர் (விற்பனையாளர் / ஊழியர் - பிரிவு 9)" },
          { value: "corporate_debtor", labelEn: "Corporate Debtor / Suspended Director (Defending CIRP)", labelTa: "கடன் பெற்ற நிறுவனம் / இயக்குநர்" }
        ],
        required: true
      },
      {
        id: "defaultAmount",
        labelEn: "Total Default Amount (Min ₹1 Crore Threshold)",
        labelTa: "நிலுவைத் தொகை (குறைந்தபட்சம் ₹1 கோடி)",
        placeholderEn: "e.g. 15000000",
        placeholderTa: "எ.கா. 15000000",
        type: "number",
        required: true
      }
    ],
    evidenceTypes: [
      { id: "form_3_4_demand_notice", nameEn: "Form 3/4 Statutory Demand Notice & Proof of Service (Sec 8)", nameTa: "பிரிவு 8 statutory டிமாண்ட் நோட்டீஸ் & தபால் சான்று", category: "Documentary", mandatoryForStrongCase: true },
      { id: "invoices_delivery_challans", nameEn: "Invoices, Purchase Orders & Unpaid Invoices Trail", nameTa: "இன்வாய்ஸ்கள் & கொள்முதல் ஆணைகள்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "banker_neft_cert", nameEn: "Bank Certificate under Sec 9(3)(c) confirming non-payment", nameTa: "வங்கி கட்டணமின்மை சான்றிதழ்", category: "Official Record", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "NCLT (Adjudicating Authority)", nameTa: "தேசிய நிறுவன சட்ட தீர்ப்பாயம் (NCLT)", hierarchyLevel: "Initial Forum", trackType: "Special Tribunal" },
      { nameEn: "NCLAT (Appellate Authority)", nameTa: "தேசிய நிறுவன சட்ட மேல்முறையீட்டு தீர்ப்பாயம்", hierarchyLevel: "First Appellate", trackType: "Special Tribunal" },
      { nameEn: "Supreme Court of India (Sec 62 IBC)", nameTa: "உச்ச நீதிமன்றம்", hierarchyLevel: "Supreme Court", trackType: "Special Tribunal" }
    ],
    proceduralTracks: ["Sec 8 Demand Notice (10 Days) -> Sec 9 Petition before NCLT", "Sec 7 Petition for Financial Debt Default", "Claim filing before Interim Resolution Professional (IRP) in Form B/C"],
    remedyTypes: [
      { remedyNameEn: "Admission of Corporate Debtor into CIRP & Declaration of Moratorium", remedyNameTa: "CIRP நடவடிக்கை அனுமதி & Moratorium அறிவிப்பு", category: "Final", description: "Freezing all lawsuits and initiating resolution of company debts." },
      { remedyNameEn: "Settlement via Sec 12A IBC before CoC formation", remedyNameTa: "பிரிவு 12A கீழ் சமரசம் மூலம் வழக்கை திரும்பப் பெறுதல்", category: "Restorative", description: "Withdrawal of CIRP upon settlement of outstanding debt." }
    ],
    specialistInstructions: "Verify threshold limit of ₹1 Crore under Section 4 IBC. For Section 9 operational debts, rigorously verify whether opposite party raised a genuine pre-existing dispute prior to demand notice (Mobilox Innovations rule).",
    precedentSearchStrategy: {
      statutes: ["Insolvency and Bankruptcy Code 2016"],
      courtBenches: ["Supreme Court of India", "NCLAT New Delhi"],
      keyTerms: ["Pre-existing dispute Mobilox Innovations", "Section 14 Moratorium effect Swiss Ribbons", "Homebuyer financial creditor status Pioneer Urban"]
    },
    domainValidationRules: ["Ensure default amount is at least ₹1 Crore", "Check for absence of notice of pre-existing dispute under Sec 8(2)"]
  },

  labour_employment: {
    id: "labour_employment",
    nameEn: "Labour, Employment & Service Law",
    nameTa: "தொழிலாளர் சட்டம் & பணி மேலாண்மை",
    shortCode: "LABR",
    badge: "👷 Labour & Service",
    iconName: "HardHat",
    descriptionEn: "Unlawful termination, gratuity & PF recovery, domestic inquiry challenges, industrial disputes, POSH sexual harassment complaints, and disciplinary action.",
    descriptionTa: "சட்டவிரோத பணிநீக்கம், கிராஜுவிட்டி, PF நிலுவை, தொழிலாளர் நீதிமன்ற வழக்குகள் மற்றும் பணியிட பாலியல் புகார்.",
    keyStatutes: ["Industrial Disputes Act 1947", "Payment of Gratuity Act 1972", "Employees' Provident Funds and Miscellaneous Provisions Act 1952", "POSH Act 2013 (Sexual Harassment at Workplace)", "Industrial Employment (Standing Orders) Act 1946", "New Labour Codes (Industrial Relations Code 2020)"],
    intakeQuestions: [
      {
        id: "employmentType",
        labelEn: "Nature of Employment & Designation",
        labelTa: "பணி வகை & பதவி",
        placeholderEn: "e.g. Senior Software Engineer / Plant Technician / Manager",
        placeholderTa: "எ.கா. மென்பொருள் பொறியாளர் / தொழில்நுட்ப வல்லுநர்",
        type: "text",
        required: true
      },
      {
        id: "yearsOfService",
        labelEn: "Total Continuous Service (Years & Months)",
        labelTa: "மொத்த பணிபுரிந்த காலம் (ஆண்டுகள்)",
        placeholderEn: "e.g. 6 Years 4 Months",
        placeholderTa: "எ.கா. 6 ஆண்டுகள் 4 மாதங்கள்",
        type: "text",
        required: true
      },
      {
        id: "labourGrievanceType",
        labelEn: "Primary Employment Grievance",
        labelTa: "முதன்மை பணிப் பிரச்சினை",
        placeholderEn: "Select grievance",
        placeholderTa: "பிரச்சினையைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "illegal_termination", labelEn: "Illegal Retrenchment / Termination without Notice/Inquiry", labelTa: "முன்னறிவிப்பின்றி சட்டவிரோத பணிநீக்கம்" },
          { value: "unpaid_dues_gratuity", labelEn: "Non-payment of Gratuity, PF & Notice Pay", labelTa: "கிராஜுவிட்டி, PF & நிலுவை சம்பளம் தராமை" },
          { value: "posh_complaint", labelEn: "POSH Sexual Harassment at Workplace (Internal Committee)", labelTa: "பணியிட பாலியல் புகார் (POSH)" },
          { value: "unfair_labour_practice", labelEn: "Unfair Labour Practice / Denial of Regularization", labelTa: "தொழிலாளர் நலன் மறுப்பு / பணி நிரந்தரம் மறுப்பு" }
        ]
      }
    ],
    evidenceTypes: [
      { id: "appointment_letter", nameEn: "Appointment Letter & Employment Contract", nameTa: "பணி நியமன ஆணை & ஒப்பந்தம்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "salary_slips_bank", nameEn: "Salary Slips (Last 6 Months) & Bank Statement", nameTa: "சம்பள ரசீதுகள் (கடைசி 6 மாதங்கள்)", category: "Documentary", mandatoryForStrongCase: true },
      { id: "termination_letter", nameEn: "Termination Letter / Show Cause Notice & Reply", nameTa: "பணிநீக்க கடிதம் / விளக்கம் கேட்கும் நோட்டீஸ்", category: "Documentary", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Conciliation Officer / Assistant Commissioner of Labour (ACL)", nameTa: "தொழிலாளர் உதவி ஆணையர் (சமரச அதிகாரி)", hierarchyLevel: "Initial Forum", trackType: "Administrative" },
      { nameEn: "Labour Court / Industrial Tribunal (Sec 2A / Sec 10 ID Act)", nameTa: "தொழிலாளர் நீதிமன்றம் / தொழில் தீர்ப்பாயம்", hierarchyLevel: "Initial Forum", trackType: "Quasi-Judicial" },
      { nameEn: "Controlling Authority under Payment of Gratuity Act", nameTa: "கிராஜுவிட்டி கட்டுப்பாடு அதிகாரி", hierarchyLevel: "Initial Forum", trackType: "Administrative" },
      { nameEn: "High Court (Writ Petition under Article 226)", nameTa: "உயர் நீதிமன்றம் (பேராணை)", hierarchyLevel: "High Court / Tribunal", trackType: "Quasi-Judicial" }
    ],
    proceduralTracks: ["Conciliation Proceedings before Labour Officer -> Failure Report -> Reference to Labour Court", "Direct Claim under Sec 2A(2) Industrial Disputes Act after 45 days", "Gratuity Claim Form N before Controlling Authority"],
    remedyTypes: [
      { remedyNameEn: "Reinstatement with Full Back Wages & Continuity of Service", remedyNameTa: "முழு நிலுவைச் சம்பளத்துடன் பணி தொடர்ச்சி & மறுநியமனம்", category: "Restorative", description: "Labour Court order restoring employee to position with all accrued benefits." },
      { remedyNameEn: "Payment of Withheld Gratuity with 10% Simple Interest", remedyNameTa: "10% வட்டியுடன் நிலுவை கிராஜுவிட்டி வசூல்", category: "Compensatory", description: "Statutory order directing employer to disburse gratuity." }
    ],
    specialistInstructions: "Determine if employee qualifies as a 'workman' under Section 2(s) ID Act or falls under managerial category. Verify adherence to Section 25F (retrenchment compensation and 1 month notice/pay).",
    precedentSearchStrategy: {
      statutes: ["Industrial Disputes Act 1947", "Payment of Gratuity Act 1972"],
      courtBenches: ["Madras High Court", "Supreme Court of India"],
      keyTerms: ["Retrenchment Section 25F compliance mandatory", "Workman definition managerial test Mukesh Tripathi", "Gratuity forfeiture conditions only for moral turpitude"]
    },
    domainValidationRules: ["Verify Section 25F mandatory compliance before retrenchment", "Check 45-day waiting period for direct Sec 2A(2) petition after failure of conciliation"]
  },

  family_matrimonial: {
    id: "family_matrimonial",
    nameEn: "Family, Matrimonial & Domestic Law",
    nameTa: "குடும்பவியல் சட்டம், விவாகரத்து & ஜீவனாம்சம்",
    shortCode: "FAM",
    badge: "👨‍👩‍👧 Family & Matrimonial",
    iconName: "HeartHandshake",
    descriptionEn: "Divorce (Cruelty, Desertion, Mutual Consent), Maintenance (Sec 125 CrPC / Sec 144 BNSS), Child Custody, Domestic Violence Act (DVA 2005), and Restitution.",
    descriptionTa: "விவாகரத்து, ஜீவனாம்சம், குழந்தை பராமரிப்பு, குடும்ப வன்முறை பாதுகாப்பு (DV Act) மற்றும் தம்பதியர் மறுஇணைவு.",
    keyStatutes: ["Hindu Marriage Act 1955", "Special Marriage Act 1954", "Protection of Women from Domestic Violence Act 2005", "BNSS 2023 Sec 144 / CrPC Sec 125 (Maintenance)", "Guardians and Wards Act 1890", "Family Courts Act 1984"],
    intakeQuestions: [
      {
        id: "marriageDateAndPlace",
        labelEn: "Date & Place of Marriage",
        labelTa: "திருமணம் நடந்த தேதி & இடம்",
        placeholderEn: "e.g. 15-05-2018 at Madurai",
        placeholderTa: "எ.கா. 15-05-2018, மதுரை",
        type: "text",
        required: true
      },
      {
        id: "minorChildren",
        labelEn: "Minor Children (Names, Ages, Current Custody)",
        labelTa: "குழந்தைகள் விவரம் (வயது, யாரிடம் உள்ளனர்)",
        placeholderEn: "e.g. 1 Daughter, Age 4, currently with Mother",
        placeholderTa: "எ.கா. 1 பெண் குழந்தை, வயது 4, தாயிடம் உள்ளார்",
        type: "text"
      },
      {
        id: "familyReliefSought",
        labelEn: "Relief Sought",
        labelTa: "கோரப்படும் தீர்வு",
        placeholderEn: "Select family relief",
        placeholderTa: "நிவாரணத்தைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "mutual_divorce", labelEn: "Mutual Consent Divorce (Sec 13B HMA)", labelTa: "பரஸ்பர ஒப்புதல் விவாகரத்து (13B)" },
          { value: "contested_divorce", labelEn: "Contested Divorce (Cruelty / Desertion / Adultery)", labelTa: "விவாகரத்து வழக்கு (கொடுமை / பிரிந்து வாழ்தல்)" },
          { value: "maintenance_sec_125", labelEn: "Maintenance for Wife & Children (Sec 144 BNSS / 125 CrPC)", labelTa: "மனைவி & குழந்தைகளுக்கான ஜீவனாம்சம்" },
          { value: "domestic_violence_dva", labelEn: "Protection, Residence & Monetary Relief under DV Act", labelTa: "குடும்ப வன்முறை பாதுகாப்பு & வாழ்வாதார உதவி" },
          { value: "child_custody_visitation", labelEn: "Child Custody & Visitation Rights", labelTa: "குழந்தை பராமரிப்பு & சந்திக்கும் உரிமை" },
          { value: "restitution_conjugal", labelEn: "Restitution of Conjugal Rights (Sec 9 HMA)", labelTa: "தம்பதியர் மறுஇணைவு மனு (பிரிவு 9)" }
        ]
      }
    ],
    evidenceTypes: [
      { id: "marriage_certificate_photos", nameEn: "Marriage Certificate, Wedding Invitation & Photos", nameTa: "திருமண பதிவு சான்றிதழ், அழைப்பிதழ் & புகைப்படங்கள்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "income_affidavit_rajnesh", nameEn: "Income & Assets Affidavit (Rajnesh v. Neha format)", nameTa: "வருமானம் & சொத்துக்கள் பிரமாண பத்திரம் (ராஜேஷ் v. நேகா வடிவம்)", category: "Documentary", mandatoryForStrongCase: true },
      { id: "chats_complaints_dva", nameEn: "Messages, Police Complaints, Medical Reports of Injury", nameTa: "வாட்ஸ்அப் உரையாடல்கள் & காய சான்றிதழ்", category: "Electronic" }
    ],
    relevantAuthorities: [
      { nameEn: "Family Court (Principal Family Judge)", nameTa: "குடும்ப நல நீதிமன்றம்", hierarchyLevel: "Initial Forum", trackType: "Civil Court" },
      { nameEn: "Judicial Magistrate Court (Domestic Violence Act Applications)", nameTa: "குற்றவியல் நீதித்துறை நடுவர் நீதிமன்றம் (DV Act)", hierarchyLevel: "Initial Forum", trackType: "Criminal Court" },
      { nameEn: "High Court (Civil Miscellaneous Appeal / Matrimonial Appeal)", nameTa: "உயர் நீதிமன்றம் (மேல்முறையீடு)", hierarchyLevel: "High Court / Tribunal", trackType: "Quasi-Judicial" }
    ],
    proceduralTracks: ["Mandatory Mediation & Counseling at Family Court", "Interim Maintenance Application under Sec 24 HMA / Sec 144 BNSS", "DV Act Petition: Protection Order (Sec 18) + Residence Order (Sec 19) + Monetary Relief (Sec 20)"],
    remedyTypes: [
      { remedyNameEn: "Interim Monthly Maintenance & Child Support", remedyNameTa: "மாதாந்திர இடைக்கால ஜீவனாம்சம் & குழந்தை செலவு", category: "Compensatory", description: "Court-mandated monthly maintenance payment pending final disposal." },
      { remedyNameEn: "Protection Order against Domestic Violence & Harassment", remedyNameTa: "குடும்ப வன்முறை பாதுகாப்பு உத்தரவு", category: "Interim", description: "Restraining respondent from entering shared household or communicating abusively." }
    ],
    specialistInstructions: "Apply Supreme Court principles in Rajnesh v. Neha for comprehensive maintenance determination. Check welfare of the child as the paramount consideration in custody matters under Gaurav Nagpal v. Sumedha Nagpal.",
    precedentSearchStrategy: {
      statutes: ["Hindu Marriage Act 1955", "Protection of Women from Domestic Violence Act 2005"],
      courtBenches: ["Supreme Court of India", "Madras High Court Family Bench"],
      keyTerms: ["Maintenance guidelines Rajnesh v Neha", "Shared household definition Satish Chander Ahuja", "Child custody paramount welfare Gaurav Nagpal"]
    },
    domainValidationRules: ["Ensure mandatory Income & Assets Affidavits are filed by both spouses", "Verify 6-month separation requirement for Mutual Consent Divorce under Section 13B"]
  },

  succession_wills: {
    id: "succession_wills",
    nameEn: "Succession, Inheritance & Estate Law",
    nameTa: "வாரிசுரிமை, உயில் & பரம்பரை சொத்துப் பகிர்வு",
    shortCode: "SUCC",
    badge: "📜 Succession & Wills",
    iconName: "FileText",
    descriptionEn: "Partition of ancestral coparcenary property, Hindu Succession Act 2005 daughter coparcenary rights, Probate/Letters of Administration, and Will challenges (suspicious circumstances).",
    descriptionTa: "பாகப்பிரிவினை வழக்கு, 2005 திருத்தத்தின் கீழ் பெண் வாரிசு சம உரிமை, உயில் (Will) உண்மைத்தன்மை மற்றும் வாரிசு சான்றிதழ்.",
    keyStatutes: ["Hindu Succession Act 1956 (as amended in 2005)", "Indian Succession Act 1925", "Tamil Nadu Court Fees and Suits Valuation Act", "Code of Civil Procedure 1908"],
    intakeQuestions: [
      {
        id: "familyTreeLineage",
        labelEn: "Family Tree / Genealogy (Names of Ancestors & Surviving Legal Heirs)",
        labelTa: "குடும்ப வாரிசு மரம் (மூதாதையர் & வாழும் வாரிசுகள்)",
        placeholderEn: "e.g. Father (Deceased 2015), 2 Sons, 2 Daughters",
        placeholderTa: "எ.கா. தந்தை (2015 மறைவு), 2 மகன்கள், 2 மகள்கள்",
        type: "text",
        required: true
      },
      {
        id: "willExistence",
        labelEn: "Is there a Disputed Will / Testamentary Document?",
        labelTa: "சர்ச்சைக்குரிய உயில் (Will) உள்ளதா?",
        placeholderEn: "Select Will status",
        placeholderTa: "உயில் நிலையைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "no_will_intestate", labelEn: "No Will - Intestate Succession (Equal Legal Share)", labelTa: "உயில் இல்லை - சட்டப்பூர்வ சம பங்கு" },
          { value: "fraudulent_will", labelEn: "Suspicious / Forged Will produced by opposite party", labelTa: "எதிர் தரப்பினர் காட்டும் போலி / சந்தேகத்திற்குரிய உயில்" },
          { value: "registered_will", labelEn: "Genuine Registered Will favoring Client", labelTa: "வாடிக்கையாளருக்கு ஆதரவான பதிவு செய்யப்பட்ட உயில்" },
          { value: "settlement_deed_dispute", labelEn: "Disputed Gift / Settlement Deed in lieu of Will", labelTa: "செட்டில்மென்ட் / தான பத்திரம் தொடர்பான தகராறு" }
        ]
      }
    ],
    evidenceTypes: [
      { id: "death_legal_heir_cert", nameEn: "Death Certificate & Legal Heir Certificate (Tahsildar / Court)", nameTa: "இறப்பு சான்றிதழ் & வாரிசு சான்றிதழ்", category: "Official Record", mandatoryForStrongCase: true },
      { id: "will_original", nameEn: "Original / Certified Copy of Will & Attesting Witness Affidavit", nameTa: "அசல் உயில் & சாட்சிகள் பிரமாண பத்திரம்", category: "Documentary" },
      { id: "genealogy_ration_aadhaar", nameEn: "Ration Card, Aadhaar & Revenue Genealogy Records", nameTa: "குடும்ப அட்டை & வாரிசு உறுதி ஆவணங்கள்", category: "Official Record", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Subordinate Judge / District Court (Original Title Suit for Partition)", nameTa: "சார் சார்பு / மாவட்ட உரிமையியல் நீதிமன்றம்", hierarchyLevel: "Initial Forum", trackType: "Civil Court" },
      { nameEn: "High Court (Original Side Probate / Testamentary Jurisdiction)", nameTa: "உயர் நீதிமன்றம் (உயில் நிரூபணம்)", hierarchyLevel: "High Court / Tribunal", trackType: "Civil Court" }
    ],
    proceduralTracks: ["Civil Suit for Partition & Separate Possession (Preliminary Decree -> Final Decree Advocate Commissioner -> Physical Demarcation)", "Petition for Probate / Letters of Administration under Indian Succession Act 1925", "Legal Heir Rectification Appeal before Revenue Authorities"],
    remedyTypes: [
      { remedyNameEn: "Preliminary Decree for Partition & Allotment of Lawful Share", remedyNameTa: "பாகப்பிரிவினை பூர்வாங்க தீர்ப்பு (Preliminary Decree)", category: "Declaratory", description: "Judicial declaration of exact fractional share (e.g. 1/4th) in ancestral estate." },
      { remedyNameEn: "Injunction against Alienation / Sale of Undivided Estate", remedyNameTa: "பிரிக்கப்படாத சொத்தை விற்க இடைக்கால தடை", category: "Interim", description: "Restraining co-sharers from selling or creating third-party rights." }
    ],
    specialistInstructions: "Apply Vineeta Sharma v. Rakesh Sharma (2020) landmark ruling: daughters have equal coparcenary rights by birth under Section 6 HSA regardless of whether father was alive on Sept 9, 2005. Check Section 68 Indian Evidence Act / BSA for proof of Will execution by attesting witnesses.",
    precedentSearchStrategy: {
      statutes: ["Hindu Succession Act 1956", "Indian Succession Act 1925"],
      courtBenches: ["Supreme Court of India", "Madras High Court"],
      keyTerms: ["Daughters equal coparcenary rights Vineeta Sharma", "Proof of will attesting witness Section 68", "Suspicious circumstances surrounding will H. Venkatachala"]
    },
    domainValidationRules: ["Daughters have identical coparcenary rights as sons under 2005 Amendment", "Wills must be proven through at least one examining attesting witness under Sec 68"]
  },

  taxation_gst: {
    id: "taxation_gst",
    nameEn: "Taxation, GST & Customs Law",
    nameTa: "வரிச் சட்டம், ஜிஎஸ்டி (GST) & வருமான வரி",
    shortCode: "TAX",
    badge: "📊 Tax & GST",
    iconName: "Receipt",
    descriptionEn: "GST Show Cause Notices (Sec 73/74), Input Tax Credit (ITC) mismatch, Income Tax reassessment (Sec 148), Search/Seizure, and Appellate Tribunal appeals.",
    descriptionTa: "ஜிஎஸ்டி விளக்கம் கேட்கும் நோட்டீஸ் (73/74), ITC வரி வரவு தகராறு, வருமான வரி மறுமதிப்பீடு (148) மற்றும் வரி மேல்முறையீட்டு தீர்ப்பாயம்.",
    keyStatutes: ["Central Goods and Services Tax Act 2017 (CGST)", "Tamil Nadu GST Act 2017 (TNGST)", "Income Tax Act 1961", "Customs Act 1962"],
    intakeQuestions: [
      {
        id: "gstinOrPan",
        labelEn: "GSTIN / PAN of the Assessee",
        labelTa: "வரி செலுத்துவோரின் GSTIN / PAN எண்",
        placeholderEn: "e.g. 33AAAAA0000A1Z5 / ABCDE1234F",
        placeholderTa: "எ.கா. 33AAAAA0000A1Z5",
        type: "text",
        required: true
      },
      {
        id: "taxDemandNoticeRef",
        labelEn: "Show Cause Notice (SCN) / Assessment Order Number & Date",
        labelTa: "நோட்டீஸ் எண் (SCN) & தேதி",
        placeholderEn: "e.g. SCN No. GST/DRC-01/2024 dt 10-01-2024",
        placeholderTa: "எ.கா. SCN எண் GST/DRC-01/2024",
        type: "text",
        required: true
      },
      {
        id: "taxDisputedAmount",
        labelEn: "Total Tax, Interest & Penalty Demanded (₹)",
        labelTa: "கோரப்படும் மொத்த வரி, வட்டி & அபராதத் தொகை (₹)",
        placeholderEn: "e.g. 2400000",
        placeholderTa: "எ.கா. 2400000",
        type: "number",
        required: true
      }
    ],
    evidenceTypes: [
      { id: "scn_drc01_order", nameEn: "Show Cause Notice in Form DRC-01 & Assessment Order", nameTa: "DRC-01 நோட்டீஸ் & மதிப்பீட்டு உத்தரவு", category: "Official Record", mandatoryForStrongCase: true },
      { id: "gstr_returns", nameEn: "GSTR-1, GSTR-3B & GSTR-2A/2B Reconciliation Sheets", nameTa: "GSTR-1, 3B மற்றும் 2B அறிக்கைகள்", category: "Official Record", mandatoryForStrongCase: true },
      { id: "e_way_bills_invoices", nameEn: "E-Way Bills, Delivery Challans & Bank Proof of Payment", nameTa: "இ-வே பில்கள் & வங்கி கட்டண சான்றுகள்", category: "Documentary" }
    ],
    relevantAuthorities: [
      { nameEn: "Adjudicating Authority (Assistant / Deputy Commissioner GST)", nameTa: "வரி மதிப்பீட்டு அதிகாரி (துணை ஆணையர் ஜிஎஸ்டி)", hierarchyLevel: "Initial Forum", trackType: "Administrative" },
      { nameEn: "Joint Commissioner (Appeals) / Appellate Authority under Sec 107 CGST", nameTa: "இணை ஆணையர் (மேல்முறையீட்டு அதிகாரி)", hierarchyLevel: "First Appellate", trackType: "Quasi-Judicial" },
      { nameEn: "GST Appellate Tribunal (GSTAT) / ITAT", nameTa: "ஜிஎஸ்டி மேல்முறையீட்டு தீர்ப்பாயம் (GSTAT)", hierarchyLevel: "High Court / Tribunal", trackType: "Special Tribunal" },
      { nameEn: "High Court (Writ Jurisdiction for Violation of Natural Justice)", nameTa: "உயர் நீதிமன்றம் (பேராணை மனு)", hierarchyLevel: "High Court / Tribunal", trackType: "Quasi-Judicial" }
    ],
    proceduralTracks: ["Statutory Reply to DRC-01 within 30 days", "First Appeal under Sec 107 CGST Act (within 3 months + 10% pre-deposit)", "High Court Writ Petition under Article 226 for ex-parte orders issued without personal hearing"],
    remedyTypes: [
      { remedyNameEn: "Stay of Tax Recovery & Bank Account Defreezing", remedyNameTa: "வரி வசூலுக்கு இடைக்கால தடை & வங்கி கணக்கு விடுவிப்பு", category: "Interim", description: "Restraining revenue officers from garnishee bank attachment." },
      { remedyNameEn: "Quashing of Arbitrary Assessment Order & Remand for Fresh Hearing", remedyNameTa: "தன்னிச்சையான வரி உத்தரவை ரத்து செய்து மறுவிசாரணை உத்தரவு", category: "Restorative", description: "High Court order setting aside SCN for breach of principles of natural justice." }
    ],
    specialistInstructions: "Examine Section 75(4) CGST mandatory requirement for personal hearing before adverse orders. Check Section 16(2) conditions for Input Tax Credit and recent Supreme Court / High Court rulings on supplier defaults.",
    precedentSearchStrategy: {
      statutes: ["Central Goods and Services Tax Act 2017", "Income Tax Act 1961"],
      courtBenches: ["Madras High Court (Tax Bench)", "Supreme Court of India"],
      keyTerms: ["Section 75(4) mandatory personal hearing opportunity", "ITC denial bona fide purchaser Bharti Telemedia", "Section 148 income tax reassessment timeline"]
    },
    domainValidationRules: ["Verify strict 3-month limitation for Section 107 GST appeal", "Check mandatory 10% disputed tax pre-deposit requirement for appeal maintainability"]
  },

  cyber_it_act: {
    id: "cyber_it_act",
    nameEn: "Cyber Law, Digital Crime & IT Act",
    nameTa: "சைபர் சட்டம், இணைய குற்றங்கள் & IT சட்டம்",
    shortCode: "CYBER",
    badge: "💻 Cyber & Data",
    iconName: "Cpu",
    descriptionEn: "Online financial fraud, identity theft, unauthorized data access, SIM swap, crypto scams, digital defamation, and intermediary liability under IT Act 2000.",
    descriptionTa: "இணைய நிதி மோசடி, அடையாள திருட்டு, அனுமதியற்ற தரவு திருட்டு, கிரிப்டோ மோசடி மற்றும் சைபர் கிரைம் புகார்.",
    keyStatutes: ["Information Technology Act 2000 (IT Act as amended)", "Bharatiya Nyaya Sanhita 2023 (BNS)", "Digital Personal Data Protection Act 2023 (DPDP)", "RBI Master Circular on Limiting Customer Liability in Unauthorized Electronic Transactions"],
    intakeQuestions: [
      {
        id: "cyberCrimePlatform",
        labelEn: "Platform / Incident Mode",
        labelTa: "மோசடி நடந்த தளம் / முறை",
        placeholderEn: "e.g. UPI / NetBanking Phishing / WhatsApp / Crypto / Portal",
        placeholderTa: "எ.கா. UPI / இணைய வங்கி / வாட்ஸ்அப் / கிரிப்டோ",
        type: "text",
        required: true
      },
      {
        id: "financialLossAmount",
        labelEn: "Total Financial Loss Incurred (₹)",
        labelTa: "இழந்த மொத்த தொகை (₹)",
        placeholderEn: "e.g. 350000",
        placeholderTa: "எ.கா. 350000",
        type: "number",
        required: true
      },
      {
        id: "cyberCrimePortalAck",
        labelEn: "National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in) Ack Number",
        labelTa: "சைபர் கிரைம் புகார் எண் (1930 / cybercrime.gov.in)",
        placeholderEn: "e.g. Ack No. 202412345678 (or 'Not yet filed')",
        placeholderTa: "எ.கா. 202412345678",
        type: "text"
      }
    ],
    evidenceTypes: [
      { id: "transaction_sms_receipts", nameEn: "Bank Transaction Statements, UPI IDs & SMS Alerts", nameTa: "வங்கி பரிவர்த்தனை அறிக்கை & UPI ரசீதுகள்", category: "Electronic", mandatoryForStrongCase: true },
      { id: "screenshots_chat_headers", nameEn: "Unedited Screenshots, URL links, Email Headers (RFC 822)", nameTa: "ஸ்கிரீன்ஷாட்கள் & மின்னஞ்சல் தலைப்பு தரவுகள்", category: "Electronic", mandatoryForStrongCase: true },
      { id: "cyber_complaint_ack", nameEn: "1930 Helpline Complaint Acknowledgement", nameTa: "1930 சைபர் கிரைம் புகார் ஒப்புதல் ரசீது", category: "Official Record", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Cyber Crime Police Station / State Cyber Cell", nameTa: "சைபர் கிரைம் காவல் நிலையம்", hierarchyLevel: "Initial Forum", trackType: "Criminal Court" },
      { nameEn: "Adjudicating Officer under Sec 46 IT Act (State IT Secretary)", nameTa: "IT சட்ட பிரிவு 46 நடுவர் அதிகாரி (மாநில IT செயலாளர்)", hierarchyLevel: "Initial Forum", trackType: "Quasi-Judicial" },
      { nameEn: "Banking Ombudsman (RBI)", nameTa: "வங்கி குறைதீர்ப்பாளர் (RBI Ombudsman)", hierarchyLevel: "Initial Forum", trackType: "Administrative" },
      { nameEn: "Telecom Disputes Settlement and Appellate Tribunal (TDSAT)", nameTa: "TDSAT தீர்ப்பாயம்", hierarchyLevel: "High Court / Tribunal", trackType: "Special Tribunal" }
    ],
    proceduralTracks: ["Immediate 'Golden Hour' Reporting to 1930 / cybercrime.gov.in to freeze beneficiary accounts", "Adjudication Petition under Section 46 IT Act for recovery of damages up to ₹5 Crores", "Banking Ombudsman complaint for zero-liability electronic banking fraud under RBI circulars"],
    remedyTypes: [
      { remedyNameEn: "Freezing of Destination Fraud Bank Accounts & Fund Reversal", remedyNameTa: "மோசடி வங்கி கணக்குகளை முடக்கி பணத்தை திரும்பப் பெறுதல்", category: "Restorative", description: "Lien marking and reversal of stolen funds through police freeze notices." },
      { remedyNameEn: "Full Bank Reversal under RBI Zero Customer Liability Policy", remedyNameTa: "வங்கி மூலம் முழுத் தொகை இழப்பீடு மீட்பு", category: "Compensatory", description: "Directing bank to reimburse unauthorized transactions reported within 3 days." }
    ],
    specialistInstructions: "Enforce RBI Circular on Customer Liability (zero liability if unauthorized transaction reported within 3 working days). Apply Section 43/66/66D of IT Act for identity theft and electronic cheating.",
    precedentSearchStrategy: {
      statutes: ["Information Technology Act 2000", "RBI Customer Liability Directives"],
      courtBenches: ["High Courts", "TDSAT New Delhi"],
      keyTerms: ["RBI zero customer liability electronic fraud", "Section 46 IT Act adjudication compensation", "Intermediary guidelines safe harbour Section 79"]
    },
    domainValidationRules: ["Verify report timestamp against 3-day RBI zero-liability notification window", "Ensure electronic records comply with Section 63 BSA / 65B Evidence Act certification"]
  },

  constitutional_writ: {
    id: "constitutional_writ",
    nameEn: "Constitutional & Administrative Law (Writs)",
    nameTa: "அரசியலமைப்பு சட்டம் & உயர் நீதிமன்ற பேராணைகள் (Writs)",
    shortCode: "WRIT",
    badge: "⚖️ High Court & Writs",
    iconName: "Scale",
    descriptionEn: "Writ Petitions under Article 226/32: Mandamus (compelling public duty), Certiorari (quashing illegal orders), Habeas Corpus, Prohibition, and Quo Warranto.",
    descriptionTa: "உயர் நீதிமன்ற நல்வழி பேராணை மனுக்கள் (Article 226): மேன்டமஸ், செர்ஷியோராரி, ஆட்கொணர்வு மற்றும் தடையாணை மனுக்கள்.",
    keyStatutes: ["Constitution of India (Articles 14, 19, 21, 226, 227, 300A)", "High Court Writ Rules", "General Clauses Act 1897"],
    intakeQuestions: [
      {
        id: "publicAuthorityViolator",
        labelEn: "Public Authority / Government Department Sued",
        labelTa: "எதிர் தரப்பு அரசுத் துறை / அதிகாரி",
        placeholderEn: "e.g. District Collector, Commissioner of Police, Housing Board...",
        placeholderTa: "எ.கா. மாவட்ட ஆட்சியர், மாநகராட்சி ஆணையர்",
        type: "text",
        required: true
      },
      {
        id: "writType",
        labelEn: "Writ Remedy Sought",
        labelTa: "கோரப்படும் பேராணை வகை",
        placeholderEn: "Select writ category",
        placeholderTa: "பேராணை வகையைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "writ_mandamus", labelEn: "Writ of Mandamus (Direct Authority to perform statutory duty / consider representation)", labelTa: "மேன்டமஸ் (மனுவை பரிசீலித்து உரிய நடவடிக்கை எடுக்க உத்தரவு)" },
          { value: "writ_certiorari", labelEn: "Writ of Certiorari (Quash illegal, arbitrary or unconstitutional Government Order/Notice)", labelTa: "செர்ஷியோராரி (சட்டவிரோத அரசாணை அல்லது நோட்டீஸை ரத்து செய்தல்)" },
          { value: "writ_certiorarified_mandamus", labelEn: "Writ of Certiorarified Mandamus (Quash impugned order AND direct positive relief)", labelTa: "செர்ஷியோராரிஃபைட் மேன்டமஸ் (ரத்து செய்து உரிய உத்தரவு பிறப்பித்தல்)" },
          { value: "writ_habeas_corpus", labelEn: "Writ of Habeas Corpus (Produce unlawfully detained/missing person)", labelTa: "ஆட்கொணர்வு மனு (சட்டவிரோத காவலில் உள்ளவரை ஆஜர்படுத்தல்)" },
          { value: "writ_prohibition", labelEn: "Writ of Prohibition (Restrain tribunal/officer from exceeding jurisdiction)", labelTa: "தடையாணை பேராணை" }
        ],
        required: true
      }
    ],
    evidenceTypes: [
      { id: "representation_with_ack", nameEn: "Formal Written Representation to Public Authority & Postal Acknowledgement", nameTa: "அரசுக்கு அளித்த மனு & தபால் ஒப்புகை அட்டை", category: "Documentary", mandatoryForStrongCase: true },
      { id: "impugned_government_order", nameEn: "Impugned Order / G.O. / Notice to be Quashed", nameTa: "ரத்து செய்யப்பட வேண்டிய அரசாணை / நோட்டீஸ்", category: "Official Record", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Madras High Court (Principal Bench Chennai / Madurai Bench)", nameTa: "சென்னை உயர் நீதிமன்றம் (சென்னை / மதுரை அமர்வு)", hierarchyLevel: "High Court / Tribunal", trackType: "Quasi-Judicial" },
      { nameEn: "Supreme Court of India (Article 32 Fundamental Rights)", nameTa: "உச்ச நீதிமன்றம் (பிரிவு 32)", hierarchyLevel: "Supreme Court", trackType: "Quasi-Judicial" }
    ],
    proceduralTracks: ["Issue of Formal Pre-Writ Representation giving 15-30 days time", "Filing of Writ Petition under Article 226 with Affidavit & Supporting Documents", "Writ Appeal before Division Bench against Single Judge order"],
    remedyTypes: [
      { remedyNameEn: "Writ Direction to Consider Representation within Fixed Timeframe", remedyNameTa: "குறிப்பிட்ட காலத்திற்குள் மனுவை பரிசீலிக்க உத்தரவு", category: "Restorative", description: "Directing public official to pass reasoned orders within 4 to 8 weeks." },
      { remedyNameEn: "Quashing of Arbitrary / Ultra Vires Government Order", remedyNameTa: "அரசாணை / தன்னிச்சையான உத்தரவை ரத்து செய்தல்", category: "Declaratory", description: "Declaration that the impugned administrative action violates Article 14/21/300A." }
    ],
    specialistInstructions: "Ensure client has submitted a formal representation prior to Mandamus. Evaluate alternative statutory remedy availability vs exceptions (fundamental rights violation, complete lack of jurisdiction, breach of natural justice).",
    precedentSearchStrategy: {
      statutes: ["Constitution of India Articles 14, 19, 21, 226"],
      courtBenches: ["Supreme Court of India", "Madras High Court"],
      keyTerms: ["Alternative remedy not absolute bar Whirlpool Corporation", "Mandamus condition precedent demand and refusal", "Article 300A right to property constitutional right"]
    },
    domainValidationRules: ["Verify whether formal written demand/representation was served on the authority before seeking Mandamus", "Address existence of alternative remedy in maintainability pleading"]
  },

  arbitration_adr: {
    id: "arbitration_adr",
    nameEn: "Arbitration, Mediation & Commercial ADR",
    nameTa: "மத்தியஸ்தம், சமரசம் & வணிக தீர்வுகள் (ADR)",
    shortCode: "ADR",
    badge: "🤝 Arbitration & ADR",
    iconName: "Handshake",
    descriptionEn: "Arbitration clause invocation (Sec 21), Appointment of Sole Arbitrator (Sec 11), Interim Measures (Sec 9/17), Award challenges (Sec 34), and Execution (Sec 36).",
    descriptionTa: "மத்தியஸ்த நோட்டீஸ் (பிரிவு 21), நடுவர் நியமனம் (பிரிவு 11), இடைக்கால பாதுகாப்பு (பிரிவு 9), தீர்ப்பு சவால் (பிரிவு 34).",
    keyStatutes: ["Arbitration and Conciliation Act 1996 (as amended 2015/2019/2021)", "Commercial Courts Act 2015", "Mediation Act 2023"],
    intakeQuestions: [
      {
        id: "arbitrationClauseText",
        labelEn: "Arbitration Clause Text / Agreement Ref",
        labelTa: "ஒப்பந்தத்தில் உள்ள மத்தியஸ்த பிரிவு விவரம்",
        placeholderEn: "e.g. Clause 18: 'All disputes shall be referred to sole arbitrator in Chennai...'",
        placeholderTa: "எ.கா. பிரிவு 18: மத்தியஸ்த நடுவர் மூலம் தீர்க்கப்படும்...",
        type: "text",
        required: true
      },
      {
        id: "arbitrationDisputeValue",
        labelEn: "Total Value of Commercial Claim (₹)",
        labelTa: "வணிக கோரிக்கையின் மொத்த மதிப்பு (₹)",
        placeholderEn: "e.g. 5000000",
        placeholderTa: "எ.கா. 5000000",
        type: "number",
        required: true
      }
    ],
    evidenceTypes: [
      { id: "commercial_contract", nameEn: "Executed Commercial Contract containing Arbitration Clause", nameTa: "மத்தியஸ்த பிரிவு கொண்ட வணிக ஒப்பந்தம்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "section_21_notice", nameEn: "Section 21 Notice Invoking Arbitration & Proof of Delivery", nameTa: "பிரிவு 21 மத்தியஸ்த அறிவிப்பு & தபால் சான்று", category: "Documentary", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Commercial Court / Principal District Court (Sec 9 / Sec 34)", nameTa: "வணிக நீதிமன்றம் / முதன்மை மாவட்ட நீதிமன்றம்", hierarchyLevel: "Initial Forum", trackType: "Civil Court" },
      { nameEn: "High Court (Section 11 Chief Justice Designation of Arbitrator)", nameTa: "உயர் நீதிமன்றம் (பிரிவு 11 நடுவர் நியமனம்)", hierarchyLevel: "High Court / Tribunal", trackType: "Civil Court" }
    ],
    proceduralTracks: ["Sec 21 Notice of Arbitration -> 30 days -> Sec 11 Application before High Court", "Sec 9 Urgent Petition for Interim Protection before Court", "Statement of Claim before Arbitral Tribunal -> Arbitral Award -> Sec 34 Challenge (within 3 months) -> Sec 36 Execution"],
    remedyTypes: [
      { remedyNameEn: "Interim Injunction & Asset Freezing under Section 9 / 17", remedyNameTa: "பிரிவு 9 / 17 கீழ் இடைக்கால சொத்து முடக்கம்", category: "Interim", description: "Securing the amount in dispute or restraining alienation of assets pending arbitration." },
      { remedyNameEn: "Arbitral Award with Interest & Full Costs", remedyNameTa: "வட்டியுடன் மத்தியஸ்த தீர்ப்பு", category: "Final", description: "Enforceable money or performance award passed by arbitrator." }
    ],
    specialistInstructions: "Analyze Section 11(6) appointment requirements. Check whether contract is properly stamped (Supreme Court 7-judge bench ruling in In Re Interplay of Stamp Act & Arbitration Act).",
    precedentSearchStrategy: {
      statutes: ["Arbitration and Conciliation Act 1996"],
      courtBenches: ["Supreme Court of India", "Madras High Court (Commercial Division)"],
      keyTerms: ["Section 11 stamping not threshold bar In Re Stamp Act", "Section 34 limited patent illegality scope Ssangyong Engineering", "Section 9 interim protection balance of convenience"]
    },
    domainValidationRules: ["Ensure Section 21 notice was served before filing Section 11 petition", "Verify strict 90+30 days limitation window under Section 34 for challenging arbitral award"]
  },

  fema_foreign_exchange: {
    id: "fema_foreign_exchange",
    nameEn: "FEMA, Foreign Exchange & NRI Legal Matters",
    nameTa: "ஃபெமா (FEMA), அந்நிய செலாவணி & என்.ஆர்.ஐ சட்டங்கள்",
    shortCode: "FEMA",
    badge: "🌐 FEMA & Cross-Border",
    iconName: "Globe",
    descriptionEn: "Foreign Direct Investment (FDI), Overseas Direct Investment (ODI), NRI property acquisition and repatriation, Compounding of contraventions under FEMA 1999.",
    descriptionTa: "அந்நிய நேரடி முதலீடு, வெளிநாடு வாழ் இந்தியர் (NRI) சொத்து வாங்குதல் மற்றும் விற்றல், FEMA விதிமீறல் தீர்வு.",
    keyStatutes: ["Foreign Exchange Management Act 1999 (FEMA)", "Foreign Exchange Management (Non-debt Instruments) Rules 2019", "Prevention of Money Laundering Act 2002 (PMLA)", "RBI Master Directions on Compounding of Contraventions"],
    intakeQuestions: [
      {
        id: "residentialStatus",
        labelEn: "Client Residential Status & Country of Residence",
        labelTa: "வாடிக்கையாளரின் குடியிருப்பு நிலை & நாடு",
        placeholderEn: "e.g. NRI residing in USA / Foreign Citizen of Indian Origin (OCI)",
        placeholderTa: "எ.கா. அமெரிக்காவில் வசிக்கும் NRI / OCI அட்டைதாரர்",
        type: "text",
        required: true
      },
      {
        id: "foreignTransactionDetails",
        labelEn: "Foreign Remittance / Property Value & Currency",
        labelTa: "அந்நிய செலாவணி / சொத்து மதிப்பு & நாணயம்",
        placeholderEn: "e.g. $250,000 USD via NRE/NRO Bank Account for land purchase",
        placeholderTa: "எ.கா. $250,000 USD, NRE/NRO வங்கி கணக்கு",
        type: "text",
        required: true
      }
    ],
    evidenceTypes: [
      { id: "firc_bank_cert", nameEn: "Foreign Inward Remittance Certificate (FIRC) / BRC", nameTa: "அந்நிய செலாவணி உள்நாட்டு வரவு சான்றிதழ் (FIRC)", category: "Official Record", mandatoryForStrongCase: true },
      { id: "passport_oci_card", nameEn: "Passport, Visa & OCI Card Copies", nameTa: "பாஸ்போர்ட் & OCI அட்டை நகல்", category: "Official Record", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Reserve Bank of India (Foreign Exchange Department / Compounding Authority)", nameTa: "இந்திய ரிசர்வ் வங்கி (RBI Compounding)", hierarchyLevel: "Initial Forum", trackType: "Administrative" },
      { nameEn: "Enforcement Directorate (ED / Special Director FEMA)", nameTa: "அமலாக்கத்துறை (ED)", hierarchyLevel: "First Appellate", trackType: "Quasi-Judicial" },
      { nameEn: "Appellate Tribunal for Foreign Exchange (ATFP, New Delhi)", nameTa: "அந்நிய செலாவணி மேல்முறையீட்டு தீர்ப்பாயம்", hierarchyLevel: "High Court / Tribunal", trackType: "Special Tribunal" }
    ],
    proceduralTracks: ["Compounding Application before RBI under Section 15 FEMA 1999", "Reply to Show Cause Notice issued by Enforcement Directorate under Sec 16 FEMA", "Appeal before Appellate Tribunal for Foreign Exchange"],
    remedyTypes: [
      { remedyNameEn: "Compounding of FEMA Procedural Contravention upon payment of nominal fee", remedyNameTa: "FEMA விதிமீறல் சமரசம் (Compounding)", category: "Restorative", description: "Regularization of late filing or reporting omission before RBI." },
      { remedyNameEn: "Repatriation Permission & Income Tax Clearance (Form 15CA/15CB)", remedyNameTa: "வெளிநாட்டுக்கு பணப் பரிமாற்ற அனுமதி", category: "Declaratory", description: "Authorizing outward remittance of sale proceeds up to $1M USD annually." }
    ],
    specialistInstructions: "Check Non-Debt Instruments Rules 2019: NRIs/OCIs can acquire residential and commercial property in India, but are strictly prohibited from acquiring agricultural land, plantation property, or farm houses without prior RBI approval.",
    precedentSearchStrategy: {
      statutes: ["Foreign Exchange Management Act 1999", "FEMA NDI Rules 2019"],
      courtBenches: ["Supreme Court of India", "Delhi High Court"],
      keyTerms: ["FEMA compounding guidelines RBI", "NRI agricultural land acquisition prohibition", "Section 13 FEMA civil penalty vs criminal PMLA"]
    },
    domainValidationRules: ["NRIs/OCIs cannot purchase agricultural land or farm houses under FEMA NDI Rules", "FEMA contraventions are civil in nature; check if PMLA is wrongfully invoked"]
  },

  intellectual_property: {
    id: "intellectual_property",
    nameEn: "Intellectual Property, Trademark & Copyright",
    nameTa: "அறிவுசார் சொத்துரிமை, வர்த்தக முத்திரை (TM) & காப்புரிமை",
    shortCode: "IP",
    badge: "💡 IP & Trademarks",
    iconName: "Sparkles",
    descriptionEn: "Trademark infringement and passing off, Copyright violation, Patent opposition, Domain name cybersquatting, and Trade secrets.",
    descriptionTa: "வர்த்தக முத்திரை (Trademark) திருட்டு, காப்புரிமை மீறல், போலி தயாரிப்பு விற்பனை மற்றும் வர்த்தக ரகசிய பாதுகாப்பு.",
    keyStatutes: ["Trade Marks Act 1999", "Copyright Act 1957", "Patents Act 1970", "Commercial Courts Act 2015"],
    intakeQuestions: [
      {
        id: "ipRegistrationNumber",
        labelEn: "Trademark / Copyright / Patent Application Number & Class",
        labelTa: "வர்த்தக முத்திரை / காப்புரிமை பதிவு எண் & வகுப்பு",
        placeholderEn: "e.g. TM Application No. 5432198 in Class 35",
        placeholderTa: "எ.கா. TM எண் 5432198, வகுப்பு 35",
        type: "text",
        required: true
      },
      {
        id: "infringementMode",
        labelEn: "Mode of Infringement",
        labelTa: "உரிமை மீறல் முறை",
        placeholderEn: "e.g. Deceptively similar brand name, counterfeit packaging, online piracy...",
        placeholderTa: "எ.கா. ஒரே மாதிரியான போலி பெயர், போலி பேக்கிங்",
        type: "text",
        required: true
      }
    ],
    evidenceTypes: [
      { id: "tm_registration_cert", nameEn: "Trademark / Copyright Registration Certificate & Legal Use Affidavit", nameTa: "பதிவு சான்றிதழ் & பயன்பாட்டு பிரமாண பத்திரம்", category: "Official Record", mandatoryForStrongCase: true },
      { id: "counterfeit_invoices_samples", nameEn: "Purchase Invoices of Infringing Product & Side-by-Side Comparison", nameTa: "போலி தயாரிப்பு ரசீதுகள் & ஒப்பீட்டு படங்கள்", category: "Documentary", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "Commercial Court / High Court IP Division (Chennai / Delhi)", nameTa: "வணிக நீதிமன்றம் / உயர் நீதிமன்ற IP பிரிவு", hierarchyLevel: "Initial Forum", trackType: "Civil Court" },
      { nameEn: "Trade Marks Registry / Copyright Office (Opposition / Rectification)", nameTa: "வர்த்தக முத்திரை பதிவகம்", hierarchyLevel: "Initial Forum", trackType: "Administrative" }
    ],
    proceduralTracks: ["Cease and Desist Statutory Notice -> 7 Days", "Commercial Suit for Permanent Injunction, Rendition of Accounts & Damages", "Anton Piller / John Doe (Ashok Kumar) Ex-Parte Search & Seizure Order"],
    remedyTypes: [
      { remedyNameEn: "Ex-Parte Ad-Interim Injunction restraining Infringement & Passing Off", remedyNameTa: "போலி தயாரிப்பு விற்பனைக்கு அவசர இடைக்கால தடை", category: "Interim", description: "Immediate court order stopping use of deceptively similar mark." },
      { remedyNameEn: "Damages & Rendition of Profits", remedyNameTa: "இழப்பீடு & ஈட்டிய லாபத்தை ஒப்படைக்க உத்தரவு", category: "Compensatory", description: "Directing infringer to hand over all profits earned from illicit sales." }
    ],
    specialistInstructions: "Apply Cadila Healthcare deceptive similarity test. Check Section 134 Trade Marks Act which allows plaintiff to sue where they reside or carry on business, overriding general CPC rules.",
    precedentSearchStrategy: {
      statutes: ["Trade Marks Act 1999", "Copyright Act 1957"],
      courtBenches: ["Madras High Court IP Division", "Delhi High Court IPD", "Supreme Court of India"],
      keyTerms: ["Deceptive similarity test Cadila Healthcare", "Passing off goodwill misrepresentation injury Reckitt Benckiser", "Section 134 jurisdiction plaintiff place of business"]
    },
    domainValidationRules: ["Ensure prior use is substantiated with invoices and advertisement expenditure", "Check Section 134 special jurisdiction provisions"]
  },

  environmental_ngt: {
    id: "environmental_ngt",
    nameEn: "Environmental Law & National Green Tribunal",
    nameTa: "சுற்றுச்சூழல் சட்டம் & தேசிய பசுமைத் தீர்ப்பாயம் (NGT)",
    shortCode: "NGT",
    badge: "🌿 Environment & NGT",
    iconName: "Compass",
    descriptionEn: "Pollution control, Waterbody encroachment, Coastal Regulation Zone (CRZ) violations, Environmental Clearances (EC), and NGT Southern Zone applications.",
    descriptionTa: "நீர்நிலை ஆக்கிரமிப்பு, சுற்றுச்சூழல் மாசு, CRZ கடலோர விதிமீறல் மற்றும் பசுமைத் தீர்ப்பாய (NGT) வழக்குகள்.",
    keyStatutes: ["National Green Tribunal Act 2010", "Environment (Protection) Act 1986", "Water (Prevention and Control of Pollution) Act 1974", "Air (Prevention and Control of Pollution) Act 1981", "Coastal Regulation Zone Notification 2019"],
    intakeQuestions: [
      {
        id: "pollutionOrViolationType",
        labelEn: "Nature of Environmental Grievance",
        labelTa: "சுற்றுச்சூழல் பிரச்சினையின் தன்மை",
        placeholderEn: "e.g. Industrial effluent discharge, Waterbody encroachment, illegal quarrying...",
        placeholderTa: "எ.கா. தொழிற்சாலை கழிவு, நீர்நிலை ஆக்கிரமிப்பு, சட்டவிரோத குவாரி",
        type: "text",
        required: true
      },
      {
        id: "polluterIndustryOrBody",
        labelEn: "Violator Industry / Local Body / Authority",
        labelTa: "சுற்றுச்சூழலை பாதிக்கும் நிறுவனம் / அமைப்பு",
        placeholderEn: "e.g. Chemical Factory / Municipal Corporation / Mining Operator",
        placeholderTa: "எ.கா. ரசாயன ஆலை / நகராட்சி / சுரங்க நிறுவனம்",
        type: "text",
        required: true
      }
    ],
    evidenceTypes: [
      { id: "pollution_test_photos", nameEn: "Lab Water/Air Quality Test Reports, GPS Photos & Video", nameTa: "ஆய்வக பரிசோதனை அறிக்கை & புகைப்படங்கள்", category: "Official Record", mandatoryForStrongCase: true },
      { id: "tnpcb_consent_orders", nameEn: "TNPCB Consent to Operate (CTO) / Environmental Clearance Extract", nameTa: "TNPCB அனுமதி ஆவணங்கள்", category: "Official Record" }
    ],
    relevantAuthorities: [
      { nameEn: "National Green Tribunal (Southern Zone Bench, Chennai)", nameTa: "தேசிய பசுமைத் தீர்ப்பாயம் (தென் மண்டலம், சென்னை)", hierarchyLevel: "Initial Forum", trackType: "Special Tribunal" },
      { nameEn: "Tamil Nadu Pollution Control Board (TNPCB)", nameTa: "தமிழ்நாடு மாசு கட்டுப்பாட்டு வாரியம்", hierarchyLevel: "Initial Forum", trackType: "Administrative" },
      { nameEn: "Supreme Court of India (Section 22 NGT Act Statutory Appeal)", nameTa: "உச்ச நீதிமன்றம்", hierarchyLevel: "Supreme Court", trackType: "Special Tribunal" }
    ],
    proceduralTracks: ["Original Application under Section 14 / 15 NGT Act 2010 before Southern Zone Bench Chennai", "Statutory Appeal under Section 16 NGT Act challenging grant of Environmental Clearance (within 30 days)"],
    remedyTypes: [
      { remedyNameEn: "Restoration of Environment & Imposition of Polluter Pays Damages", remedyNameTa: "சுற்றுச்சூழல் மறுசீரமைப்பு & மாசு இழப்பீடு", category: "Compensatory", description: "Directing polluter to pay environmental restitution compensation." },
      { remedyNameEn: "Closure of Non-Compliant Industrial Facility & Removal of Encroachments", remedyNameTa: "ஆலை மூடல் & நீர்நிலை ஆக்கிரமிப்பு அகற்றம்", category: "Restorative", description: "Immediate injunction sealing polluting units or clearing riverbeds." }
    ],
    specialistInstructions: "Apply Precautionary Principle and Polluter Pays Principle under Section 20 NGT Act. Check 6-month limitation under Section 14 from date on which cause of action first arose.",
    precedentSearchStrategy: {
      statutes: ["National Green Tribunal Act 2010", "Environment Protection Act 1986"],
      courtBenches: ["NGT Southern Zone Chennai", "Supreme Court of India"],
      keyTerms: ["Precautionary principle polluter pays Vellore Citizens Welfare", "Waterbody protection public trust doctrine", "Section 14 NGT limitation trigger date"]
    },
    domainValidationRules: ["Verify 6-month limitation window under Section 14 NGT Act", "Check mandatory substantial question relating to environment threshold"]
  },

  civil_contract: {
    id: "civil_contract",
    nameEn: "Civil Law, Contracts & Specific Relief",
    nameTa: "உரிமையியல் சட்டம், ஒப்பந்தங்கள் & நிவாரணம்",
    shortCode: "CIVIL",
    badge: "📜 Civil & Contracts",
    iconName: "Scale",
    descriptionEn: "Breach of contract, Specific Performance of agreement to sell, Money recovery suits, Damages, Declaratory suits, and Civil injunctions.",
    descriptionTa: "ஒப்பந்த மீறல், விற்பனை ஒப்பந்த நிறைவேற்றம் (Specific Performance), கடன் மீட்பு வழக்கு மற்றும் உரிமையியல் தடை.",
    keyStatutes: ["Indian Contract Act 1872", "Specific Relief Act 1963 (as amended 2018)", "Code of Civil Procedure 1908 (CPC)", "Limitation Act 1963", "Sale of Goods Act 1930"],
    intakeQuestions: [
      {
        id: "contractDateAndSubject",
        labelEn: "Contract / Agreement Date & Subject Matter",
        labelTa: "ஒப்பந்தத்தின் தேதி & பொருள்",
        placeholderEn: "e.g. Agreement of Sale dt 12-04-2023 for Commercial Building",
        placeholderTa: "எ.கா. 12-04-2023 விற்பனை ஒப்பந்தம்",
        type: "text",
        required: true
      },
      {
        id: "totalConsiderationAndAdvance",
        labelEn: "Total Contract Value & Advance Paid (₹)",
        labelTa: "மொத்த ஒப்பந்த மதிப்பு & முன்பணம் (₹)",
        placeholderEn: "e.g. Total ₹50 Lakhs, Advance Paid ₹15 Lakhs",
        placeholderTa: "எ.கா. மொத்தம் ₹50 லட்சம், முன்பணம் ₹15 லட்சம்",
        type: "text",
        required: true
      },
      {
        id: "civilReliefType",
        labelEn: "Primary Civil Remedy Demanded",
        labelTa: "கோரப்படும் உரிமையியல் தீர்வு",
        placeholderEn: "Select civil remedy",
        placeholderTa: "தீர்வைத் தேர்ந்தெடுக்கவும்",
        type: "select",
        options: [
          { value: "specific_performance", labelEn: "Specific Performance of Contract (Sec 10 Specific Relief Act)", labelTa: "ஒப்பந்தத்தை நிறைவேற்ற உத்தரவு (Specific Performance)" },
          { value: "money_recovery_suit", labelEn: "Summary Money Recovery Suit (Order 37 CPC / Regular Suit)", labelTa: "பணம் மீட்பு வழக்கு (ஆர்டர் 37 CPC)" },
          { value: "damages_breach", labelEn: "Damages / Compensation for Breach of Contract (Sec 73/74)", labelTa: "ஒப்பந்த மீறலுக்கான இழப்பீடு" },
          { value: "permanent_injunction", labelEn: "Declaration of Legal Status & Permanent Injunction", labelTa: "உரிமை பிரகடனம் & நிரந்தர தடை உத்தரவு" }
        ]
      }
    ],
    evidenceTypes: [
      { id: "original_stamped_agreement", nameEn: "Original Stamped Agreement & Endorsements of Payment", nameTa: "அசல் முத்திரைத்தாள் ஒப்பந்தம் & முன்பண ரசீதுகள்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "readiness_willingness_proof", nameEn: "Bank Statements proving Readiness & Willingness (Sec 16(c))", nameTa: "பணம் செலுத்த தயார் நிலை வங்கி சான்றுகள்", category: "Documentary", mandatoryForStrongCase: true },
      { id: "legal_notice_receipt", nameEn: "Legal Notice Demanding Performance & Postal Tracking", nameTa: "சட்ட நோட்டீஸ் & தபால் ஒப்புகை", category: "Documentary", mandatoryForStrongCase: true }
    ],
    relevantAuthorities: [
      { nameEn: "District Munsif / Sub Court / District Judge (Civil Suit)", nameTa: "மாவட்ட உரிமையியல் / சார்பு நீதிமன்றம்", hierarchyLevel: "Initial Forum", trackType: "Civil Court" },
      { nameEn: "Commercial Court (Commercial Suits above ₹3 Lakhs)", nameTa: "வணிக நீதிமன்றம்", hierarchyLevel: "Initial Forum", trackType: "Civil Court" },
      { nameEn: "High Court (First Appeal under Section 96 CPC)", nameTa: "உயர் நீதிமன்றம் (முதல் மேல்முறையீடு)", hierarchyLevel: "High Court / Tribunal", trackType: "Civil Court" }
    ],
    proceduralTracks: ["Pre-Litigation Mediation under Sec 12A Commercial Courts Act (if commercial dispute)", "Filing Plaint under Order VII CPC + Order XXXIX Interim Injunction Petition", "Trial -> Preliminary/Final Decree -> Execution Petition (Order XXI CPC)"],
    remedyTypes: [
      { remedyNameEn: "Decree for Specific Performance directing Execution of Sale Deed", remedyNameTa: "கிரைய பத்திரம் செயல்படுத்த உத்தரவு", category: "Final", description: "Court order mandating defendant to register sale deed or court executing on defendant's behalf." },
      { remedyNameEn: "Money Decree with 12-18% Interest from Date of Default", remedyNameTa: "வட்டியுடன் பண மீட்பு தீர்ப்பு", category: "Compensatory", description: "Directing defendant to refund advance along with liquidated damages." }
    ],
    specialistInstructions: "Apply Specific Relief (Amendment) Act 2018: Specific performance is now mandatory (no longer discretionary) under Section 10. Verify continuous readiness and willingness under Section 16(c).",
    precedentSearchStrategy: {
      statutes: ["Indian Contract Act 1872", "Specific Relief Act 1963", "CPC 1908"],
      courtBenches: ["Supreme Court of India", "Madras High Court (Civil Side)"],
      keyTerms: ["Specific performance mandatory 2018 amendment Sughar Singh", "Readiness and willingness Section 16(c) J.P. Builders", "Liquidated damages Section 74 Kailash Nath Associates"]
    },
    domainValidationRules: ["Limitation period for Specific Performance is strictly 3 years from date fixed for performance (Article 54 Limitation Act)", "Check readiness and willingness pleading under Section 16(c) Specific Relief Act"]
  }
};

export function getDomainPack(id: LegalDomainId | string): LegalDomainPack {
  return LEGAL_DOMAIN_PACKS[id as LegalDomainId] || LEGAL_DOMAIN_PACKS.general_triage;
}

export function getAllDomainPacks(): LegalDomainPack[] {
  return Object.values(LEGAL_DOMAIN_PACKS);
}

export function getDomainPacksForIds(ids: (LegalDomainId | string)[]): LegalDomainPack[] {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [LEGAL_DOMAIN_PACKS.general_triage];
  }
  const packs = ids
    .map(id => LEGAL_DOMAIN_PACKS[id as LegalDomainId])
    .filter(Boolean);
  return packs.length > 0 ? packs : [LEGAL_DOMAIN_PACKS.general_triage];
}

export function quickTriageDomainPacks(text: string): {
  primaryDomain: LegalDomainId;
  secondaryDomains: LegalDomainId[];
  activeDomainPacks: LegalDomainId[];
  confidenceScore: number;
  reasoning: string;
} {
  const lower = (text || "").toLowerCase();
  
  // Keyword mapping scores
  const domainScores: Record<LegalDomainId, number> = {
    property_revenue_reg: 0,
    criminal_bns: 0,
    civil_contract: 0,
    consumer_cpa: 0,
    corporate_nclt: 0,
    banking_sarfaesi: 0,
    insolvency_ibc: 0,
    labour_employment: 0,
    family_matrimonial: 0,
    succession_wills: 0,
    taxation_gst: 0,
    cyber_it_act: 0,
    constitutional_writ: 0,
    arbitration_adr: 0,
    fema_foreign_exchange: 0,
    intellectual_property: 0,
    environmental_ngt: 0,
    general_triage: 1
  };

  // Property & Land Revenue
  if (lower.match(/சர்வே|பட்டா|கிரைய|வில்லங்கம்|பத்திரம்|உரிமையாளர்|பிரிவு 77a|udr|fmb|survey|patta|sro|sub-registrar|ec\b|sale deed|tahsildar|revenue|land/)) {
    domainScores.property_revenue_reg += 5;
  }
  // Criminal
  if (lower.match(/எஃப்\.ஐ\.ஆர்|காவல்|மோசடி|தாக்குதல்|கொலை|மிரட்டல்|பிணை|கைது|crpc|fir|police|bns|bnss|cheating|forgery|assault|bail|criminal/)) {
    domainScores.criminal_bns += 5;
  }
  // Consumer
  if (lower.match(/நுகர்வோர்|குறைபாடு|இழப்பீடு|வாரண்டி|பில்|நிறுவனம்|ரீஃபண்ட்|consumer|defect|cpa|deficiency|warranty|refund|compensation/)) {
    domainScores.consumer_cpa += 5;
  }
  // Banking & SARFAESI
  if (lower.match(/வங்கி|கடன்|npa|sarfaesi|வங்கி கடன்|drt|வட்டி|loan|bank|hypothecation|auction/)) {
    domainScores.banking_sarfaesi += 5;
  }
  // Labour & Service
  if (lower.match(/பணிநீக்கம்|சம்பளம்|ஊழியர்|தொழிலாளர்|pf|gratuity|வேலைவாய்ப்பு|labour|employment|salary|workman|dismissal|termination/)) {
    domainScores.labour_employment += 5;
  }
  // Family & Matrimonial
  if (lower.match(/கணவர்|மனைவி|விவாகரத்து|ஜீவனாம்சம்|குழந்தை|குடும்ப வன்முறை|divorce|maintenance|matrimonial|domestic violence|custody/)) {
    domainScores.family_matrimonial += 5;
  }
  // Succession & Wills
  if (lower.match(/வாரிசு|உயில்|பாகப்பிரிவினை|பரம்பரை|succession|will|partition|probate|legal heir|inheritance/)) {
    domainScores.succession_wills += 5;
  }
  // Taxation & GST
  if (lower.match(/ஜிஎஸ்டி|வரி|itc|வருமான வரி|drc-01|gst|tax|income tax|assessment|notice|inward supply/)) {
    domainScores.taxation_gst += 5;
  }
  // Cyber & IT
  if (lower.match(/சைபர்|ஆன்லைன் மோசடி|ஹேக்கிங்|ஓடிபி|டேட்டா|cyber|online fraud|otp|phishing|it act|social media/)) {
    domainScores.cyber_it_act += 5;
  }
  // FEMA & Foreign Exchange
  if (lower.match(/fema|nri|அந்நிய செலாவணி|rbi|வெளிநாடு|foreign exchange|remittance|nre|nro/)) {
    domainScores.fema_foreign_exchange += 5;
  }
  // Corporate & Company
  if (lower.match(/nclt|நிறுவன|இயக்குனர்|பங்கு|board|director|shareholder|merger|oppression|mismanagement/)) {
    domainScores.corporate_nclt += 5;
  }
  // Insolvency & IBC
  if (lower.match(/திவால்|ibc|cirp|liquidat|moratorium|insolvency|resolution professional/)) {
    domainScores.insolvency_ibc += 5;
  }
  // Arbitration
  if (lower.match(/மத்தியஸ்தம்|arbitrat|tribunal|award|section 9|section 11|section 34/)) {
    domainScores.arbitration_adr += 5;
  }
  // Intellectual Property
  if (lower.match(/காப்புரிமை|டிரேட்மார்க்|காபிரைட்|trademark|patent|copyright|infringement/)) {
    domainScores.intellectual_property += 5;
  }
  // Constitutional
  if (lower.match(/ரிட்|உயர் நீதிமன்றம்|அரசியலமைப்பு|writ|article 226|article 32|mandamus|certiorari/)) {
    domainScores.constitutional_writ += 4;
  }
  // Civil & Contract
  if (lower.match(/ஒப்பந்தம்|முன்பணம்|நிறைவேற்றம்|contract|agreement|advance|specific performance|breach|damages/)) {
    domainScores.civil_contract += 4;
  }

  // Rank domains
  const sorted = (Object.entries(domainScores) as [LegalDomainId, number][])
    .filter(([k, score]) => k !== "general_triage" && score > 0)
    .sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) {
    return {
      primaryDomain: "general_triage",
      secondaryDomains: [],
      activeDomainPacks: ["general_triage"],
      confidenceScore: 60,
      reasoning: "வழக்கின் விவரங்கள் பல பொது சட்ட கூறுகளை உள்ளடக்கியுள்ளன. ஆரம்ப மதிப்பீடாக பொது சட்டப் பகுப்பாய்வு மற்றும் விளக்கக் கேள்விகள் செயல்படுத்தப்பட்டுள்ளன."
    };
  }

  const primaryDomain = sorted[0][0];
  const secondaryDomains = sorted.slice(1, 4).map(s => s[0]);
  const activeDomainPacks = [primaryDomain, ...secondaryDomains];
  const confidenceScore = Math.min(95, Math.max(70, sorted[0][1] * 12));

  return {
    primaryDomain,
    secondaryDomains,
    activeDomainPacks,
    confidenceScore,
    reasoning: `வழக்கின் மூல விபரங்களின்படி முதன்மை சட்டக் களமாக '${LEGAL_DOMAIN_PACKS[primaryDomain]?.nameTa}' மற்றும் துணை களங்களாக ${secondaryDomains.map(d => `'${LEGAL_DOMAIN_PACKS[d]?.nameTa}'`).join(", ")} கண்டறியப்பட்டுள்ளன.`
  };
}

