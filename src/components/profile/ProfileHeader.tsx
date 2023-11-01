import { UserProfile, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

interface ProfileHeaderProps {
  profile: UserProfile;
  playlists: SimplifiedPlaylist[];
}

function ProfileHeader({ profile, playlists }: ProfileHeaderProps) {
  return (
    <section className="flex w-full max-h-80 bg-slate-600 bg-opacity-40">
      <div className="flex justify-between my-8 ml-8">
        <div className="flex items-center">
          {profile.images.length && profile.images[1].url && (
            <img
              className="w-64 h-64 mr-4 rounded-full"
              src={profile.images[1].url}
              alt="Avatar"
            />
          )}
          <div className="ml-5">
            <div className="mt-8 mb-5 font-semibold text-white text-8xl">
              {profile.display_name}
            </div>
            <div className="ml-2 text-lg text-left text-white">
              {playlists && (
                <p>
                  {playlists.length} Playlist
                  {playlists.length !== 1 ? "s" : " "}
                </p>
              )}
              <p className="text-base">
                {profile.followers.total} Follower
                {profile.followers.total !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
