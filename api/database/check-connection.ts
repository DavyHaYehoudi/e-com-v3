// check-connection.ts
import connectToDatabase from "./database.js";

export const checkConnection = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to the database successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to connect to the database:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};
