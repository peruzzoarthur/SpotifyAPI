import ProfilePlaylistsCard from "./ProfilePlaylistsCard";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";

interface ProfilePlaylistSectionProps {
  playlists: SimplifiedPlaylist[];
}

function ProfilePlaylistsSection({ playlists }: ProfilePlaylistSectionProps) {
  return (
    <>
      <section className="bg-white bg-opacity-10 w-full h-auto">
        <h1 className="text-white text-8xl ml-8 pt-10">Playlists</h1>
        <div className="grid grid-rows-2 grid-cols-6 ml-5 mt-5">
          {playlists.map((playlist, index) => (
            <Link to={`/playlists/${playlist.id}`} key={index}>
              <ProfilePlaylistsCard
                image={playlist.images}
                name={playlist.name}
                totalTracks={playlist.tracks?.total}
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProfilePlaylistsSection;
