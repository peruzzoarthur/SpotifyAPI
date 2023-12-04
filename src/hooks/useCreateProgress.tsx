import { useState, useEffect } from "react";

type useCreateProgressProps = {
  initialProgress: number;
  finalProgress: number;
  delay: number;
};

export const useCreateProgress = ({
  initialProgress,
  finalProgress,
  delay,
}: useCreateProgressProps) => {
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(finalProgress);
    }, delay);

    return () => clearTimeout(timer);
  }, [finalProgress, delay]);

  return progress;
};
