import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { UserProfile } from "@spotify/web-api-ts-sdk";

type TopTracksHeaderProps = {
  profile: UserProfile | undefined;
};

export const TopTracksHeader: React.FC<TopTracksHeaderProps> = ({
  profile,
}) => {
  return (
    <>
      <div className="flex flex-col pt-2 pb-2 bg-black bg-opacity-10">
        <Logo />
        <div className="flex flex-row">
          {profile && (
            <img
              src={profile.images[1].url}
              alt="your-profile-picture"
              className="w-56 h-56 ml-4 rounded-full"
            />
          )}
          <div className="flex flex-col">
            <h1 className="mt-24 ml-6 text-6xl font-bold text-white">
              Top tracks
            </h1>
            <h3 className="mt-1 mb-2 text-lg text-white ml-28">
              {" "}
              your most listened tracks
            </h3>
            <div className="flex flex-row ml-5 text-xs text-slate-100">
              <Link to={"/"}>
                <p>Profile</p>
              </Link>
              <p className="ml-2">/ Top Tracks</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
