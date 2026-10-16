import express from "express";
import {
    listarFilmes,
    buscarFilmePorId,
    cadastrarFilme,
    excluirFilme,
    atualizarFilme
} from "../controllers/filmesControllers.js";

const router = express.Router();

router.get("/", listarFilmes);
router.get("/:id", buscarFilmePorId);
router.post("/", cadastrarFilme);
router.delete("/:id", excluirFilme);
router.put("/:id", atualizarFilme);

export default router;