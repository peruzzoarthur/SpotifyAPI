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
      <div
        className="flex flex-col min-w-200 items-center text-slate-100 bg-white bg-opacity-40 drop-shadow-lg rounded-lg p-4 mb-4 ml-4 mr-4"
        style={{ maxWidth: "300px", overflowX: "hidden" }}
      >
        {" "}
        <img className="max-h-40 max-w-full" src={image[0].url} alt={name} />
        <p className="mt-2 text-sm-">{name}</p>
        <p className="text-xs">Total Tracks: {totalTracks}</p>
      </div>
    </>
  );
}

export default ProfilePlaylistCard;
