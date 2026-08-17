export const calculateBasePrice = (hours: number): number => {
  let total = 0;

  if (hours < 3) {
    total = hours * 30;
  } else if (3 <= hours && hours <= 5) {
    total = hours * 25;
  } else {
    total = hours * 20;
  }

  return total;
};

export const calculateEngineerFee = (hours: number): number => {
  return hours * 30;
};

export const calculateTotalPrice = (
  hours: number,
  includeEngineer: boolean
): number => {
  const basePrice = calculateBasePrice(hours);
  const engineerFee = includeEngineer ? calculateEngineerFee(hours) : 0;

  return basePrice + engineerFee;
};

export interface PriceBreakdown {
  basePrice: number;
  engineerFee: number;
  totalPrice: number;
  hours: number;
}

export const getPriceBreakdown = (
  hours: number,
  includeEngineer: boolean
): PriceBreakdown => {
  const basePrice = calculateBasePrice(hours);
  const engineerFee = includeEngineer ? calculateEngineerFee(hours) : 0;
  const totalPrice = basePrice + engineerFee;

  return {
    basePrice,
    engineerFee,
    totalPrice,
    hours,
  };
};
