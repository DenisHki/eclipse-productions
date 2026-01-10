export const calculateBasePrice = (hours: number): number => {
  let total = 0;

  if (hours <= 3) {
    total = hours * 20;
  } else if (3 < hours && hours <= 7) {
    total = hours * 15;
  } else {
    total = hours * 12.5;
  }

  return total;
};

export const calculateEngineerFee = (hours: number): number => {
  return hours * 10;
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
