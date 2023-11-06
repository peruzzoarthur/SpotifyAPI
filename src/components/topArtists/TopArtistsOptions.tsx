import { Artist } from "@spotify/web-api-ts-sdk";
import { SelectOrderByTimeRange } from "..";
import { TimeRange } from "../../pages/TopArtists";

type TopArtistsOptionsProps = {
  setActiveRange: React.Dispatch<
    React.SetStateAction<"short_term" | "medium_term" | "long_term">
  >;
  setTopArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
  activeRange: TimeRange["value"];
};

export const TopArtistsOptions = ({
  setActiveRange,
  setTopArtists,
  activeRange,
}: TopArtistsOptionsProps) => {
  const handleActiveRange = (timeRange: TimeRange["value"]) => {
    setTopArtists([]);
    setActiveRange(timeRange);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-20 bg-black bg-opacity-10">
      {/* <TopArtistsSelectPageSize handlePageSizeChange={handlePageSizeChange} /> */}
      <SelectOrderByTimeRange
        handleOrderByTimeRange={handleActiveRange}
        activeRange={activeRange}
      />
    </div>
  );
};
