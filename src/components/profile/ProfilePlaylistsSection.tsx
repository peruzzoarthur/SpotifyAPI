import ProfilePlaylistsCard from "./ProfilePlaylistsCard";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";

interface ProfilePlaylistSectionProps {
  playlists: SimplifiedPlaylist[];
}

function ProfilePlaylistsSection({ playlists }: ProfilePlaylistSectionProps) {
  return (
    <>
      <section className="bg-white bg-opacity-20 w-full h-auto">
        <h1 className="text-white text-8xl pt-4 pl-2 ml-4 pb-2">Playlists</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 ml-5 mt-5 gap-5">
          {playlists.map((playlist, index) => (
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
