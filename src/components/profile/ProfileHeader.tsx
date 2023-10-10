import { UserProfile, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

interface ProfileHeaderProps {
  profile: UserProfile;
  playlists: SimplifiedPlaylist[];
}

function ProfileHeader({ profile, playlists }: ProfileHeaderProps) {
  return (
    <section className="flex w-full max-h-80 bg-white bg-opacity-20 rounded-md">
      <div className="my-8 flex justify-start">
        <div className="flex items-center ml-4">
          {profile.images.length && profile.images[1].url && (
            <img
              className="w-64 h-64 rounded-full mr-4"
              src={profile.images[1].url}
              alt="Avatar"
            />
          )}
          <div>
            <div className="text-8xl font-semibold text-white mb-5">
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
