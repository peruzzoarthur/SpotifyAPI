import { UserProfile, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

interface ProfileHeaderProps {
  profile: UserProfile;
  playlists: SimplifiedPlaylist[];
}

function ProfileHeader({ profile, playlists }: ProfileHeaderProps) {
  return (
    <section className="flex w-full max-h-80 bg-slate-800 bg-opacity-40">
      <div className="my-8 flex justify-between ml-8">
        <div className="flex items-center">
          {profile.images.length && profile.images[1].url && (
            <img
              className="w-64 h-64 rounded-full mr-4"
              src={profile.images[1].url}
              alt="Avatar"
            />
          )}
          <div className="ml-5">
            <div className="text-8xl font-semibold text-white mb-5 mt-8">
              {profile.display_name}
            </div>
            <div className="text-white ml-2 text-left text-lg">
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
