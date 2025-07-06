import { type FC } from "react";
import Container from "./Container";

interface RateProps {
  label: string;
  value: number;
}

const Rate: FC<RateProps> = ({ label, value }) => {
  return (
    <Container className="bg-gray-100 rounded-lg shadow-md">
      <p>{label}</p>
      <p className="text-2xl font-bold text-sky-700">
        {value.toFixed(1) + "₴"}
      </p>
    </Container>
  );
};

export default Rate;
