import { useEffect, useState } from "react";
import { Tier, userData, tiers, findTierById, getNextTier, canUpgradeToTier } from "../data/tierData";
import PremiumTierCarousel from "./PremiumTierCarousel";
import PrivilegesList from "./PrivilegesList";
import DailyCheckin from "./DailyCheckin";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const MembershipTier = () => {
  const { toast } = useToast();
  const [selectedTierId, setSelectedTierId] = useState(userData.currentTier);
  const [selectedTier, setSelectedTier] = useState<Tier | undefined>(
    findTierById(userData.currentTier)
  );

  const nextTier = getNextTier(userData.currentTier);
  const pointsToNextTier = nextTier
    ? Math.max(0, nextTier.requiredPoints - userData.currentPoints)
    : 0;

  useEffect(() => {
    setSelectedTier(findTierById(selectedTierId));
  }, [selectedTierId]);

  const handleUpgrade = (tierId: string) => {
    const targetTier = findTierById(tierId);
    if (!targetTier) return;

    const canUpgrade = canUpgradeToTier(
      userData.currentPoints,
      userData.currentTier,
      tierId
    );

    if (canUpgrade) {
      toast({
        title: "Tier Upgraded!",
        description: `You have been upgraded to ${targetTier.name} tier.`,
        duration: 5000,
      });
      console.log(`Upgraded to ${tierId}`);
    } else {
      toast({
        title: "Cannot Upgrade",
        description: "You don't have enough points to upgrade to this tier.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleTierChange = (tierId: string) => {
    setSelectedTierId(tierId);
  };

  if (!selectedTier) return null;

  const isCurrentTierSelected = selectedTierId === userData.currentTier;
  const isLocked = userData.currentPoints < selectedTier.requiredPoints;

  const getBackgroundGradient = () => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (selectedTier.id) {
        case "general": return "bg-gradient-to-b from-[#D3E4FD]/20 via-gray-950 to-[#1e293b]";
        case "bronze": return "bg-gradient-to-b from-[#C0C0C0]/20 via-gray-950 to-[#1e293b]";
        case "silver": return "bg-gradient-to-b from-[#FFD700]/20 via-gray-950 to-[#1e293b]";
        case "gold": return "bg-gradient-to-b from-[#00BFFF]/20 via-gray-950 to-[#1e293b]";
        case "platinum": return "bg-gradient-to-b from-[#9b87f5]/20 via-gray-950 to-[#1e293b]";
        default: return "bg-gradient-to-b from-[#D3E4FD]/20 via-gray-950 to-[#1e293b]";
      }
    }
    
    switch (selectedTier.id) {
      case "general": return "bg-gradient-to-b from-[#D3E4FD] via-white to-white";
      case "bronze": return "bg-gradient-to-b from-[#C0C0C0] via-white to-white";
      case "silver": return "bg-gradient-to-b from-[#FFD700] via-white to-white";
      case "gold": return "bg-gradient-to-b from-[#B9F2FF] via-white to-white";
      case "platinum": return "bg-gradient-to-b from-[#E5DEFF] via-white to-white";
      default: return "bg-gradient-to-b from-[#D3E4FD] via-white to-white";
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} flex flex-col items-center transition-colors duration-700`}>
      <div className="relative w-full flex-shrink-0" style={{height: 120}}>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-900/40 dark:to-purple-900/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white drop-shadow-md">
            ระดับสมาชิก
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">
            Current Points: {userData.currentPoints}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center z-20 pb-2 px-2 md:px-0">
        <PremiumTierCarousel
          tiers={tiers}
          currentTierId={userData.currentTier}
          walletId={userData.walletId}
          currentPoints={userData.currentPoints}
          onTierChange={handleTierChange}
          onUpgrade={handleUpgrade}
          pointsToNextTier={pointsToNextTier}
          selectedTierId={selectedTierId}
        />
      </div>

      <div className="w-full max-w-2xl mx-auto mt-2 md:mt-8 z-10">
        <PrivilegesList 
          tier={selectedTier} 
          isLocked={isLocked && !isCurrentTierSelected} 
        />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 mb-8 z-20">
        <DailyCheckin />
      </div>
    </div>
  );
};

export default MembershipTier;
