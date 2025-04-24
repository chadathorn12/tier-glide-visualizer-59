
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

  const getHeaderColor = (tier: Tier) => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (tier.id) {
        case "general": return "from-[#8BC5E3] to-[#B6E3F7]";
        case "bronze": return "from-[#C5C5C5] to-[#EBEBEB]";
        case "silver": return "from-[#FFD700] to-[#FFF3B8]";
        case "gold": return "from-[#4FC3F7] to-[#81D4FA]";
        case "platinum": return "from-[#B388FF] to-[#E1BEE7]";
        default: return "from-[#8BC5E3] to-[#B6E3F7]";
      }
    }

    switch (tier.id) {
      case "general": return "from-[#5BA3D0] to-[#9CCEF4]";
      case "bronze": return "from-[#C0C0C0] to-[#E6E8E6]";
      case "silver": return "from-[#FFD700] to-[#FFEB99]";
      case "gold": return "from-[#00BFFF] to-[#87CEEB]";
      case "platinum": return "from-[#9b87f5] to-[#B8A9F8]";
      default: return "from-[#5BA3D0] to-[#9CCEF4]";
    }
  };
  
  const getIconBgColor = (tier: Tier) => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (tier.id) {
        case "general": return "bg-[#5B9AC7]/40";
        case "bronze": return "bg-[#9E9E9E]/40";
        case "silver": return "bg-[#FFD700]/40";
        case "gold": return "bg-[#039BE5]/40";
        case "platinum": return "bg-[#9575CD]/40";
        default: return "bg-[#5B9AC7]/40";
      }
    }

    switch (tier.id) {
      case "general": return "bg-[#8BC5E3]";
      case "bronze": return "bg-[#C5C5C5]";
      case "silver": return "bg-[#FFD700]";
      case "gold": return "bg-[#4FC3F7]";
      case "platinum": return "bg-[#B388FF]";
      default: return "bg-[#8BC5E3]";
    }
  };

  const getUnderlineColor = (tier: Tier) => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (tier.id) {
        case "general": return "bg-[#B6E3F7]";
        case "bronze": return "bg-[#EBEBEB]";
        case "silver": return "bg-[#FFF3B8]";
        case "gold": return "bg-[#81D4FA]";
        case "platinum": return "bg-[#E1BEE7]";
        default: return "bg-[#B6E3F7]";
      }
    }

    switch (tier.id) {
      case "general": return "bg-[#9CCEF4]";
      case "bronze": return "bg-[#E6E8E6]";
      case "silver": return "bg-[#FFEB99]";
      case "gold": return "bg-[#87CEEB]";
      case "platinum": return "bg-[#B8A9F8]";
      default: return "bg-[#9CCEF4]";
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="text-center">
        <h2 
          className={cn(
            "text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent", 
            getHeaderColor(tier)
          )}
        >
          {tier.name} Privileges
        </h2>
        <div 
          className={cn(
            "h-1 w-24 rounded-full mx-auto mb-8",
            getUnderlineColor(tier)
          )}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {tier.privileges.map((privilege) => (
          <div
            key={privilege.id}
            className={cn(
              "flex flex-col items-center text-center",
              isLocked ? "opacity-70" : ""
            )}
          >
            <div 
              className={cn(
                "relative mb-4 rounded-full p-5 flex items-center justify-center shadow-lg backdrop-blur-sm",
                getIconBgColor(tier)
              )}
            >
              {renderIcon(privilege.icon, !isLocked && privilege.enabled)}
              
              {isLocked && (
                <div className="absolute -bottom-2 -right-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1.5 shadow-md">
                  <Lock size={14} className="text-gray-500" />
                </div>
              )}
            </div>
            
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivilegesList;
