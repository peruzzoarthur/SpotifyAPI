import { Container } from "@/components/Container";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { AlbumByIdHeader } from "@/components/albumById/AlbumByIdHeader";
import { AlbumByIdSection } from "@/components/albumById/AlbumByIdSection";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useAlbumByIdGetInfo } from "@/hooks/useAlbumByIdGetInfo";
import { useAlbumByIdGetTracks } from "@/hooks/useAlbumByIdGetTracks";
import { useConvertSimplifiedTrackToTrackWithAudioFeatures } from "@/hooks/useConvertSimplifiedTrackToTrack";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const AlbumById: React.FC = () => {
  const sdk: SpotifyApi = useSdk();

  const { albumData } = useAlbumByIdGetInfo({ sdk });

  const {
    pagedSimplifiedTracks,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAlbumByIdGetTracks({ sdk });

  const ids = pagedSimplifiedTracks?.pages.flatMap((p) =>
    p.items.map((st) => st.id)
  );

  const { tracksData } = useConvertSimplifiedTrackToTrackWithAudioFeatures({
    ids,
    sdk,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!tracksData || !albumData) {
    return <div>Loading</div>;
  }

  return (
    <>
      <AnalogBackground>
        <AlbumByIdHeader albumData={albumData} />
        <Container>
          <AlbumByIdSection albumData={albumData} tracks={tracksData} />
          <LoadMoreButton
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Container>
      </AnalogBackground>
    </>
  );
};
