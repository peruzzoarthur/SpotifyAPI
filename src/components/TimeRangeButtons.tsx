import { StyledRangeButtons } from "../styles";

const TimeRangeButtons = ({ activeRange, setActiveRange }: any) => {
  return (
    <StyledRangeButtons>
      <li>
        <button
          className={activeRange === "short" ? "active" : ""}
          onClick={() => setActiveRange("short_term")}
        >
          This Month
        </button>
      </li>
      <li>
        <button
          className={activeRange === "medium" ? "active" : ""}
          onClick={() => setActiveRange("medium_term")}
        >
          Last 6 Months
        </button>
      </li>
      <li>
        <button
          className={activeRange === "long" ? "active" : ""}
          onClick={() => setActiveRange("long_term")}
        >
          All Time
        </button>
      </li>
    </StyledRangeButtons>
  );
};

export default TimeRangeButtons;
