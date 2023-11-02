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
      <div className="flex flex-col items-center p-4 mb-4 ml-4 mr-4 transition duration-300 bg-white rounded-lg h-72 w-60 min-w-64 text-slate-100 hover:bg-slate-300 hover:bg-opacity-60 hover:pt-3 bg-opacity-40 drop-shadow-lg">
        <img
          className="max-w-full mt-4 max-h-40"
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
