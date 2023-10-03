import { useState, useEffect } from "react";
import { getTopArtists } from "../spotify";
import { catchErrors } from "../utils";
import {
  ArtistsGrid,
  SectionWrapper,
  TimeRangeButtons,
  Loader,
} from "../components";
import { GlobalStyle } from "../styles";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Artist, Page, SpotifyApi } from "@spotify/web-api-ts-sdk";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState<Page<Artist>>();
  const [activeRange, setActiveRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    const fetchData = async () => {
      if (!sdk) {
        return;
      }
      const data = await sdk.currentUser.topItems("artists", activeRange);
      setTopArtists(data);
    };

    catchErrors(fetchData());
  }, [sdk, activeRange]);

  return (
    <main>
      <GlobalStyle />
      <SectionWrapper title="Top Artists" breadcrumb={true}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />

        {topArtists && topArtists.items ? (
          <ArtistsGrid artists={topArtists.items} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopArtists;
