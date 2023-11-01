import { MaxInt, Page, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { PlaylistsSelectPageSize } from ".";

interface PlaylistOptionsProps {
  setPageSize: React.Dispatch<React.SetStateAction<MaxInt<50>>>;
  playlistData: Page<SimplifiedPlaylist> | undefined;
}

function PlaylistsOptions({ setPageSize, playlistData }: PlaylistOptionsProps) {
  const handlePageSizeChange = (size: MaxInt<50>) => {
    setPageSize(size);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-20 bg-purple-900 bg-opacity-20">
      <PlaylistsSelectPageSize
        handlePageSizeChange={handlePageSizeChange}
        playlistData={playlistData}
      />
    </div>
  );
}

export default PlaylistsOptions;
