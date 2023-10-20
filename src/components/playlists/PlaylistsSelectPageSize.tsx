import { MaxInt, Page, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

interface SelectPageSizeProps {
  handlePageSizeChange: (size: MaxInt<50>) => void;
  playlistData: Page<SimplifiedPlaylist> | undefined;
}

function PlaylistsSelectPageSize({
  handlePageSizeChange,
  playlistData,
}: SelectPageSizeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value) as MaxInt<50>;
    handlePageSizeChange(selectedValue);
  };
  return (
    <div>
      <label className="text-black text-xl mr-1">Select Page Size: </label>
      <select
        className="h-7 w-10  bg-purple-900 bg-opacity-50 text-slate-900 text-end rounded-xl"
        onChange={handleChange}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value={playlistData?.total}>All</option>
      </select>
    </div>
  );
}

export default PlaylistsSelectPageSize;
