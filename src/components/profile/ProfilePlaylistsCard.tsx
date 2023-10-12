import { Image } from "@spotify/web-api-ts-sdk";

interface ProfilePlaylistCardProps {
  image: Image[];
  name: string;
  totalTracks: number | undefined;
}

function ProfilePlaylistCard({
  image,
  name,
  totalTracks,
}: ProfilePlaylistCardProps) {
  return (
    <>
      <div className="flex flex-col transition duration-300 h-72 w-60 min-w-64 items-center text-slate-100 bg-white hover:bg-slate-300 hover:bg-opacity-60 hover:pt-3 bg-opacity-40 drop-shadow-lg rounded-lg p-4 mb-4 ml-4 mr-4">
        <img
          className="max-h-40 max-w-full mt-4"
          src={image[0].url}
          alt={name}
        />
        <p className="mt-2 text-sm-">{name}</p>
        <p className="text-xs">Total Tracks: {totalTracks}</p>
      </div>
    </>
  );
}

export default ProfilePlaylistCard;
