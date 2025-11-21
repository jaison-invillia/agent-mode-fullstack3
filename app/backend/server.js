const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Habilitar CORS para todos os hosts
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rota GET /products - retorna todos os produtos do mock
app.get('/products', (req, res) => {
  try {
    const productsPath = path.join(__dirname, 'data', 'products.json');
    const productsData = fs.readFileSync(productsPath, 'utf-8');
    const products = JSON.parse(productsData);
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao ler arquivo de produtos:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar produtos',
      message: error.message 
    });
  }
});

// Rota raiz para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Produtos',
    endpoints: {
      products: '/products'
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log(`Produtos: http://localhost:${PORT}/products`);
});
