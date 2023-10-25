import { Link } from "react-router-dom";

function TopArtistsHeader() {
  return (
    <div className="bg-slate-600 bg-opacity-90 h-60">
      <h1 className="text-8xl text-slate-800 ml-3 pt-12">Top Artists</h1>
      <div>
        <div className="flex flex-row text-2xl ml-5 text-slate-200">
          <Link to={"/"}>
            <p>Profile</p>
          </Link>
          <p className="ml-2">/ Top Artists</p>
        </div>
      </div>
    </div>
  );
}

export default TopArtistsHeader;