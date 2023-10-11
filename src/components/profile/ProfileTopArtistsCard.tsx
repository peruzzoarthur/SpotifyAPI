import { Image } from "@spotify/web-api-ts-sdk";

interface ProfileTopArtistsCardProps {
  image: Image[];
  name: string;
}

function ProfileTopArtistsCard({ image, name }: ProfileTopArtistsCardProps) {
  return (
    <>
      <div className="flex flex-col h-60 w-52 min-w-200 items-center text-white bg-slate-900 bg-opacity-60 drop-shadow-lg rounded-lg p-4 mb-4 ml-4 mr-4">
        <img
          className="w-40 h-40 rounded-full object-cover"
          src={image[0].url}
          alt={name}
        />
        <p className="mt-2 text-sm-">{name}</p>
      </div>
    </>
  );
}

export default ProfileTopArtistsCard;
