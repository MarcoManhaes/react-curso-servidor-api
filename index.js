const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { listarTarefaId, listarTarefa, cadastrarTarefa, atualizarTarefa, removerTarefa, concluirTarefa } = require("./controllers/gerenciador-tarefas")
//const { response } = require("express");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

function naoImplementado(req, res) {
    res.status(501).json({ erro: "Não implementado" });
}

//listar tarefas
app.get("/gerenciador-tarefas", listarTarefa);
//listar tarefas por id
app.get("/gerenciador-tarefas/:id", listarTarefaId);
//cadastrar tarefas
app.post("/gerenciador-tarefas", cadastrarTarefa);
//atualizar tarefas
app.put("/gerenciador-tarefas/:id", atualizarTarefa);
//remover tarefa
app.delete("/gerenciador-tarefas/:id", removerTarefa);
//concluir
app.put("/gerenciador-tarefas/:id/concluir", concluirTarefa);

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));