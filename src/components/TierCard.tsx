
import { Tier } from "../data/tierData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface TierCardProps {
  tier: Tier;
  isCurrentTier: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onUpgrade: () => void;
  canUpgrade: boolean;
  walletId: string;
  pointsToNextTier?: number;
  currentPoints: number;
}

const getCardGradient = (tierId: string, isCurrent: boolean, dark: boolean) => {
  if (dark) {
    switch (tierId) {
      case "general": return isCurrent ? "bg-gradient-to-br from-blue-600 to-blue-800" : "bg-gradient-to-br from-blue-500/70 to-blue-700/70";
      case "bronze": return isCurrent ? "bg-gradient-to-br from-amber-600 to-amber-800" : "bg-gradient-to-br from-amber-500/70 to-amber-700/70";
      case "silver": return isCurrent ? "bg-gradient-to-br from-gray-500 to-gray-700" : "bg-gradient-to-br from-gray-400/70 to-gray-600/70";
      case "gold": return isCurrent ? "bg-gradient-to-br from-yellow-500 to-amber-700" : "bg-gradient-to-br from-yellow-400/70 to-amber-600/70";
      case "platinum": return isCurrent ? "bg-gradient-to-br from-purple-500 to-violet-700" : "bg-gradient-to-br from-purple-400/70 to-violet-600/70";
      default: return isCurrent ? "bg-gradient-to-br from-blue-600 to-blue-800" : "bg-gradient-to-br from-blue-500/70 to-blue-700/70";
    }
  }

  switch (tierId) {
    case "general": return isCurrent ? "bg-gradient-to-br from-blue-400 to-blue-600" : "bg-gradient-to-br from-blue-300/90 to-blue-500/90";
    case "bronze": return isCurrent ? "bg-gradient-to-br from-amber-400 to-amber-600" : "bg-gradient-to-br from-amber-300/90 to-amber-500/90";
    case "silver": return isCurrent ? "bg-gradient-to-br from-gray-400 to-gray-600" : "bg-gradient-to-br from-gray-300/90 to-gray-500/90";
    case "gold": return isCurrent ? "bg-gradient-to-br from-yellow-400 to-amber-600" : "bg-gradient-to-br from-yellow-300/90 to-amber-500/90";
    case "platinum": return isCurrent ? "bg-gradient-to-br from-purple-400 to-violet-600" : "bg-gradient-to-br from-purple-300/90 to-violet-500/90";
    default: return isCurrent ? "bg-gradient-to-br from-blue-400 to-blue-600" : "bg-gradient-to-br from-blue-300/90 to-blue-500/90";
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
  currentPoints,
}: TierCardProps) => {
  const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
  
  // Calculate progress based on whether this is current tier or not
  const calculateProgress = () => {
    if (isCurrentTier && pointsToNextTier !== undefined) {
      // For current tier: Show progress towards next tier
      const nextTierPoints = pointsToNextTier;
      // Calculate percentage of progress from current tier to next tier
      return Math.max(0, Math.min(100, ((currentPoints - tier.requiredPoints) / nextTierPoints) * 100));
    } else {
      // For other tiers: Show progress towards this tier
      // If current points are less than required, show relative progress
      if (currentPoints < tier.requiredPoints) {
        return Math.max(0, Math.min(100, (currentPoints / tier.requiredPoints) * 100));
      }
      // If user has already reached this tier's requirements, show 100%
      return 100;
    }
  };

  // Get the display text for the progress
  const getProgressText = () => {
    if (isCurrentTier && pointsToNextTier !== undefined) {
      // For current tier, show points needed for next tier
      return `${pointsToNextTier} points to next tier`;
    } else {
      // For other tiers, show current points vs required points
      return `${Math.min(currentPoints, tier.requiredPoints)}/${tier.requiredPoints} points`;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: isCurrent ? 1 : 0.9 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      className={cn(
        "relative px-5 pt-6 pb-5 rounded-xl border transition-all flex flex-col justify-between h-[200px] min-w-0 backdrop-blur-sm",
        getCardGradient(tier.id, isCurrent, dark),
        isCurrent ? "ring-2 ring-white/50 border-white/30 shadow-lg z-10" : "opacity-80 border-white/10",
      )}
      style={{
        maxWidth: "90%",
        boxShadow: isCurrent
          ? "0 8px 24px rgba(0,0,0,0.15)"
          : "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex flex-col justify-between w-full h-full text-white">
        <div>
          {isLocked && (
            <div className="absolute right-4 top-4">
              <Lock size={16} className="text-white/70" />
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
          <div className="text-xs text-white/80 mb-5">
            {tier.requiredPoints} Points Required
          </div>
          
          <div className="space-y-2">
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/80"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <div className="text-xs font-medium text-white/80">
              {getProgressText()}
            </div>
          </div>
        </div>
        
        <button
          className={cn(
            "w-full rounded-full px-4 py-2 mt-3 font-medium text-sm transition-all",
            canUpgrade 
              ? "bg-white text-purple-700 hover:bg-white/90"
              : "bg-white/20 text-white/60 cursor-not-allowed"
          )}
          disabled={!canUpgrade}
          onClick={onUpgrade}
        >
          {canUpgrade ? "Upgrade" : "Not Available"}
        </button>
      </div>
    </motion.div>
  );
};

export default TierCard;
