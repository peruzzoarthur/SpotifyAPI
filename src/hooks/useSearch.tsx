import {
  Album,
  Artist,
  ItemTypes,
  SpotifyApi,
  Track,
} from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

type useSearchProps = {
  searchInput: string | undefined;
  sdk: SpotifyApi;
  firstRender: boolean;
};

type SearchingReturnedObject = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};
export const useSearch = ({
  searchInput,
  sdk,
  firstRender,
}: useSearchProps) => {
  const types: ItemTypes[] = ["artist", "album", "track"];
  const { data } = useQuery<SearchingReturnedObject | undefined>({
    queryKey: ["search", searchInput, types, firstRender],
    queryFn: async () => {
      if (searchInput === undefined || firstRender === true) {
        return { albums: [], artists: [], tracks: [] };
      }
      const search = await sdk.search(searchInput, types, undefined, 5);

      if (!search.artists || !search.albums || !search.tracks) {
        throw new Error("Failed fetching");
      }
      const artistIds = search.artists.items.map((a) => a.id);
      const artists = await sdk.artists.get(artistIds);

      const albumsIds = search.albums.items.map((ab) => ab.id);
      const albums = await sdk.albums.get(albumsIds);

      const tracksIds = search.tracks.items.map((t) => t.id);
      const tracks = await sdk.tracks.get(tracksIds);

      return { artists, albums, tracks };
    },
    enabled: !!sdk,
  });
  return { data };
};
