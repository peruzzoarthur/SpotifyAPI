import { Artist } from "@spotify/web-api-ts-sdk";

interface SelectPageSizeProps {
  handlePageSizeChange: any;
  artists: Artist[] | null;
}

function SelectPageSize({ handlePageSizeChange }: SelectPageSizeProps) {
  return (
    <div>
      <label className="text-black text-xl mr-1">Select Page Size: </label>
      <select
        className="h-7 w-12 bg-slate-900 bg-opacity-60 text-slate-100 text-end rounded-2xl"
        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}

export default SelectPageSize;
