require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ouro-lanches', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Erro ao conectar MongoDB:', err));

// Schemas
const LanchoneteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: String,
    endereco: String,
    cidade: String,
    avaliacao: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
});

const LancheSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: String,
    preco: { type: Number, required: true },
    categoria: String,
    imagem: String,
    lanchoneteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lanchonete', required: true },
    avaliacao: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
});

const PedidoSchema = new mongoose.Schema({
    lanchoneteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lanchonete', required: true },
    lanches: [{
        lancheId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lanche' },
        quantidade: Number,
        preco: Number
    }],
    total: Number,
    status: { type: String, enum: ['pendente', 'confirmado', 'entregue'], default: 'pendente' },
    endereco: String,
    telefone: String,
    metodoPagamento: String,
    createdAt: { type: Date, default: Date.now }
});

const Lanchonete = mongoose.model('Lanchonete', LanchoneteSchema);
const Lanche = mongoose.model('Lanche', LancheSchema);
const Pedido = mongoose.model('Pedido', PedidoSchema);

// Routes
// Listar todas as lanchonetes
app.get('/api/lanchonetes', async (req, res) => {
    try {
        const lanchonetes = await Lanchonete.find().select('-senha');
        res.json(lanchonetes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar todos os lanches
app.get('/api/lanches', async (req, res) => {
    try {
        const lanches = await Lanche.find().populate('lanchoneteId');
        res.json(lanches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar lanches por lanchonete
app.get('/api/lanchonetes/:id/lanches', async (req, res) => {
    try {
        const lanches = await Lanche.find({ lanchoneteId: req.params.id });
        res.json(lanches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Criar nova lanchonete (registro)
app.post('/api/lanchonetes', async (req, res) => {
    try {
        const { nome, email, senha, telefone, endereco, cidade } = req.body;
        
        const lanchonete = new Lanchonete({
            nome,
            email,
            senha, // Em produção, usar bcryptjs para hash
            telefone,
            endereco,
            cidade
        });
        
        await lanchonete.save();
        res.status(201).json({ message: 'Lanchonete criada com sucesso', lanchonete });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Criar novo lanche
app.post('/api/lanches', async (req, res) => {
    try {
        const { nome, descricao, preco, categoria, imagem, lanchoneteId } = req.body;
        
        const lanche = new Lanche({
            nome,
            descricao,
            preco,
            categoria,
            imagem,
            lanchoneteId
        });
        
        await lanche.save();
        res.status(201).json({ message: 'Lanche criado com sucesso', lanche });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Atualizar lanche
app.put('/api/lanches/:id', async (req, res) => {
    try {
        const lanche = await Lanche.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: 'Lanche atualizado', lanche });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar lanche
app.delete('/api/lanches/:id', async (req, res) => {
    try {
        await Lanche.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lanche deletado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Criar pedido
app.post('/api/pedidos', async (req, res) => {
    try {
        const { lanchoneteId, lanches, total, endereco, telefone, metodoPagamento } = req.body;
        
        const pedido = new Pedido({
            lanchoneteId,
            lanches,
            total,
            endereco,
            telefone,
            metodoPagamento
        });
        
        await pedido.save();
        res.status(201).json({ message: 'Pedido criado com sucesso', pedido });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar pedidos
app.get('/api/pedidos', async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('lanchoneteId').populate('lanches.lancheId');
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar status do pedido
app.put('/api/pedidos/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ message: 'Status atualizado', pedido });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Servir frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🍔 Servidor Ouro Lanches rodando em http://localhost:${PORT}`);
});
