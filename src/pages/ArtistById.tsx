import { Container } from "@/components/Container";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { ArtistByIdAlbumsSection } from "@/components/artistById/ArtistByIdAlbumsSection";
import { ArtistByIdHeader } from "@/components/artistById/ArtistByIdHeader";
import { ArtistByIdRelatedArtistsSection } from "@/components/artistById/ArtistByIdRelatedArtistsSection";
import { ArtistByIdTopTracksSection } from "@/components/artistById/ArtistByIdTopTracksSection";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useArtistById } from "@/hooks/useArtistById";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import React from "react";

export const ArtistById: React.FC = () => {
  const sdk: SpotifyApi = useSdk();

  const { artistData, relatedArtists, artistTopTracks, artistAlbums } =
    useArtistById({
      sdk,
    });

  return (
    <>
      <AnalogBackground>
        {artistData && <ArtistByIdHeader artistData={artistData} />}

        {artistTopTracks && (
          <>
            <Container className="bg-black bg-opacity-30">
              <ArtistByIdTopTracksSection tracks={artistTopTracks} />
            </Container>
          </>
        )}

        {artistAlbums && (
          <>
            <Container className="bg-black bg-opacity-40">
              <ArtistByIdAlbumsSection artistAlbums={artistAlbums.albums}>
                <LoadMoreButton
                  fetchNextPage={artistAlbums.fetchNextPage}
                  hasNextPage={artistAlbums.hasNextPage}
                  isFetching={artistAlbums.isFetching}
                  isFetchingNextPage={artistAlbums.isFetchingNextPage}
                />
              </ArtistByIdAlbumsSection>
            </Container>
          </>
        )}
        {relatedArtists && (
          <Container className="bg-black bg-opacity-50">
            <ArtistByIdRelatedArtistsSection artists={relatedArtists.artists} />
          </Container>
        )}
      </AnalogBackground>
    </>
  );
};
