import logo from "../styles/img/spotify_logologo.jpg";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Logo() {
  return (
    <div className="flex items-center justify-end mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <img
            className="w-16 h-16 rounded-full"
            src={logo}
            alt="Spotify Logo"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-white bg-black w-300 bg-opacity-60">
          <DropdownMenuSeparator />
          <Link to={`/`}>
            <DropdownMenuItem className="text-xl cursor-pointer hover:bg-black hover:bg-opacity-60">
              Profile
            </DropdownMenuItem>
          </Link>
          <Link to={`/top-artists`}>
            <DropdownMenuItem className="text-lg cursor-pointer font-extralight hover:bg-black hover:bg-opacity-60">
              {" "}
              Artists
            </DropdownMenuItem>
          </Link>
          <Link to={`/top-tracks`}>
            <DropdownMenuItem className="text-xl cursor-pointer font-extralight hover:bg-black hover:bg-opacity-60">
              {" "}
              Tracks
            </DropdownMenuItem>
          </Link>

          <Link to={`/playlists`}>
            <DropdownMenuItem className="text-xl cursor-pointer font-extralight hover:bg-black hover:bg-opacity-60">
              {" "}
              Playlists
            </DropdownMenuItem>
          </Link>
          <Link to={`/liked-songs`}>
            <DropdownMenuItem className="text-xl cursor-pointer hover:bg-black hover:bg-opacity-60">
              Liked Songs
            </DropdownMenuItem>
          </Link>
          <Link to={`/recommendation`}>
            <DropdownMenuItem className="text-xl cursor-pointer hover:bg-black hover:bg-opacity-60">
              Recommendations Liszt
            </DropdownMenuItem>
          </Link>
          <Link to={`/search`}>
            <DropdownMenuItem className="text-xl cursor-pointer hover:bg-black hover:bg-opacity-60">
              Search
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Logo;
