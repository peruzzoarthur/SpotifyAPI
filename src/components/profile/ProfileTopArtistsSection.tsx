import { Artist } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";
import ProfileTopArtistsCard from "./ProfileTopArtistsCard";

interface ProfileTopArtistsSectionProps {
  topArtists: Artist[];
}

function ProfileTopArtistsSection({
  topArtists,
}: ProfileTopArtistsSectionProps) {
  const top12Artists = topArtists.slice(0, 12);

  return (
    <>
      <section className="bg-white bg-opacity-60 w-full h-auto">
        <h1 className="text-white text-8xl pt-4 pl-2 ml-4 pb-2">Top Artists</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6   mt-5 ">
          {top12Artists.map((artist, index) => (
            <div className="min-w-1/2 md:min-w-1/3 lg:min-w-1/4 xl:min-w-1/6">
              <ProfileTopArtistsCard
                key={index}
                name={artist.name}
                image={artist.images}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProfileTopArtistsSection;
