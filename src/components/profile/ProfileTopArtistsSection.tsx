import { Artist } from "@spotify/web-api-ts-sdk";
import ProfileTopArtistsCard from "./ProfileTopArtistsCard";
import ProfileShowAllButton from "./ProfileShowAllButton";

interface ProfileTopArtistsSectionProps {
  topArtists: Artist[];
}

function ProfileTopArtistsSection({
  topArtists,
}: ProfileTopArtistsSectionProps) {
  const top666Artists = topArtists.slice(0, 6);

  return (
    <>
      <section className="bg-white bg-opacity-60 w-full h-auto">
        <div className="flex items-center justify-between pl-4 pr-4 pt-4 pb-2">
          <h1 className="text-slate-800 text-8xl">Top Artists</h1>
          <ProfileShowAllButton url={`/top-artists/`} />
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
         xl:grid-cols-5 2xl:grid-cols-6 grid-flow-row ml-5 mr-5 mt-5 "
        >
          {top666Artists.map((artist, index) => (
            <div
              key={index}
              className="min-w-1/2 sm:min-w-1/2 md:min-w-1/3 lg:min-w-1/4 xl:min-w-1/5 2xl:min-w-1/5"
            >
              <ProfileTopArtistsCard name={artist.name} image={artist.images} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default ProfileTopArtistsSection;
