
// Membership tier data
export interface Privilege {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

export interface Tier {
  id: string;
  name: string;
  requiredPoints: number;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    background: string;
  };
  icon: string;
  privileges: Privilege[];
}

export interface UserData {
  currentPoints: number;
  currentTier: string;
  walletId: string;
}

// Mock user data
export const userData: UserData = {
  currentPoints: 98,
  currentTier: "general",
  walletId: "NO.7134788",
};

// Tier data
export const tiers: Tier[] = [
  {
    id: "general",
    name: "Normal",
    requiredPoints: 0,
    colors: {
      primary: "#5BA3D0",
      secondary: "#9CCEF4",
      tertiary: "#D1E8F8",
      accent: "#E3E3E3",
      background: "linear-gradient(135deg, #8BCDFF 0%, #D3E4FD 100%)",
    },
    icon: "shield",
    privileges: [
      {
        id: "basic-membership",
        name: "Basic Membership",
        icon: "crown",
        enabled: true,
      },
      {
        id: "five-dollar-voucher",
        name: "$5 Voucher",
        icon: "ticket",
        enabled: true,
      },
      {
        id: "seven-day-trial",
        name: "7-Day Free Trial",
        icon: "arrow-right",
        enabled: true,
      },
    ],
  },
  {
    id: "bronze",
    name: "Silver",
    requiredPoints: 100,
    colors: {
      primary: "#C0C0C0",
      secondary: "#E6E8E6",
      tertiary: "#F5F5F5",
      accent: "#808080",
      background: "linear-gradient(135deg, #E6E8E6 0%, #C0C0C0 100%)",
    },
    icon: "shield-check",
    privileges: [
      {
        id: "basic-membership",
        name: "Basic Membership",
        icon: "crown",
        enabled: true,
      },
      {
        id: "ten-dollar-voucher",
        name: "$10 Voucher",
        icon: "ticket",
        enabled: true,
      },
      {
        id: "ten-day-trial",
        name: "10-Day Free Trial",
        icon: "arrow-right",
        enabled: true,
      },
      {
        id: "discount-coupon",
        name: "$50 Discount Coupon",
        icon: "badge-dollar-sign",
        enabled: true,
      },
      {
        id: "free-storage",
        name: "Free Storage Box",
        icon: "gift",
        enabled: true,
      },
    ],
  },
  {
    id: "silver",
    name: "Gold",
    requiredPoints: 300,
    colors: {
      primary: "#FFD700",
      secondary: "#FFEB99",
      tertiary: "#FFF8D9",
      accent: "#B8860B",
      background: "linear-gradient(135deg, #FFE55C 0%, #FFD700 100%)",
    },
    icon: "diamond",
    privileges: [
      {
        id: "premium-membership",
        name: "Premium Membership",
        icon: "crown",
        enabled: true,
      },
      {
        id: "twenty-dollar-voucher",
        name: "$20 Voucher",
        icon: "ticket",
        enabled: true,
      },
      {
        id: "thirty-day-trial",
        name: "30-Day Free Trial",
        icon: "arrow-right",
        enabled: true,
      },
      {
        id: "discount-coupon",
        name: "$150 Discount Coupon",
        icon: "badge-dollar-sign",
        enabled: true,
      },
      {
        id: "free-preview",
        name: "Free Preview",
        icon: "star",
        enabled: true,
      },
      {
        id: "fifty-day-free",
        name: "50-Day Free Service",
        icon: "gift",
        enabled: true,
      },
      {
        id: "silver-benefits",
        name: "Silver Benefits",
        icon: "medal",
        enabled: true,
      },
    ],
  },
  {
    id: "gold",
    name: "Diamond",
    requiredPoints: 500,
    colors: {
      primary: "#00BFFF",
      secondary: "#87CEEB",
      tertiary: "#B9F2FF",
      accent: "#4682B4",
      background: "linear-gradient(135deg, #5FD4FF 0%, #00BFFF 100%)",
    },
    icon: "star",
    privileges: [
      {
        id: "premium-membership",
        name: "Premium Membership",
        icon: "crown",
        enabled: true,
      },
      {
        id: "fifty-dollar-voucher",
        name: "$50 Voucher",
        icon: "ticket",
        enabled: true,
      },
      {
        id: "sixty-day-trial",
        name: "60-Day Free Trial",
        icon: "arrow-right",
        enabled: true,
      },
      {
        id: "discount-coupon",
        name: "$200 Discount Coupon",
        icon: "badge-dollar-sign",
        enabled: true,
      },
      {
        id: "free-storage",
        name: "Free Storage",
        icon: "gift",
        enabled: true,
      },
      {
        id: "forty-day-free",
        name: "40-Day Free Service",
        icon: "shield-check",
        enabled: true,
      },
      {
        id: "gold-benefits",
        name: "Gold Benefits",
        icon: "medal",
        enabled: true,
      },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    requiredPoints: 1000,
    colors: {
      primary: "#9b87f5",
      secondary: "#B8A9F8",
      tertiary: "#E5DEFF",
      accent: "#7E69AB",
      background: "linear-gradient(135deg, #BE9BFF 0%, #9b87f5 100%)",
    },
    icon: "medal",
    privileges: [
      {
        id: "vip-membership",
        name: "VIP Membership",
        icon: "crown",
        enabled: true,
      },
      {
        id: "hundred-dollar-voucher",
        name: "$100 Voucher",
        icon: "ticket",
        enabled: true,
      },
      {
        id: "ninety-day-trial",
        name: "90-Day Free Trial",
        icon: "arrow-right",
        enabled: true,
      },
      {
        id: "discount-coupon",
        name: "$300 Discount Coupon",
        icon: "badge-dollar-sign",
        enabled: true,
      },
      {
        id: "free-storage",
        name: "Premium Storage",
        icon: "gift",
        enabled: true,
      },
      {
        id: "platinum-benefits",
        name: "Platinum Benefits",
        icon: "medal",
        enabled: true,
      },
      {
        id: "concierge",
        name: "Concierge Service",
        icon: "star",
        enabled: true,
      },
      {
        id: "priority-support",
        name: "Priority Support",
        icon: "shield",
        enabled: true,
      },
    ],
  },
];

// Helper function to find a tier by ID
export const findTierById = (tierId: string): Tier | undefined => {
  return tiers.find((tier) => tier.id === tierId);
};

// Helper function to get the next tier
export const getNextTier = (currentTierId: string): Tier | undefined => {
  const currentTierIndex = tiers.findIndex((tier) => tier.id === currentTierId);
  if (currentTierIndex !== -1 && currentTierIndex < tiers.length - 1) {
    return tiers[currentTierIndex + 1];
  }
  return undefined;
};

// Helper function to check if a user can upgrade to a tier
export const canUpgradeToTier = (
  userPoints: number,
  currentTierId: string,
  targetTierId: string
): boolean => {
  const targetTier = findTierById(targetTierId);
  const currentTierIndex = tiers.findIndex((tier) => tier.id === currentTierId);
  const targetTierIndex = tiers.findIndex((tier) => tier.id === targetTierId);
  
  if (!targetTier) return false;
  
  return (
    userPoints >= targetTier.requiredPoints && targetTierIndex > currentTierIndex
  );
};
