import { type FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={`p-4 ${className || ""}`}>{children}</div>;
};

export default Container;
