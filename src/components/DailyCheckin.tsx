
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full glass-card rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">
              เช็คอินรายวัน
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">+10 คะแนน</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckin}
          disabled={isCheckedIn || loading}
          className={`w-full py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2
            ${isCheckedIn 
              ? 'bg-muted cursor-not-allowed' 
              : 'bg-primary hover:bg-primary/90'}`}
        >
          {isCheckedIn ? (
            <>
              <Check className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">เช็คอินแล้ววันนี้</span>
            </>
          ) : loading ? (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Calendar className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">เช็คอินวันนี้</span>
            </>
          )}
        </motion.button>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            เช็คอินทุกวันเพื่อรับคะแนนสะสม และแลกรับของรางวัลพิเศษ
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyCheckin;
