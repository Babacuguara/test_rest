// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

//Login com segurança
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'chave-secreta'; // Troque por uma chave mais segura

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MySQL
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1722',
//     database: 'produtos_db'
// });
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '1722',
    database: 'produtos_db'
});


//const bcrypt = require('bcryptjs');

//Cria uma senha criptografada

// const senhaCriptografada = bcrypt.hashSync('123456', 10);
// console.log(senhaCriptografada);


// db.connect(err => {
//     if (err) {
//         console.error('Erro ao conectar ao MySQL:', err);
//     } else {
//         console.log('Conectado ao MySQL!');
//     }
// });

// Rota de login
// 
//Nova rota de login
// 🔹 ROTA DE LOGIN
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error("Erro no MySQL:", err);  // Mostra erro no terminal
            return res.status(500).json({ message: 'Erro no servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const usuario = results[0];

        bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
            if (err) {
                console.error("Erro ao comparar senha:", err);
                return res.status(500).json({ message: 'Erro no servidor' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'chave-secreta', { expiresIn: '1h' });

            res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
        });
    });
});


// nova
//const bcrypt = require('bcryptjs');

// Rota para cadastrar um novo usuário
app.post('/cadastroemail', async (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se o e-mail já existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro no servidor' });

        if (results.length > 0) {
            return res.status(400).json({ message: 'E-mail já cadastrado!' });
        }

        // Criptografa a senha antes de salvar no banco
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Insere o usuário no banco de dados
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        db.query(sql, [nome, email, senhaCriptografada], (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao cadastrar usuário' });

            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        });
    });
});

//final nova



// Rotas para Categorias
app.get('/categorias', (req, res) => {
    db.query('SELECT * FROM categorias', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Rota para adicionar uma nova categoria
app.post('/categorias', (req, res) => {
    const { nome } = req.body;
    const query = 'INSERT INTO categorias (nome) VALUES (?)';
    db.query(query, [nome], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao adicionar categoria' });
            return;
        }
        res.status(201).send({ message: 'Categoria adicionada com sucesso!' });
    });
});


app.delete('/categorias/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categorias WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Categoria deletada com sucesso' });
    });
});

//Listagem de produtos selecionada por categoria
// Rota para listar produtos por categoria
// app.get('/produtos/categoria/:categoria_id', (req, res) => {
//     const categoria_id = req.params.categoria_id;
//     const query = `
//         SELECT produtos.*, categorias.nome as categoria_nome 
//         FROM produtos 
//         JOIN categorias ON produtos.categoria_id = categorias.id 
//         WHERE produtos.categoria_id = ?`;
    
//     db.query(query, [categoria_id], (err, results) => {
//         if (err) {
//             res.status(500).send({ message: 'Erro ao buscar produtos por categoria' });
//             return;
//         }
//         res.status(200).json(results);
//     });
// });

// 





//Listagem de produtos selecionada por categoria
// app.get('/produtos/categoria/:id', (req, res) => {
//     const categoriaId = req.params.id;
//     const query = `
//         SELECT produtos.*, categorias.nome AS categoria_nome
//         FROM produtos
//         JOIN categorias ON produtos.categoria_id = categorias.id
//         WHERE produtos.categoria_id = ?
//     `;
    
//     db.query(query, [categoriaId], (err, results) => {
//         if (err) {
//             res.status(500).send({ message: 'Erro ao buscar produtos da categoria' });
//             return;
//         }
//         res.status(200).json(results);
//     });
// });
app.get('/categorias-com-produtos', (req, res) => {
    const query = `
        SELECT c.id AS categoria_id, c.nome AS categoria_nome, 
               p.id AS produto_id, p.nome AS produto_nome, p.descricao, 
               p.preco, p.foto, qtpessoas
        FROM categorias c
        LEFT JOIN produtos p ON c.id = p.categoria_id
        ORDER BY c.id ASC, p.id ASC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao buscar categorias e produtos' });
            return;
        }

        // Organizar os resultados em um formato agrupado por categoria
        const categorias = {};
        results.forEach(row => {
            if (!categorias[row.categoria_id]) {
                categorias[row.categoria_id] = {
                    id: row.categoria_id,
                    nome: row.categoria_nome,
                    produtos: []
                };
            }
            if (row.produto_id) {
                categorias[row.categoria_id].produtos.push({
                    id: row.produto_id,
                    nome: row.produto_nome,
                    descricao: row.descricao,
                    preco: row.preco,
                    foto: row.foto,
                    qtpessoas: row.qtpessoas
                });
            }
        });

        res.send(Object.values(categorias)); // Retorna um array de categorias com produtos dentro
    });
});




// Rotas para Produtos
app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// CADASTRAR IMGENS 
app.use('/uploads', express.static('uploads'));

const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: './uploads/', // Pasta onde as imagens serão salvas
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Filtrando arquivos para permitir apenas imagens
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Erro: Apenas imagens são permitidas!');
    }
};

const upload = multer({ storage, fileFilter });

// Criar uma rota para upload de imagens
app.post('/upload', upload.single('foto'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Nenhum arquivo enviado.' });
    }
    res.status(200).send({ message: 'Upload realizado com sucesso!', filePath: `/uploads/${req.file.filename}` });
});


// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
    const { categoria_id, nome, descricao, unidade, quantidade, preco, qtPessoas, foto } = req.body;
    const query = 'INSERT INTO produtos (categoria_id, nome, descricao, unidade, quantidade, preco, qtPessoas, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [categoria_id, nome, descricao, unidade, quantidade, preco, qtPessoas, foto], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao adicionar produto' });
            return;
        }
        res.status(201).send({ message: 'Produto adicionado com sucesso!' });
    });
});

//Rota deletar produtos
app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;

    // Primeiro, buscamos a foto para excluir do servidor
    db.query('SELECT foto FROM produtos WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao buscar o produto' });
            return;
        }

        if (results.length > 0 && results[0].foto) {
            const fs = require('fs');
            const caminhoFoto = `.${results[0].foto}`;
            if (fs.existsSync(caminhoFoto)) {
                fs.unlinkSync(caminhoFoto); // Deleta o arquivo físico da imagem
            }
        }

        // Agora deletamos o produto do banco de dados
        db.query('DELETE FROM produtos WHERE id = ?', [id], (err, result) => {
            if (err) {
                res.status(500).send({ message: 'Erro ao deletar o produto' });
                return;
            }
            res.send({ message: 'Produto deletado com sucesso' });
        });
    });
});

// ROTA FUNCIONANDO

// app.put('/produtos/:id', upload.single('foto'), async (req, res) => {
//     const { id } = req.params;
//     const { nome, descricao, preco, categoria_id } = req.body;
//     const foto = req.file ? `/uploads/${req.file.filename}` : null;
  
//     if (!nome || !descricao || !preco || !categoria_id) {
//       return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
//     }
  
//     try {
//       let query = `UPDATE produtos SET nome=?, descricao=?, preco=?, categoria_id=? WHERE id=?`;
//       let values = [nome, descricao, preco, categoria_id, id];
  
//       if (foto) {
//         query = `UPDATE produtos SET nome=?, descricao=?, preco=?, categoria_id=?, foto=? WHERE id=?`;
//         values = [nome, descricao, preco, categoria_id, foto, id];
//       }
  
//       const [result] = await db.query(query, values);
      
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: "Produto não encontrado!" });
//       }
  
//       res.json({ message: "Produto atualizado com sucesso!" });
//     } catch (error) {
//       console.error("Erro ao editar produto:", error);
//       res.status(500).json({ error: "Erro ao editar produto", details: error.message });
//     }
//   });

// Rota de editar produto
app.put('/produtos/:id', upload.single('foto'), (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, categoria_id } = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;
  
    // Validação
    if (!nome || !descricao || !preco || !categoria_id) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }
  
    let query = `UPDATE produtos SET nome=?, descricao=?, preco=?, categoria_id=? WHERE id=?`;
    let values = [nome, descricao, preco, categoria_id, id];
  
    // Se houver foto, atualiza também
    if (foto) {
      query = `UPDATE produtos SET nome=?, descricao=?, preco=?, categoria_id=?, foto=? WHERE id=?`;
      values = [nome, descricao, preco, categoria_id, foto, id];
    }
  
    // Query para atualizar
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("❌ Erro ao editar produto:", err);
        return res.status(500).json({ error: "Erro ao editar produto", details: err.message });
      }
  
      // Verifica se o produto foi atualizado
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Produto não encontrado!" });
      }
  
     // console.log("✅ Produto atualizado:", { id, nome, descricao, preco, categoria_id, foto });
  
      // Responde com sucesso
      res.json({ message: "Produto atualizado com sucesso!" });
    });
  });
  


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
// const port = Process.env.PORT || 3001
