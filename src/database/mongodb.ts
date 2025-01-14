import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

//Conexion con la base
const uri: string | undefined = getURI();

const options: MongoClientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

if (!uri) {
    throw new Error("La variable MONGO_URI no está definida en el archivo .env");
}

// Cliente de MongoDB
const client = new MongoClient(uri, options);

// Función para conectar a la base de datos
export async function connectToMongoDB(): Promise<MongoClient> {
    try {
        await client.connect();
        // Comprueba la conexión enviando un ping
        await client.db("admin").command({ ping: 1 });
        console.log("Conexión a MongoDB exitosa");
        return client; // Devuelve el cliente para su uso
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        throw error; // Maneja el error según sea necesario
    }
}

function getURI(){
    dotenv.config();
    return process.env.MONGO_URI;
}

export default client;
