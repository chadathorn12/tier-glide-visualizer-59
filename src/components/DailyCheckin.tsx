
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Gift, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { userData, findTierById } from "../data/tierData";

const DailyCheckin = () => {
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // ดึงข้อมูลระดับสมาชิกปัจจุบันเพื่อกำหนดสีและสไตล์
  const currentTier = findTierById(userData.currentTier);

  const handleCheckin = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsCheckedIn(true);
      setLoading(false);
      toast({
        title: "เช็คอินสำเร็จ!",
        description: "คุณได้รับ 10 คะแนน จากการเช็คอินวันนี้",
      });
    }, 1000);
  };

  // กำหนดสีให้สอดคล้องกับระดับสมาชิก
  const getButtonGradient = () => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (isCheckedIn) {
      return dark 
        ? "bg-gray-700 text-gray-300" 
        : "bg-gray-300 text-gray-600";
    }
    
    if (dark) {
      switch (currentTier?.id) {
        case "general": return "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600";
        case "bronze": return "bg-gradient-to-r from-amber-700 to-amber-500 hover:from-amber-800 hover:to-amber-600";
        case "silver": return "bg-gradient-to-r from-indigo-700 to-indigo-500 hover:from-indigo-800 hover:to-indigo-600";
        case "gold": return "bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-700 hover:to-yellow-500";
        case "platinum": return "bg-gradient-to-r from-slate-600 to-slate-400 hover:from-slate-700 hover:to-slate-500";
        default: return "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600";
      }
    }
    
    switch (currentTier?.id) {
      case "general": return "bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400";
      case "bronze": return "bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-600 hover:to-amber-400";
      case "silver": return "bg-gradient-to-r from-indigo-500 to-indigo-300 hover:from-indigo-600 hover:to-indigo-400";
      case "gold": return "bg-gradient-to-r from-yellow-500 to-yellow-300 hover:from-yellow-600 hover:to-yellow-400";
      case "platinum": return "bg-gradient-to-r from-slate-500 to-slate-300 hover:from-slate-600 hover:to-slate-400";
      default: return "bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400";
    }
  };

  const getCardGradient = () => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (currentTier?.id) {
        case "general": return "bg-gradient-to-b from-[#223b54]/90 to-[#2b405b]/70";
        case "bronze": return "bg-gradient-to-b from-[#67492c]/90 to-[#47331e]/70";
        case "silver": return "bg-gradient-to-b from-[#565775]/90 to-[#a5a5ad]/70";
        case "gold": return "bg-gradient-to-b from-[#ad9502]/90 to-[#f6d159]/70";
        case "platinum": return "bg-gradient-to-b from-[#a4a5ac]/90 to-[#e5e6ef]/70";
        default: return "bg-gradient-to-b from-gray-800/90 to-gray-900/70";
      }
    }
    
    switch (currentTier?.id) {
      case "general": return "bg-gradient-to-b from-[#e3f0ff]/95 to-[#b4deff]/80";
      case "bronze": return "bg-gradient-to-b from-[#ffe2c1]/95 to-[#e7b892]/80";
      case "silver": return "bg-gradient-to-b from-[#d7dbe7]/95 to-[#b2b0bc]/80";
      case "gold": return "bg-gradient-to-b from-[#fff4c6]/95 to-[#ffeab2]/80";
      case "platinum": return "bg-gradient-to-b from-[#f5faff]/95 to-[#dbe2ee]/80";
      default: return "bg-gradient-to-b from-white/95 to-gray-100/80";
    }
  };

  const getIconColor = () => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (currentTier?.id) {
        case "general": return "text-blue-300";
        case "bronze": return "text-amber-300";
        case "silver": return "text-slate-200";
        case "gold": return "text-yellow-300";
        case "platinum": return "text-white";
        default: return "text-blue-300";
      }
    }

    switch (currentTier?.id) {
      case "general": return "text-blue-600";
      case "bronze": return "text-amber-600";
      case "silver": return "text-slate-600";
      case "gold": return "text-yellow-600";
      case "platinum": return "text-slate-700";
      default: return "text-blue-600";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/30 backdrop-blur-md ${getCardGradient()}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className={`w-5 h-5 ${getIconColor()}`} />
            <h3 className="text-lg font-semibold">
              เช็คอินรายวัน
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <Gift className={`w-4 h-4 ${getIconColor()}`} />
            <span className={`text-sm font-medium ${getIconColor()}`}>+10 คะแนน</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckin}
          disabled={isCheckedIn || loading}
          className={`w-full py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-white ${getButtonGradient()}`}
        >
          {isCheckedIn ? (
            <>
              <Check className="w-5 h-5" />
              <span className="font-medium">เช็คอินแล้ววันนี้</span>
            </>
          ) : loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Calendar className="w-5 h-5 text-white" />
              <span className="font-medium">เช็คอินวันนี้</span>
            </>
          )}
        </motion.button>

        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            เช็คอินทุกวันเพื่อรับคะแนนสะสม และแลกรับของรางวัลพิเศษ
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyCheckin;
