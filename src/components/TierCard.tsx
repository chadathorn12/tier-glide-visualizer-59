
import { Tier } from "../data/tierData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import normalRank from "../assets/ranks/normal.png";
import silverRank from "../assets/ranks/silver.png";
import goldRank from "../assets/ranks/gold.png";
import diamondRank from "../assets/ranks/diamond.png";
import platinumRank from "../assets/ranks/platinum.png";

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

const getRankIcon = (tierId: string) => {
  switch (tierId) {
    case "general": return normalRank;
    case "bronze": return silverRank;
    case "silver": return goldRank;
    case "gold": return diamondRank;
    case "platinum": return platinumRank;
    default: return normalRank;
  }
};

const getCardMainBg = (tier: Tier, dark: boolean) => {
  if (dark) {
    switch (tier.id) {
      case "general": return "bg-gradient-to-br from-[#e3f0ff]/20 to-[#b4deff]/20";
      case "bronze": return "bg-gradient-to-br from-[#C0C0C0]/20 to-[#808080]/20";
      case "silver": return "bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20";
      case "gold": return "bg-gradient-to-br from-[#B9F2FF]/20 to-[#00BFFF]/20";
      case "platinum": return "bg-gradient-to-br from-[#E5DEFF]/20 to-[#9b87f5]/20";
      default: return "bg-gradient-to-br from-gray-800/20 to-gray-900/20";
    }
  }
  
  switch (tier.id) {
    case "general": return "bg-gradient-to-br from-[#F1F0FB] to-[#F8F8F8]";
    case "bronze": return "bg-gradient-to-br from-[#C0C0C0] to-[#A9A9A9]";
    case "silver": return "bg-gradient-to-br from-[#FFD700] to-[#FFA500]";
    case "gold": return "bg-gradient-to-br from-[#B9F2FF] to-[#00BFFF]";
    case "platinum": return "bg-gradient-to-br from-[#E5DEFF] to-[#9b87f5]";
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
  const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
  const textColor = dark ? "text-white" : "text-gray-900";
  const progressColor = dark ? "bg-blue-400" : "bg-blue-600";
  
  const calculateProgress = () => {
    if (!pointsToNextTier) return 0;
    const nextTierPoints = tier.requiredPoints + pointsToNextTier;
    const currentProgress = tier.requiredPoints;
    return (currentProgress / nextTierPoints) * 100;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: isCurrent ? 1.01 : 0.96 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      className={cn(
        "relative px-6 pt-7 pb-6 rounded-3xl shadow-xl border transition-all flex flex-col justify-between h-[280px] md:h-[300px] min-w-0 backdrop-blur-sm",
        getCardMainBg(tier, dark),
        isCurrent ? "ring-2 ring-blue-300 dark:ring-blue-800 z-10" : "opacity-80",
      )}
      style={{
        boxShadow: isCurrent
          ? "0 12px 36px 0 rgba(33, 70, 184, 0.15), 0 1.5px 6px 0 rgba(57, 78, 120, 0.06)"
          : "0 4px 16px 0 rgba(60, 56, 72, 0.09)",
      }}
    >
      <div className="flex flex-col justify-between w-full h-full">
        {/* Top section */}
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
                <div>{tier.requiredPoints} points required</div>
                {pointsToNextTier !== undefined && (
                  <>
                    <Progress value={calculateProgress()} className="h-2" />
                    <div className="text-xs font-medium">
                      {pointsToNextTier} points to next tier
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Rank Icon */}
            <div className="ml-4"> 
              <img 
                src={getRankIcon(tier.id)} 
                alt={`${tier.name} rank`}
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Upgrade button */}
        <button
          className={cn(
            "mt-4 w-full rounded-full px-5 py-2.5 font-semibold shadow transition",
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
