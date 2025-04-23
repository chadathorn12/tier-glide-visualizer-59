
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Gift, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DailyCheckin = () => {
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              เช็คอินรายวัน
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <Gift className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-purple-500 font-medium">+10 คะแนน</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckin}
          disabled={isCheckedIn || loading}
          className={`w-full py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2
            ${isCheckedIn 
              ? 'bg-green-100 dark:bg-green-900 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
        >
          {isCheckedIn ? (
            <>
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400 font-medium">เช็คอินแล้ววันนี้</span>
            </>
          ) : loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Calendar className="w-5 h-5 text-white" />
              <span className="text-white font-medium">เช็คอินวันนี้</span>
            </>
          )}
        </motion.button>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            เช็คอินทุกวันเพื่อรับคะแนนสะสม และแลกรับของรางวัลพิเศษ
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckin;
