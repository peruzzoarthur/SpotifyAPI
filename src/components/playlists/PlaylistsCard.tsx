interface PlaylistsCardProps {
  image: string;
  name: string | undefined;
  index: number;
  id: string;
}
function PlaylistsCard({ image, name, index }: PlaylistsCardProps) {
  return (
    <div
      key={index}
      className="flex flex-col pt-4 m-4 items-center w-300 h-400
     text-slate-200 bg-slate-400 bg-opacity-30 drop-shadow-lg rounded-lg 
     hover:bg-purple-200 hover:bg-opacity-30 hover:shadow-md duration-500 ease-in-out"
    >
      <div className="flex flex-col items-center hover:pt-2">
        <img src={image} alt={name} className="mt-6 mb-4 w-48 " />
        <h2 className="text-lg font-bold">{name}</h2>
      </div>
    </div>
  );
}

export default PlaylistsCard;
