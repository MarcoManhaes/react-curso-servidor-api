
//const uuidv4 = require('uuid/v4');
const { "v4": uuidv4 } = require('uuid');


let tarefas = [
    { id: "1", nome: "Aprender React", concluida: true },
    { id: "2", nome: "Estudar padrões de projetos", concluida: false },
    { id: "3", nome: "Aprender Javascript", concluida: false },
    { id: "4", nome: "Estudar React usando hooks", concluida: false }
];

function listarTarefaId(req, res) {
    const id = req.params.id;
    const tarefa = tarefas.filter(tarefa => tarefa.id === id);
    if (tarefa.length === 0) {
        res.status(404).json({ erro: "Tarefa não encontrada." });
    }
    res.json(tarefa[0]);
}

function listarTarefa(req, res) {
    const pagina = req.query["pag"] || 1;
    const ordem = req.query["ordem"];
    const filtroTarefa = req.query["filtro-tarefa"];
    const itensPorPagina = req.query["itens-por-pagina"] || 3;

    let tarefasRetornar = tarefas.slice(0);

    if (filtroTarefa) {
        tarefasRetornar = tarefasRetornar.filter(t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0);
    }

    if (ordem === "ASC") {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
    } else if (ordem === "DESC") {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
    }

    res.json({
        totalItens: tarefasRetornar.length,
        tarefas: tarefasRetornar.slice(0).splice((pagina - 1) * itensPorPagina, itensPorPagina),
    });

    if (tarefa.length === 0) {
        res.status(404).json({ erro: "Tarefa não encontrada." });
    }
    res.json(tarefa[0]);
}

function cadastrarTarefa(req, res) {
    if (!req.body["nome"] && req.body["concluida"]) {
        res.status["400"].json({ erro: "Requisição inválida." })
    }

    const tarefa = {
        id: uuidv4(),
        nome: req.body["nome"],
        concluida: req.body["concluida"],
    };

    tarefas.push(tarefa);
    res.json(tarefa);
}


function atualizarTarefa(req, res) {

    if (!req.body["nome"] && !req.body["concluida"]) {
        res.status(400).json({ erro: "Requisição inválida." });
    }

    const id = req.params.id;
    let tarefaAtualizada = false;

    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.nome = req.body["nome"];
            tarefa.concluida = req.body["concluida"];
            tarefaAtualizada = true;
        }
        return tarefa;
    });

    if (!tarefaAtualizada) {
        res.status(400).json({ erro: "Tarefa não encontrada." });
    }

    res.json({
        id: id,
        nome: req.body["nome"],
        concluida: req.body["concluida"],
    });
}

function removerTarefa(req, res) {
    const id = req.params.id;
    const numTarefas = tarefas.length;
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    if (numTarefas === tarefas.length) {
        res.status(400).json({ erro: "Tartefa não encontrada." });
    }
    res.json({ msg: "Tartefa removida com sucesso." });
}

function concluirTarefa(req, res) {
    const id = req.params.id;
    let tarefaConcluida = false;

    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.concluida = true;
            tarefaConcluida = true;
        }
        return tarefa;
    });
    if (!tarefaConcluida) {
        res.status(400).json({ erro: "Tartefa não encontrada." });
    }
    res.json({ msg: "Tartefa concluída com sucesso." });
}

module.exports = {
    listarTarefaId,
    listarTarefa,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTarefa
}