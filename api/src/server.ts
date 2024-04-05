import express, { Request, Response, Router } from 'express'
import routes from './routes';
import cors from 'cors';
import db from './config/db'
import './config/enviroument'
import configuracaoCors from './config/cors';

const PORT = process.env.PORT?? 3000;
const app = express();

app.use(express.json());
app.use(cors(configuracaoCors.configcors()));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT} no ambiente ${process.env.NODE_ENV}`);
})  
