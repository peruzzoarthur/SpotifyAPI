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
      <div className="flex flex-row items-start justify-between">
        <h2 className="justify-start ml-6 text-4xl text-left text-white lg:ml-12 sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl">
          Playlists
        </h2>
        <ShowAllButton
          className="mt-1 mr-6 bg-black lg:mt-4 lg:mr-12 hover:bg-opacity-60"
          url="/playlists"
        />
      </div>

      <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {playlists.map((playlist, index) => (
          <div key={index} className="mb-4 mr-4">
            <PlaylistCard
              image={playlist.images}
              name={playlist.name}
              totalTracks={playlist.tracks?.total}
              id={playlist.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};
