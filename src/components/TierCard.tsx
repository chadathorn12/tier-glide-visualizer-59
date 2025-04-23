
import { motion } from "framer-motion";
import { Tier } from "../data/tierData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, Star, Diamond, Medal } from "lucide-react";
import ShimmerBadge from "./ShimmerBadge";

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
  // Render appropriate icon based on tier.icon
  const renderIcon = () => {
    const iconProps = {
      size: 48,
      className: "text-white",
    };

    switch (tier.icon) {
      case "shield":
        return <Shield {...iconProps} />;
      case "shield-check":
        return <ShieldCheck {...iconProps} />;
      case "star":
        return <Star {...iconProps} />;
      case "diamond":
        return <Diamond {...iconProps} />;
      case "medal":
        return <Medal {...iconProps} />;
      default:
        return <Shield {...iconProps} />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: isCurrent ? 1 : 0.85,
        y: isCurrent ? 0 : 20
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }}
      className={cn(
        "relative rounded-3xl overflow-hidden w-full max-w-md mx-auto tier-shadow",
        isCurrent ? "z-10 premium-glass tier-shadow-hover" : "z-0"
      )}
      style={{ 
        background: isCurrent ? tier.colors.tertiary : "#E5E5E5",
      }}
    >
      {/* Ambient glow behind the card */}
      {isCurrent && (
        <div 
          className="absolute inset-0 -z-10 blur-3xl opacity-30 rounded-full" 
          style={{ backgroundColor: tier.colors.primary }}
        />
      )}

      <div className="p-8 flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            {isCurrentTier && (
              <ShimmerBadge 
                text="Current Tier" 
                color={tier.colors.primary}
                className="mb-2"
              />
            )}
            <h2 className="text-4xl font-bold" style={{ color: tier.colors.primary }}>
              {tier.name}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">Wallet ID {walletId}</p>
          </div>
          
          {/* Icon with animated floating effect */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div 
              className="rounded-full p-6 flex items-center justify-center shadow-lg"
              style={{ backgroundColor: tier.colors.secondary }}
            >
              <div 
                className="rounded-full p-4 flex items-center justify-center"
                style={{ backgroundColor: tier.colors.primary }}
              >
                {renderIcon()}
              </div>
            </div>
          </motion.div>
        </div>
        
        {isCurrentTier && pointsToNextTier !== undefined && (
          <motion.p 
            className="text-xl font-medium text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {pointsToNextTier} points to next tier
          </motion.p>
        )}

        {isLocked && !isCurrentTier && (
          <Badge 
            className="absolute top-6 left-6 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            Locked
          </Badge>
        )}
        
        <motion.div
          whileHover={{ scale: canUpgrade ? 1.03 : 1 }}
          whileTap={{ scale: canUpgrade ? 0.98 : 1 }}
        >
          <Button 
            className={cn(
              "w-full py-6 text-lg font-medium transition-all duration-300",
              canUpgrade ? "shadow-lg hover:shadow-xl" : "opacity-70"
            )}
            disabled={!canUpgrade}
            onClick={onUpgrade}
            style={{
              backgroundColor: tier.colors.primary,
              color: "white",
            }}
          >
            Upgrade Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TierCard;
