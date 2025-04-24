
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
      size: 28,
      className: isEnabled 
        ? "text-purple-500 dark:text-purple-300" 
        : "text-gray-300 dark:text-gray-500",
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
    <div className="grid grid-cols-4 gap-4">
      {tier.privileges.map((privilege) => (
        <div
          key={privilege.id}
          className="flex flex-col items-center text-center"
        >
          <div className="relative mb-3">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              isLocked || !privilege.enabled
                ? "bg-gray-100 dark:bg-gray-800"
                : "bg-purple-100 dark:bg-purple-900/50"
            )}>
              {renderIcon(privilege.icon, !isLocked && privilege.enabled)}
              
              {isLocked && (
                <div className="absolute -bottom-1 -right-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1.5 shadow-md">
                  <Lock size={14} className="text-gray-500" />
                </div>
              )}
            </div>
          </div>
          
          <h3 
            className={cn(
              "text-sm font-medium",
              isLocked 
                ? "text-gray-400 dark:text-gray-500" 
                : privilege.enabled 
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-400 dark:text-gray-500"
            )}
          >
            {privilege.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default PrivilegesList;
