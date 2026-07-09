export const sdgColors: Record<number, string> = {
  1: "#E5243B", // No Poverty
  2: "#DDA63A", // Zero Hunger
  7: "#FCC30B", // Affordable and Clean Energy
  8: "#A21942", // Decent Work and Economic Growth
  9: "#FD6925", // Industry, Innovation and Infrastructure
  11: "#FD9D24", // Sustainable Cities and Communities
  13: "#3F7E44", // Climate Action
};

export const sdgTitles: Record<number, string> = {
  1: "No Poverty",
  2: "Zero Hunger",
  7: "Affordable and Clean Energy",
  8: "Decent Work and Economic Growth",
  9: "Industry, Innovation and Infrastructure",
  11: "Sustainable Cities and Communities",
  13: "Climate Action",
};

export const sdgLabel = (sdgNumber: string | number): string => {
  const id = Number(sdgNumber);
  return sdgTitles[id] ?? `SDG ${id}`;
};
