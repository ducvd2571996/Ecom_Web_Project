// utils/formatPrice.ts

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0, // No decimal places
    maximumFractionDigits: 0, // No decimal places
  }).format(price); // Use the price directly without division
};
