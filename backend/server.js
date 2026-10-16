import express from 'express';

import "dotenv/config";
import filmesRoutes from './routes/filmesRoutes.js';
import corsMiddleware from './middlewares/corsMiddleware.js';
import { testarConexao } from './database/conexao.js';

// criando aplicação
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(corsMiddleware);
app.use(express.json());

// rotas
app.use("/filmes", filmesRoutes);

// rota inicial
app.get("/", function(req, res){
    res.status(200).json({ mensagem: "API de locadora de filmes funcionando!" });
});

async function iniciarServidor() {
    try{
        await testarConexao();
        app.listen(PORT, function(){
            console.log("servidor rodando em http://localhost:" + PORT);
        });
    }catch(erro){
        console.log("Não foi possível iniciar o servidor");
        console.log(erro.message);
    }
}

iniciarServidor();