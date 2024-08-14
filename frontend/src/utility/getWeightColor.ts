export const getWeightColor = (weight: number) => {
    if (weight <= 10) return "green";
    else if (weight <= 20) return "blue";
    else if (weight <= 30) return "purple";
    else if (weight <= 40) return "yellow";
    else if (weight > 40) return "orange";
  };