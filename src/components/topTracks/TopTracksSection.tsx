import { useContext } from "react";
import { CartContext } from "../recommendation/Recommendation";
import { TopTracksCard } from ".";
import { Track } from "@spotify/web-api-ts-sdk";

interface TopTracksSectionsProps {
  topTracks: Track[] | null;
}

function TopTracksSection({ topTracks }: TopTracksSectionsProps) {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (track: Track) => {
    addToCart(track);
  };
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
              {topTracks?.map((track, index) => (
                <TopTracksCard
                  key={index}
                  id={track.id}
                  image={track.album.images[0].url}
                  name={track.name}
                  artists={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                  handleAddToCart={() => handleAddToCart(track)}
                  index={index}
                />
              ))}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default TopTracksSection;
