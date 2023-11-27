import { Container } from "@/components/Container";
import { AlbumByIdHeader } from "@/components/albumById/AlbumByIdHeader";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useAlbumByIdGetTracks } from "@/hooks/useAlbumByIdGetTracks";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const AlbumById: React.FC = () => {
  const sdk: SpotifyApi = useSdk();

  const { data, error } = useAlbumByIdGetTracks({ sdk });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <AnalogBackground>
        <AlbumByIdHeader sdk={sdk} />
        <Container>
          {data.pages[0].items.map((t, index) => (
            <h1 key={index} className="text-black">
              {t.name}
            </h1>
          ))}
        </Container>
      </AnalogBackground>
    </>
  );
};
