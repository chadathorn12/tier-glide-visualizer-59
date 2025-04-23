
import { motion } from "framer-motion";
import { Privilege, Tier } from "../data/tierData";
import { Lock } from "lucide-react";
import {
  Crown,
  Ticket,
  ArrowRight,
  BadgeDollarSign,
  Gift,
  Star,
  Medal,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PrivilegesListProps {
  tier: Tier;
  isLocked: boolean;
}

const PrivilegesList = ({ tier, isLocked }: PrivilegesListProps) => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Render appropriate icon based on privilege icon string
  const renderIcon = (iconName: string, isEnabled: boolean) => {
    const iconProps = {
      size: 24,
      className: isEnabled 
        ? "text-white" 
        : "text-gray-400",
    };

    switch (iconName) {
      case "crown":
        return <Crown {...iconProps} />;
      case "ticket":
        return <Ticket {...iconProps} />;
      case "arrow-right":
        return <ArrowRight {...iconProps} />;
      case "badge-dollar-sign":
        return <BadgeDollarSign {...iconProps} />;
      case "gift":
        return <Gift {...iconProps} />;
      case "star":
        return <Star {...iconProps} />;
      case "medal":
        return <Medal {...iconProps} />;
      case "shield":
        return <Shield {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };

  return (
    <div className="py-12 px-4">
      <motion.h2 
        className="text-3xl font-bold mb-10 text-center text-gradient relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{ 
          backgroundImage: `linear-gradient(135deg, ${tier.colors.primary} 0%, ${tier.colors.accent} 100%)`,
          WebkitBackgroundClip: 'text'
        }}
      >
        {tier.name} Privileges
        <motion.div 
          className="h-1 w-24 rounded-full mx-auto mt-3"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{ backgroundColor: tier.colors.primary }}
        />
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {tier.privileges.map((privilege, index) => (
          <motion.div
            key={privilege.id}
            className={cn(
              "flex flex-col items-center text-center",
              isLocked ? "opacity-70" : ""
            )}
            variants={itemVariants}
            whileHover={{ scale: isLocked ? 1 : 1.05 }}
            custom={index}
          >
            <motion.div 
              className={cn(
                "relative mb-4 rounded-full p-5 flex items-center justify-center shadow-lg",
                isLocked ? "" : "animate-float"
              )}
              style={{ 
                backgroundColor: isLocked 
                  ? "rgba(0,0,0,0.1)" 
                  : `${tier.colors.secondary}`,
                boxShadow: isLocked 
                  ? "none" 
                  : `0 10px 15px -3px ${tier.colors.secondary}40`
              }}
            >
              {renderIcon(privilege.icon, !isLocked && privilege.enabled)}
              
              {isLocked && (
                <div className="absolute -bottom-2 -right-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1.5 shadow-md">
                  <Lock size={14} className="text-gray-500" />
                </div>
              )}
            </motion.div>
            
            <h3 
              className={cn(
                "font-medium text-base mb-1",
                isLocked 
                  ? "text-gray-500 dark:text-gray-500" 
                  : "text-gray-800 dark:text-gray-200"
              )}
            >
              {privilege.name}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PrivilegesList;
