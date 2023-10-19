import React from "react";
import { TimeRange } from "../pages/TopArtists";

interface SelectOrderByTimeRangeProps {
  handleOrderByTimeRange: (timeRange: TimeRange["value"]) => void;
}

function SelectOrderByTimeRange({
  handleOrderByTimeRange,
}: SelectOrderByTimeRangeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as TimeRange["value"];
    handleOrderByTimeRange(selectedValue);
  };
  return (
    <div>
      <label className="text-white text-xl ">Select Time Range: </label>
      <select
        className="h-7 w-auto bg-purple-200 bg-opacity-50 text-slate-100 text-center rounded-xl"
        onChange={handleChange}
      >
        <option value="short_term">4 Weeks</option>
        <option value="medium_term">6 Months</option>
        <option value="long_term">Lifetime</option>
      </select>
    </div>
  );
}

export default SelectOrderByTimeRange;
