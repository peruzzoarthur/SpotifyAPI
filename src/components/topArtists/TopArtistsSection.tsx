import { useContext } from "react";
import { CartContext } from "../recommendation/RecommendationContext";
import { TopArtistsCard } from ".";
import { Artist } from "@spotify/web-api-ts-sdk";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import logo from "../../styles/img/spotify_logologo.jpg";

interface TopArtistsSectionProps {
  artists: Artist[];
}

function TopArtistsSection({ artists }: TopArtistsSectionProps) {
  const { addToCart, errorMessage, setErrorMessage } = useContext(CartContext);

  const handleAddToCart = (artist: Artist) => {
    addToCart(artist);
  };

  const handleErrorMessage: React.MouseEventHandler<HTMLElement> = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div className="bg-black ">
        {errorMessage && (
          <Alert className="fixed text-white bg-red-800">
            <img className="w-4 h-4" src={logo} />
            <AlertTitle>{errorMessage}</AlertTitle>
            <AlertDescription
              className="cursor-pointer"
              onClick={handleErrorMessage}
            >
              Click to close message.
            </AlertDescription>
          </Alert>
        )}
        <section className="w-full h-auto pb-2 bg-white bg-opacity-20">
          <div className="flex flex-col items-center justify-center pt-4 pb-2 pl-4 pr-4"></div>
          <section className="w-full h-auto pb-2">
            <div className="grid grid-flow-row-dense grid-cols-1 mt-5 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 ">
              {artists?.map((artist, index) => (
                <TopArtistsCard
                  key={index}
                  id={artist.id}
                  image={artist.images}
                  name={artist.name}
                  genres={artist.genres.join(", ")}
                  handleAddToCart={() => handleAddToCart(artist)}
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

export default TopArtistsSection;
