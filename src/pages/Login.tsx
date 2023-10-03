import styled from "styled-components";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, redirect_url, scopes } from "../spotify";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const Login = () => {
  return (
    <button
      onClick={() => {
        SpotifyApi.performUserAuthorization(
          "97933b9989f64dbf99d1edffd9c91f0f",
          "http://localhost:5173/",
          [
            "user-library-read",
            "playlist-read-private",
            "user-read-private user-read-email user-top-read",
          ],
          "http://localhost:3000/callback"
        );
      }}
    >
      Login
    </button>
  );
};

export default Login;
