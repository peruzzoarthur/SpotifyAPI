import { useState } from "react";
import logo from "../styles/img/spotify_logologo.jpg";
import { Link } from "react-router-dom";

function Logo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleDropdownToggle}
        className="fixed top-4 right-4 z-10 w-24 h-24 rounded-full"
      >
        <img className="w-24 h-24 rounded-full" src={logo} alt="Spotify Logo" />
      </button>
      {isDropdownOpen && (
        <div
          className="fixed top-28 right-4 z-20 bg-purple-500
         bg-opacity-90 p-2 rounded shadow-md"
        >
          <ul className="space-y-2">
            <Link to={`/liked-songs`}>
              <li>Liked songs</li>
            </Link>
            <Link to={`/recommendation`}>
              <li>Recommendation Liszt</li>
            </Link>
            <li>Menu Item 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Logo;
