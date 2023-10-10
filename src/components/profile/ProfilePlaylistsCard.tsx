import { Image } from "@spotify/web-api-ts-sdk";

interface PlaylistsCardProps {
  image: Image[];
  name: string;
  totalTracks: number | undefined;
}

function ProfilePlaylistsCard({
  image,
  name,
  totalTracks,
}: PlaylistsCardProps) {
  return (
    <>
      <div className="flex flex-col items-center text-slate-100 bg-white bg-opacity-20 drop-shadow-lg rounded-lg p-4 w-64 h-72 mt-4 mb-4 ml-4 mr-4">
        <img className="max-h-48 max-w-48" src={image[0].url} alt={name} />
        <p className="mt-2">{name}</p>
        <p>Total Tracks: {totalTracks}</p>
      </div>
    </>
  );
}

export default ProfilePlaylistsCard;
