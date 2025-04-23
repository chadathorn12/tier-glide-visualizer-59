
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
    <div className="w-full max-w-3xl mx-auto relative">
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
        {/* Cards content */}
        <CarouselContent className="h-[260px] md:h-[280px]">
          {tiers.map((tier, i) => {
            // Compute locked and upgrade status
            const isLocked = currentPoints < tier.requiredPoints;
            const canUpgrade = 
              currentPoints >= tier.requiredPoints && 
              tiers.indexOf(tier) > tiers.findIndex((t) => t.id === currentTierId);
            const isCurrentTier = tier.id === currentTierId;
            // Only current card shows pointsToNextTier
            const showPointsToNext = tier.id === selectedTierId && pointsToNextTier !== undefined;

            return (
              <CarouselItem 
                key={tier.id}
                className={cn("w-[87vw] sm:w-[380px] md:w-[400px] max-w-lg px-4 transition-transform duration-700")}
              >
                <TierCard
                  tier={tier}
                  isCurrentTier={isCurrentTier}
                  isCurrent={tier.id === selectedTierId}
                  isLocked={isLocked}
                  canUpgrade={canUpgrade}
                  onUpgrade={() => onUpgrade(tier.id)}
                  walletId={walletId}
                  pointsToNextTier={showPointsToNext ? pointsToNextTier : undefined}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* Indicator dots */}
      <div className="flex justify-center mt-5 space-x-2">
        {tiers.map((tier, idx) => (
          <button
            key={tier.id}
            aria-label={`Go to ${tier.name} tier`}
            onClick={() => api && api.scrollTo(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              selectedIdx === idx
                ? "bg-blue-500 dark:bg-[#bdd0f6] scale-125 shadow ring-2 ring-blue-100"
                : "bg-blue-100 dark:bg-gray-700"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PremiumTierCarousel;
