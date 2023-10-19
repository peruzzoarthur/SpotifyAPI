import { Link } from "react-router-dom";

function TopTracksHeader() {
  return (
    <div className="bg-slate-800 bg-opacity-90 h-60">
      <h1 className="text-indigo-400 text-8xl pt-2 mb-2">Top Tracks</h1>
      <div>
        <div className="flex flex-row text-2xl ml-5 text-slate-200">
          <Link to={"/"}>
            <p>Profile</p>
          </Link>
          <p className="ml-2">/ Top Tracks</p>
        </div>
      </div>
    </div>
  );
}

export default TopTracksHeader;
