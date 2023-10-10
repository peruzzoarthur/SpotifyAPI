import { Image } from "@spotify/web-api-ts-sdk";

interface PlaylistInfoCardProps {
  image: Image[];
  name: string;
  totalTracks: number | undefined;
}

function PlaylistInfoCard({ image, name, totalTracks }: PlaylistInfoCardProps) {
  return (
    <>
      <div className="flex flex-col items-center text-slate-100 bg-white bg-opacity-20 drop-shadow-lg rounded-lg p-4 mb-4 ml-4 mr-4">
        <img className="max-h-40 max-w-full" src={image[0].url} alt={name} />
        <p className="mt-2 text-xs">{name}</p>
        <p className="text-xs">Total Tracks: {totalTracks}</p>
      </div>
    </>
  );
}

export default PlaylistInfoCard;
