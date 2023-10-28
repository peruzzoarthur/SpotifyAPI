interface PlaylistByIdHeaderProps {
  playlistName: string;
}

function PlaylistByIdHeader({ playlistName }: PlaylistByIdHeaderProps) {
  return (
    <div className="bg-black bg-opacity-50 h-60">
      <h1 className="text-8xl text-black ml-3 pt-12">Playlist</h1>
      <div>
        <div className="text-2xl ml-5 text-slate-200">{playlistName}</div>
      </div>
    </div>
  );
}

export default PlaylistByIdHeader;
