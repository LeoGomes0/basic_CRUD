const express = require("express");

const app = express();

app.use(express.json())

const cursos = ["Node JS", "JavaScript", "React Native"];

// Middleware para verificar o nome do curso
const verificar = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({ messageError: "Necessário nome do curso" });
    }
    return next()
}

// Middleware para verificar se o curso existe
// E utilizando o const curso = cursos[req.params.id] como uma variável
const verificarIDCurso = (req, res, next) => {
    const curso = cursos[req.params.id]
    if (!curso) {
        return res.status(400).json({ messageError: "Curso não existe!" })
    }
// Utilizando req.curso = curso, para não destruturar todas as vezes que precisar
// Exemplo de desestruturação -> const curso { id } = req.params
    req.curso = curso
    return next()
}

// Buscando curso por ID
app.get("/cursos/:id", verificarIDCurso, (req, res) => {
    return res.json(req.curso);
})


// Buscando todos os cursos
app.get("/cursos", (req, res) => {
    return res.json(cursos)
})


// Atualizando curso por ID
app.put("/cursos/:id", verificar, verificarIDCurso, (req, res) => {
    const { id } = req.params
    const { name } = req.body
    cursos[id] = name;
    return res.json(cursos)
})


// Criando curso
app.post("/cursos", verificar, (req, res) => {
    const { name } = req.body
    cursos.push(name)
    return res.json(cursos)
})

// Deletando curso
app.delete("/cursos/:id", verificarIDCurso, (req, res) => {
    const { id } = req.params
    cursos.splice(id, 1)
    return res.json(cursos);
})


app.listen(3000, () => {
    console.log("Server Online!");
})