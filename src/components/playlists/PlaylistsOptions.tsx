import { MaxInt } from "@spotify/web-api-ts-sdk";
import { PlaylistsSelectPageSize } from ".";

interface TopTracksOptionsProps {
  setPageSize: React.Dispatch<React.SetStateAction<MaxInt<50>>>;
}

function PlaylistsOptions({ setPageSize }: TopTracksOptionsProps) {
  const handlePageSizeChange = (size: MaxInt<50>) => {
    setPageSize(size);
  };
  return (
    <div className="w-full h-20 flex flex-col items-center justify-center bg-purple-900 bg-opacity-20">
      <PlaylistsSelectPageSize handlePageSizeChange={handlePageSizeChange} />
    </div>
  );
}

export default PlaylistsOptions;
