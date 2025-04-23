
import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Tier, findTierById } from "../data/tierData";
import TierCard from "./TierCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TierCarouselProps {
  tiers: Tier[];
  currentTierId: string;
  walletId: string;
  currentPoints: number;
  onTierChange: (tierId: string) => void;
  onUpgrade: (tierId: string) => void;
  pointsToNextTier?: number;
}

const TierCarousel = ({
  tiers,
  currentTierId,
  walletId,
  currentPoints,
  onTierChange,
  onUpgrade,
  pointsToNextTier,
}: TierCarouselProps) => {
  const [[currentIndex, direction], setCurrentIndex] = useState([
    tiers.findIndex((tier) => tier.id === currentTierId),
    0,
  ]);

  const paginate = (newDirection: number) => {
    let nextIndex = currentIndex + newDirection;
    
    // Loop back to start or end
    if (nextIndex < 0) nextIndex = tiers.length - 1;
    if (nextIndex >= tiers.length) nextIndex = 0;
    
    setCurrentIndex([nextIndex, newDirection]);
    onTierChange(tiers[nextIndex].id);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      const direction = info.offset.x > 0 ? -1 : 1;
      paginate(direction);
    }
  };

  const currentTier = findTierById(currentTierId) || tiers[0];
  const selectedTier = tiers[currentIndex];

  const canUpgradeToCurrentSelection = 
    currentPoints >= selectedTier.requiredPoints && 
    tiers.indexOf(selectedTier) > tiers.findIndex(t => t.id === currentTierId);

  const isCurrentTierSelected = currentTier.id === selectedTier.id;

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md"
          aria-label="Previous tier"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md"
          aria-label="Next tier"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        <div className="relative overflow-hidden">
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="flex items-center justify-center"
          >
            <AnimatePresence initial={false} custom={direction}>
              <TierCard
                key={selectedTier.id}
                tier={selectedTier}
                isCurrentTier={isCurrentTierSelected}
                isCurrent={true}
                isLocked={currentPoints < selectedTier.requiredPoints}
                canUpgrade={canUpgradeToCurrentSelection}
                onUpgrade={() => onUpgrade(selectedTier.id)}
                walletId={walletId}
                pointsToNextTier={isCurrentTierSelected ? pointsToNextTier : undefined}
              />
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {tiers.map((tier, i) => (
            <button
              key={tier.id}
              onClick={() => {
                const newDirection = i > currentIndex ? 1 : -1;
                setCurrentIndex([i, newDirection]);
                onTierChange(tier.id);
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                i === currentIndex 
                  ? "bg-gray-800 dark:bg-white scale-125" 
                  : "bg-gray-300 dark:bg-gray-600"
              )}
              aria-label={`Go to ${tier.name} tier`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TierCarousel;
