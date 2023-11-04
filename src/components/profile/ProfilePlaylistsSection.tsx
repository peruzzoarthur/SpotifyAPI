import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { PlaylistCard } from "../PlaylistCard";
import { ShowAllButton } from "../ShowAllButton";

// import { Link } from "react-router-dom";

interface ProfilePlaylistsSectionProps {
  playlists: SimplifiedPlaylist[];
}

export const ProfilePlaylistsSection: React.FC<
  ProfilePlaylistsSectionProps
> = ({ playlists }: ProfilePlaylistsSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center">
        <h2 className="ml-6 text-5xl text-left text-white">Playlists</h2>
        <ShowAllButton url="/playlists" />
      </div>

      <div className="flex flex-col items-start mt-8 ml-6 sm:flex-row sm:flex-wrap sm:mt-8 sm:ml-16">
        {playlists.map((playlist, index) => (
          <div key={index} className="mb-4 mr-4">
            <PlaylistCard
              image={playlist.images}
              name={playlist.name}
              totalTracks={playlist.tracks?.total}
            />
          </div>
        ))}
      </div>
    </>
  );
};
