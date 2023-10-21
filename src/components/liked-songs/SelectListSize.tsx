import { TrackWithAudioFeatures } from "../../pages/LikedSongs";

interface SelectListSizeProps {
  handlePageSizeChange: (size: number) => void;
  tracks: TrackWithAudioFeatures[] | null;
}

function SelectListSize({ handlePageSizeChange, tracks }: SelectListSizeProps) {
  return (
    <div>
      <label className="text-black text-xl mr-1">Select Page Size: </label>
      <select
        className="h-7 w-12 bg-slate-900 bg-opacity-60 text-slate-100 text-end rounded-2xl"
        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
        <option value={tracks?.length}>All Tracks</option>
      </select>
    </div>
  );
}

export default SelectListSize;
