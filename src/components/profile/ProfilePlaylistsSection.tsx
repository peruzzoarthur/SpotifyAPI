import ProfilePlaylistsCard from "./ProfilePlaylistsCard";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";
import ProfileShowAllButton from "./ProfileShowAllButton";

interface ProfilePlaylistSectionProps {
  playlists: SimplifiedPlaylist[];
}

function ProfilePlaylistsSection({ playlists }: ProfilePlaylistSectionProps) {
  const sixPlaylists = playlists.slice(0, 6);
  return (
    <>
      <section className="bg-purple-800 bg-opacity-20 w-full h-auto">
        <div className="flex items-center justify-between pl-4 pr-4 pt-4 pb-2">
          <h1 className="text-white text-8xl pt-4 pl-2 ml-4 pb-2">Playlists</h1>
          <ProfileShowAllButton url={`/playlists/`} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 grid-flow-row ml-5 mr-5 mt-5 ">
          {sixPlaylists.map((playlist, index) => (
            <Link to={`/playlists/${playlist.id}`}>
              <div className="min-w-1/2 md:min-w-1/3 lg:min-w-1/4 xl:min-w-1/6">
                <ProfilePlaylistsCard
                  key={index}
                  image={playlist.images}
                  name={playlist.name}
                  totalTracks={playlist.tracks?.total}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProfilePlaylistsSection;
