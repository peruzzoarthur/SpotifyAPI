import { MaxInt } from "@spotify/web-api-ts-sdk";
import { TopArtistsSelectPageSize } from ".";
import { SelectOrderByTimeRange } from "..";
import { TimeRange } from "../../pages/TopArtists";

interface TopArtistsOptionsProps {
  setPageSize: React.Dispatch<React.SetStateAction<MaxInt<50>>>;
  setActiveRange: React.Dispatch<
    React.SetStateAction<"short_term" | "medium_term" | "long_term">
  >;
}

function TopArtistsOptions({
  setPageSize,
  setActiveRange,
}: TopArtistsOptionsProps) {
  const handlePageSizeChange = (size: MaxInt<50>) => {
    setPageSize(size);
  };

  const handleActiveRange = (timeRange: TimeRange["value"]) => {
    setActiveRange(timeRange);
  };
  return (
    <div className="w-full h-20 flex flex-col items-center justify-center bg-slate-800 bg-opacity-90">
      <TopArtistsSelectPageSize handlePageSizeChange={handlePageSizeChange} />
      <SelectOrderByTimeRange handleOrderByTimeRange={handleActiveRange} />
    </div>
  );
}

export default TopArtistsOptions;
