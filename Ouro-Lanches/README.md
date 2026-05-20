# Ouro Lanches

Plataforma web para lanchonetes anunciarem seus lanches e receberem pedidos online.

## Recursos

- Catálogo de lanches com fotos e preços
- Lanchonetes podem criar conta e gerenciar seus produtos
- Sistema de pedidos e compras
- Avaliações e comentários
- Filtro por lanchonete e busca de lanches
- Suporte a métodos de pagamento
- Localização por cidade

## Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript puro
- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB
- **Autenticação**: JWT (em desenvolvimento)

## Instalação

### 1. Clonar o projeto
```bash
git clone <url-do-repositorio>
cd Ouro-Lanches
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar MongoDB

Certifique-se de que MongoDB está rodando em sua máquina:
```bash
# Se estiver usando MongoDB localmente
mongod
```

Ou configure a URL de conexão no arquivo `.env`:
```
MONGODB_URI=mongodb://seu-usuario:sua-senha@seu-host:27017/ouro-lanches
```

### 4. Iniciar o servidor

**Em modo de desenvolvimento (com hot reload):**
```bash
npm run dev
```

**Em modo de produção:**
```bash
npm start
```

O servidor estará disponível em: `http://localhost:5000`

## Estrutura do Projeto

```
Ouro-Lanches/
├── frontend/
│   ├── index.html      # Página principal
│   ├── style.css       # Estilos
│   └── script.js       # Lógica do front
├── backend/
│   ├── server.js       # Servidor Express
│   └── .env            # Variáveis de ambiente
├── package.json        # Dependências
└── README.md          # Este arquivo
```

## API Endpoints

### Lanchonetes
- `GET /api/lanchonetes` - Listar todas
- `POST /api/lanchonetes` - Criar nova
- `GET /api/lanchonetes/:id/lanches` - Lanches de uma lanchonete

### Lanches
- `GET /api/lanches` - Listar todos
- `POST /api/lanches` - Criar novo
- `PUT /api/lanches/:id` - Atualizar
- `DELETE /api/lanches/:id` - Deletar

### Pedidos
- `GET /api/pedidos` - Listar todos
- `POST /api/pedidos` - Criar novo
- `PUT /api/pedidos/:id/status` - Atualizar status

## Como Usar

### Para Clientes

1. Acesse a plataforma em seu navegador
2. Explore as lanchonetes e seus cardápios
3. Filtre por lanchonete ou busque um lanche específico
4. Clique em "Pedir Agora" para adicionar ao carrinho
5. Finalize o pedido com endereço e método de pagamento

### Para Lanchonetes

1. Clique em "Login" no topo da página
2. Clique em "Cadastre-se" para criar uma conta
3. Preencha os dados da sua lanchonete
4. Após login, clique em "+ Adicionar Lanche"
5. Adicione seus produtos com nome, descrição, preço e foto
6. Seus lanches aparecerão imediatamente no catálogo

## Próximos Passos

- [ ] Implementar sistema de autenticação com JWT
- [ ] Adicionar upload de imagens
- [ ] Integrar gateway de pagamento
- [ ] Sistema de rastreamento de pedidos em tempo real
- [ ] App mobile com React Native
- [ ] Dashboard para lanchonetes acompanharem pedidos
- [ ] Sistema de avaliações e comentários

## Suporte

Para dúvidas ou sugestões, abra uma issue ou entre em contato.


