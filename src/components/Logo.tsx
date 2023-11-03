import logo from "../styles/img/spotify_logologo.jpg";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Logo() {
  return (
    <div className="flex justify-end mt-1 mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <img
            className="w-24 h-24 rounded-full"
            src={logo}
            alt="Spotify Logo"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-white bg-black w-300 bg-opacity-60">
          {/* <DropdownMenuLabel className="text-xl">Links</DropdownMenuLabel> */}
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Logo;
