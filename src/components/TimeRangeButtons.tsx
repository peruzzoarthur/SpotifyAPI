import React from "react";

interface TimeRangeButtonProps {
  activeRange: "short_term" | "medium_term" | "long_term";
  setActiveRange: React.Dispatch<
    React.SetStateAction<"short_term" | "medium_term" | "long_term">
  >;
}

const TimeRangeButtons: React.FC<TimeRangeButtonProps> = ({
  activeRange,
  setActiveRange,
}) => {
  return (
    <>
      <li>
        <button
          className={activeRange === "short_term" ? "active" : ""}
          onClick={() => setActiveRange("short_term")}
        >
          This Month
        </button>
      </li>
      <li>
        <button
          className={activeRange === "medium_term" ? "active" : ""}
          onClick={() => setActiveRange("medium_term")}
        >
          Last 6 Months
        </button>
      </li>
      <li>
        <button
          className={activeRange === "long_term" ? "active" : ""}
          onClick={() => setActiveRange("long_term")}
        >
          All Time
        </button>
      </li>
    </>
  );
};

export default TimeRangeButtons;

// my props are settled to a type any. what if i want to say that activeRange is of type <"short_term" | "medium_term" | "long_term"> and setActiveRange is of type
// React.Dispatch<React.SetStateAction<"short_term" | "medium_term" | "long_term">>
