import { pool } from "../database/conexao.js";

async function listarFilmes(req, res){
    try{
        const [filmes] = await pool.query("SELECT * FROM filmes");
        res.status(200).json(filmes);
    }catch(erro){
        console.log("Erro ao listar filmes", erro);
        res.status(500).json({mensagem: "Erro ao listar filmes"});
    }
}

async function buscarFilmePorId(req, res){
    try{
        const id = req.params.id;
        const [filme] = await pool.query("SELECT * FROM filmes WHERE id=?", [id]);

        if(filme.length === 0){
            return res.status(404).json({mensagem: "Filme não encontrado"});
        }

        res.status(200).json(filme[0]);
    }catch(erro){
        console.log("Erro ao buscar filme", erro);
        res.status(500).json({mensagem: "Erro ao buscar filme"});
    }
}

// POST
async function cadastrarFilme(req, res){
    try{
        const {titulo, genero, duracao, classificacao, ano} = req.body;

        if(!titulo || !genero || !duracao || !classificacao || !ano){
            return res.status(400).json({mensagem: "Preencha todos os campos"});
        }

        const [resultado] = await pool.query(
            "INSERT INTO filmes (titulo, genero, duracao, classificacao, ano) VALUES (?, ?, ?, ?, ?)",
            [titulo, genero, duracao, classificacao, ano]
        );

        res.status(201).json({
            mensagem: "Filme cadastrado com sucesso",
            id: resultado.insertId
        });

    }catch(erro){
        console.log("Erro ao cadastrar filme", erro);
        res.status(500).json({mensagem: "Erro ao cadastrar filme"});
    }
}

async function atualizarFilme(req, res){
    try{
        const id = req.params.id;
        const {titulo, genero, duracao, classificacao, ano} = req.body;

        if(!titulo || !genero || !duracao || !classificacao || !ano){
            return res.status(400).json({mensagem: "Preencha todos os campos"});
        }

        const [resultado] = await pool.query(
            "UPDATE filmes SET titulo=?, genero=?, duracao=?, classificacao=?, ano=? WHERE id=?",
            [titulo, genero, duracao, classificacao, ano, id]
        );

        if(resultado.affectedRows === 0){
            return res.status(404).json({mensagem: "Filme não encontrado"});
        }

        res.status(200).json({mensagem: "Filme atualizado com sucesso"});

    }catch(erro){
        console.log("Erro ao atualizar filme", erro);
        res.status(500).json({mensagem: "Erro ao atualizar filme"});
    }
}

async function excluirFilme(req, res){
    try{
        const id = req.params.id;

        const [resultado] = await pool.query(
            "DELETE FROM filmes WHERE id=?",
            [id]
        );

        if(resultado.affectedRows === 0){
            return res.status(404).json({mensagem: "Filme não encontrado"});
        }

        res.status(200).json({mensagem: "Filme excluído com sucesso"});

    }catch(erro){
        console.log("Erro ao excluir filme", erro);
        res.status(500).json({mensagem: "Erro ao excluir filme"});
    }
}

export {
    listarFilmes,
    buscarFilmePorId,
    cadastrarFilme,
    atualizarFilme,
    excluirFilme
};