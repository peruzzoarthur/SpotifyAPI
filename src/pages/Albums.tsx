import { Container } from "@/components/Container";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { AlbumsSection } from "@/components/albums/AlbumsSection";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useGetSavedAlbums } from "@/hooks/useGetSavedAlbums";
import { useSdk } from "@/hooks/useSdk";
import React from "react";

export const Albums: React.FC = () => {
  const sdk = useSdk();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    savedAlbums,
  } = useGetSavedAlbums({ sdk });

  if (error instanceof Error) {
    <div>{error.message}</div>;
  }
  return (
    <>
      <AnalogBackground>
        {data && (
          <Container>
            <AlbumsSection savedAlbums={savedAlbums}>
              <LoadMoreButton
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
              />
            </AlbumsSection>
          </Container>
        )}
      </AnalogBackground>
    </>
  );
};
