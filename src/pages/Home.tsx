import { Profile } from "./Profile";
import { Login } from "./Login";
import { useUserProfile } from "@/hooks/useUserProfile";

export const Home = () => {
  const { data, error, isFetching } = useUserProfile();

  if (error) {
    return (
      <div>
        {error.message} {error.status}
      </div>
    );
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          {!data ? (
            <Login />
          ) : (
            <>{isFetching ? <div>Loading...</div> : <Profile />}</>
          )}
        </header>
      </div>
    </div>
  );
};
