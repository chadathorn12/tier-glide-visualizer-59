
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
        case "general": return "text-blue-300";
        case "bronze": return "text-amber-300";
        case "silver": return "text-slate-300";
        case "gold": return "text-yellow-300";
        case "platinum": return "text-slate-200";
        default: return "text-blue-300";
      }
    }

    switch (tier.id) {
      case "general": return "text-blue-600";
      case "bronze": return "text-amber-600";
      case "silver": return "text-slate-600";
      case "gold": return "text-yellow-600";
      case "platinum": return "text-slate-700";
      default: return "text-blue-600";
    }
  };
  
  const getIconBgColor = (tier: Tier) => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (tier.id) {
        case "general": return "bg-blue-900/60";
        case "bronze": return "bg-amber-900/60";
        case "silver": return "bg-slate-700/60";
        case "gold": return "bg-yellow-900/60";
        case "platinum": return "bg-slate-700/60";
        default: return "bg-blue-900/60";
      }
    }

    switch (tier.id) {
      case "general": return "bg-blue-200";
      case "bronze": return "bg-amber-200";
      case "silver": return "bg-slate-200";
      case "gold": return "bg-yellow-200";
      case "platinum": return "bg-slate-200";
      default: return "bg-blue-200";
    }
  };

  const getUnderlineColor = (tier: Tier) => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (tier.id) {
        case "general": return "bg-blue-500";
        case "bronze": return "bg-amber-500";
        case "silver": return "bg-slate-400";
        case "gold": return "bg-yellow-500";
        case "platinum": return "bg-slate-400";
        default: return "bg-blue-500";
      }
    }

    switch (tier.id) {
      case "general": return "bg-blue-500";
      case "bronze": return "bg-amber-500";
      case "silver": return "bg-slate-500";
      case "gold": return "bg-yellow-500";
      case "platinum": return "bg-slate-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="text-center">
        <h2 
          className={cn(
            "text-3xl font-bold mb-2", 
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
                "relative mb-4 rounded-full p-5 flex items-center justify-center shadow-lg",
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
