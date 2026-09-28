import React, { useState, useEffect } from "react";
import { 
  X, Check, Zap, Crown, Shield, Award, Sparkles, ArrowRight, Briefcase, 
  CreditCard, QrCode, Building2, CheckCircle2, Lock, ArrowLeft, Copy, Clock,
  Receipt, Download, Smartphone, AlertCircle, AlertTriangle, ShieldCheck
} from "lucide-react";
import { UnikornLogo } from "./UnikornLogo";
import { useLanguage } from "../lib/languageContext";
import { startRazorpayCheckout, PaymentVerificationResult } from "../lib/razorpay";

import { PlanType } from "../types";
import { PLAN_CONFIGS, ALL_PLANS, getPlanConfig, PlanDetails } from "../data/pricingMaster";
export { PLAN_CONFIGS };
export type { PlanType, PlanDetails };

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: PlanType;
  currentCaseCount: number;
  onSelectPlan: (plan: PlanType) => void;
  isLimitReachedNotice?: boolean;
  userEmail?: string;
  userName?: string;
  userId?: string;
}

export function PricingModal({
  isOpen,
  onClose,
  currentPlan,
  currentCaseCount,
  onSelectPlan,
  isLimitReachedNotice = false,
  userEmail,
  userName,
  userId
}: PricingModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<"select" | "checkout" | "success">("select");

  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanType>("pro");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatusText, setProcessStatusText] = useState("");
  const [lastTxnId, setLastTxnId] = useState("");
  const [gatewayConfig, setGatewayConfig] = useState<{ isConfigured: boolean; isTestMode: boolean } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/payments/config")
        .then((res) => res.json())
        .then((data) => setGatewayConfig(data))
        .catch(() => setGatewayConfig({ isConfigured: false, isTestMode: true }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const targetPlan = PLAN_CONFIGS[selectedPlanKey];
  const basePrice = targetPlan.priceAmount;
  const gstAmount = Math.round(basePrice * 0.18);
  const totalPrice = basePrice + gstAmount;

  const handleStartCheckout = (planKey: PlanType) => {
    if (planKey === "free") {
      onSelectPlan("free");
      onClose();
      return;
    }
    setSelectedPlanKey(planKey);
    setPaymentError(null);
    setStep("checkout");
  };

  const handleExecuteRazorpay = async () => {
    setPaymentError(null);
    setIsProcessing(true);
    setProcessStatusText("Razorpay கட்டண வாயிலுடன் பாதுகாப்பாக இணைக்கப்படுகிறது...");

    await startRazorpayCheckout({
      planId: selectedPlanKey,
      userId: userId || "guest",
      userEmail: userEmail || "",
      userName: userName || "Legal360 Client",
      onSuccess: (result: PaymentVerificationResult) => {
        setIsProcessing(false);
        setLastTxnId(result.paymentId || result.orderId);
        onSelectPlan(selectedPlanKey);
        setStep("success");
      },
      onError: (err: string) => {
        setIsProcessing(false);
        setPaymentError(err || "கட்டணம் செலுத்த முடியவில்லை அல்லது ரத்து செய்யப்பட்டது.");
      },
      onDismiss: () => {
        setIsProcessing(false);
      }
    });
  };

  const handleFinalizeUpgrade = () => {
    setStep("select");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans selection:bg-amber-100 selection:text-stone-900 antialiased">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6 text-stone-900">
        
        {/* STEP 1: PLAN SELECTION GRID */}
        {step === "select" && (
          <div>
            {/* Top Navigation Bar - Back to Home / Dashboard */}
            <div className="bg-[#FAF9F6] px-4 sm:px-6 py-3 border-b border-stone-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-800 rounded-lg text-xs font-bold transition cursor-pointer border border-stone-300 shadow-2xs"
              >
                <ArrowLeft className="h-4 w-4 text-stone-700" />
                <span>{t("முகப்புப் பக்கத்திற்குத் திரும்பு", "Back to Home")}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold transition cursor-pointer border border-stone-300"
              >
                <X className="h-4 w-4" />
                <span>{t("மூடு", "Close")}</span>
              </button>
            </div>

            {/* Banner Header */}
            <div className="bg-white p-6 md:p-8 text-stone-900 relative border-b border-stone-200">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <UnikornLogo size="sm" showText={true} />
                  {isLimitReachedNotice && (
                    <span className="px-2.5 py-0.5 bg-rose-50 text-rose-800 border border-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                      2 வழக்குகள் வரம்பு எட்டப்பட்டது (Limit Reached)
                    </span>
                  )}
                </div>

                <h2 className="text-xl md:text-2xl font-black text-stone-950 leading-snug">
                  {t("உங்கள் தேவைக்கேற்ற சட்டப் பகுப்பாய்வு திட்டத்தைத் தேர்வு செய்யுங்கள்", "Select Your Legal Intelligence Case Plan")}
                </h2>
                <p className="text-xs md:text-sm text-stone-600 font-medium mt-1">
                  {t(
                    "18 சட்டக் களங்கள், முழுமையான AI தணிக்கை மற்றும் இருமொழி சட்ட மனு வரைவுகள்.",
                    "18 integrated legal domains, complete AI statutory auditing, precedents and bilingual draft synthesis."
                  )}
                </p>

                {isLimitReachedNotice && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-700 shrink-0" />
                    <span>
                      {t(
                        "இலவசத் திட்டத்தில் அதிகபட்சமாக 2 வழக்குகள் மட்டுமே அனுமதி. கூடுதல் வழக்குகளைப் பகுப்பாய்வு செய்ய திட்டத்தை உயர்த்தவும்!",
                        "Free tier is limited to 2 cases. Upgrade your plan to analyze additional cases seamlessly!"
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Current Status Bar */}
            <div className="bg-[#FAF9F6] border-b border-stone-200 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs font-medium text-stone-700 gap-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-stone-600" />
                <span>
                  {t("தற்போதைய பயன்பாடு:", "Usage:")} <strong className="text-stone-900 font-black font-mono">{currentCaseCount} {t("வழக்குகள்", "Cases")}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-800 font-bold">
                <span>{t("செயலில் உள்ள திட்டம்:", "Current Plan:")}</span>
                <span className="px-2 py-0.5 bg-stone-200 text-stone-900 text-[10px] font-mono font-bold uppercase rounded border border-stone-300">
                  {PLAN_CONFIGS[currentPlan].nameTamil}
                </span>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="p-6 md:p-8 bg-[#FAF9F6] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ALL_PLANS.map((plan) => {
                const planKey = plan.id;
                const isCurrent = currentPlan === planKey;

                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-xl border transition-all duration-150 flex flex-col justify-between overflow-hidden relative shadow-2xs ${
                      plan.popular
                        ? "border-2 border-purple-900 ring-1 ring-purple-900/20"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {plan.popular && (
                      <div className="bg-purple-900 text-stone-50 text-[10px] font-mono font-bold uppercase tracking-widest text-center py-1">
                        ★ MOST POPULAR ★
                      </div>
                    )}

                    <div className="p-5 space-y-4 flex-1">
                      {/* Card Title & Price */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-stone-950 text-base">{plan.nameTamil}</h3>
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                            {plan.badge}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-stone-500">{plan.nameEnglish}</p>

                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="text-2xl font-black text-stone-950">{plan.priceTamil}</span>
                          <span className="text-[11px] font-bold text-stone-500">{plan.periodTamil}</span>
                        </div>

                        <div className="mt-2 inline-block px-2 py-0.5 bg-stone-100 border border-stone-300 rounded text-[11px] font-mono font-bold text-stone-800">
                          {plan.caseLimitText}
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 font-normal leading-relaxed border-t border-stone-200 pt-3">
                        {plan.description}
                      </p>

                      {/* Feature Checklist */}
                      <div className="space-y-2 pt-2 border-t border-stone-200">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">அம்சங்கள் (Features):</p>
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-medium text-stone-800">
                            <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Action Button */}
                    <div className="p-4 bg-[#FAF9F6] border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => handleStartCheckout(planKey)}
                        disabled={isCurrent}
                        className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer border ${
                          isCurrent
                            ? "bg-stone-100 text-stone-400 border-stone-200 cursor-default"
                            : plan.popular
                              ? "bg-purple-900 hover:bg-purple-800 text-stone-50 border-purple-900 shadow-2xs"
                              : "bg-stone-900 hover:bg-stone-800 text-stone-50 border-stone-900"
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-600" />
                            <span>தற்போது செயலில் உள்ளது</span>
                          </>
                        ) : (
                          <>
                            <span>{plan.ctaTamil}</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Guarantee Note */}
            <div className="bg-white border-t border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>Unikorn360 Legal Intelligence • 256-bit SSL Verified Razorpay Gateway with UPI & Cards.</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 border border-stone-300 cursor-pointer shrink-0"
              >
                <ArrowLeft className="h-4 w-4 text-stone-700" />
                <span>{t("முகப்புக்குத் திரும்பு", "Return to Home")}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT CHECKOUT GATEWAY */}
        {step === "checkout" && (
          <div className="p-6 md:p-8 space-y-6">
            {/* Top Navigation & Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-200 pb-4 gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep("select")}
                  disabled={isProcessing}
                  className="flex items-center gap-2 text-xs font-bold text-stone-800 bg-white hover:bg-stone-100 px-3 py-1.5 rounded-lg transition cursor-pointer border border-stone-300"
                >
                  <ArrowLeft className="h-4 w-4 text-stone-700" />
                  <span>{t("திட்டங்கள் தேர்வுக்குத் திரும்பு", "Back to Plans")}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition cursor-pointer border border-stone-300"
                >
                  <X className="h-4 w-4" />
                  <span>{t("மூடு", "Close")}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                <Lock className="h-4 w-4 text-emerald-700" />
                <span>Razorpay Secured (UPI / Cards / NetBanking)</span>
              </div>
            </div>

            {/* Checkout Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Order Summary */}
              <div className="lg:col-span-5 space-y-4 bg-[#FAF9F6] border border-stone-200 p-5 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider">தேர்ந்தெடுக்கப்பட்ட திட்டம்</span>
                  <span className="px-2 py-0.5 bg-stone-200 text-stone-900 text-[10px] font-mono font-bold uppercase rounded border border-stone-300">
                    {targetPlan.badge}
                  </span>
                </div>

                <div className="border-b border-stone-200 pb-4">
                  <h3 className="text-xl font-black text-stone-950">{targetPlan.nameTamil}</h3>
                  <p className="text-xs text-stone-600 mt-1 font-normal">{targetPlan.description}</p>
                </div>

                <div className="space-y-2 text-xs font-medium text-stone-700 border-b border-stone-200 pb-4">
                  <div className="flex justify-between">
                    <span>அடிப்படை கட்டணம் (Base Price):</span>
                    <span className="font-mono text-stone-950 font-bold">₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>ஜி.எஸ்.டி (18% GST):</span>
                    <span className="font-mono">₹{gstAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-stone-950 pt-2 border-t border-stone-200">
                    <span>மொத்த கட்டணம் (Total Payable):</span>
                    <span className="font-mono text-lg text-purple-900">₹{totalPrice}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-mono font-bold uppercase text-stone-500">திட்டத்தின் சிறப்பம்சங்கள்:</p>
                  {targetPlan.features.slice(0, 4).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Razorpay Checkout Panel */}
              <div className="lg:col-span-7 space-y-5">
                
                <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-black text-xs">
                        R
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-stone-900">Razorpay Payment Gateway</h4>
                        <p className="text-[11px] text-stone-500">Official Payment Partner</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded text-[10px] font-mono font-bold">
                      Instant Activation
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-stone-700">
                    <p className="font-medium">
                      {t(
                        "கீழே உள்ள பட்டனை கிளிக் செய்தவுடன் அதிகாரப்பூர்வ Razorpay கட்டண சாளரம் திறக்கும். அதில் பின்வரும் அனைத்து முறைகளிலும் கட்டணம் செலுத்தலாம்:",
                        "Click below to open the official Razorpay Checkout popup supporting all standard payment methods:"
                      )}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-stone-200 flex items-center gap-2">
                        <QrCode className="h-4 w-4 text-purple-900 shrink-0" />
                        <span className="font-bold text-[11px]">UPI (GPay / PhonePe / Paytm)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-stone-200 flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-amber-800 shrink-0" />
                        <span className="font-bold text-[11px]">Credit & Debit Cards (Visa/MC/RuPay)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-stone-200 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-emerald-800 shrink-0" />
                        <span className="font-bold text-[11px]">Net Banking (All Indian Banks)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-stone-200 flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-stone-800 shrink-0" />
                        <span className="font-bold text-[11px]">Wallets & UPI AutoPay</span>
                      </div>
                    </div>
                  </div>

                  {gatewayConfig?.isTestMode && (
                    <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-800 shrink-0" />
                      <span>Sandbox / Test Mode is active. Payments will be simulated and verified instantly.</span>
                    </div>
                  )}
                </div>

                {/* ERROR ALERT DISPLAY */}
                {paymentError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-rose-700 shrink-0 mt-0.5" />
                    <span className="leading-snug">{paymentError}</span>
                  </div>
                )}

                {/* Execute Payment Button */}
                <button
                  type="button"
                  onClick={handleExecuteRazorpay}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-50 font-bold text-sm uppercase tracking-wider shadow-sm transition duration-150 cursor-pointer flex items-center justify-center gap-3 border border-stone-950 active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{processStatusText}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>₹{totalPrice} {t("கட்டணம் செலுத்து (Pay with Razorpay)", "Pay with Razorpay")}</span>
                    </>
                  )}
                </button>

                {/* Cancel & Return Button */}
                {!isProcessing && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>{t("ரத்து செய்து முகப்புக்குத் திரும்பு", "Cancel & Return to Home")}</span>
                  </button>
                )}

              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESSFUL PAYMENT RECEIPT & UPGRADE CONFIRMATION */}
        {step === "success" && (
          <div className="p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-600 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-md text-xs font-mono font-bold uppercase">
                Payment Captured & Verified
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 mt-3">
                {t("கட்டணம் வெற்றிகரமாகச் செலுத்தப்பட்டது! 🎉", "Payment Successful & Plan Upgraded! 🎉")}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1 max-w-md mx-auto">
                {t(
                  `உங்கள் Unikorn360 AI கணக்கு உடனடியாக ${targetPlan.nameTamil}க்கு உயர்த்தப்பட்டது.`,
                  `Your Unikorn360 account has been instantly upgraded to ${targetPlan.nameEnglish}.`
                )}
              </p>
            </div>

            {/* Receipt Box */}
            <div className="max-w-md mx-auto bg-[#FAF9F6] border border-stone-200 rounded-xl p-5 text-left space-y-3 font-mono text-xs text-stone-800">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2 text-[11px]">
                <span className="font-bold text-stone-600 uppercase">TXN REF: {lastTxnId}</span>
                <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">PAID</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">திட்டம்:</span>
                <span className="font-bold text-stone-900">{targetPlan.nameTamil}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">செலுத்தப்பட்ட தொகை:</span>
                <span className="font-bold text-purple-900">₹{totalPrice} (Incl. 18% GST)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">தேதி & நேரம்:</span>
                <span className="text-stone-700">{new Date().toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleFinalizeUpgrade}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-50 font-bold text-sm uppercase tracking-wider transition cursor-pointer inline-flex items-center justify-center gap-2 border border-stone-950"
              >
                <span>{t("முகப்புப் பக்கத்திற்குச் செல்", "Go to Dashboard / Workspace")}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
