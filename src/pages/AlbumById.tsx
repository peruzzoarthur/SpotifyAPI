import { Container } from "@/components/Container";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { AlbumByIdHeader } from "@/components/albumById/AlbumByIdHeader";
import { AlbumByIdSection } from "@/components/albumById/AlbumByIdSection";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useAlbumByIdGetInfo } from "@/hooks/useAlbumByIdGetInfo";
import { useAlbumByIdGetTracks } from "@/hooks/useAlbumByIdGetTracks";
import { useConvertSimplifiedTrackToTrackWithAudioFeatures } from "@/hooks/useConvertSimplifiedTrackToTrack";
import { useGetArtistPicture } from "@/hooks/useGetArtistPicture";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const AlbumById: React.FC = () => {
  const sdk: SpotifyApi = useSdk();

  const { albumData } = useAlbumByIdGetInfo({ sdk });
  const { artistPicture } = useGetArtistPicture({
    sdk: sdk,
    artistId: albumData?.artists[0].id,
  });

  const {
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ids,
  } = useAlbumByIdGetTracks({ sdk });

  const { tracksData } = useConvertSimplifiedTrackToTrackWithAudioFeatures({
    ids,
    sdk,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        {albumData && (
          <AlbumByIdHeader
            artistPicture={artistPicture}
            albumData={albumData}
          />
        )}
        <Container className="bg-black bg-opacity-60">
          {tracksData && (
            <>
              <AlbumByIdSection albumData={albumData} tracks={tracksData} />
              {hasNextPage && (
                <LoadMoreButton
                  isFetching={isFetching}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              )}
            </>
          )}
        </Container>
      </AnalogBackground>
    </>
  );
};
