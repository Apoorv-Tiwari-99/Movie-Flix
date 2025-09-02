import { Client, TablesDB, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {

        console.log("Movie received is:",movie);
        // 🔎 Check if searchTerm exists
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.equal("searchTerm", query)],
        });

        console.log("listRows result:", result);

        if (result.rows.length > 0) {
            
            const existingRow = result.rows[0];
            console.log("Existing row is :",existingRow);
            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: existingRow.$id,
                data: {
                    count: (existingRow.count ?? 0) + 1,
                },
            });
        } else {
            
            const response = await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: "unique()", 
                data: {
                    movie_id: movie.imdbID,
                    title: movie.Title,
                    count: 1,
                    searchTerm: query,
                    poster_url: movie.Poster,
                },
            });
            
            console.log("createRow response:", response);
        }
    } catch (err) {
        console.error("Error updating search count:", err);
        throw err;
    }
};

export const getTrendingMovies=async():Promise<TrendingMovie[]|undefined>=>{
     try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.limit(5),
            Query.orderDesc('count'),  
        ],
        });

        return result.rows as unknown as TrendingMovie[];


     } catch (error) {
        console.log(error);
        return undefined;
     }
}


