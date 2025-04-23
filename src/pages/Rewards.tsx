import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Coins, Gift, AlertCircle, Crown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import MainNav from "@/components/MainNav";
import { userData, findTierById } from "@/data/tierData";

interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  endDate: string | null;
  coinCost: number;
  eventId: string;
  goTo?: string;
  confirmationMessage: string;
  repeat: string;
  quantity: number;
  winGashapon: number;
  gashapon: number;
  isGashapon: boolean;
}

const Rewards = () => {
  const { toast } = useToast();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [coinPoints, setCoinPoints] = useState<string>(userData.currentPoints.toString());

  const currentTier = findTierById(userData.currentTier);

  const rewards: Reward[] = [
    {
      id: '2',
      name: 'LINE Melody',
      description: 'แลก LINE Melody เพลงของ BUS เพลงใดก็ได้ 1 เพลง',
      image: '/images/rewards/reward02.jpg',
      endDate: '',
      coinCost: 150,
      eventId: 'redm_02',
      goTo: 'https://docs.google.com/forms/d/',
      confirmationMessage: 'เมื่อแลกเสร็จ ระบบจะนำคุณไปยังหน้ากรอกแบบฟอร์ม',
      repeat: 'yes',
      quantity: 0,
      winGashapon: 0,
      gashapon: 100,
      isGashapon: false,
    },
    {
      id: '3',
      name: 'ชุดตกแต่งห้อง Digital',
      description: 'แลก Digital Item สำหรับตกแต่งห้องในแอพฯ',
      image: '/images/rewards/reward02.jpg',
      endDate: '',
      coinCost: 200,
      eventId: 'redm_03',
      confirmationMessage: 'ของรางวัลจะถูกส่งไปยังบัญชีของคุณภายใน 24 ชั่วโมง',
      repeat: 'yes',
      quantity: 0,
      winGashapon: 0,
      gashapon: 0,
      isGashapon: false,
    },
    {
      id: '4',
      name: 'บัตรส่วนลด 100 บาท',
      description: 'รับบัตรส่วนลด 100 บาท สำหรับการซื้อสินค้าครั้งถัดไป',
      image: '/images/rewards/reward02.jpg',
      endDate: '',
      coinCost: 350,
      eventId: 'redm_04',
      confirmationMessage: 'รหัสส่วนลดจะถูกส่งไปยังอีเมลของคุณ',
      repeat: 'yes',
      quantity: 0,
      winGashapon: 0,
      gashapon: 0,
      isGashapon: true,
    },
  ];

  const handleExchange = async (reward: Reward) => {
    setSelectedReward(reward);
    setConfirmDialogOpen(true);
  };

  const confirmExchange = async () => {
    if (!selectedReward) return;
    
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setConfirmDialogOpen(false);
      
      toast({
        title: "แลกรางวัลสำเร็จ!",
        description: `คุณได้แลก ${selectedReward.name} เรียบร้อยแล้���`,
      });

      if (selectedReward.goTo) {
        window.open(selectedReward.goTo, '_blank');
      }
    }, 1500);
  };

  const getBackgroundGradient = () => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (currentTier?.id) {
        case "general": return "bg-gradient-to-b from-[#10162b] via-gray-950 to-[#1e293b]";
        case "bronze": return "bg-gradient-to-b from-[#251911] via-gray-950 to-[#1e293b]";
        case "silver": return "bg-gradient-to-b from-[#292942] via-gray-950 to-[#1e293b]";
        case "gold": return "bg-gradient-to-b from-[#403618] via-gray-950 to-[#1e293b]";
        case "platinum": return "bg-gradient-to-b from-[#2d3748] via-gray-950 to-[#1e293b]";
        default: return "bg-gradient-to-b from-[#10162b] via-gray-950 to-[#1e293b]";
      }
    }
    
    switch (currentTier?.id) {
      case "general": return "bg-gradient-to-b from-[#9ccff4] via-white to-white";
      case "bronze": return "bg-gradient-to-b from-[#ffe2c1] via-white to-white";
      case "silver": return "bg-gradient-to-b from-[#d7dbe7] via-white to-white";
      case "gold": return "bg-gradient-to-b from-[#fff4c6] via-white to-white";
      case "platinum": return "bg-gradient-to-b from-[#f5faff] via-white to-white";
      default: return "bg-gradient-to-b from-[#9ccff4] via-white to-white";
    }
  };

  const getCardGlassStyle = () => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (currentTier?.id) {
        case "general": return "bg-gradient-to-br from-[#223b54]/90 to-[#2b405b]/70";
        case "bronze": return "bg-gradient-to-br from-[#67492c]/90 to-[#47331e]/70";
        case "silver": return "bg-gradient-to-br from-[#565775]/90 to-[#a5a5ad]/70";
        case "gold": return "bg-gradient-to-br from-[#ad9502]/90 to-[#f6d159]/70";
        case "platinum": return "bg-gradient-to-br from-[#a4a5ac]/90 to-[#e5e6ef]/70";
        default: return "bg-gradient-to-br from-gray-800/90 to-gray-900/70";
      }
    }
    
    switch (currentTier?.id) {
      case "general": return "bg-gradient-to-br from-[#e3f0ff]/95 to-[#b4deff]/80";
      case "bronze": return "bg-gradient-to-br from-[#ffe2c1]/95 to-[#e7b892]/80";
      case "silver": return "bg-gradient-to-br from-[#d7dbe7]/95 to-[#b2b0bc]/80";
      case "gold": return "bg-gradient-to-br from-[#fff4c6]/95 to-[#ffeab2]/80";
      case "platinum": return "bg-gradient-to-br from-[#f5faff]/95 to-[#dbe2ee]/80";
      default: return "bg-gradient-to-br from-white/95 to-gray-100/80";
    }
  };

  const getRewardCardStyle = () => {
    return "border border-white/20 dark:border-gray-700/30 backdrop-blur-md overflow-hidden h-full";
  };

  const getButtonStyle = () => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (currentTier?.id) {
        case "general": return "bg-blue-600 hover:bg-blue-700 text-white";
        case "bronze": return "bg-amber-600 hover:bg-amber-700 text-white";
        case "silver": return "bg-indigo-600 hover:bg-indigo-700 text-white";
        case "gold": return "bg-yellow-600 hover:bg-yellow-700 text-black";
        case "platinum": return "bg-slate-600 hover:bg-slate-700 text-white";
        default: return "bg-blue-600 hover:bg-blue-700 text-white";
      }
    }

    switch (currentTier?.id) {
      case "general": return "bg-blue-500 hover:bg-blue-600 text-white";
      case "bronze": return "bg-amber-500 hover:bg-amber-600 text-white";
      case "silver": return "bg-indigo-500 hover:bg-indigo-600 text-white";
      case "gold": return "bg-yellow-500 hover:bg-yellow-600 text-black";
      case "platinum": return "bg-slate-500 hover:bg-slate-600 text-white";
      default: return "bg-blue-500 hover:bg-blue-600 text-white";
    }
  };
  
  const getAccentColor = () => {
    const dark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    
    if (dark) {
      switch (currentTier?.id) {
        case "general": return "text-blue-300";
        case "bronze": return "text-amber-300";
        case "silver": return "text-slate-300";
        case "gold": return "text-yellow-300";
        case "platinum": return "text-slate-200";
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
    <div className={getBackgroundGradient()}>
      <MainNav />
      
      <main className="min-h-screen pb-24">
        <div className="relative w-full h-[300px] overflow-hidden">
          <div className={`absolute inset-0 ${getCardGlassStyle()}`} />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Crown className={`w-10 h-10 ${getAccentColor()} mr-3`} />
                <h1 className="text-4xl font-bold">แลกรางวัล</h1>
              </div>
              <div className="flex items-center justify-center space-x-3 mt-6">
                <Coins className={`w-6 h-6 ${getAccentColor()}`} />
                <span className="text-3xl font-bold">{parseInt(coinPoints).toLocaleString('en-US')}</span>
                <span className={`text-xl ${getAccentColor()}`}>คะแนน</span>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">ใช้คะแนนสะสมเพื่อแลกรับของรางวัลสุดพิเศษ</p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`group relative h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${getRewardCardStyle()}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                    <img
                      src={reward.image}
                      alt={reward.name}
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-110 duration-700"
                    />
                    {reward.isGashapon && (
                      <span className={`absolute top-3 right-3 z-20 ${getButtonStyle()} text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm`}>
                        Gashapon
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col h-[calc(100%-192px)]">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{reward.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
                      {reward.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700/30">
                      <div className="flex items-center space-x-2">
                        <Coins className={`w-5 h-5 ${getAccentColor()}`} />
                        <span className={`font-bold ${getAccentColor()}`}>
                          {reward.coinCost.toLocaleString()}
                        </span>
                      </div>
                      
                      <Button
                        onClick={() => handleExchange(reward)}
                        className={`${getButtonStyle()} space-x-2`}
                        disabled={processing}
                      >
                        <span>แลกรางวัล</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className={`${getCardGlassStyle()} max-w-md mx-auto`}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">ยืนยันการแลกรางวัล</DialogTitle>
            <DialogDescription className="mt-2">
              {selectedReward?.confirmationMessage}
            </DialogDescription>
          </DialogHeader>

          <div className={`flex items-center space-x-2 p-4 rounded-lg bg-yellow-500/10 ${getAccentColor()}`}>
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">
              คะแนนที่ใช้: {selectedReward?.coinCost.toLocaleString()} points
            </p>
          </div>

          <DialogFooter className="sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              disabled={processing}
              className="flex-1 sm:flex-none"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={confirmExchange}
              disabled={processing}
              className={`${getButtonStyle()} flex-1 sm:flex-none`}
            >
              {processing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>กำลังดำเนินการ...</span>
                </div>
              ) : (
                "ยืนยัน"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rewards;
