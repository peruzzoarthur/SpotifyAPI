"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Container } from "@/components/Container";
import { useSdk } from "@/hooks/useSdk";
import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { ArtistCardWithAddButton } from "@/components/ArtistCard";
import { TrackCardWithAddButton } from "@/components/TrackCardWithButton";
import { AlbumCard } from "@/components/AlbumCard";

const FormSchema = z.object({
  Search: z.string(),
});

export function Search() {
  const sdk = useSdk();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("not-a-valid-string");
  // FORM CFG

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Search: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setSearchInput(data.Search);
    setFirstRender(false);
  }

  const { data } = useSearch({ searchInput, sdk, firstRender });

  return (
    <AnalogBackground>
      <Container>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex pt-2">
            <FormField
              control={form.control}
              name="Search"
              render={({ field }) => (
                <FormItem className="bg-black rounded-lg w-640 h-9 bg-opacity-70">
                  <FormControl>
                    <Input
                      placeholder="Search here for albums, artists, playlists and tracks"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-black rounded-l-none bg-opacity-60"
            >
              Submit
            </Button>
          </form>
        </Form>
      </Container>
      <h1 className="mt-2 ml-6 text-3xl text-white">Artists</h1>
      <Container className="flex flex-row mt-2">
        {data &&
          data.artists.map((a, index) => (
            <ArtistCardWithAddButton
              key={index}
              image={a.images}
              name={a.name}
              genres={a.genres.join(", ")}
            />
          ))}
      </Container>
      <h1 className="mt-2 ml-6 text-3xl text-white">Albums</h1>
      <Container className="flex flex-row mt-2">
        {data &&
          data.albums.map((ab, index) => (
            <AlbumCard
              key={index}
              artists={ab.artists}
              id={ab.id}
              images={ab.images}
              genres={ab.genres}
              name={ab.name}
            />
          ))}
      </Container>
      <h1 className="mt-2 ml-6 text-3xl text-white">Tracks</h1>
      <Container className="flex flex-row mt-2">
        {data &&
          data.tracks.map((t, index) => (
            <TrackCardWithAddButton
              key={index}
              artists={t.artists.map((a) => a.name).join(", ")}
              name={t.name}
              image={t.album.images}
            />
          ))}
      </Container>
    </AnalogBackground>
  );
}
