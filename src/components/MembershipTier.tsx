
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Tier,
  userData,
  tiers,
  findTierById,
  getNextTier,
  canUpgradeToTier,
} from "../data/tierData";
import TierCarousel from "./TierCarousel";
import PrivilegesList from "./PrivilegesList";
import { useToast } from "@/components/ui/use-toast";

const MembershipTier = () => {
  const { toast } = useToast();
  const [selectedTierId, setSelectedTierId] = useState(userData.currentTier);
  const [selectedTier, setSelectedTier] = useState<Tier | undefined>(
    findTierById(userData.currentTier)
  );
  const [backgroundStyle, setBackgroundStyle] = useState({});

  // Calculate points to next tier
  const nextTier = getNextTier(userData.currentTier);
  const pointsToNextTier = nextTier
    ? Math.max(0, nextTier.requiredPoints - userData.currentPoints)
    : 0;

  // Update selected tier when the ID changes
  useEffect(() => {
    const tier = findTierById(selectedTierId);
    setSelectedTier(tier);
    
    if (tier) {
      setBackgroundStyle({
        background: tier.colors.background,
        transition: "all 0.5s ease-in-out",
      });
    }
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
    <div className="min-h-screen flex flex-col">
      {/* Dynamic background header */}
      <motion.div
        className="w-full py-16 px-6 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl font-bold text-center mb-4">Membership Tier</h1>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-grow bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          {/* Tier carousel */}
          <div className="my-6">
            <TierCarousel
              tiers={tiers}
              currentTierId={userData.currentTier}
              walletId={userData.walletId}
              currentPoints={userData.currentPoints}
              onTierChange={handleTierChange}
              onUpgrade={handleUpgrade}
              pointsToNextTier={pointsToNextTier}
            />
          </div>

          {/* Privileges section */}
          <PrivilegesList tier={selectedTier} isLocked={isLocked && !isCurrentTierSelected} />
        </div>
      </div>
    </div>
  );
};

export default MembershipTier;
