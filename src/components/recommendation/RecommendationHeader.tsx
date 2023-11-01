import Logo from "../Logo";

function RecommendationHeader() {
  return (
    <div className="flex flex-col bg-opacity-50 bg-slate-950 h-60">
      <Logo />
      <h1 className="ml-3 text-6xl text-black ">Get Recommendations Tracks</h1>
      <div>
        <div className="mt-2 ml-4 text-2xl text-white">Discover new music</div>
      </div>
    </div>
  );
}

export default RecommendationHeader;
