export const TN_DISTRICTS = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kancheepuram",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar"
];

export interface SampleCase {
  title: string;
  description: string;
  rawDescription: string;
  domainBadge?: string;
  primaryDomain?: string;
  activeDomainPacks?: string[];
  intake: {
    workspace?: string;
    subWorkspace?: string;
    module?: string;
    engine?: string;
    clientName: string;
    mobile: string;
    district: string;
    oppositeParty: string;
    partyRelationship?: string;
    courtOrForum?: string;
    existingAdvocate: string;
    existingCaseNumber: string;
    limitationRisk: string;
    primaryDomain?: string;
    activeDomainPacks?: string[];
    domainMetadata?: Record<string, any>;
    surveyNumber?: string;
    village?: string;
    taluk?: string;
  };
}

export const SAMPLE_CASES: SampleCase[] = [
  {
    title: "மதுரை பூர்வீக நிலப் போலி செட்டில்மென்ட் (Property + Succession + Criminal)",
    description: "சகோதரியின் பங்கைப் பறிக்க மூத்த சகோதரர் போலி ஆவணம் தயாரித்து பட்டா மாற்ற முயற்சி.",
    domainBadge: "Property + Succession + Criminal",
    primaryDomain: "property_revenue_reg",
    activeDomainPacks: ["property_revenue_reg", "succession_wills", "criminal_bns"],
    rawDescription: "எனது தந்தை 5 வருடங்களுக்கு முன்பு உயில் எழுதாமல் இறந்துவிட்டார். நாங்கள் 3 உடன்பிறப்புகள் (1 மகன், 2 மகள்கள்). மூத்த சகோதரர் மதுரையில் உள்ள எங்கள் பூர்வீக விவசாய நிலம் முழுவதையும் அவரது மனைவிக்கு செட்டில்மென்ட் பத்திரம் மூலம் ரகசியமாக சார்பதிவாளர் அலுவலகத்தில் பதிவு செய்துள்ளார். இப்போது வட்டாட்சியரிடம் பட்டா உட்பிரிவு செய்ய விண்ணப்பித்துள்ளார். 2005 இந்து வாரிசுரிமை சட்டப்படி பெண் வாரிசுகளுக்கு சம பங்கு உள்ளது. போலி ஆவணம் தயாரித்ததற்காக காவல் நிலையத்தில் புகார் அளித்துள்ளோம்.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Property360",
      module: "Registration",
      engine: "CaseClassificationAI",
      clientName: "ரமேஷ் குமார் & சகோதரிகள்",
      mobile: "9845012345",
      district: "Madurai",
      oppositeParty: "சுரேஷ் குமார் & மனைவி",
      partyRelationship: "சகோதரர் & சகோதரிகள் (உடன்பிறந்த வாரிசுகள்)",
      courtOrForum: "சார்பதிவாளர் அலுவலகம், வட்டாட்சியர் & மாவட்ட உரிமையியல் நீதிமன்றம்",
      existingAdvocate: "No",
      existingCaseNumber: "",
      limitationRisk: "No",
      primaryDomain: "property_revenue_reg",
      activeDomainPacks: ["property_revenue_reg", "succession_wills", "criminal_bns"],
      surveyNumber: "142/3B",
      village: "மேலூர்",
      taluk: "மேலூர்"
    }
  },
  {
    title: "சென்னை காசோலைத் திரும்புதல் வழக்கு (Criminal - Sec 138 NI Act)",
    description: "ரூ. 15 லட்சம் வணிகக் கடனுக்காக வழங்கப்பட்ட காசோலை வங்கியில் போதிய பணமின்மையால் திரும்பியது.",
    domainBadge: "Criminal • NI Act 138",
    primaryDomain: "criminal_bns",
    activeDomainPacks: ["criminal_bns", "civil_contract"],
    rawDescription: "எனது வணிக கூட்டாளி கடன் தொகையான ரூ. 15,00,000-க்கு வழங்கிய காசோலை வங்கியில் கணக்கில் போதிய பணமில்லை (Insufficient Funds) எனக் கூறி திரும்பப் பெறப்பட்டது. வங்கி திரும்புதல் குறிப்பாணை (Bank Return Memo) கிடைத்து 10 நாட்கள் ஆகிறது. 15 நாட்களுக்குள் சட்டப்பூர்வ அறிவிப்பு (Statutory Legal Notice under Sec 138 NI Act) அனுப்ப வேண்டும்.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: "Criminal360",
      engine: "NoticeComplaintAI",
      clientName: "சுந்தரம் கார்த்திக்",
      mobile: "9840112233",
      district: "Chennai",
      oppositeParty: "பிரகாஷ் கெமிக்கல்ஸ் நிர்வாக இயக்குநர்",
      partyRelationship: "கடன் அளித்தவர் / வணிக கடன் பெற்றவர்",
      courtOrForum: "விரைவு நீதிமன்றம் (Fast Track Magistrate Court, Chennai)",
      existingAdvocate: "No",
      existingCaseNumber: "",
      limitationRisk: "Yes",
      primaryDomain: "criminal_bns",
      activeDomainPacks: ["criminal_bns", "civil_contract"]
    }
  },
  {
    title: "நிறுவன இயக்குநர் நிதிக் கையாடல் & NCLT வழக்கு (Corporate + Criminal)",
    description: "26% பங்குதாரரை சட்டவிரோதமாக நீக்கிவிட்டு நிறுவன நிதியை இயக்குநர்கள் கையாடல் செய்துள்ளனர்.",
    domainBadge: "Corporate • NCLT + Criminal",
    primaryDomain: "corporate_nclt",
    activeDomainPacks: ["corporate_nclt", "criminal_bns"],
    rawDescription: "நான் சென்னையில் உள்ள ஒரு பிரைவேட் லிமிடெட் நிறுவனத்தில் 26% பங்கு வைத்துள்ள நிறுவனர்களில் ஒருவன். மற்ற இரண்டு இயக்குநர்கள் சட்டப்பூர்வ போர்டு நோட்டீஸ் அனுப்பாமல் என்னை இயக்குநர் பதவியிலிருந்து நீக்கியுள்ளனர். நிறுவனத்தின் கணக்கிலிருந்து ரூ. 2.80 கோடியை அவர்களின் சொந்த நிறுவனங்களுக்கு மாற்றியுள்ளனர் (Siphoning of funds). கம்பெனி சட்டம் பிரிவு 241/242 கீழ் NCLT-யில் மனு தாக்கல் செய்ய வேண்டும்.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: "Corporate360",
      engine: "CaseClassificationAI",
      clientName: "ராஜேந்திரன் வேணுகோபால்",
      mobile: "9884019283",
      district: "Chennai",
      oppositeParty: "ஆகாஷ் இன்ஃபோடெக் இயக்குநர்கள்",
      partyRelationship: "சிறுபான்மை பங்குதாரர் vs பெரும்பான்மை இயக்குநர்கள்",
      courtOrForum: "தேசிய நிறுவன சட்ட தீர்ப்பாயம் (NCLT Chennai Bench)",
      existingAdvocate: "No",
      existingCaseNumber: "",
      limitationRisk: "No",
      primaryDomain: "corporate_nclt",
      activeDomainPacks: ["corporate_nclt", "criminal_bns"],
      domainMetadata: {
        cinOrCompanyName: "U72900TN2019PTC112233",
        shareholdingPercentage: "26% Equity Shareholder"
      }
    }
  },
  {
    title: "இணைய வங்கி நிதி மோசடி & வங்கி அலட்சியம் (Cyber + Criminal + Banking)",
    description: "சிம் ஸ்வாப் மூலம் ரூ. 8.5 லட்சம் வங்கி கணக்கிலிருந்து திருடப்பட்டு, 24 மணி நேரத்திற்குள் புகார் அளித்தும் வங்கி உதவவில்லை.",
    domainBadge: "Cyber + Criminal + Banking",
    primaryDomain: "cyber_it_act",
    activeDomainPacks: ["cyber_it_act", "criminal_bns", "banking_sarfaesi"],
    rawDescription: "நேற்று இரவு எனது தொலைபேசி எண் திடீரென செயலிழந்தது (Unauthorized SIM Swap). அடுத்த 2 மணி நேரத்தில் எனது வங்கி கணக்கிலிருந்து 3 தவணைகளாக மொத்தம் ரூ. 8,50,000 வேறு வங்கி கணக்குகளுக்கு மாற்றப்பட்டுள்ளது. காலை 1930 சைபர் ஹெல்ப்லைனில் புகார் அளித்து, வங்கிக்கும் உடனடியாக மின்னஞ்சல் அனுப்பினேன். RBI சுற்றறிக்கைப்படி வாடிக்கையாளர் அலட்சியம் இல்லாத பட்சத்தில் 3 நாட்களுக்குள் அறிவித்தால் முழு பண இழப்பீடும் வங்கியே வழங்க வேண்டும்.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: "Cyber360",
      engine: "ServiceDeficiencyAI",
      clientName: "விஜயலட்சுமி பாலகிருஷ்ணன்",
      mobile: "9443215678",
      district: "Coimbatore",
      oppositeParty: "அங்கீகரிக்கப்படாத சைபர் மோசடியாளர்கள் & எச்டிஎஃப்சி வங்கி கிளை",
      partyRelationship: "பாதிக்கப்பட்ட கணக்கு உரிமையாளர் vs வங்கி",
      courtOrForum: "சைபர் கிரைம் காவல் நிலையம் & RBI வங்கி குறைதீர்ப்பாளர் (Ombudsman)",
      existingAdvocate: "No",
      existingCaseNumber: "ACK-CYBER-2024-9988",
      limitationRisk: "Yes",
      primaryDomain: "cyber_it_act",
      activeDomainPacks: ["cyber_it_act", "criminal_bns", "banking_sarfaesi"],
      domainMetadata: {
        cyberCrimePlatform: "SIM Swap & NetBanking Phishing",
        financialLossAmount: "850000"
      }
    }
  },
  {
    title: "வெளிநாடு வாழ் இந்தியர் விவசாய நிலக் கொள்முதல் சர்ச்சை (FEMA + Property + Banking)",
    description: "அமெரிக்காவில் உள்ள NRI வாடிக்கையாளர் வாங்கிய நிலம் விவசாய நிலமாக பதிவு செய்யப்பட்டதால் FEMA விளக்கம்.",
    domainBadge: "FEMA + Property + Banking",
    primaryDomain: "fema_foreign_exchange",
    activeDomainPacks: ["fema_foreign_exchange", "property_revenue_reg", "banking_sarfaesi"],
    rawDescription: "நான் அமெரிக்காவில் வசிக்கும் இந்திய வம்சாவளி NRI (US Citizen / OCI). எனது NRE வங்கி கணக்கு மூலம் ரூ. 60 லட்சம் அனுப்பி கோயம்புத்தூரில் வீட்டு மனை வாங்குவதற்காக பவர் ஏஜென்ட்டிடம் பணம் அளித்தேன். ஆனால் அவர் விவசாய நிலத்தை என் பெயரில் பதிவு செய்துள்ளார். FEMA விதிகளின்படி NRI-கள் விவசாய நிலத்தை வாங்க அனுமதியில்லை. இந்த பரிவர்த்தனையை RBI-யிடம் முறைப்படுத்தி (Compounding) அல்லது நிலத்தை மாற்றி அமைக்க சட்ட உதவி தேவை.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: "Property Documents",
      engine: "CaseClassificationAI",
      clientName: "டாக்டர் ஆனந்த் நாராயணன் (NRI)",
      mobile: "+14085551234",
      district: "Coimbatore",
      oppositeParty: "பவர் ஆஃப் அட்டர்னி ஏஜென்ட் & நில விற்பனையாளர்",
      partyRelationship: "NRI நிலக் கொள்முதல் வாடிக்கையாளர் vs ஏஜென்ட்",
      courtOrForum: "இந்திய ரிசர்வ் வங்கி (RBI Foreign Exchange Dept) & உரிமையியல் நீதிமன்றம்",
      existingAdvocate: "No",
      existingCaseNumber: "",
      limitationRisk: "No",
      primaryDomain: "fema_foreign_exchange",
      activeDomainPacks: ["fema_foreign_exchange", "property_revenue_reg", "banking_sarfaesi"]
    }
  },
  {
    title: "அடுக்குமாடி குடியிருப்பு ஒப்படைப்பு தாமதம் & இழப்பீடு (Consumer + Contract)",
    description: "ரூ. 75 லட்சம் செலுத்தி 3 ஆண்டுகளாக ஒப்படைக்கப்படாத பிளாட்டிற்கு வட்டியுடன் ரீஃபண்ட் அல்லது நஷ்டஈடு.",
    domainBadge: "Consumer • CPA 2019 + RERA",
    primaryDomain: "consumer_cpa",
    activeDomainPacks: ["consumer_cpa", "civil_contract"],
    rawDescription: "சென்னையில் உள்ள ஒரு முன்னணி பில்டரிடம் 2021-ல் ரூ. 75 லட்சம் மதிப்பிலான 3BHK பிளாட் முன்பதிவு செய்து ரூ. 60 லட்சம் வரை தவணைகளாக செலுத்தியுள்ளேன். கட்டுமான ஒப்பந்தப்படி டிசம்பர் 2022-ல் ஒப்படைத்திருக்க வேண்டும். ஆனால் இதுவரை கட்டிடம் முழுமை பெறவில்லை. மாதாந்திர வீட்டுக் கடன் தவணையும் வாடகையும் செலுத்தி கடும் மன உளைச்சலுக்கு ஆளாகியுள்ளேன். நுகர்வோர் ஆணையம் மூலம் வட்டியுடன் கூடிய இழப்பீடு பெற வேண்டும்.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: "Consumer360",
      engine: "CompensationAI",
      clientName: "சதீஷ் கண்ணன்",
      mobile: "9841098765",
      district: "Chennai",
      oppositeParty: "கிரீன்வுட் ஹவுசிங் டெவலப்பர்ஸ் பிரைவேட் லிமிடெட்",
      partyRelationship: "வீட்டு நுகர்வோர் vs அடுக்குமாடி கட்டுமான நிறுவனம்",
      courtOrForum: "மாநில நுகர்வோர் குறைதீர் ஆணையம் / TN RERA",
      existingAdvocate: "No",
      existingCaseNumber: "",
      limitationRisk: "No",
      primaryDomain: "consumer_cpa",
      activeDomainPacks: ["consumer_cpa", "civil_contract"],
      domainMetadata: {
        transactionType: "builder_delay",
        invoiceAmount: 7500000,
        compensationClaimed: 1500000
      }
    }
  },
  {
    title: "கோவை ஐடி நிறுவனம் சட்டவிரோத பணிநீக்கம் (Labour & Employment)",
    description: "முன்னறிவிப்பின்றி 8 வருட அனுபவம் கொண்ட ஊழியரை பணிநீக்கம் செய்து நிலுவைச் சம்பளமும் PF-ம் மறுக்கப்பட்டுள்ளது.",
    domainBadge: "Labour & Service Law",
    primaryDomain: "labour_employment",
    activeDomainPacks: ["labour_employment", "civil_contract"],
    rawDescription: "நான் கோவையில் உள்ள மென்பொருள் நிறுவனத்தில் 8 ஆண்டுகள் பணிபுரிந்தேன். எந்தவொரு ஒழுங்கு நடவடிக்கை அல்லது காரணமுமின்றி, எனது 3 மாத நிலுவைச் சம்பளம் மற்றும் பிடித்தம் செய்யப்பட்ட வருங்கால வைப்பு நிதி (PF) மற்றும் கிராஜுவிட்டி வழங்கப்படாமல் உடனடியாக பணிநீக்கம் செய்யப்பட்டுள்ளேன். தொழிலாளர் நீதிமன்றம் மூலம் முழு பணப்பலன்களையும் பெற வேண்டும்.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: "Labour360",
      engine: "ServiceDeficiencyAI",
      clientName: "திவ்யா சுப்ரமணியம்",
      mobile: "9442233445",
      district: "Coimbatore",
      oppositeParty: "எக்செல் டெக்னாலஜிஸ் பிரைவேட் லிமிடெட்",
      partyRelationship: "நிறுவனம் / ஊழியர் (Employer & Employee)",
      courtOrForum: "தொழிலாளர் நீதிமன்றம் / உதவி தொழிலாளர் ஆணையர்",
      existingAdvocate: "No",
      existingCaseNumber: "",
      limitationRisk: "No",
      primaryDomain: "labour_employment",
      activeDomainPacks: ["labour_employment", "civil_contract"]
    }
  },
  {
    title: "குடும்ப நலன் & ஜீவனாம்சம் பாதுகாப்பு வழக்கு (Family & Matrimonial)",
    description: "மனைவி மற்றும் 4 வயது குழந்தைக்கு ஜீவனாம்சம் மற்றும் குடும்ப வன்முறை சட்டத்தின் கீழ் பாதுகாப்பு உத்தரவு.",
    domainBadge: "Family • DVA + Sec 144 BNSS",
    primaryDomain: "family_matrimonial",
    activeDomainPacks: ["family_matrimonial", "criminal_bns"],
    rawDescription: "எனது கணவர் மற்றும் மாமியார் வரதட்சணை கேட்டு தொடர்ந்து கொடுமைப்படுத்தி என்னை குழந்தையுடன் வீட்டை விட்டு வெளியேற்றிவிட்டனர். கணவர் மாதம் ரூ. 1,50,000 சம்பாதிக்கும் ஐடி மேலாளர். ஆனால் எனக்கும் எனது 4 வயது மகளுக்கும் எந்த பராமரிப்பு செலவும் வழங்கவில்லை. குடும்ப வன்முறை சட்டத்தின் கீழ் தங்கும் இட பாதுகாப்பு மற்றும் பிரிவு 144 BNSS (125 CrPC) கீழ் மாதாந்திர ஜீவனாம்சம் கோருகிறேன்.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: "Family360",
      engine: "CompensationAI",
      clientName: "கவிதா செந்தில்",
      mobile: "9789054321",
      district: "Salem",
      oppositeParty: "செந்தில்குமார் (கணவர்)",
      partyRelationship: "மனைவி vs கணவர் (தம்பதியர்)",
      courtOrForum: "குடும்ப நல நீதிமன்றம் & குற்றவியல் நீதித்துறை நடுவர் நீதிமன்றம்",
      existingAdvocate: "No",
      existingCaseNumber: "",
      limitationRisk: "No",
      primaryDomain: "family_matrimonial",
      activeDomainPacks: ["family_matrimonial", "criminal_bns"]
    }
  },
  {
    title: "ஜிஎஸ்டி விளக்கம் கேட்கும் நோட்டீஸ் & ITC மறுப்பு (Taxation & GST)",
    description: "விற்பனையாளர் ஜிஎஸ்டி தாக்கல் செய்யவில்லை எனக் கூறி வாடிக்கையாளரின் ரூ. 24 லட்சம் ITC ரத்து செய்ய நோட்டீஸ்.",
    domainBadge: "Taxation • GST DRC-01",
    primaryDomain: "taxation_gst",
    activeDomainPacks: ["taxation_gst", "constitutional_writ"],
    rawDescription: "எங்களது உற்பத்தி நிறுவனத்திற்கு வழங்கப்பட்ட மூலப்பொருட்களுக்கு அனைத்து வரி இன்வாய்ஸ்களும் வங்கி மூலம் செலுத்தப்பட்டுள்ளன. ஆனால் விற்பனையாளர் GSTR-1 தாக்கல் செய்ய தாமதப்படுத்தியதால், ஜிஎஸ்டி துறை பிரிவு 73 கீழ் ரூ. 24,00,000 ITC வரியை வட்டியுடன் திருப்பிச் செலுத்த Form DRC-01 நோட்டீஸ் அனுப்பியுள்ளது. நேரில் விளக்கம் அளிக்க வாய்ப்பு தராமல் தன்னிச்சையாக உத்தரவு பிறப்பித்துள்ளது.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Legal360",
      module: "Tax360",
      engine: "CaseClassificationAI",
      clientName: "பிரீமியர் இன்ஜினியரிங் ஒர்க்ஸ்",
      mobile: "9842187654",
      district: "Tiruchirappalli",
      oppositeParty: "உதவி ஆணையர் (ஜிஎஸ்டி தணிக்கை பிரிவு)",
      partyRelationship: "வரி செலுத்துவோர் vs வரித்துறை அதிகாரி",
      courtOrForum: "இணை ஆணையர் (மேல்முறையீடு) & சென்னை உயர் நீதிமன்றம் (Writ Art 226)",
      existingAdvocate: "No",
      existingCaseNumber: "SCN-GST-DRC01-8876",
      limitationRisk: "Yes",
      primaryDomain: "taxation_gst",
      activeDomainPacks: ["taxation_gst", "constitutional_writ"],
      domainMetadata: {
        gstinOrPan: "33AABCP1234F1Z9",
        taxDisputedAmount: 2400000
      }
    }
  },
  {
    title: "நில விற்பனை ஒப்பந்த நிறைவேற்றம் & தடையாணை (Civil & Contract)",
    description: "ரூ. 30 லட்சம் முன்பணம் பெற்றுவிட்டு நிலத்தை வேறு நபருக்கு விற்க முயற்சிக்கும் விற்பனையாளர் மீது வழக்கு.",
    domainBadge: "Civil • Specific Performance",
    primaryDomain: "civil_contract",
    activeDomainPacks: ["civil_contract", "property_revenue_reg"],
    rawDescription: "நான் திருநெல்வேலியில் உள்ள வணிக நிலத்தை வாங்க நில உரிமையாளருடன் ரூ. 80 லட்சத்திற்கு பதிவு செய்யப்பட்ட ஒப்பந்தம் செய்து ரூ. 30 லட்சம் முன்பணம் செலுத்தினேன். மீதமுள்ள தொகையை செலுத்த நான் தொடர்ந்து தயாராக இருந்தும் (Ready and Willing under Sec 16(c)), நில மதிப்பு உயர்ந்ததால் உரிமையாளர் கிரையம் செய்து தராமல் வேறு ஒருவருக்கு விற்க பேசி வருகிறார். ஒப்பந்த நிறைவேற்ற வழக்கு மற்றும் விற்பனைக்கு இடைக்கால தடையாணை தேவை.",
    intake: {
      workspace: "Citizen360",
      subWorkspace: "Property360",
      module: "Property Litigation",
      engine: "LegalDraftingAI",
      clientName: "முத்துவேல் பழனி",
      mobile: "9443198765",
      district: "Tirunelveli",
      oppositeParty: "சண்முகநாதன் (நில உரிமையாளர்)",
      partyRelationship: "ஒப்பந்த வாங்குபவர் vs விற்பனையாளர்",
      courtOrForum: "முதன்மை சார் சார்பு நீதிமன்றம் (Principal Sub Court, Tirunelveli)",
      existingAdvocate: "No",
      existingCaseNumber: "",
      limitationRisk: "No",
      primaryDomain: "civil_contract",
      activeDomainPacks: ["civil_contract", "property_revenue_reg"]
    }
  }
];

