import pg from 'pg';
import configs from "../configs/keys.js"

const { Pool } = pg;

const pool = new Pool({
  connectionString: configs.DB_CONNECTION_URL
});

class PG {
  #pool = pool;

  async fetchData(SQL, ...params) {
    const client = await this.#pool.connect();

    try {
      const { rows } = await client.query(SQL, params.length ? params : null);
      return rows;
    } finally {
      client.release();
    }
  }
}

export default PG;