import { readFileSync, writeFileSync } from "fs";

const API_KEY = "6f27864a";
const movies = JSON.parse(readFileSync("./public/movie.json", "utf-8"));

async function fetchPoster(title, year) {
  const query = encodeURIComponent(title);
  const url = `https://www.omdbapi.com/?t=${query}&y=${year}&apikey=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.Poster && data.Poster !== "N/A") {
      return data.Poster;
    }
  } catch (e) {
    console.error(`  Failed for "${title}":`, e.message);
  }
  return null;
}

async function main() {
  for (const movie of movies) {
    console.log(`Fetching poster for: ${movie.title} (${movie.releasing_year})`);
    const posterUrl = await fetchPoster(movie.title, movie.releasing_year);
    if (posterUrl) {
      movie.image_url = posterUrl;
      console.log(`  Found`);
    } else {
      console.log(`  Not found, keeping original`);
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  writeFileSync("./public/movie.json", JSON.stringify(movies, null, 2) + "\n");
  console.log("\nDone! movie.json updated with poster URLs.");
}

main();
