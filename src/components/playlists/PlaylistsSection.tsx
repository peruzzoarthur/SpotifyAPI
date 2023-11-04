import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";
import { PlaylistCard } from "../PlaylistCard";

interface PlaylistSectionProps {
  playlists: SimplifiedPlaylist[] | undefined;
}

function PlaylistsSection({ playlists }: PlaylistSectionProps) {
  return (
    <>
      <div className="bg-slate-950 bg-opacity-80 ">
        <section className="w-full h-auto pb-2 bg-white bg-opacity-20">
          <div className="flex flex-col items-center justify-center pt-4 pb-2 pl-4 pr-4"></div>
          <section className="w-full h-auto pb-2">
            <div className="grid grid-flow-row-dense grid-cols-1 mt-5 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 // xl:grid-cols-5 2xl:grid-cols-5 ">
              {playlists?.map((playlist, index) => (
                <Link key={index} to={`/playlists/${playlist.id}`}>
                  <PlaylistCard
                    image={playlist.images}
                    name={playlist.name}
                    totalTracks={playlist.tracks?.total}
                  />
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default PlaylistsSection;
