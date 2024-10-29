import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB:", error.message);
    process.exit(1);
  }
};



// import mongoose from "mongoose";

// export const connectDb = async () => {
//     try{
//         mongoose.set("strictQuery", true);
//         const conn = await mongoose.connect(process.env.MONGO_URL);
//         console.log(`Database connected at : -> ${conn.connection.host}`.cyan);
//     } catch (error){
//         console.log(error);
//         process.exit(1);
//     }
// };

// mongoose.connection.on( " disconnected",() => {
//     console.log("MONGO DISCONNNECTED".red);

// });

// mongoose.connection.on( " connected",() => {
//     console.log("MONGO CONNECTED".blue);
// });