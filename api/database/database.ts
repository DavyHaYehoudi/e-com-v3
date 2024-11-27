import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI!;

    await mongoose.connect(mongoURI, { autoIndex: true });

    console.log("Connexion réussie à la base de données MongoDB");

  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
  }
};

export default connectToDatabase;
