
import { Tier } from "../data/tierData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Import the rank icons correctly
import normalIcon from "../assets/ranks/normal.png";
import silverIcon from "../assets/ranks/silver.png"; 
import goldIcon from "../assets/ranks/gold.png";
import diamondIcon from "../assets/ranks/diamond.png";
import platinumIcon from "../assets/ranks/platinum.png";

interface TierCardProps {
  tier: Tier;
  isCurrentTier: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onUpgrade: () => void;
  canUpgrade: boolean;
  walletId: string;
  pointsToNextTier?: number;
  currentPoints: number; // Add this to access the user's current points
}

const getRankIcon = (tierId: string) => {
  switch (tierId) {
    case "general": return normalIcon;
    case "bronze": return silverIcon;
    case "silver": return goldIcon;
    case "gold": return diamondIcon;
    case "platinum": return platinumIcon;
    default: return normalIcon;
  }
};

const getProgressColors = (tierId: string, dark: boolean) => {
  if (dark) {
    switch (tierId) {
      case "general": return "from-[#8BC5E3] to-[#B6E3F7]";
      case "bronze": return "from-[#C5C5C5] to-[#EBEBEB]";
      case "silver": return "from-[#FFD700] to-[#FFF3B8]";
      case "gold": return "from-[#4FC3F7] to-[#81D4FA]";
      case "platinum": return "from-[#B388FF] to-[#E1BEE7]";
      default: return "from-[#8BC5E3] to-[#B6E3F7]";
    }
  }
  
  switch (tierId) {
    case "general": return "from-[#B6E3F7] to-[#E3F2FD]";
    case "bronze": return "from-[#EBEBEB] to-[#F5F5F5]";
    case "silver": return "from-[#FFF3B8] to-[#FFFDE7]";
    case "gold": return "from-[#81D4FA] to-[#E1F5FE]";
    case "platinum": return "from-[#E1BEE7] to-[#F3E5F5]";
    default: return "from-[#B6E3F7] to-[#E3F2FD]";
  }
};

const getCardMainBg = (tier: Tier, dark: boolean) => {
  if (dark) {
    switch (tier.id) {
      case "general": return "bg-gradient-to-br from-[#5B9AC7]/20 to-[#8BC5E3]/20";
      case "bronze": return "bg-gradient-to-br from-[#9E9E9E]/20 to-[#C5C5C5]/20";
      case "silver": return "bg-gradient-to-br from-[#FFD700]/20 to-[#FFF3B8]/20";
      case "gold": return "bg-gradient-to-br from-[#039BE5]/20 to-[#4FC3F7]/20";
      case "platinum": return "bg-gradient-to-br from-[#9575CD]/20 to-[#B388FF]/20";
      default: return "bg-gradient-to-br from-gray-800/20 to-gray-900/20";
    }
  }
  
  switch (tier.id) {
    case "general": return "bg-gradient-to-br from-[#8BC5E3] to-[#B6E3F7]";
    case "bronze": return "bg-gradient-to-br from-[#C5C5C5] to-[#EBEBEB]";
    case "silver": return "bg-gradient-to-br from-[#FFD700] to-[#FFF3B8]";
    case "gold": return "bg-gradient-to-br from-[#4FC3F7] to-[#81D4FA]";
    case "platinum": return "bg-gradient-to-br from-[#B388FF] to-[#E1BEE7]";
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
  currentPoints,
}: TierCardProps) => {
  const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
  const textColor = dark ? "text-white" : "text-gray-900";
  const progressColors = getProgressColors(tier.id, dark);
  
  // Calculate progress based on whether this is current tier or not
  const calculateProgress = () => {
    if (isCurrentTier && pointsToNextTier !== undefined) {
      // For current tier: Show progress towards next tier
      const nextTierPoints = tier.requiredPoints + pointsToNextTier;
      // Calculate percentage of progress from current tier to next tier
      return (currentPoints - tier.requiredPoints) / pointsToNextTier * 100;
    } else {
      // For other tiers: Show progress towards this tier
      // If current points are less than required, show relative progress
      if (currentPoints < tier.requiredPoints) {
        return (currentPoints / tier.requiredPoints) * 100;
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
      animate={{ opacity: 1, y: 0, scale: isCurrent ? 1.01 : 0.96 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      className={cn(
        "relative px-6 pt-8 pb-7 rounded-3xl shadow-xl border transition-all flex flex-col justify-between h-[280px] md:h-[300px] min-w-0 backdrop-blur-sm mx-auto",
        getCardMainBg(tier, dark),
        isCurrent ? "ring-2 ring-blue-300 dark:ring-blue-800 z-10" : "opacity-80",
      )}
      style={{
        maxWidth: "90%",
        boxShadow: isCurrent
          ? "0 12px 36px 0 rgba(33, 70, 184, 0.15), 0 1.5px 6px 0 rgba(57, 78, 120, 0.06)"
          : "0 4px 16px 0 rgba(60, 56, 72, 0.09)",
      }}
    >
      <div className="flex flex-col justify-between w-full h-full space-y-4">
        <div>
          {isCurrent && isCurrentTier && (
            <div className="mb-1 text-xs font-semibold text-blue-800 dark:text-blue-200">
              Current Tier
            </div>
          )}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className={cn(
                "text-2xl md:text-3xl font-extrabold drop-shadow-sm",
                textColor
              )}>{tier.name}</span>
              
              <div className={cn(
                "text-xs md:text-sm font-medium mb-2",
                textColor
              )}>
                Wallet ID <span className="ml-1 font-mono select-all text-xs tracking-tight">{walletId}</span>
              </div>
              
              <div className={cn("text-sm space-y-2", textColor)}>
                <div className="flex items-center justify-between">
                  <span>{tier.requiredPoints} points required</span>
                </div>
                <div className="relative w-full h-2 rounded-full overflow-hidden bg-gray-200/50 dark:bg-gray-700/50">
                  <div 
                    className={cn(
                      "absolute top-0 left-0 h-full bg-gradient-to-r transition-all",
                      progressColors
                    )}
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
                <div className="text-xs font-medium">
                  {getProgressText()}
                </div>
              </div>
            </div>
            
            <div className="ml-4"> 
              <img 
                src={getRankIcon(tier.id)} 
                alt={`${tier.name} rank`}
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
        
        <button
          className={cn(
            "w-full rounded-full px-5 py-2.5 font-semibold shadow transition",
            canUpgrade 
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed opacity-60"
          )}
          disabled={!canUpgrade}
          onClick={onUpgrade}
        >
          {canUpgrade ? "Upgrade Now" : "Not Available"}
        </button>
      </div>
    </motion.div>
  );
};

export default TierCard;
