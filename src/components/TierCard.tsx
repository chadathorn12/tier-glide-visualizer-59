
import { Tier } from "../data/tierData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Shield, ShieldCheck, Star, Diamond, Medal } from "lucide-react";

interface TierCardProps {
  tier: Tier;
  isCurrentTier: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onUpgrade: () => void;
  canUpgrade: boolean;
  walletId: string;
  pointsToNextTier?: number;
}

const icons = {
  shield: Shield,
  "shield-check": ShieldCheck,
  star: Star,
  diamond: Diamond,
  medal: Medal,
};

const getCardMainBg = (tier: Tier, isCurrent: boolean, dark: boolean) => {
  if (dark) {
    switch (tier.id) {
      case "general": return "bg-gradient-to-br from-[#223b54] to-[#2b405b]";
      case "bronze": return "bg-gradient-to-br from-[#67492c] to-[#47331e]";
      case "silver": return "bg-gradient-to-br from-[#565775] to-[#a5a5ad]";
      case "gold": return "bg-gradient-to-br from-[#ad9502] to-[#f6d159]";
      case "platinum": return "bg-gradient-to-br from-[#a4a5ac] to-[#e5e6ef]";
      default: return "bg-gradient-to-br from-gray-800 to-gray-900";
    }
  }
  switch (tier.id) {
    case "general": return "bg-gradient-to-br from-[#e3f0ff] to-[#b4deff]";
    case "bronze": return "bg-gradient-to-br from-[#ffe2c1] to-[#e7b892]";
    case "silver": return "bg-gradient-to-br from-[#d7dbe7] to-[#b2b0bc]";
    case "gold": return "bg-gradient-to-br from-[#fff4c6] to-[#ffeab2]";
    case "platinum": return "bg-gradient-to-br from-[#f5faff] to-[#dbe2ee]";
    default: return "bg-gradient-to-br from-white to-gray-100";
  }
};

const TierCard = ({
  tier,
  isCurrentTier,
  isCurrent,
  isLocked,
  onUpgrade,
  canUpgrade,
  walletId,
  pointsToNextTier,
}: TierCardProps) => {
  // Detect dark mode
  const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");

  const Icon = icons[tier.icon] || Shield;
  // Large elegant card shadow and premium gradient, rounded corners
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: isCurrent ? 1.04 : 0.96 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      className={cn(
        "relative px-6 pt-7 pb-6 rounded-3xl shadow-xl border transition-all flex flex-col justify-between h-[240px] md:h-[270px] min-w-0",
        getCardMainBg(tier, isCurrent, dark),
        isCurrent ? "ring-2 ring-blue-300 dark:ring-blue-800 z-10" : " opacity-80",
        isLocked && !isCurrentTier ? "grayscale-[0.7] blur-[0.5px] pointer-events-none" : ""
      )}
      style={{
        boxShadow: isCurrent
          ? "0 12px 36px 0 rgba(33, 70, 184, 0.15), 0 1.5px 6px 0 rgba(57, 78, 120, 0.06)"
          : "0 4px 16px 0 rgba(60, 56, 72, 0.09)",
      }}
    >
      <div className="flex gap-4 items-start w-full h-full">
        {/* Left: main info */}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            {isCurrent && (
              <div className="mb-1 text-xs font-semibold text-blue-800 dark:text-blue-200">Current Tier</div>
            )}
            <div className="flex items-center mb-1">
              <span className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm">{tier.name}</span>
            </div>
            <div className="text-[13px] md:text-base text-gray-900/70 dark:text-blue-100 font-[500] mb-2">
              Wallet ID <span className="ml-1 font-mono select-all text-xs tracking-tight">{walletId}</span>
            </div>
            {/* Points to next */}
            {isCurrent && pointsToNextTier !== undefined && (
              <div className="text-base font-medium text-blue-900 dark:text-blue-200 mb-2">
                {pointsToNextTier} points to next tier
              </div>
            )}
            {/* Required points */}
            {!isCurrent && (
              <div className="text-xs md:text-sm text-gray-700/70 dark:text-blue-100/80">
                {tier.requiredPoints} points required
              </div>
            )}
          </div>
          <div>
            {/* Upgrade button */}
            <button
              className={cn(
                "mt-1 rounded-full px-5 py-2 font-semibold shadow text-white",
                canUpgrade
                  ? "bg-blue-500 hover:bg-blue-700 hover:shadow-lg transition"
                  : "bg-blue-200 dark:bg-blue-900 cursor-not-allowed opacity-60"
              )}
              disabled={!canUpgrade}
              onClick={onUpgrade}
              style={{
                fontSize: 16,
              }}
            >
              Upgrade Now
            </button>
          </div>
        </div>
        {/* Right: Icon */}
        <motion.div 
          className="w-16 h-16 flex items-center justify-center ml-1"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-2 border-white/30 dark:border-blue-900 bg-white/40 dark:bg-slate-900/60">
            <Icon size={42} className={cn("text-blue-400 dark:text-blue-200 drop-shadow")} />
          </div>
        </motion.div>
      </div>
      {/* Locked overlay */}
      {isLocked && !isCurrentTier && (
        <div className="absolute inset-0 rounded-3xl flex items-center justify-center bg-white/70 dark:bg-slate-900/80 z-10">
          <span className="font-bold text-lg text-gray-500 dark:text-gray-200">Locked</span>
        </div>
      )}
    </motion.div>
  );
};

export default TierCard;
