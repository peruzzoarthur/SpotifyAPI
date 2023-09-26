import { useState, useEffect } from "react";
import { accessToken, logout, getCurrentUserProfile } from "../spotify";
import { catchErrors } from "../utils/error";
import { GlobalStyle } from "../styles";
import { Login, Profile } from ".";
import styled from "styled-components";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

const Home = () => {
  const [token, setToken] = useState<string>("");
  const [_, setProfile] = useState<any>("");

  useEffect(() => {
    setToken(accessToken as string);
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    catchErrors(fetchData());
  }, []);
  return (
    <div>
      <div className="App">
        <GlobalStyle />
        <header className="App-header">
          {!token ? (
            <Login />
          ) : (
            <>
              <Profile />
              <StyledLogoutButton onClick={logout}>Log out</StyledLogoutButton>
            </>
          )}
        </header>
      </div>
    </div>
  );
};

export default Home;
