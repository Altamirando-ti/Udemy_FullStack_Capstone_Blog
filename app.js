const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; // os posts ficarão aqui na memória

// Página inicial
app.get("/", (req, res) => {
  res.render("home", { posts });
});

// Página para criar novo post
app.get("/new", (req, res) => {
  res.render("new");
});

// Envia formulário de novo post
app.post("/new", (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect("/");
});

// Página para editar post
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("edit", { post });
});

// Atualiza post
app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

// Deleta post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
