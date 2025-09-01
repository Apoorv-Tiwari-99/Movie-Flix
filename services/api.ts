export const OMDB_CONFIG = {
    BASE_URL: "http://www.omdbapi.com/",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  };
  
  // Curated list of popular movies
  const POPULAR_MOVIES = [
  "Inception",
  "The Dark Knight",
  "Avengers: Endgame",
  "Interstellar",
  "Titanic",
  "The Godfather",
  "Spider-Man: No Way Home",
  "Joker",
  "Frozen",
  "Avatar",
  "The Shawshank Redemption",
  "Pulp Fiction",
  "Fight Club",
  "Forrest Gump",
  "The Matrix",
  "Gladiator",
  "The Lion King",
  "Black Panther",
  "Doctor Strange",
  "Guardians of the Galaxy",
  "Iron Man",
  "Thor: Ragnarok",
  "Captain America: Civil War",
  "The Avengers",
  "Avengers: Infinity War",
  ];
  
  export const fetchMovies = async ({ query }: { query: string }) => {
    let data;
  
    if (query) {
      // Normal search
      const endpoint = `${OMDB_CONFIG.BASE_URL}?s=${encodeURIComponent(
        query
      )}&apikey=${OMDB_CONFIG.API_KEY}`;
  
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch movies");
      data = await response.json();
      return data.Search || [];
    } else {
      // Fallback: fetch each movie in curated list
      const requests = await Promise.all(
        POPULAR_MOVIES.map(async (title) => {
          const endpoint = `${OMDB_CONFIG.BASE_URL}?t=${encodeURIComponent(
            title
          )}&apikey=${OMDB_CONFIG.API_KEY}`;
          const response = await fetch(endpoint);
          if (response.ok) {
            return response.json();
          }
          return null;
        })
      );
  
      // Filter out invalid results
      return requests.filter(
        (movie) => movie && movie.Response !== "False"
      );
    }
  };
  