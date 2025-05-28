import config from '@/lib/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(config.env.databaseUrl); // The databaseUrl is coming from the config file. 

// We setup the database connection by calling drizzle and passing the sql client as a parameter.
export const db = drizzle({client: sql});


