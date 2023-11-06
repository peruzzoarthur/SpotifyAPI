import React, { ReactNode } from "react";

type ContainerProps = {
  children?: ReactNode;
};

export const ContainerDark: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center text-white bg-black rounded-md bg-opacity-80">
      {children}
    </div>
  );
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center text-white bg-white rounded-md bg-opacity-20">
      {children}
    </div>
  );
};
