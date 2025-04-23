
import { useState, useEffect } from "react";
import {
  Tier,
  userData,
  tiers,
  findTierById,
  getNextTier,
  canUpgradeToTier,
} from "../data/tierData";
import PremiumTierCarousel from "./PremiumTierCarousel";
import PrivilegesList from "./PrivilegesList";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const MembershipTier = () => {
  const { toast } = useToast();
  const [selectedTierId, setSelectedTierId] = useState(userData.currentTier);
  const [selectedTier, setSelectedTier] = useState<Tier | undefined>(
    findTierById(userData.currentTier)
  );

  // Calculate points to next tier
  const nextTier = getNextTier(userData.currentTier);
  const pointsToNextTier = nextTier
    ? Math.max(0, nextTier.requiredPoints - userData.currentPoints)
    : 0;

  // Update selected tier when the ID changes
  useEffect(() => {
    setSelectedTier(findTierById(selectedTierId));
  }, [selectedTierId]);

  // Handle tier upgrade
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
      // In a real app, you'd update this in a database/API
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

  // Handle tier change in carousel
  const handleTierChange = (tierId: string) => {
    setSelectedTierId(tierId);
  };

  if (!selectedTier) return null;

  const isCurrentTierSelected = selectedTierId === userData.currentTier;
  const isLocked = userData.currentPoints < selectedTier.requiredPoints;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9ccff4] via-white dark:from-[#10162b] dark:via-gray-950 to-white dark:to-[#1e293b] flex flex-col items-center">
      {/* Header small gradient background, fixed height */}
      <div className="relative w-full flex-shrink-0" style={{height: 180}}>
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: "linear-gradient(111deg, #b1d8fd 0%, #e8ecfb 80%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2b468e] dark:text-[#bdd0f6] drop-shadow-md">Membership Tier</h1>
        </div>
      </div>
      {/* Carousel floats over header, overlaps */}
      <div className="w-full flex flex-col items-center z-20 -mt-24 pb-2 px-2 md:px-0">
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
      {/* Privileges section */}
      <div className="w-full max-w-2xl mx-auto mt-2 md:mt-8 z-10">
        <PrivilegesList tier={selectedTier} isLocked={isLocked && !isCurrentTierSelected} />
      </div>
    </div>
  );
};
export default MembershipTier;
