import { Container } from "@/components/Container";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useAlbumById } from "@/hooks/useAlbumById";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const AlbumById = () => {
  const sdk: SpotifyApi = useSdk();

  const { data, error } = useAlbumById({ sdk });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <AnalogBackground>
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
