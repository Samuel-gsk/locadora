const botao = document.getElementById("btnBuscar");
const tabelaFilmes = document.getElementById("tabelaFilmes");
const listaFilmes = document.getElementById("listaFilmes");
const mensagem = document.getElementById("mensagem");

const formulario = document.getElementById("formFilme");

const campoTitulo = document.getElementById("titulo");
const campoGenero = document.getElementById("genero");
const campoDuracao = document.getElementById("duracao");
const campoClassificacao = document.getElementById("classificacao");
const campoAno = document.getElementById("ano");

const botaoSalvar = document.getElementById("btnSalvar");

let idEdicao = null;

botao.addEventListener("click", buscarFilmes);
formulario.addEventListener("submit", salvarFilme);

async function buscarFilmes() {
    try {

        mensagem.textContent = "Buscando filmes...";

        const resposta = await fetch("http://localhost:3000/filmes");

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const filmes = await resposta.json();

        listaFilmes.innerHTML = "";

        if (filmes.length === 0) {
            tabelaFilmes.style.display = "none";
            mensagem.textContent = "Nenhum filme cadastrado.";
            return;
        }

        tabelaFilmes.style.display = "table";

        for (let i = 0; i < filmes.length; i++) {

            listaFilmes.innerHTML += `
                <tr>
                    <td>${filmes[i].id}</td>
                    <td>${filmes[i].titulo}</td>
                    <td>${filmes[i].genero}</td>
                    <td>${filmes[i].duracao}</td>
                    <td>${filmes[i].classificacao}</td>
                    <td>${filmes[i].ano}</td>

                    <td>
                        <button onclick="editarFilme(${filmes[i].id})">
                            Editar
                        </button>

                        <button onclick="excluirFilme(${filmes[i].id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        }

        mensagem.textContent = "Filmes encontrados.";

    } catch (erro) {

        mensagem.textContent = "Não foi possível carregar os filmes.";
        console.error(erro);
    }
}

async function salvarFilme(evento) {

    evento.preventDefault();

    if (idEdicao === null) {
        await cadastrarFilme();
    } else {
        await atualizarFilme();
    }
}

async function cadastrarFilme() {

    try {

        const filme = {
            titulo: campoTitulo.value,
            genero: campoGenero.value,
            duracao: campoDuracao.value,
            classificacao: campoClassificacao.value,
            ano: campoAno.value
        };

        const resposta = await fetch("http://localhost:3000/filmes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filme)
        });

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        formulario.reset();

        await buscarFilmes();

        mensagem.textContent = dados.mensagem;

    } catch (erro) {

        mensagem.textContent = "Não foi possível cadastrar o filme.";
        console.error(erro);
    }
}

async function editarFilme(id) {

    try {

        const resposta = await fetch(
            `http://localhost:3000/filmes/${id}`
        );

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const filme = await resposta.json();

        campoTitulo.value = filme.titulo;
        campoGenero.value = filme.genero;
        campoDuracao.value = filme.duracao;
        campoClassificacao.value = filme.classificacao;
        campoAno.value = filme.ano;

        idEdicao = filme.id;

        botaoSalvar.textContent = "Atualizar";

        mensagem.textContent =
            "Editando filme de ID: " + filme.id;

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível carregar o filme.";

        console.error(erro);
    }
}

async function atualizarFilme() {

    try {

        const filme = {
            titulo: campoTitulo.value,
            genero: campoGenero.value,
            duracao: campoDuracao.value,
            classificacao: campoClassificacao.value,
            ano: campoAno.value
        };

        const resposta = await fetch(
            `http://localhost:3000/filmes/${idEdicao}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filme)
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        formulario.reset();

        idEdicao = null;

        botaoSalvar.textContent = "Cadastrar";

        await buscarFilmes();

        mensagem.textContent = dados.mensagem;

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível atualizar o filme.";

        console.error(erro);
    }
}

async function excluirFilme(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este filme?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `http://localhost:3000/filmes/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        await buscarFilmes();

        mensagem.textContent = dados.mensagem;

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível excluir o filme.";

        console.error(erro);
    }
}