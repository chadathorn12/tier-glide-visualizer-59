
import { Tier } from "../data/tierData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

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
      case "general": return "from-[#5BA3D0] to-[#9CCEF4]";
      case "bronze": return "from-[#C0C0C0] to-[#E6E8E6]";
      case "silver": return "from-[#FFD700] to-[#FFEB99]";
      case "gold": return "from-[#00BFFF] to-[#87CEEB]";
      case "platinum": return "from-[#9b87f5] to-[#B8A9F8]";
      default: return "from-[#5BA3D0] to-[#9CCEF4]";
    }
  }
  
  switch (tierId) {
    case "general": return "from-[#5BA3D0] to-[#9CCEF4]";
    case "bronze": return "from-[#C0C0C0] to-[#E6E8E6]";
    case "silver": return "from-[#FFD700] to-[#FFEB99]";
    case "gold": return "from-[#00BFFF] to-[#87CEEB]";
    case "platinum": return "from-[#9b87f5] to-[#B8A9F8]";
    default: return "from-[#5BA3D0] to-[#9CCEF4]";
  }
};

const getCardMainBg = (tier: Tier, dark: boolean) => {
  if (dark) {
    switch (tier.id) {
      case "general": return "bg-gradient-to-br from-[#8BCDFF]/20 to-[#D3E4FD]/20";
      case "bronze": return "bg-gradient-to-br from-[#E6E8E6]/20 to-[#C0C0C0]/20";
      case "silver": return "bg-gradient-to-br from-[#FFE55C]/20 to-[#FFD700]/20";
      case "gold": return "bg-gradient-to-br from-[#5FD4FF]/20 to-[#00BFFF]/20";
      case "platinum": return "bg-gradient-to-br from-[#BE9BFF]/20 to-[#9b87f5]/20";
      default: return "bg-gradient-to-br from-gray-800/20 to-gray-900/20";
    }
  }
  
  switch (tier.id) {
    case "general": return "bg-gradient-to-br from-[#8BCDFF] to-[#D3E4FD]";
    case "bronze": return "bg-gradient-to-br from-[#E6E8E6] to-[#C0C0C0]";
    case "silver": return "bg-gradient-to-br from-[#FFE55C] to-[#FFD700]";
    case "gold": return "bg-gradient-to-br from-[#5FD4FF] to-[#00BFFF]";
    case "platinum": return "bg-gradient-to-br from-[#BE9BFF] to-[#9b87f5]";
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
  const progressColors = getProgressColors(tier.id, dark);
  
  const calculateProgress = () => {
    if (pointsToNextTier === undefined) return 0;
    
    const nextTierPoints = tier.requiredPoints + pointsToNextTier;
    const currentUserPoints = nextTierPoints - pointsToNextTier;
    const progressPercentage = ((currentUserPoints - tier.requiredPoints) / 
                              (nextTierPoints - tier.requiredPoints)) * 100;
                              
    // Ensure progress is between 0 and 100
    return Math.max(0, Math.min(100, progressPercentage));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: isCurrent ? 1.01 : 0.96 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      className={cn(
        "relative px-6 pt-8 pb-7 rounded-3xl shadow-xl border transition-all flex flex-col justify-between h-[340px] md:h-[360px] min-w-0 backdrop-blur-sm mx-auto",
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
                <div className="flex items-center justify-between">
                  <span>{tier.requiredPoints} points required</span>
                </div>
                {pointsToNextTier !== undefined && (
                  <>
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
