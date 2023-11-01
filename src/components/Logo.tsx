import logo from "../styles/img/spotify_logologo.jpg";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Logo() {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <img
            className="w-24 h-24 rounded-full"
            src={logo}
            alt="Spotify Logo"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-purple-600">
          <DropdownMenuLabel>Links</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={`/`}>
            <DropdownMenuItem className="cursor-pointer  hover:bg-slate-100">
              Profile
            </DropdownMenuItem>
          </Link>
          <Link to={`/top-artists`}>
            <DropdownMenuItem className="cursor-pointer font-extralight hover:bg-slate-100">
              {" "}
              Artists
            </DropdownMenuItem>
          </Link>
          <Link to={`/top-tracks`}>
            <DropdownMenuItem className="cursor-pointer font-extralight hover:bg-slate-100">
              {" "}
              Tracks
            </DropdownMenuItem>
          </Link>

          <Link to={`/playlists`}>
            <DropdownMenuItem className="cursor-pointer font-extralight hover:bg-slate-100">
              {" "}
              Playlists
            </DropdownMenuItem>
          </Link>
          <Link to={`/liked-songs`}>
            <DropdownMenuItem className="cursor-pointer  hover:bg-slate-100">
              Liked Songs
            </DropdownMenuItem>
          </Link>
          <Link to={`/recommendation`}>
            <DropdownMenuItem className="cursor-pointer  hover:bg-slate-100">
              Recommendations Liszt
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Logo;
