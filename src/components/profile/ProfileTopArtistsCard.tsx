import { Image } from "@spotify/web-api-ts-sdk";

interface ProfileTopArtistsCardProps {
  image: Image[];
  name: string;
}

function ProfileTopArtistsCard({ image, name }: ProfileTopArtistsCardProps) {
  return (
    <>
      <div
        className="flex flex-col transition duration-300 h-72 w-60 min-w-64 items-center text-slate-100 bg-slate-900
       hover:bg-purple-950 hover:bg-opacity-40 hover:pt-3 bg-opacity-80 drop-shadow-lg rounded-lg p-4 mb-4 ml-4 mr-4"
      >
        <img
          className="w-40 h-40 rounded-full object-cover mt-4"
          src={image[0].url}
          alt={name}
        />
        <p className="mt-2 text-sm-">{name}</p>
      </div>
    </>
  );
}

export default ProfileTopArtistsCard;
