import Logo from "../Logo";

function RecommendationHeader() {
  return (
    <div className="flex flex-col bg-white bg-opacity-10 h-320">
      <Logo />
      <div className="flex flex-col items-start justify-end h-full mb-6">
        <h1 className="ml-3 text-6xl text-white">Get Recommendations Tracks</h1>
        <div>
          <div className="mt-2 ml-4 text-2xl text-white">
            Discover new music
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationHeader;
