// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js";
const { bruxos, casas, varinhas, animais, pocoes } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Aqui vão todas suas Rotas
//Rota Bruxo com filtro (Query Parameters) no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.post('/bruxos', (req, res) => {
    // Acessando dados do body
    //mudar o nodemon para node no package
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;
  ''
    console.log('Dados recebidos:', req.body);
    
    // Validação básica
    if (!nome || !casa) {
        return res.status(400).json({
            success: false,
            message: "Nome e casa são obrigatórios para um bruxo!"
        });
    }
    
    // Criar novo bruxo
    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha,
        mascote: mascote,
        patrono: patrono,
        especialidade: especialidade || "Em desenvolvimento",
        vivo: vivo
    };
    
    // Adicionar à lista de bruxos
    bruxos.push(novoBruxo);
    
    res.status(201).json({
        success: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    });
});

//Get para varinhas
app.get('/varinhas', (req, res) => {
  const { material, nucleo, comprimento} = req.query;
  let varinhasEncontradas = varinhas;
  
  if (material) {
    varinhasEncontradas = varinhasEncontradas.filter(b => b.material.toLowerCase().includes(material.toLowerCase()));
  }

  if (nucleo) {
    varinhasEncontradas = varinhasEncontradas.filter(b => b.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
  }

  if (comprimento) {
    varinhasEncontradas = varinhasEncontradas.filter(b => b.comprimento.toLowerCase().includes(comprimento.toLowerCase()));
  }

  res.status(200).json({
    total: varinhasEncontradas.length,
    data: varinhasEncontradas
  });
});

//criar varinhas
app.post('/varinhas', (req, res) => {
  const { materia, nucleo, comprimento } = req.body;
''
  console.log('Dados recebidos:', req.body);
  
  // Validação básica
  if (!materia, !nucleo, !comprimento) {
      return res.status(400).json({
          success: false,
          message: "materia, nucleo, comprimento são obrigatorios para criar uma varinha!"
      });
  }
  
  // Criar nova varinha
  const novaVarinha = {
      id: varinhas.length + 1,
      materia,
      nucleo,
      comprimento
  };
  
  // Adicionar à lista de varinhas
  varinhas.push(novaVarinha);
  
  res.status(201).json({
      success: true,
      message: "Nova varinha adicionada a Hogwarts!",
      data: novaVarinha
  });
});


//Get para Poções
app.get('/pocoes', (req, res) => {
  const { nome, efeito } = req.query;
  let pocoesEncontradas = pocoes;

  if (nome) {
    pocoesEncontradas = pocoesEncontradas.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  if (efeito) {
    pocoesEncontradas = pocoesEncontradas.filter(b => b.efeito.toLowerCase().includes(efeito.toLowerCase()));
  }

  res.status(200).json({
    total: pocoesEncontradas.length,
    data: pocoesEncontradas
  });
});

//criar Poções
app.post('/pocoes', (req, res) => {
  const { nome, efeito } = req.body;

  console.log('Dados recebidos:', req.body);
  
  // Validação básica
  if (!nome || !efeito) {
      return res.status(400).json({
          success: false,
          message: "nome, efeito, são obrigatorios para criar uma poção!"
      });
  }
  
  // Criar nova poção'
  const novaPocao = {
      id: pocoes.length + 1,
      nome,
      efeito
  };
  
  // Adicionar à lista de poções
  pocoes.push(novaPocao);
  
  res.status(201).json({
      success: true,
      message: "Nova poção adicionada a Hogwarts!",
      data: novaPocao
  });
});


//Get para Animais
app.get('/animais', (req, res) => {
  const { nome, tipo } = req.query;
  let animaisEncontrados = animais;

  if (nome) {
    animaisEncontrados = animaisEncontrados.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  if (tipo) {
    animaisEncontrados = animaisEncontrados.filter(b => b.tipo.toLowerCase().includes(tipo.toLowerCase()));
  }

  res.status(200).json({
    total: animaisEncontrados.length,
    data: animaisEncontrados
  });
});

//criar Poções
app.post('/animais', (req, res) => {
  const { nome, tipo } = req.body;

  console.log('Dados recebidos:', req.body);
  
  // Validação básica
  if (!nome || !tipo) {
      return res.status(400).json({
          success: false,
          message: "nome, tipo, são obrigatorios para criar um animal!"
      });
  }
  
  // Criar nova poção'
  const novoAnimal = {
      id: animais.length + 1,
      nome,
      tipo
  };
  
  // Adicionar à lista de bruxos
  animais.push(novoAnimal);
  
  res.status(201).json({
      success: true,
      message: "Nova poção adicionada a Hogwarts!",
      data: novoAnimal
  });
});

//Mostra quantos bruxos
app.get("/stats", (req, res) => {
  const {casa} = req.query;
  let resultadoConsulta = bruxos;
  if (casa) {
    resultadoConsulta = resultadoConsulta.filter(b => b.casa.toLowerCase().includes(casa.toLowerCase()));
  }
  res.status(200).json({
    bruxos: `${casa} = ${resultadoConsulta.length}`
  });
});

 // Rota para mostrar o material de varinha mais comum
app.get('/varinhas/material-mais-comum', (req, res) => {
  const contadorDeMateriais = {};

  // Conta a frequência de cada material
  for (const varinha of varinhas) {
    const material = varinha.material;
    contadorDeMateriais[material] = (contadorDeMateriais[material] || 0) + 1;
  }

  let materialMaisComum = null;
  let contagemMaxima = 0;

  // Encontra o material com a maior contagem
  for (const material in contadorDeMateriais) {
    const contagem = contadorDeMateriais[material];
    
    if (contagem > contagemMaxima) {
      contagemMaxima = contagem;
      materialMaisComum = material;
    }
  }

  // Verifica se encontrou um resultado antes de enviar a resposta
  if (materialMaisComum) {
    res.status(200).json({
      resultado: `O material mais usado é ${materialMaisComum} (apareceu ${contagemMaxima} vezes)`
    });
  } else {
    // Caso o array de varinhas esteja vazio
    res.status(404).json({
      erro: "Não foi possível encontrar o material mais comum. Verifique se o array de varinhas está preenchido."
    });
  }
});


// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});