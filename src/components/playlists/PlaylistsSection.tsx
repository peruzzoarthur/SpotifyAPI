import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { PlaylistsCard } from ".";
import { Link } from "react-router-dom";

interface PlaylistSectionProps {
  playlists: SimplifiedPlaylist[];
}

function PlaylistsSection({ playlists }: PlaylistSectionProps) {
  return (
    <>
      <div className="bg-slate-950 bg-opacity-80 ">
        <section className="bg-white bg-opacity-20 w-full h-auto pb-2">
          <div className="flex flex-col justify-center items-center pl-4 pr-4 pt-4 pb-2"></div>
          <section className="w-full h-auto pb-2">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
         xl:grid-cols-5 2xl:grid-cols-5 grid-flow-row-dense ml-5 mr-5 mt-5  "
            >
              {playlists?.map((playlist, index) => (
                <Link key={index} to={`/playlists/${playlist.id}`}>
                  <PlaylistsCard
                    image={playlist.images[0].url}
                    name={playlist.name}
                    index={index}
                    id={playlist.id}
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
