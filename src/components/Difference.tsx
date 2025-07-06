import { type FC } from "react";
import Container from "./Container";

interface DifferenceProps {
  label: string;
  differenceInPercentage: number;
  isHighDifference: boolean;
}

const Difference: FC<DifferenceProps> = ({
  label,
  isHighDifference,
  differenceInPercentage,
}) => {
  return (
    <Container className="bg-gray-100 rounded-lg shadow-md">
      <p>{label}</p>
      <p
        className={`text-2xl font-bold ${
          isHighDifference ? "text-red-500" : "text-green-500"
        }`}
      >
        {differenceInPercentage.toFixed(1)}%
      </p>
    </Container>
  );
};

export default Difference;
