import { WorkspaceId, SubWorkspaceId, ModuleId, AIEngineId } from "./data/workspaceRegistry";
import { LanguageMode } from "./lib/languageContext";
import { LegalDomainId } from "./data/legalDomainPacks";

export type { LegalDomainId } from "./data/legalDomainPacks";

export interface MultiDomainClassification {
  primaryDomain: LegalDomainId | string;
  primaryDomainTitle?: string;
  secondaryDomains: (LegalDomainId | string)[];
  secondaryDomainTitles?: string[];
  proceduralDomains?: string[];
  crossCuttingIssues?: string[];
  confidenceScore: number; // 0-100
  isProvisional: boolean; // Triage is provisional; re-evaluable upon new facts/docs
  triageClarifications?: string[]; // Questions if AI is uncertain
  triageReasoning?: string;
}

export interface CrossLawInteraction {
  statutesInvolved: string[];
  interactionType: "Harmonious / Complementary" | "Conflict (Non-Obstante Override)" | "Concurrent Jurisdiction" | "Sequential Bar / Pre-requisite" | string;
  analysis: string;
  operationalRule: string;
}

export interface IssueDecompositionItem {
  issueNumber: number;
  title: string;
  domain: LegalDomainId | string;
  applicableStatutes: string[];
  coreQuestion: string;
  factualBasis: string;
  recommendedForum: string;
  primaFacieStrength?: "Strong" | "Moderate" | "Weak";
}

export interface PropertyDomainMetadata {
  surveyNumber?: string;
  village?: string;
  taluk?: string;
  pattaNumber?: string;
  guidelineValue?: string;
  documentNumber?: string;
  subRegistrarOffice?: string;
  [key: string]: any;
}

export interface CriminalDomainMetadata {
  firNumber?: string;
  policeStation?: string;
  relevantSections?: string;
  arrestStatus?: string;
  bailStatus?: string;
  [key: string]: any;
}

export interface TaxDomainMetadata {
  assessmentYear?: string;
  panOrGstin?: string;
  noticeSection?: string;
  dinNumber?: string;
  demandAmount?: string;
  [key: string]: any;
}

export interface CorporateDomainMetadata {
  cinOrLlpIn?: string;
  companyName?: string;
  shareholdingPercentage?: string;
  tribunalBench?: string;
  [key: string]: any;
}

export interface ConsumerDomainMetadata {
  invoiceOrPolicyNumber?: string;
  transactionDate?: string;
  claimAmount?: string;
  deficiencyType?: string;
  [key: string]: any;
}

export interface FEMADomainMetadata {
  transactionType?: string;
  residentialStatus?: string;
  foreignEntityOrBank?: string;
  edNoticeReference?: string;
  [key: string]: any;
}

export interface CyberDomainMetadata {
  platformOrService?: string;
  transactionOrIncidentId?: string;
  financialLossAmount?: string;
  acknowledgementNumber?: string;
  [key: string]: any;
}

export interface DomainMetadataMap {
  PROPERTY?: PropertyDomainMetadata;
  property_revenue_reg?: PropertyDomainMetadata;
  CRIMINAL?: CriminalDomainMetadata;
  criminal_bns?: CriminalDomainMetadata;
  TAX?: TaxDomainMetadata;
  taxation_gst?: TaxDomainMetadata;
  direct_indirect_tax?: TaxDomainMetadata;
  CORPORATE?: CorporateDomainMetadata;
  corporate_nclt?: CorporateDomainMetadata;
  CONSUMER?: ConsumerDomainMetadata;
  consumer_cpa?: ConsumerDomainMetadata;
  FEMA?: FEMADomainMetadata;
  fema_foreign_exchange?: FEMADomainMetadata;
  CYBER?: CyberDomainMetadata;
  cyber_it_act?: CyberDomainMetadata;
  [domainKey: string]: Record<string, any> | undefined;
}

export interface IntakeData {
  workspace?: WorkspaceId;
  subWorkspace?: SubWorkspaceId;
  module?: ModuleId;
  engine?: AIEngineId;
  clientName: string;
  mobile: string;
  location?: string;
  district: string;
  state?: string;
  oppositeParty: string;
  partyRelationship?: string;
  courtOrForum?: string;
  existingAdvocate: string;
  existingCaseNumber: string; // FIR No / Notice Ref / Case No / Citation
  limitationRisk: string;
  selectedModel?: string;
  primaryDomain?: LegalDomainId | string;
  activeDomainPacks?: (LegalDomainId | string)[];
  domainMetadata?: DomainMetadataMap;
  // Legacy flat fields for backward compatibility only (normalized into domainMetadata.PROPERTY)
  surveyNumber?: string;
  village?: string;
  taluk?: string;
  pattaNumber?: string;
}

export interface Stage1Data {
  category: string;
  specificType: string;
}

export interface Stage2Data {
  realIssue: string;
  rootCauseStatement: string;
}

export interface Stage3LegalMap {
  subjectType: string; // Stage 3: Property Type or Dispute Subject
  partyRelationshipMap: string; // Stage 3: Output: Party Relationship Map
}

export interface Stage4Timeline {
  timelineEvents: string[]; // Stage 4: Output: Cause of Action Timeline
}

export interface Stage5RightsMatrix {
  rightsViolated: string[];
  dutiesBreached: string[];
  legalObligations: string[];
  possibleLiabilities: string[];
  availableProtections: string[];
}

export interface Stage6Data {
  available: string[];
  missing: string[];
  documentary?: string[];
  electronic?: string[];
  witnesses?: string[];
  officialRecords?: string[];
  evidenceStrength?: "Weak" | "Moderate" | "Strong" | "Ironclad";
}

export interface Stage7JurisdictionMap {
  route: string[]; // Array of sequential authorities / forums
  primaryAuthority?: string;
  appellateAuthority?: string;
  forumType?: string;
}

export interface Stage8Data {
  category: string;
  primaryRemedy: string;
  remedyType?: "Administrative" | "Civil" | "Criminal" | "Alternative" | "Constitutional" | string;
  alternativeOptions?: string[];
}

export interface Stage9Data {
  factors: string[];
  score: number;
  rating: string; // Low | Medium | High | Critical
  limitationStatus?: string;
  urgencyLevel?: string;
}

export interface Stage10Data {
  packageName: string;
  priceRange: string;
  description: string;
  deliverablesList?: string[]; // Case Opinion, Summary, Chronology, Party Chart, Evidence Index, Petition Draft, Notice Draft, Complaint Draft...
}

export interface CaseFactComparison {
  feature: string;
  currentCase: string;
  referenceCase: string;
  match: boolean;
}

export interface CaseReferenceItem {
  id?: string;
  caseId?: string;
  caseName?: string;
  title?: string;
  citationNumber?: string;
  citation?: string;
  court: string;
  judge?: string;
  year: string | number;
  state?: string;
  bench?: string;
  caseType?: string;
  similarityScore: number; // 0-100%
  factsComparison?: CaseFactComparison[];
  issuesCompared?: string[]; // e.g. ["Ownership", "Mutation", "Forgery", "Possession", "Survey", "Registration", "Inheritance", "Limitation"]
  legalPrinciples?: string[]; // Acts, Sections, Rules, G.O.s, Circulars
  courtReasoningSummary?: string;
  finalOutcome?: string; // e.g. "Petition Allowed", "Mutation Restored", "Patta Cancelled", "FIR Quashed"
  whyItMatters?: string;
  authoritiesCited?: string[];
  disputeIssueCategory?: string;
  keyLegalHoldings?: string[];
  factualSimilarity?: string;
  strategicValue?: string;
}

export interface GovernmentOrderItem {
  orderNumber: string;
  date: string;
  department: string;
  subject: string;
  relevance: string;
}

export interface CircularItem {
  circularNumber: string;
  date: string;
  department: string;
  subject: string;
  relevance: string;
}

export interface Stage11PrecedentIntelligence {
  similarCasesCount: number;
  averageSimilarityScore: number;
  similarCases: CaseReferenceItem[];
  overallPrinciples: string[];
  successProbability: {
    percentage: number; // 0-100%
    rating: "Strong" | "Good" | "Moderate" | "Weak" | string; // Strong (90-100%), Good (70-89%), Moderate (50-69%), Weak (<50%)
    disclaimer: string;
  };
  authoritiesSummary: {
    supremeCourtCount: number;
    highCourtCount: number;
    governmentOrdersCount: number;
    circularsCount: number;
    statutesList: string[];
    governmentOrders?: GovernmentOrderItem[];
    circulars?: CircularItem[];
  };
  strategyRecommendationFromPrecedents: string;
}

export interface EvidenceGapItem {
  missingElement: string;
  howToObtain: string;
  urgency: "High" | "Medium" | "Low";
}

export interface CounterargumentItem {
  argument: string;
  rebuttalStrategy: string;
}

export interface AdditionalProofItem {
  type: "Document" | "Witness" | "Official Record" | "Technical Survey" | string;
  title: string;
  purpose: string;
}

export interface PriorityActionItem {
  stepNumber: number;
  action: string;
  targetAuthority: string;
  timeline: string;
}

export interface Stage12StrategySimulator {
  strongestLegalRoute: {
    routeName: string; // e.g., "Writ Petition (Article 226) before Madras High Court"
    routeType: "Civil" | "Criminal" | "Writ" | "Revenue Appeal" | "Registration Appeal" | "Consumer/Tribunal" | string;
    justification: string;
    timeToResolutionEst: string;
    successProbabilityPercentage?: number;
  };
  mostPersuasivePrecedents: string[];
  evidenceGapsToFill: EvidenceGapItem[];
  likelyOppositeCounterarguments: CounterargumentItem[];
  recommendedAdditionalProof: AdditionalProofItem[];
  priorityNextActions: PriorityActionItem[];
}

export interface ClientFacingReply {
  problemIdentified?: string;
  legalPosition?: string;
  immediateNextStep?: string;
  expectedAuthority?: string;
  estimatedTimeline?: string;
  summary?: string;
  actionableAdvice?: string;
  keyFindings?: string[];
}

export interface DocumentsRequired {
  mandatory?: string[];
  revenue?: string[];
  family?: string[];
  court?: string[];
  other?: string[];
  available?: string[];
  missing?: string[];
  optional?: string[];
}

export interface ImmediateAction {
  within24Hours?: string[];
  within7Days?: string[];
  within30Days?: string[];
  authorityToApproach?: string;
  nextSteps?: string[];
  timeframe?: string;
}

export interface ServicePackage {
  recommendedPackage?: string;
  deliverables?: string[];
  professionalFee?: string;
  expectedOutcome?: string;
  feeRange?: string;
  recommendedTrack?: string;
}

export interface CustomDocumentDraft {
  documentTitle?: string;
  documentContent?: string;
  title?: string;
  category?: string;
  content?: string;
  sha256Hash?: string;
  timestamp?: string;
  verificationUrl?: string;
  sections?: any[];
}

export interface PropertyEvidenceFile {
  id: string;
  name: string;
  sizeFormatted: string;
  mimeType: string;
  sha256Hash: string;
  uploadedAt: string;
  uploadedBy: string;
  virusCheckPassed: boolean;
  category: "Sale Deed" | "Patta / Chitta" | "Encumbrance Certificate (EC)" | "FMB / Survey Sketch" | "Court Order / Judgment" | "Other";
}

export interface CaseHistoryEntry {
  id: string;
  timestamp: string;
  description: string;
}

export type UpdateEventType = 
  | "New Fact / Information" 
  | "New Document" 
  | "Court Notice / Order" 
  | "Authority Action" 
  | "New Event" 
  | "General Update";

export interface CaseUpdateEvent {
  id: string;
  timestamp: string;
  type: UpdateEventType | string;
  title: string;
  description: string;
  dateOfOccurrence?: string;
  sourceAuthority?: string;
  documentRef?: string;
}

export interface CaseAnalysisVersion {
  versionNumber: number;
  createdAt: string;
  triggeredByEventId: string;
  changedStages: number[];
  summaryOfChanges: string;
  previousRiskScore?: number;
  newRiskScore?: number;
  previousStrategy?: string;
  newStrategy?: string;
  evidenceGapsAdded?: string[];
  evidenceGapsResolved?: string[];
}

export interface ImpactSummary {
  newFacts: string[];
  stagesAffected: number[];
  evidenceImpact: string;
  riskImpact: {
    previousScore: number;
    newScore: number;
    explanation: string;
  };
  precedentImpact: string;
  governmentOrderImpact?: string;
  strategyImpact: {
    previousStrategy: string;
    newStrategy: string;
    explanation: string;
  };
  evidenceGapsAdded: string[];
  evidenceGapsResolved: string[];
  recommendedNextActions: string[];
  summaryOfChanges: string;
}

export interface LegalCase {
  id: string;
  createdAt: string;
  updatedAt?: string;
  revisionNumber?: number;
  rawDescription: string;
  workspace?: WorkspaceId;
  subWorkspace?: SubWorkspaceId;
  module?: ModuleId;
  engine?: AIEngineId;
  intake: IntakeData;
  stage0: IntakeData;
  stage1: Stage1Data;
  stage2: Stage2Data;
  stage3: string | Stage3LegalMap; // string for legacy property, Stage3LegalMap for detailed legal
  stage4: string | Stage4Timeline; // string for legacy property, Stage4Timeline for detailed legal
  stage5: string | Stage5RightsMatrix; // string or matrix
  stage6: Stage6Data;
  stage7: string[] | Stage7JurisdictionMap;
  stage8: Stage8Data;
  stage9: Stage9Data;
  stage10: Stage10Data;
  stage11?: Stage11PrecedentIntelligence;
  stage12?: Stage12StrategySimulator;
  clientFacingReply: ClientFacingReply;
  documentsRequired: DocumentsRequired;
  immediateAction: ImmediateAction;
  servicePackage: ServicePackage;
  customDocumentDraft: CustomDocumentDraft;
  multiDomainClassification?: MultiDomainClassification;
  issueDecomposition?: IssueDecompositionItem[];
  crossLawInteractions?: CrossLawInteraction[];
  primaryDomain?: LegalDomainId | string;
  activeDomainPacks?: (LegalDomainId | string)[];
  domainMetadata?: DomainMetadataMap;
  languageMode?: LanguageMode;
  selectedModel?: string;
  translatedVariants?: {
    ta?: LegalCase;
    en?: LegalCase;
    dual?: LegalCase;
  };
  history?: CaseHistoryEntry[];
  updates?: CaseUpdateEvent[];
  versions?: CaseAnalysisVersion[];
}

export type PropertyCase = LegalCase;

export interface SavedCaseBrief {
  id: string;
  createdAt: string;
  clientName: string;
  district: string;
  category: string;
  riskScore: number;
  rootIssue: string;
}

export type PlanType = "free" | "pro" | "advocate" | "enterprise";
export type AccountStatus = "active" | "suspended" | "vip";
export type UserRole = "superadmin" | "district_admin" | "advocate" | "vao" | "surveyor" | "client" | "auditor" | "admin" | "user";

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  plan: PlanType;
  status: AccountStatus;
  role: UserRole;
  customCaseLimit?: number; // Override case limit (e.g. 10 or 9999)
  adminNotes?: string;
  createdAt: string;
  lastLoginAt: string;
  caseCount?: number;
  hasProfile?: boolean;
  emailConfirmed?: boolean;
  phone?: string;
  languageMode?: LanguageMode;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  targetUserEmail: string;
  details: string;
  previousValue?: string;
  newValue?: string;
  ipAddress?: string;
  reason?: string;
}

