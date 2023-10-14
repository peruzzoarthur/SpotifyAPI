import { AudioFeaturesWithListOrder } from "../../pages/LikedSongs";

interface SelectAudioFeatureProps {
  sortOptions: string[];
  setSortValue: React.Dispatch<
    React.SetStateAction<keyof AudioFeaturesWithListOrder>
  >;
}

function SelectAudioFeature({
  sortOptions,
  setSortValue,
}: SelectAudioFeatureProps) {
  return (
    <div className="mb-2 ">
      <label className="text-black text-xl mr-1">Sort by Audio Feature: </label>
      <select
        className="h-7 w-44 bg-slate-900 bg-opacity-60 text-slate-100 text-center rounded-2xl"
        name="track-order"
        id="order-select"
        onChange={(e) =>
          setSortValue(e.target.value as keyof AudioFeaturesWithListOrder)
        }
      >
        <option value="">Sort tracks</option>
        {sortOptions.map((option, i) => (
          <option value={option} key={i}>
            {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectAudioFeature;
