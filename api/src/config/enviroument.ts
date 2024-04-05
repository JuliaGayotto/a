import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV?? 'dev';

// Carrega o arquivo .env apropriado com base no ambiente.
if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: '.env.dev' });
} 
if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: '.env.prod' });
}
