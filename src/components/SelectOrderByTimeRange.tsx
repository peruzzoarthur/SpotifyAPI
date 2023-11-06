import React from "react";
import { TimeRange } from "../pages/TopArtists";

interface SelectOrderByTimeRangeProps {
  handleOrderByTimeRange: (timeRange: TimeRange["value"]) => void;
  activeRange: TimeRange["value"];
}

function SelectOrderByTimeRange({
  handleOrderByTimeRange,
  activeRange,
}: SelectOrderByTimeRangeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as TimeRange["value"];
    handleOrderByTimeRange(selectedValue);
  };
  return (
    <div>
      <label className="text-xl text-white ">Select Time Range: </label>
      <select
        className="w-auto text-center bg-purple-200 bg-opacity-50 h-7 text-slate-100 rounded-xl"
        onChange={handleChange}
        value={activeRange}
      >
        <option value="short_term">4 Weeks</option>
        <option value="medium_term">6 Months</option>
        <option value="long_term">Lifetime</option>
      </select>
    </div>
  );
}

export default SelectOrderByTimeRange;
