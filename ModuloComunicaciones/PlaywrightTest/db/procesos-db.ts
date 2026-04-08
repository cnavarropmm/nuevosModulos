import { dbpool } from './db-utils';

export class ProcesosDAO {
    
    static async desactivarBloqueo(procesoId: string, usuario: string) {
        const query = `
            UPDATE comunicaciones.bloqueo_proceso_mes
            SET activo = false
            WHERE id = (
                        SELECT id 
                        FROM comunicaciones.bloqueo_proceso_mes
                        WHERE proceso_id = $1 and usuario_bloqueo  = $2
                        ORDER BY fecha_bloqueo DESC 
                        LIMIT 1
                    );
                `;
        const client = await dbpool.connect();
        try {
            return await client.query(query, [procesoId, usuario]);
        } finally {
            client.release();
        }
    }

    static async consultarEstadoProceso(procesoId: string, mes: string) {
        
        const query = `SELECT activo FROM comunicaciones.bloqueo_proceso_mes WHERE id = $1 and mes = $2`;
        const client = await dbpool.connect();
        try {
            return await client.query(query, [procesoId, mes]);
        } finally {
            client.release();
        }
    }
}