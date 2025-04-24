
import { useEffect, useState } from "react";
import { Tier, userData, tiers, findTierById, getNextTier, canUpgradeToTier } from "../data/tierData";
import PremiumTierCarousel from "./PremiumTierCarousel";
import PrivilegesList from "./PrivilegesList";
import DailyCheckin from "./DailyCheckin";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-900 dark:via-purple-800/80 dark:to-violet-900">
      {/* Top navigation bar */}
      <div className="relative h-16 flex items-center px-4 bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-800 dark:to-violet-800">
        <button className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-white">
          ระดับสมาชิก
        </h1>
        <div className="ml-auto text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="12" r="2" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="19" cy="12" r="2" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Current tier display card */}
      <div className="w-full px-4 pt-4">
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500 to-violet-600 dark:from-purple-600 dark:to-violet-800 shadow-xl">
          <div className="absolute top-0 left-0 p-3">
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white">
              {isLocked ? "ยังไม่บรรลุ" : "บรรลุแล้ว"}
            </div>
          </div>
          
          <div className="p-6 pb-20">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {selectedTier.name}
                </h2>
                <div className="text-xs text-white/80 mb-4">
                  รหัสกระเป๋าเงิน <span className="ml-1">{userData.walletId}</span>
                </div>
                
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex justify-between text-xs text-white">
                    <span>Points required</span>
                    <span>{selectedTier.requiredPoints}</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white"
                      style={{ width: `${Math.min(100, (userData.currentPoints / selectedTier.requiredPoints) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-white/80">
                    {isCurrentTierSelected && pointsToNextTier > 0 ? 
                      `继续加油升到该等级 (${pointsToNextTier} points to go)` :
                      `${Math.min(userData.currentPoints, selectedTier.requiredPoints)}/${selectedTier.requiredPoints} points`
                    }
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="w-24 h-24 flex items-center justify-center">
                  <img
                    src={`/lovable-uploads/ba099b9e-cdcb-4b17-8060-c7137e047123.png`}
                    alt={`${selectedTier.name} badge`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 p-4">
            <button
              onClick={() => handleUpgrade(selectedTier.id)}
              disabled={!canUpgradeToTier(userData.currentPoints, userData.currentTier, selectedTier.id)}
              className="px-6 py-2.5 rounded-full bg-white text-purple-700 font-medium shadow-lg disabled:opacity-60"
            >
              去升级
            </button>
          </div>
        </div>
      </div>

      {/* Tier selection carousel */}
      <div className="w-full px-4 mt-6">
        <PremiumTierCarousel
          tiers={tiers}
          currentTierId={userData.currentTier}
          walletId={userData.walletId}
          currentPoints={userData.currentPoints}
          onTierChange={handleTierChange}
          onUpgrade={handleUpgrade}
          selectedTierId={selectedTierId}
        />
      </div>
      
      {/* Privileges section */}
      <div className="w-full px-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          我的{selectedTier.name}会员权益
        </h2>
        <PrivilegesList 
          tier={selectedTier} 
          isLocked={isLocked && !isCurrentTierSelected} 
        />
      </div>

      {/* Daily check-in section */}
      <div className="w-full px-4 mb-8">
        <DailyCheckin />
      </div>
    </div>
  );
};

export default MembershipTier;
