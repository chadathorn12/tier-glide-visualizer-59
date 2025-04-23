
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerBadgeProps {
  text: string;
  color?: string;
  className?: string;
}

const ShimmerBadge = ({ text, color = "#9b87f5", className }: ShimmerBadgeProps) => {
  return (
    <div className={cn("relative overflow-hidden rounded-full px-3 py-1", className)}>
      {/* Background */}
      <div 
        className="absolute inset-0 rounded-full opacity-80" 
        style={{ backgroundColor: color }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 translate-x-full"
        animate={{
          translateX: ["100%", "-100%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </motion.div>
      
      {/* Text */}
      <span className="relative z-10 text-xs font-bold text-white mix-blend-overlay">
        {text}
      </span>
    </div>
  );
};

export default ShimmerBadge;
