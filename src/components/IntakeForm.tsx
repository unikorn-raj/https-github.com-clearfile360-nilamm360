import React, { useState, useEffect } from "react";
import { TN_DISTRICTS, SAMPLE_CASES, SampleCase } from "../data/constants";
import { IntakeData } from "../types";
import { 
  LEGAL_DOMAIN_PACKS, 
  LegalDomainId, 
  LegalDomainPack, 
  quickTriageDomainPacks, 
  getDomainPacksForIds 
} from "../data/legalDomainPacks";
import { useLanguage } from "../lib/languageContext";
import { 
  FileText, Sparkles, MapPin, Phone, User, Landmark, ShieldAlert, ArrowRight, 
  CheckCircle2, Zap, Lock, Scale, Building2, Gavel, Briefcase, HeartHandshake, 
  Shield, Cpu, HelpCircle, Compass, FileCheck, ShoppingBag, HardHat, Receipt, 
  Building, Handshake, Layers, AlertCircle, Plus, X, RefreshCw, Layers3 
} from "lucide-react";

interface IntakeFormProps {
  onSubmit: (intake: IntakeData, rawDescription: string) => void;
  isLoading: boolean;
  currentCaseCount?: number;
  maxCases?: number;
  onOpenPricing?: () => void;
}

export function IntakeForm({ onSubmit, isLoading, currentCaseCount = 0, maxCases = 2, onOpenPricing }: IntakeFormProps) {
  const { t } = useLanguage();

  const [rawDescription, setRawDescription] = useState("");
  const [activeDomains, setActiveDomains] = useState<LegalDomainId[]>(["property_revenue_reg"]);
  const [primaryDomain, setPrimaryDomain] = useState<LegalDomainId>("property_revenue_reg");
  const [triageReasoning, setTriageReasoning] = useState<string>("");
  const [confidenceScore, setConfidenceScore] = useState<number>(85);
  const [isAutoTriaged, setIsAutoTriaged] = useState<boolean>(false);
  const [domainAnswers, setDomainAnswers] = useState<Record<string, string>>({});

  const [intake, setIntake] = useState<IntakeData>({
    workspace: "Citizen360",
    subWorkspace: "Legal360",
    module: "UniversalLegal",
    engine: "UniversalLegalReasoningEngine",
    clientName: "",
    mobile: "",
    surveyNumber: "",
    village: "",
    taluk: "",
    district: "Madurai",
    oppositeParty: "",
    partyRelationship: "",
    courtOrForum: "",
    existingAdvocate: "No",
    existingCaseNumber: "",
    limitationRisk: "No",
    primaryDomain: "property_revenue_reg",
    activeDomainPacks: ["property_revenue_reg"],
    domainMetadata: {}
  });

  // Automatically perform live quick triage when user types/pastes narrative
  const handleNarrativeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setRawDescription(text);
    if (text.trim().length > 25) {
      const triage = quickTriageDomainPacks(text);
      setActiveDomains(triage.activeDomainPacks);
      setPrimaryDomain(triage.primaryDomain);
      setTriageReasoning(triage.reasoning);
      setConfidenceScore(triage.confidenceScore);
      setIsAutoTriaged(true);
      setIntake(prev => ({
        ...prev,
        primaryDomain: triage.primaryDomain,
        activeDomainPacks: triage.activeDomainPacks,
        module: LEGAL_DOMAIN_PACKS[triage.primaryDomain]?.nameEn || "UniversalLegal"
      }));
    }
  };

  const handleManualTriageTrigger = () => {
    if (!rawDescription.trim()) {
      alert("தயவுசெய்து வழக்கு விபரத்தை உள்ளிடவும்.");
      return;
    }
    const triage = quickTriageDomainPacks(rawDescription);
    setActiveDomains(triage.activeDomainPacks);
    setPrimaryDomain(triage.primaryDomain);
    setTriageReasoning(triage.reasoning);
    setConfidenceScore(triage.confidenceScore);
    setIsAutoTriaged(true);
    setIntake(prev => ({
      ...prev,
      primaryDomain: triage.primaryDomain,
      activeDomainPacks: triage.activeDomainPacks,
      module: LEGAL_DOMAIN_PACKS[triage.primaryDomain]?.nameEn || "UniversalLegal"
    }));
  };

  const toggleDomain = (domainId: LegalDomainId) => {
    let updated: LegalDomainId[];
    if (activeDomains.includes(domainId)) {
      if (activeDomains.length === 1) {
        alert("குறைந்தது ஒரு சட்டக் களம் (Domain) தேர்ந்தெடுக்கப்பட்டிருக்க வேண்டும்.");
        return;
      }
      updated = activeDomains.filter(id => id !== domainId);
      if (primaryDomain === domainId) {
        setPrimaryDomain(updated[0]);
      }
    } else {
      updated = [...activeDomains, domainId];
    }
    setActiveDomains(updated);
    setIntake(prev => ({
      ...prev,
      activeDomainPacks: updated,
      primaryDomain: updated[0]
    }));
  };

  const handleDomainAnswerChange = (questionId: string, value: string) => {
    setDomainAnswers(prev => ({ ...prev, [questionId]: value }));
    setIntake(prev => ({
      ...prev,
      domainMetadata: {
        ...(prev.domainMetadata || {}),
        [questionId]: value
      }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIntake(prev => ({ ...prev, [name]: value }));
  };

  const loadSampleCase = (sample: SampleCase) => {
    const rawText = sample.rawDescription;
    setRawDescription(rawText);
    
    // Auto triage for sample case
    const triage = quickTriageDomainPacks(rawText);
    setActiveDomains(triage.activeDomainPacks);
    setPrimaryDomain(triage.primaryDomain);
    setTriageReasoning(triage.reasoning);
    setConfidenceScore(triage.confidenceScore);
    setIsAutoTriaged(true);

    setIntake({
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: LEGAL_DOMAIN_PACKS[triage.primaryDomain]?.nameEn || "UniversalLegal",
      engine: "UniversalLegalReasoningEngine",
      clientName: sample.intake.clientName,
      mobile: sample.intake.mobile,
      surveyNumber: sample.intake.surveyNumber || "",
      village: sample.intake.village || "",
      taluk: sample.intake.taluk || "",
      district: sample.intake.district,
      oppositeParty: sample.intake.oppositeParty,
      partyRelationship: sample.intake.partyRelationship || "",
      courtOrForum: sample.intake.courtOrForum || "",
      existingAdvocate: sample.intake.existingAdvocate,
      existingCaseNumber: sample.intake.existingCaseNumber,
      limitationRisk: sample.intake.limitationRisk,
      primaryDomain: triage.primaryDomain,
      activeDomainPacks: triage.activeDomainPacks,
      domainMetadata: {}
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawDescription.trim()) {
      alert("தயவுசெய்து வழக்குத் தகராறின் மூல விளக்கத்தை வழங்கவும்.");
      return;
    }
    if (currentCaseCount >= maxCases) {
      if (onOpenPricing) onOpenPricing();
      return;
    }

    // Merge active domain answers and survey details if present
    const updatedIntake: IntakeData = {
      ...intake,
      primaryDomain,
      activeDomainPacks: activeDomains,
      domainMetadata: {
        ...(intake.domainMetadata || {}),
        ...domainAnswers
      }
    };

    onSubmit(updatedIntake, rawDescription);
  };

  const activePacksData = getDomainPacksForIds(activeDomains);
  const isPropertyDomainActive = activeDomains.includes("property_revenue_reg");

  return (
    <div id="intake-form-container" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col text-slate-900">
      
      {/* 1. Universal Header Hero */}
      <div className="p-6 border-b border-slate-200 bg-purple-900 text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-purple-800 text-purple-100 font-extrabold text-[10px] rounded uppercase tracking-wider border border-purple-700 flex items-center gap-1">
                <Layers className="h-3 w-3 text-purple-300" />
                UNIVERSAL LEGAL360 AI ENGINE
              </span>
              <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 font-bold text-[10px] rounded border border-emerald-700/60 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                18 Modular Domain Packs Active
              </span>
            </div>
            <h2 className="text-xl font-black text-white font-display leading-tight flex items-center gap-2">
              <Sparkles className="h-5.5 w-5.5 text-purple-200" />
              {t("UNIKORN360 Universal Legal360 AI Case Solving System", "UNIKORN360 Universal Legal360 AI Case Solving System")}
            </h2>
            <p className="text-xs text-purple-100 mt-1 max-w-3xl font-normal">
              {t(
                "அனைத்து சட்டத் துறைகளையும் (சிவில், கிரிமினல், சொத்து, நுகர்வோர், தொழிலாளர், கார்ப்பரேட், வங்கி, திவால், வரி, சைபர், அரசியலமைப்பு, குடும்பம்) ஒருங்கிணைத்து பகுப்பாய்வு செய்யும் பல்துறை சட்ட மையம்.",
                "Universal Legal Reasoning Engine with Modular Domain Packs for Civil, Criminal, Property, Consumer, Labour, Corporate, Banking, Insolvency, Tax, Cyber, Family & Constitutional Law."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Sample Cases Quick Loader Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-amber-600" />
            10 மாதிரி வழக்குகள் (Sample Cases):
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {SAMPLE_CASES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSampleCase(sample)}
                className="px-2.5 py-1 text-[11px] font-bold bg-white text-purple-900 border border-slate-300 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition cursor-pointer whitespace-nowrap shadow-2xs"
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Intake Form */}
      <form onSubmit={handleFormSubmit} className="p-6 space-y-6 bg-white">

        {/* STEP 1: Case Narrative & AI Triage */}
        <div className="space-y-3">
          <div className="flex justify-between items-end border-b border-slate-200 pb-2">
            <h3 className="text-xs font-black text-purple-900 uppercase tracking-widest flex items-center gap-1.5">
              <span>01.</span> மூலப் பிரச்சினை & வழக்கு விபரம் (Universal Case Narrative)
            </h3>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              தானியங்கி பல்துறை வகைப்பாடு (Auto-Triage Active)
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-normal font-medium">
            வாடிக்கையாளரின் சிக்கல், புகார், ஆவண விபரம் அல்லது நோட்டீஸை இங்கே ஒட்டவும். தளம் தானாகவே முதன்மை மற்றும் இரண்டாம் நிலை சட்டக் களங்களை (Multi-Domain Packs) கண்டறிந்து dynamic கேள்விகளை உருவாக்கும்.
          </p>

          <div className="relative">
            <textarea
              value={rawDescription}
              onChange={handleNarrativeChange}
              rows={5}
              required
              placeholder="வழக்கின் முழு விபரங்களை இங்கே தட்டச்சு செய்யவும் அல்லது ஒட்டவும் (எ.கா: நில அபகரிப்பு, காசோலை மோசம், நுகர்வோர் சேவை குறைபாடு, பணி நீக்கம், ஜிஎஸ்டி நோட்டீஸ், வெளிநாட்டு முதலீடு FEMA, சொத்துரிமை தகராறு)..."
              className="w-full p-4 text-xs font-sans text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition leading-relaxed placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={handleManualTriageTrigger}
              className="absolute bottom-3 right-3 px-3 py-1.5 bg-purple-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-purple-800 transition flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <RefreshCw className="h-3 w-3" />
              <span>AI Triage Run</span>
            </button>
          </div>
        </div>

        {/* STEP 2: Multi-Domain Triage Results & Active Domain Packs Selector */}
        <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-200/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-purple-800" />
                <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider">
                  02. சட்டக் களங்கள் (Active Legal Domain Packs)
                </h4>
                {isAutoTriaged && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                    Confidence: {confidenceScore}%
                  </span>
                )}
              </div>
              {triageReasoning && (
                <p className="text-[11px] text-purple-900 mt-1 font-medium italic">
                  Triage Reasoning: {triageReasoning}
                </p>
              )}
            </div>
            <span className="text-[10px] text-slate-600 font-medium">
              (தேவையான களங்களை சொடுக்கி சேர்க்கலாம்/நீக்கலாம்)
            </span>
          </div>

          {/* Grid of 18 Modular Domain Packs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {(Object.keys(LEGAL_DOMAIN_PACKS) as LegalDomainId[]).map((domId) => {
              const pack = LEGAL_DOMAIN_PACKS[domId];
              const isActive = activeDomains.includes(domId);
              const isPrimary = primaryDomain === domId;

              return (
                <button
                  key={domId}
                  type="button"
                  onClick={() => toggleDomain(domId)}
                  className={`p-2.5 text-left rounded-xl text-xs font-bold border transition flex flex-col justify-between gap-1.5 cursor-pointer relative ${
                    isPrimary
                      ? "bg-purple-950 text-white border-purple-950 shadow-xs ring-2 ring-purple-600/50"
                      : isActive
                      ? "bg-purple-100/80 text-purple-950 border-purple-300 font-extrabold"
                      : "bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-extrabold text-[11px] truncate">{pack.nameEn}</span>
                    {isPrimary ? (
                      <span className="text-[8px] bg-purple-800 text-purple-100 px-1.5 py-0.2 rounded font-bold">
                        Primary
                      </span>
                    ) : isActive ? (
                      <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-bold">
                        Active
                      </span>
                    ) : null}
                  </div>
                  <span className={`text-[9.5px] font-normal line-clamp-1 ${isPrimary ? "text-purple-200" : "text-slate-500"}`}>
                    {pack.nameTa}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: Dynamic Domain-Specific Intake Questions */}
        {activePacksData.some(p => p.intakeQuestions.length > 0) && (
          <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-indigo-200/80 pb-2">
              <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="h-4 w-4 text-indigo-700" />
                <span>03. சட்டக் கள பிரத்யேக வினாக்கள் (Domain-Specific Questions)</span>
              </h4>
              <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100 border border-indigo-300 px-2 py-0.5 rounded">
                Dynamic Intake
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activePacksData.flatMap(pack => 
                pack.intakeQuestions.map(q => (
                  <div key={`${pack.id}_${q.id}`} className="bg-white p-3 rounded-lg border border-indigo-100 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded uppercase">
                        {pack.nameTa}
                      </span>
                      {q.required && <span className="text-rose-600 text-[10px] font-bold">*</span>}
                    </div>
                    <label className="block text-[10px] font-bold text-slate-800">
                      {q.labelTa}
                    </label>
                    <input
                      type="text"
                      value={domainAnswers[q.id] || ""}
                      onChange={(e) => handleDomainAnswerChange(q.id, e.target.value)}
                      placeholder={q.placeholderTa}
                      className="w-full px-3 py-1.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none placeholder:text-slate-400"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* STEP 4: Universal Parties & Legal Identifiers */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-purple-900 uppercase tracking-widest flex items-center gap-1">
            <span>04.</span> கட்சிகள் & அடையாளங்கள் (Universal Parties & Identifiers)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-purple-700" />
                வாடிக்கையாளர் / மனுதாரர் பெயர் <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="clientName"
                value={intake.clientName}
                onChange={handleChange}
                placeholder="எ.கா: ரமேஷ் குமார் / சன்டெக் எண்டர்பிரைசஸ்"
                required
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                கைபேசி எண் / தொடர்பு
              </label>
              <input
                type="text"
                name="mobile"
                value={intake.mobile}
                onChange={handleChange}
                placeholder="9845012345"
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-rose-600" />
                எதிர் தரப்பினர் (Opposite Party / Respondent) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="oppositeParty"
                value={intake.oppositeParty}
                onChange={handleChange}
                placeholder="எதிர்த்தரப்பு / நிறுவனம் / அதிகாரி"
                required
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                கட்சிகளின் உறவுமுறை (Party Relationship)
              </label>
              <input
                type="text"
                name="partyRelationship"
                value={intake.partyRelationship || ""}
                onChange={handleChange}
                placeholder="எ.கா: வாங்குபவர்/விற்பவர், முதலாளி/தொழிலாளி, வங்கி/கடன் பெற்றவர், கணவன்/மனைவி"
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                நீதிமன்றம் / அதிகாரம் / ஆணையம் (Court / Authority Forum)
              </label>
              <input
                type="text"
                name="courtOrForum"
                value={intake.courtOrForum || ""}
                onChange={handleChange}
                placeholder="எ.கா: சிவில் நீதிமன்றம், நுகர்வோர் ஆணையம், DRT, NCLT, உயர்நீதிமன்றம்"
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition placeholder:text-slate-400"
              />
            </div>

            {/* ONLY render Survey No / Village / Taluk if Property Domain is active */}
            {isPropertyDomainActive && (
              <>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-purple-700" />
                    சர்வே எண் (Survey Number)
                  </label>
                  <input
                    type="text"
                    name="surveyNumber"
                    value={intake.surveyNumber || ""}
                    onChange={handleChange}
                    placeholder="எ.கா: 142/3B"
                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    கிராமம் / பகுதி
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={intake.village || ""}
                    onChange={handleChange}
                    placeholder="மேலூர்"
                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    வட்டம் (தாலுகா)
                  </label>
                  <input
                    type="text"
                    name="taluk"
                    value={intake.taluk || ""}
                    onChange={handleChange}
                    placeholder="மேலூர்"
                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition placeholder:text-slate-400"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                மாவட்டம் / மாநிலம் (Jurisdiction)
              </label>
              <select
                name="district"
                value={intake.district}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition cursor-pointer"
              >
                {TN_DISTRICTS.map((dist, idx) => (
                  <option key={idx} value={dist} className="bg-white text-slate-900">
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                கால வரம்பு அச்சுறுத்தல் உள்ளதா? (Limitation Risk)
              </label>
              <select
                name="limitationRisk"
                value={intake.limitationRisk}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition cursor-pointer"
              >
                <option value="No" className="bg-white text-slate-900">இல்லை (சமீபத்திய பிரச்சினை)</option>
                <option value="Yes" className="bg-white text-slate-900">ஆம் (பழைய / கால வரம்பு நெருங்கும் பிரச்சினை)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                வழக்கு நிலுவையில் உள்ளதா? (Pending Proceedings)
              </label>
              <div className="flex gap-2">
                <select
                  name="existingAdvocate"
                  value={intake.existingAdvocate}
                  onChange={handleChange}
                  className="w-1/3 px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition cursor-pointer"
                >
                  <option value="No" className="bg-white text-slate-900">இல்லை</option>
                  <option value="Yes" className="bg-white text-slate-900">ஆம்</option>
                </select>
                <input
                  type="text"
                  name="existingCaseNumber"
                  value={intake.existingCaseNumber}
                  onChange={handleChange}
                  disabled={intake.existingAdvocate === "No"}
                  placeholder="வழக்கு எண் / எஃப்.ஐ.ஆர் / நோட்டீஸ் Ref"
                  className="w-2/3 px-3.5 py-2.5 text-xs font-semibold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition disabled:opacity-40 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Digital Evidence Locker & SHA-256 File Security Upload */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-emerald-700" />
              <span>டிஜிட்டல் சான்றாதார பெட்டகம் (SHA-256 Evidence Locker)</span>
            </h4>
            <span className="text-[10px] text-emerald-800 font-mono font-bold bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
              CLEAN VIRUS SCAN & TAMPER SEAL
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            பத்திரங்கள், ஒப்பந்தங்கள், காசோலைகள், மின்னஞ்சல்கள், ஜிஎஸ்டி ஆவணங்கள், காவல் புகார் அல்லது நீதிமன்ற உத்தரவுகளைப் பதிவேற்றி SHA-256 முத்திரையைப் பெறலாம் (PDF, JPG, PNG, அதிகபட்சம் 15MB).
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.tiff"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const { validatePropertyEvidenceFile } = await import("../lib/security");
              const result = await validatePropertyEvidenceFile(file);
              if (!result.isValid) {
                alert(`பாதுகாப்பு எச்சரிக்கை: ${result.securityMessage}`);
              } else {
                alert(`ஆவணம் சரிபார்க்கப்பட்டது!\nSHA-256 Hash: ${result.sha256Hash}\nஅளவு: ${result.fileSizeFormatted}\nஅமைப்பு: ${result.securityMessage}`);
              }
            }}
            className="block w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-purple-900 hover:file:bg-purple-200 cursor-pointer"
          />
        </div>

        {/* Action Footer & Limit Warning */}
        {currentCaseCount >= maxCases && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold">
              <Lock className="h-5 w-5 text-amber-700 shrink-0" />
              <div>
                <p className="font-black text-amber-950">இலவசக் கணக்கு வரம்பு எட்டப்பட்டது ({currentCaseCount}/{maxCases} வழக்குகள்)</p>
                <p className="text-[11px] text-amber-800 font-medium">புதிய வழக்குகளை பகுப்பாய்வு செய்ய வெள்ளி அல்லது தங்கத் திட்டத்திற்கு உயர்த்தவும்.</p>
              </div>
            </div>
            {onOpenPricing && (
              <button
                type="button"
                onClick={onOpenPricing}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black uppercase tracking-wider rounded-lg text-[11px] shadow-xs transition shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>திட்டத்தை உயர்த்துக</span>
              </button>
            )}
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 font-extrabold text-xs uppercase tracking-wider rounded-xl transition duration-150 cursor-pointer flex items-center gap-2 shadow-xs ${
              currentCaseCount >= maxCases
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-purple-900 hover:bg-purple-950 text-white font-black disabled:bg-slate-200 disabled:text-slate-400"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Legal360 பல்துறை சட்டப் பகுப்பாய்வு செய்யப்படுகிறது...</span>
              </>
            ) : currentCaseCount >= maxCases ? (
              <>
                <Lock className="h-4 w-4" />
                <span>வரம்பு எட்டப்பட்டது - திட்டத்தை உயர்த்தவும்</span>
              </>
            ) : (
              <>
                <span>12-நிலை பல்துறை சட்டப் பகுப்பாய்வை உருவாக்கு</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
