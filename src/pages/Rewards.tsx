
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Coins, Gift, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

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

  // Mock data - replace with your actual data fetching
  const rewards: Reward[] = [
    {
      id: '2',
      name: 'LINE Melody',
      description: 'แลก LINE Melody เพลงของ BUS เพลงใดก็ได้ 1 เพลง',
      image: '/images/rewards/reward02.jpg',
      endDate: '',
      coinCost: 430,
      eventId: 'redm_02',
      goTo: 'https://docs.google.com/forms/d/',
      confirmationMessage: 'เมื่อแลกเสร็จ ระบบจะนำคุณไปยังหน้ากรอกแบบฟอร์ม',
      repeat: 'yes',
      quantity: 0,
      winGashapon: 0,
      gashapon: 100,
      isGashapon: false,
    },
    // Add more rewards as needed
  ];

  const handleExchange = async (reward: Reward) => {
    setSelectedReward(reward);
    setConfirmDialogOpen(true);
  };

  const confirmExchange = async () => {
    if (!selectedReward) return;
    
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setConfirmDialogOpen(false);
      
      toast({
        title: "แลกรางวัลสำเร็จ!",
        description: `คุณได้แลก ${selectedReward.name} เรียบร้อยแล้ว`,
      });

      if (selectedReward.goTo) {
        window.open(selectedReward.goTo, '_blank');
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          แลกของรางวัล
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          ใช้คะแนนสะสมของคุณเพื่อแลกรับของรางวัลสุดพิเศษ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-48 object-cover"
                />
                {reward.isGashapon && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                    Gashapon
                  </span>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  {reward.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold">
                      {reward.coinCost <= 0 ? "ฟรี" : reward.coinCost}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => handleExchange(reward)}
                    variant="default"
                    className="space-x-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>แลกรางวัล</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการแลกรางวัล</DialogTitle>
            <DialogDescription>
              {selectedReward?.confirmationMessage}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 text-yellow-500">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">
              คะแนนที่ใช้: {selectedReward?.coinCost} points
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              disabled={processing}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={confirmExchange}
              disabled={processing}
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
