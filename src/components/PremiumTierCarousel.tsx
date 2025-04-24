
import { useRef, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import TierCard from "./TierCard";
import { cn } from "@/lib/utils";
import { Tier } from "../data/tierData";

interface PremiumTierCarouselProps {
  tiers: Tier[];
  currentTierId: string;
  walletId: string;
  currentPoints: number;
  onTierChange: (tierId: string) => void;
  onUpgrade: (tierId: string) => void;
  pointsToNextTier?: number;
  selectedTierId: string;
}

const PremiumTierCarousel = ({
  tiers,
  currentTierId,
  walletId,
  currentPoints,
  onTierChange,
  onUpgrade,
  pointsToNextTier,
  selectedTierId,
}: PremiumTierCarouselProps) => {
  // Find current selected index based on selectedTierId (from parent)
  const selectedIdx = tiers.findIndex((t) => t.id === selectedTierId);

  // Focus carousel on selectedIdx
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (api && selectedIdx >= 0) {
      api.scrollTo(selectedIdx);
    }
  }, [api, selectedIdx]);

  // Handle carousel change - notify parent when selected slide changes
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedSnap = api.selectedScrollSnap();
      if (selectedSnap !== undefined && tiers[selectedSnap]) {
        onTierChange(tiers[selectedSnap].id);
      }
    };

    api.on('select', handleSelect);
    return () => {
      api.off('select', handleSelect);
    };
  }, [api, tiers, onTierChange]);

  return (
    <div className="w-full relative py-4">
      <Carousel
        opts={{
          align: "center",
          loop: false,
          skipSnaps: false,
          dragFree: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="py-4">
          {tiers.map((tier, i) => {
            // Compute locked and upgrade status
            const isLocked = currentPoints < tier.requiredPoints;
            const canUpgrade = 
              currentPoints >= tier.requiredPoints && 
              tiers.indexOf(tier) > tiers.findIndex((t) => t.id === currentTierId);
            const isCurrentTier = tier.id === currentTierId;
            // Calculate points to next tier specifically for this tier
            const nextTierForThis = tiers[i + 1];
            const pointsToNextForThis = nextTierForThis 
              ? Math.max(0, nextTierForThis.requiredPoints - currentPoints)
              : undefined;
            
            // Only current card shows pointsToNextTier
            const showPointsToNext = tier.id === selectedTierId && i < tiers.length - 1;

            return (
              <CarouselItem 
                key={tier.id}
                className="w-[75vw] sm:w-[300px] max-w-lg px-2"
              >
                <TierCard
                  tier={tier}
                  isCurrentTier={isCurrentTier}
                  isCurrent={tier.id === selectedTierId}
                  isLocked={isLocked}
                  canUpgrade={canUpgrade}
                  onUpgrade={() => onUpgrade(tier.id)}
                  walletId={walletId}
                  pointsToNextTier={showPointsToNext ? pointsToNextForThis : undefined}
                  currentPoints={currentPoints}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      
      <div className="flex justify-center mt-2 space-x-1.5">
        {tiers.map((tier, idx) => (
          <button
            key={tier.id}
            aria-label={`Go to ${tier.name} tier`}
            onClick={() => api && api.scrollTo(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              selectedIdx === idx
                ? "bg-violet-500 scale-125"
                : "bg-gray-300 dark:bg-gray-600"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PremiumTierCarousel;
