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
        <h1 className="text-white text-8xl">Playlists</h1>
        <div className="grid grid-rows-2 grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ml-5 mt-5">
          {playlists.map((playlist, index) => (
            <ProfilePlaylistsCard
              key={index}
              image={playlist.images}
              name={playlist.name}
              totalTracks={playlist.tracks?.total}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default ProfilePlaylistsSection;
