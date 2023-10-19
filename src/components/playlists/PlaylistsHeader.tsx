import { Link } from "react-router-dom";

function PlaylistsHeader() {
  return (
    <div className="bg-purple-950 bg-opacity-90  h-60">
      <h1 className="text-indigo-200 text-8xl pt-2 mb-2">Playlists</h1>
      <div>
        <div className="flex flex-row text-2xl ml-5 text-indigo-100">
          <Link to={"/"}>
            <p>Profile</p>
          </Link>
          <p className="ml-2">/ Playlists</p>
        </div>
      </div>
    </div>
  );
}

export default PlaylistsHeader;
