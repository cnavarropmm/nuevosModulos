import { Pool } from 'pg';

// Configuración del Pool para PostgreSQL
export const dbpool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432, 
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

/**
 * Verifica la conexión cuando inicia la aplicación
 */
export const testDBConnection = async () => {
    let client
    try {
        
        client = await dbpool.connect();
        console.log('Conexión a PostgreSQL establecida con éxito.');
        return true;
    }
    catch (error: any) {
        console.error('Error al conectar a la base de datos PostgreSQL:');
        console.error(`Mensaje: ${error.message}`);
        console.error(`Código de error (Postgres): ${error.code}`);
        return false;
    }
    finally {
        if (client) client.release()
    }
}