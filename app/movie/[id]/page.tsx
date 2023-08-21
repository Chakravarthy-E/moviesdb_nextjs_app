import { Movie } from "../../interfaces";
import Image from "next/image";

async function getData(id: string) {
  const url = await fetch(
    "https://api.themoviedb.org/3/movie/movie_id?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization:
         process.env.THEMOVIEDATABASE_API as string,
      },
      next: {
        revalidate: 60,
      },
    }
  );
  return url.json();
}
export default async function MovieId({ params }: { params: { id: string } }) {
  const data: Movie = await getData(params.id);
  return (
    <div className="min-h-screen p-10">
      <div className="h-[40vh] relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt="Image of movie"
          className="object-cover w-full rounded-lg"
          fill
        />
      </div>
    </div>
  );
}
