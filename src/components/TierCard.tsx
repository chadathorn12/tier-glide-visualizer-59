
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

const getCardMainBg = (tier: Tier, dark: boolean) => {
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

const getTextColor = (tier: Tier, dark: boolean, isLocked: boolean) => {
  // For locked tiers
  if (isLocked) {
    return dark ? "text-gray-500" : "text-gray-400";
  }
  
  // For unlocked tiers
  if (dark) {
    switch (tier.id) {
      case "general": return "text-blue-300";
      case "bronze": return "text-amber-300";
      case "silver": return "text-slate-300";
      case "gold": return "text-yellow-300";
      case "platinum": return "text-slate-200";
      default: return "text-white";
    }
  }

  switch (tier.id) {
    case "general": return "text-blue-900";
    case "bronze": return "text-amber-900";
    case "silver": return "text-slate-800";
    case "gold": return "text-yellow-900";
    case "platinum": return "text-slate-800";
    default: return "text-gray-800";
  }
};

const getIconColor = (tier: Tier, dark: boolean, isLocked: boolean) => {
  if (isLocked) {
    return "text-gray-400";
  }
  
  if (dark) {
    switch (tier.id) {
      case "general": return "text-blue-300";
      case "bronze": return "text-amber-300";
      case "silver": return "text-slate-200";
      case "gold": return "text-yellow-300";
      case "platinum": return "text-white";
      default: return "text-blue-300";
    }
  }

  switch (tier.id) {
    case "general": return "text-blue-600";
    case "bronze": return "text-amber-600";
    case "silver": return "text-slate-600";
    case "gold": return "text-yellow-600";
    case "platinum": return "text-slate-700";
    default: return "text-blue-600";
  }
};

const getButtonColor = (tier: Tier, dark: boolean, canUpgrade: boolean) => {
  if (!canUpgrade) {
    return dark ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-gray-600";
  }
  
  if (dark) {
    switch (tier.id) {
      case "general": return "bg-blue-600 hover:bg-blue-700 text-white";
      case "bronze": return "bg-amber-600 hover:bg-amber-700 text-white";
      case "silver": return "bg-indigo-600 hover:bg-indigo-700 text-white";
      case "gold": return "bg-yellow-600 hover:bg-yellow-700 text-black";
      case "platinum": return "bg-slate-600 hover:bg-slate-700 text-white";
      default: return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  }

  switch (tier.id) {
    case "general": return "bg-blue-500 hover:bg-blue-600 text-white";
    case "bronze": return "bg-amber-500 hover:bg-amber-600 text-white";
    case "silver": return "bg-indigo-500 hover:bg-indigo-600 text-white";
    case "gold": return "bg-yellow-500 hover:bg-yellow-600 text-black";
    case "platinum": return "bg-slate-500 hover:bg-slate-600 text-white";
    default: return "bg-blue-500 hover:bg-blue-600 text-white";
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
  const textColor = getTextColor(tier, dark, isLocked && !isCurrentTier);
  const iconColor = getIconColor(tier, dark, isLocked && !isCurrentTier);
  const buttonColor = getButtonColor(tier, dark, canUpgrade);
  
  // Large elegant card shadow and premium gradient, rounded corners
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: isCurrent ? 1.01 : 0.96 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      className={cn(
        "relative px-6 pt-7 pb-6 rounded-3xl shadow-xl border transition-all flex flex-col justify-between h-[230px] md:h-[240px] min-w-0",
        getCardMainBg(tier, dark),
        isCurrent ? "ring-2 ring-blue-300 dark:ring-blue-800 z-10" : "opacity-80",
        isLocked && !isCurrentTier ? "grayscale-[0.5] blur-[0.3px] pointer-events-none" : ""
      )}
      style={{
        boxShadow: isCurrent
          ? "0 12px 36px 0 rgba(33, 70, 184, 0.15), 0 1.5px 6px 0 rgba(57, 78, 120, 0.06)"
          : "0 4px 16px 0 rgba(60, 56, 72, 0.09)",
      }}
    >
      <div className="flex flex-col justify-between w-full h-full">
        {/* Top section with current tier indicator */}
        <div>
          {isCurrent && isCurrentTier && (
            <div className="mb-1 text-xs font-semibold text-blue-800 dark:text-blue-200">Current Tier</div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <span className={cn(
                "text-2xl md:text-3xl font-extrabold drop-shadow-sm",
                textColor
              )}>{tier.name}</span>
              
              <div className={cn(
                "text-xs md:text-sm font-[500] mb-2",
                textColor
              )}>
                Wallet ID <span className="ml-1 font-mono select-all text-xs tracking-tight">{walletId}</span>
              </div>
              
              {/* Points to next */}
              {isCurrent && pointsToNextTier !== undefined && pointsToNextTier > 0 && (
                <div className={cn(
                  "text-base font-medium mb-2",
                  textColor
                )}>
                  {pointsToNextTier} points to next tier
                </div>
              )}
              
              {/* Required points */}
              {!isCurrent && (
                <div className={cn(
                  "text-xs md:text-sm",
                  textColor
                )}>
                  {tier.requiredPoints} points required
                </div>
              )}
            </div>
            
            {/* Icon */}
            <div className="mt-1"> 
              <div className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-2 border-white/30 dark:border-blue-900/40 bg-white/40 dark:bg-slate-900/60">
                <Icon size={38} className={cn("drop-shadow", iconColor)} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Upgrade button */}
        <div>
          <button
            className={cn(
              "mt-1 rounded-full px-5 py-2 font-semibold shadow transition",
              buttonColor,
              !canUpgrade && "cursor-not-allowed opacity-60"
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
