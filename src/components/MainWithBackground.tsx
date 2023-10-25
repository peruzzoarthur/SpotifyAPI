import { ReactNode } from "react";
import backgroundGradient from "../styles/img/gradient.jpeg";

interface MainWithBackgroundProps {
  children?: ReactNode;
}

function MainWithBackground({ children }: MainWithBackgroundProps) {
  return (
    <main
      className="flex h-auto w-full font-CircularStd"
      style={{
        backgroundImage: `url(${backgroundGradient})`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </main>
  );
}

export default MainWithBackground;