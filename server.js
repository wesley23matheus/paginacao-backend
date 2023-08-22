
const express = require('express');
const cors = require('cors');

const app = express();

// Configurar o CORS
const corsOptions = {
  origin: 'https://apirecados.onrender.com', // Altere para o domínio do seu site
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
};

app.use(express.json());
app.use(cors(corsOptions));

// Dados de exemplo
const usuarios = [
  { id: 1, email: 'wesleynui40@gmail.com', senha: '123' },
];

const recados = [
  { id: 1, titulo: 'Recado 1', descricao: 'Olá, este é o Recado 1', usuarioId: 1 },
  { id: 2, titulo: 'Recado 2', descricao: 'Olá, este é o Recado 2', usuarioId: 2 },
  { id: 3, titulo: 'Recado 3', descricao: 'Olá, este é o Recado 3', usuarioId: 3 },
  { id: 4, titulo: 'Recado 4', descricao: 'Olá, este é o Recado 4', usuarioId: 4 },
  { id: 5, titulo: 'Recado 5', descricao: 'Olá, este é o Recado 5', usuarioId: 5 },
  { id: 6, titulo: 'Recado 6', descricao: 'Olá, este é o Recado 6', usuarioId: 6 },
  { id: 7, titulo: 'Recado 7', descricao: 'Olá, este é o Recado 7', usuarioId: 7 },
  { id: 8, titulo: 'Recado 9', descricao: 'Olá, este é o Recado 8', usuarioId: 8 },
];


// Rota para obter todos os recados (com paginação) (Método GET)
app.get('/recados', (req, res) => {
  const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const itemsPorPagina = 3; // Número de recados por página
  const pagina = req.query.page || 1;

  const indiceInicial = (pagina - 1) * itemsPorPagina;
  const indiceFinal = pagina * itemsPorPagina -1;

  // Lista apenas os recados da página atual
  const recadosPaginados = recados.slice(indiceInicial, indiceFinal +1);

  const resposta = {
    mensagem: 'Recados da Página',
    numeroDePaginas: Math.ceil(recados.length / itemsPorPagina),
    recados: recadosPaginados,
  };
  res.json(resposta);
});

// Rota para obter todos os recados de um usuário (Método GET)
app.get('/recados/usuario/:usuarioId', (req, res) => {
  const usuarioId = parseInt(req.params.usuarioId);

  const recadosDoUsuario = recados.filter((recado) => recado.usuarioId === usuarioId);
  res.json(recadosDoUsuario);
});

// Rota para atualizar um recado (Método PUT)
app.put('/recados/:id', (req, res) => {
  const recadoId = parseInt(req.params.id);
  const { titulo, descricao } = req.body;

  const recado = recados.find((r) => r.id === recadoId);
  if (!recado) {
    res.status(404).json({ error: 'Recado não encontrado' });
    return;
  }

  recado.titulo = titulo;
  recado.descricao = descricao;

  res.json({ message: 'Recado atualizado com sucesso' });
});

// Rota para excluir um recado (Método DELETE)
app.delete('/recados/:id', (req, res) => {
  const recadoId = parseInt(req.params.id);

  const recadoIndex = recados.findIndex((r) => r.id === recadoId);
  if (recadoIndex === -1) {
    res.status(404).json({ error: 'Recado não encontrado' });
    return;
  }

  recados.splice(recadoIndex, 1);

  res.json({ message: 'Recado excluído com sucesso' });
});

// Rota para obter todas as contas de usuário (Método GET)
app.get('/contas', (req, res) => {
  res.json(usuarios);
});

app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});



