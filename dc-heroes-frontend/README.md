# DC Heroes Manager - Frontend

Uma aplicação web moderna em React para gerenciar personagens da DC Comics, consumindo a API RESTful desenvolvida em Spring Boot. Interface responsiva e intuitiva para visualizar, buscar e filtrar heróis e vilões do universo DC.

## 📋 Sobre o Projeto

Este frontend foi desenvolvido como complemento à API RESTful de personagens da DC Comics. A aplicação oferece uma interface moderna e responsiva para interagir com todos os dados dos personagens, incluindo funcionalidades de busca, filtros e estatísticas em tempo real.

### 🎯 Funcionalidades

- **Dashboard com Estatísticas**: Visão geral dos personagens por status
- **Listagem Completa**: Grid responsivo com todos os personagens
- **Busca Inteligente**: Busca por nome em tempo real
- **Filtros Avançados**: Filtro por status (Ativo/Inativo/Morto)
- **Cards Informativos**: Exibição detalhada de cada personagem
- **Interface Responsiva**: Adaptada para desktop, tablet e mobile
- **Integração Completa**: Consumo total da API REST

## 🚀 Tecnologias Utilizadas

### Core
- **React 19** - Framework JavaScript
- **Vite** - Build tool e dev server
- **JavaScript (ES6+)** - Linguagem principal

### UI/UX
- **TailwindCSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones SVG
- **Framer Motion** - Animações (pré-instalado)

### Estado e Dados
- **Axios** - Cliente HTTP para API
- **React Query** - Cache e sincronização (pré-instalado)
- **React Hook Form** - Gerenciamento de formulários (pré-instalado)

### Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **pnpm** - Gerenciador de pacotes

## 📁 Estrutura do Projeto

```
dc-heroes-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── ui/          # Componentes shadcn/ui
│   ├── services/
│   │   ├── api.js       # Configuração do Axios
│   │   └── personagemService.js  # Serviços da API
│   ├── types/
│   │   └── personagem.js  # Tipos e constantes
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos customizados
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Entry point
├── components.json      # Configuração shadcn/ui
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Pré-requisitos

Antes de executar o projeto, certifique-se de ter:

- **Node.js 18+** ou superior
- **pnpm** (recomendado) ou npm/yarn
- **API Backend** rodando em http://localhost:8080

### Verificando as instalações

```bash
node --version
pnpm --version
```

## 📥 Instalação e Execução

### 1. Clone o repositório (se necessário)

```bash
git clone <url-do-repositorio>
cd dc-heroes-frontend
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Inicie a API Backend

Certifique-se de que a API Spring Boot está rodando:

```bash
# Em outro terminal, na pasta dc-heroes-api
cd ../dc-heroes-api
mvn spring-boot:run
```

A API deve estar disponível em: http://localhost:8080

### 4. Execute o frontend

```bash
pnpm run dev
```

A aplicação será iniciada e estará disponível em:
- **Local**: http://localhost:5173
- **Network**: http://[seu-ip]:5173

### 5. Acesse a aplicação

Abra seu navegador e acesse http://localhost:5173

## 🎨 Interface da Aplicação

### Dashboard Principal
- **Header**: Logo e botão "Adicionar Herói"
- **Estatísticas**: Cards com totais por status
- **Filtros**: Busca por nome e filtro por status
- **Grid de Personagens**: Cards responsivos com informações

### Cards de Personagem
Cada card exibe:
- **Nome** e **Nome Real**
- **Status** com badge colorido
- **Origem** e **Afiliação**
- **Primeira Aparição**
- **Poderes** (resumido)
- **Descrição** (resumida)
- **Botões**: Editar e Ver Detalhes

### Cores por Status
- **Ativo**: Verde (bg-green-100 text-green-800)
- **Inativo**: Amarelo (bg-yellow-100 text-yellow-800)
- **Morto**: Vermelho (bg-red-100 text-red-800)

## 🔍 Funcionalidades Detalhadas

### 1. Estatísticas em Tempo Real
```javascript
// Cálculo automático baseado nos dados
- Total de personagens
- Personagens ativos
- Personagens inativos
- Personagens mortos
```

### 2. Busca Inteligente
```javascript
// Busca por nome (case insensitive)
GET /api/personagens/buscar?nome={termo}
```

### 3. Filtros por Status
```javascript
// Filtro por status específico
GET /api/personagens/status/{status}
```

### 4. Filtros Combinados
```javascript
// Busca com múltiplos critérios
GET /api/personagens/filtrar?nome={nome}&status={status}
```

## 🌐 Integração com API

### Endpoints Consumidos

| Método | Endpoint | Uso na Aplicação |
|--------|----------|------------------|
| GET | `/api/personagens` | Carregar todos os personagens |
| GET | `/api/personagens/buscar?nome={nome}` | Busca por nome |
| GET | `/api/personagens/status/{status}` | Filtro por status |
| GET | `/api/personagens/filtrar?...` | Filtros combinados |

### Tratamento de Erros

A aplicação trata os seguintes cenários:

- **Erro de Conexão**: "Erro de conexão - Verifique se a API está rodando"
- **Erro 404**: "Recurso não encontrado"
- **Erro 500**: "Erro interno do servidor"
- **Loading States**: Spinners durante carregamento
- **Empty States**: Mensagem quando não há resultados

### Estados da Aplicação

```javascript
// Estados principais
const [personagens, setPersonagens] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [selectedStatus, setSelectedStatus] = useState('');
const [stats, setStats] = useState(null);
```

## 📱 Responsividade

### Breakpoints (TailwindCSS)
- **Mobile**: < 768px (1 coluna)
- **Tablet**: 768px - 1024px (2 colunas)
- **Desktop**: > 1024px (3 colunas)

### Layout Adaptativo
```css
/* Grid responsivo */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Flexbox responsivo */
flex-col md:flex-row

/* Espaçamento responsivo */
px-4 py-6 container mx-auto
```

## 🎯 Componentes Principais

### App.jsx
Componente principal que gerencia:
- Estado global da aplicação
- Integração com API
- Renderização da interface

### Serviços (services/)
- **api.js**: Configuração do Axios com interceptors
- **personagemService.js**: Métodos para consumir a API

### Tipos (types/)
- **personagem.js**: Constantes, enums e funções utilitárias

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev          # Inicia servidor de desenvolvimento
pnpm run dev --host   # Inicia com acesso externo

# Build
pnpm run build        # Gera build de produção
pnpm run preview      # Preview do build

# Linting
pnpm run lint         # Executa ESLint
```

## 🚨 Solução de Problemas

### API não está respondendo
```bash
# Verifique se a API está rodando
curl http://localhost:8080/api/personagens

# Se não estiver, inicie a API
cd ../dc-heroes-api
mvn spring-boot:run
```

### Erro de CORS
A API já está configurada para aceitar requisições do frontend. Se houver problemas:

```properties
# Verificar application.properties da API
spring.web.cors.allowed-origins=*
```

### Porta em uso
```bash
# Se a porta 5173 estiver em uso
pnpm run dev
# O Vite automaticamente tentará a próxima porta disponível
```

### Dependências
```bash
# Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🔄 Fluxo de Dados

### 1. Inicialização
```
App.jsx → useEffect → carregarPersonagens() → API → setPersonagens()
```

### 2. Busca
```
Input → setSearchTerm → buscarPersonagens() → API → setPersonagens()
```

### 3. Filtros
```
Select → setSelectedStatus → buscarPersonagens() → API → setPersonagens()
```

### 4. Estatísticas
```
personagens → useEffect → calcularEstatisticas() → setStats()
```

## 📊 Performance

### Otimizações Implementadas
- **Lazy Loading**: Componentes carregados sob demanda
- **Debounce**: Busca otimizada (pode ser implementada)
- **Cache**: React Query para cache de dados
- **Bundle Size**: Tree shaking automático do Vite

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB

## 🎨 Customização

### Cores do Tema
```css
/* Variáveis CSS customizadas */
--primary: oklch(0.205 0 0);
--secondary: oklch(0.97 0 0);
--accent: oklch(0.97 0 0);
```

### Componentes UI
```javascript
// Componentes shadcn/ui disponíveis
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
```

## 🚀 Deploy

### Desenvolvimento Local
```bash
pnpm run dev --host
```

### Build de Produção
```bash
pnpm run build
pnpm run preview
```

### Deploy em Produção
```bash
# Build
pnpm run build

# Os arquivos estarão em dist/
# Pode ser servido por qualquer servidor estático
```

## 🔮 Próximas Funcionalidades

Funcionalidades planejadas para versões futuras:

- [ ] **Modal de Detalhes**: Visualização completa do personagem
- [ ] **Formulário de Criação**: Adicionar novos personagens
- [ ] **Formulário de Edição**: Editar personagens existentes
- [ ] **Confirmação de Exclusão**: Deletar personagens
- [ ] **Busca Avançada**: Filtros por afiliação e origem
- [ ] **Paginação**: Para grandes volumes de dados
- [ ] **Ordenação**: Por nome, data, etc.
- [ ] **Tema Escuro**: Toggle dark/light mode
- [ ] **Favoritos**: Marcar personagens favoritos
- [ ] **Exportação**: Download de dados em PDF/CSV

## 🤝 Integração com Backend

### Configuração da API
```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:8080/api';
```

### Estrutura de Dados
```javascript
// Formato esperado da API
{
  "id": 1,
  "nome": "Superman",
  "nomeReal": "Clark Kent",
  "origem": "Krypton",
  "poderes": "Super força, voo...",
  "afiliacao": "Liga da Justiça",
  "primeiraAparicao": "1938",
  "status": "ATIVO",
  "descricao": "O Último Filho de Krypton..."
}
```

## 📞 Suporte

### Logs de Debug
```javascript
// Console logs automáticos
🚀 GET /api/personagens
✅ 200 /api/personagens
❌ Erro na resposta: {...}
```

### Troubleshooting
1. **Verifique se a API está rodando**
2. **Confirme a URL da API**
3. **Verifique o console do navegador**
4. **Teste endpoints diretamente**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando React + TailwindCSS**

