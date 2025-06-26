# Aplicação Fullstack DC Heroes

Uma aplicação completa para gerenciamento de personagens da DC Comics, composta por uma API RESTful desenvolvida com Spring Boot e um frontend moderno em React. Este projeto demonstra a integração de tecnologias backend e frontend para criar uma solução robusta e interativa.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como um estudo prático de Programação Orientada a Objetos, Spring Framework e React. A solução permite gerenciar informações detalhadas sobre personagens da DC Comics, oferecendo uma API REST para operações CRUD e uma interface de usuário intuitiva para visualizar, buscar e filtrar heróis e vilões do universo DC.

### 🎯 Objetivos

- Aplicar conceitos de Programação Orientada a Objetos e desenvolvimento fullstack.
- Explorar funcionalidades do Spring Framework para construção de APIs.
- Implementar uma API RESTful completa com documentação Swagger/OpenAPI.
- Integrar com banco de dados usando JPA/Hibernate.
- Desenvolver um frontend moderno e responsivo com React, consumindo a API.
- Aplicar boas práticas de desenvolvimento em ambas as camadas.

### ✨ Funcionalidades Principais

**API (Backend):**
- Operações CRUD completas para personagens da DC Comics.
- Endpoints de busca e filtragem avançada por nome, afiliação, status, etc.
- Validação de dados de entrada.
- Tratamento global de erros com respostas padronizadas.
- Documentação automática da API com Swagger/OpenAPI 3.

**Frontend (Web):**
- Dashboard com estatísticas em tempo real (total de personagens, ativos, inativos, mortos).
- Listagem completa de personagens em um grid responsivo.
- Busca inteligente por nome em tempo real.
- Filtros avançados por status (Ativo/Inativo/Morto).
- Cards informativos para exibição detalhada de cada personagem.
- Interface responsiva adaptada para desktop, tablet e mobile.
- Integração completa e consumo da API REST.

## 🚀 Tecnologias Utilizadas

### Backend (API)
- **Java 17** - Linguagem de programação
- **Spring Boot 3.2.0** - Framework principal
- **Spring Web** - Para criação de APIs REST
- **Spring Data JPA** - Para persistência de dados
- **Hibernate** - ORM (Object-Relational Mapping)
- **H2 Database** - Banco de dados em memória
- **SpringDoc OpenAPI 3** - Documentação automática da API
- **Maven** - Gerenciamento de dependências
- **Bean Validation** - Validação de dados

### Frontend (Web)
- **React 19** - Framework JavaScript
- **Vite** - Build tool e dev server
- **JavaScript (ES6+)** - Linguagem principal
- **TailwindCSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones SVG
- **Framer Motion** - Animações (pré-instalado)
- **Axios** - Cliente HTTP para API
- **React Query** - Cache e sincronização (pré-instalado)
- **React Hook Form** - Gerenciamento de formulários (pré-instalado)
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **npm** - Gerenciador de pacotes

## 📁 Estrutura do Projeto

O projeto é dividido em duas pastas principais: `dc-heroes-api` para o backend e `dc-heroes-frontend` para o frontend.

```
dc-heroes-fullstack/
├── dc-heroes-api/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/dcheroes/api/
│   │       │       ├── DcHeroesApiApplication.java
│   │       │       ├── controller/
│   │       │       ├── model/
│   │       │       ├── repository/
│   │       │       ├── service/
│   │       │       └── config/
│   │       └── resources/
│   │           ├── application.properties
│   │           └── data.sql
│   ├── pom.xml
│   └── README.md (este arquivo)
│
└── dc-heroes-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── ui/
    │   ├── services/
    │   │   ├── api.js
    │   │   └── personagemService.js
    │   ├── types/
    │   │   └── personagem.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── components.json
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── README.md (este arquivo)
```

## 🏗️ Arquitetura (Backend)

A aplicação backend segue o padrão MVC (Model-View-Controller) com as seguintes camadas:

-   **Controller**: Responsável por receber requisições HTTP e retornar respostas.
-   **Service**: Contém a lógica de negócio da aplicação.
-   **Repository**: Interface para acesso aos dados.
-   **Model**: Entidades que representam os dados.

## 📊 Modelo de Dados (Backend)

### Entidade Personagem

| Campo | Tipo | Descrição | Obrigatório |
|-------|------|-----------|-------------|
| id | Long | Identificador único | Sim (auto-gerado) |
| nome | String | Nome do personagem | Sim |
| nomeReal | String | Nome real do personagem | Não |
| origem | String | Local de origem | Não |
| poderes | String | Lista de poderes | Não |
| afiliacao | String | Afiliação (ex: Liga da Justiça) | Não |
| primeiraAparicao | String | Ano da primeira aparição | Não |
| status | StatusPersonagem | Status atual (ATIVO/INATIVO/MORTO) | Sim |
| descricao | String | Descrição detalhada | Não |

### Enum StatusPersonagem

-   `ATIVO` - Personagem ativo
-   `INATIVO` - Personagem inativo
-   `MORTO` - Personagem morto

## 🔧 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

-   **Java 17** ou superior
-   **Maven 3.6** ou superior
-   **Node.js 18+** ou superior
-   **pnpm** (recomendado para frontend) ou npm/yarn
-   **Git** (para clonar o repositório)

### Verificando as instalações

```bash
java -version
mvn -version
node --version
npm --version
```

## 📥 Instalação e Execução

Siga os passos abaixo para configurar e executar a aplicação completa.

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd dc-heroes-fullstack
```

### 2. Inicie o Backend (API)

Navegue até a pasta `dc-heroes-api` e execute o projeto.

```bash
cd dc-heroes-api
mvn clean compile
mvn spring-boot:run
```

A aplicação API será iniciada na porta `8080`. Você verá uma mensagem similar a:

```
Started DcHeroesApiApplication in X.XXX seconds
```

-   **API Base URL**: `http://localhost:8080`
-   **Documentação Swagger**: `http://localhost:8080/swagger-ui.html`
-   **Console H2**: `http://localhost:8080/h2-console`

### 3. Inicie o Frontend (Web)

Em um **novo terminal**, navegue até a pasta `dc-heroes-frontend` e execute o projeto.

```bash
cd ../dc-heroes-frontend
npm install # ou pnpm install
npm run dev # ou pnpm run dev
```

A aplicação frontend será iniciada e estará disponível em:
-   **Local**: `http://localhost:5173`
-   **Network**: `http://[seu-ip]:5173`

### 4. Acesse a Aplicação

Abra seu navegador e acesse `http://localhost:5173` para interagir com a aplicação.

## 📚 Endpoints da API (Backend)

### Base URL: `http://localhost:8080/api/personagens`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Listar todos os personagens |
| GET | `/{id}` | Buscar personagem por ID |
| POST | `/` | Criar novo personagem |
| PUT | `/{id}` | Atualizar personagem |
| DELETE | `/{id}` | Deletar personagem |
| GET | `/buscar?nome={nome}` | Buscar por nome |
| GET | `/afiliacao/{afiliacao}` | Buscar por afiliação |
| GET | `/status/{status}` | Buscar por status |
| GET | `/nome-real?nomeReal={nomeReal}` | Buscar por nome real |
| GET | `/origem?origem={origem}` | Buscar por origem |
| GET | `/filtrar?nome={nome}&afiliacao={afiliacao}&status={status}` | Filtrar por múltiplos critérios |
| GET | `/existe/{nome}` | Verificar se personagem existe |

## 🧪 Exemplos de Uso (API)

### 1. Listar todos os personagens

```bash
curl -X GET "http://localhost:8080/api/personagens"
```

### 2. Criar novo personagem

```bash
curl -X POST "http://localhost:8080/api/personagens" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Lanterna Verde",
    "nomeReal": "John Stewart",
    "origem": "Detroit",
    "poderes": "Anel do poder, construtos de energia",
    "afiliacao": "Liga da Justiça",
    "primeiraAparicao": "1971",
    "status": "ATIVO",
    "descricao": "Arquiteto que se tornou Lanterna Verde"
  }'
```

## 📖 Documentação Swagger (Backend)

A API possui documentação automática gerada pelo Swagger/OpenAPI 3. Para acessar:

1.  Execute a aplicação backend.
2.  Acesse: `http://localhost:8080/swagger-ui.html`
3.  Explore todos os endpoints disponíveis e teste diretamente pela interface.

## 🎨 Interface da Aplicação (Frontend)

### Dashboard Principal
-   **Header**: Logo e botão "Adicionar Herói"
-   **Estatísticas**: Cards com totais por status
-   **Filtros**: Busca por nome e filtro por status
-   **Grid de Personagens**: Cards responsivos com informações

### Cards de Personagem
Cada card exibe:
-   **Nome** e **Nome Real**
-   **Status** com badge colorido
-   **Origem** e **Afiliação**
-   **Primeira Aparição**
-   **Poderes** (resumido)
-   **Descrição** (resumida)
-   **Botões**: Editar e Ver Detalhes

### Cores por Status
-   **Ativo**: Verde (bg-green-100 text-green-800)
-   **Inativo**: Amarelo (bg-yellow-100 text-yellow-800)
-   **Morto**: Vermelho (bg-red-100 text-red-800)

## 🌐 Integração com API (Frontend)

O frontend consome os seguintes endpoints da API:

| Método | Endpoint | Uso na Aplicação |
|--------|----------|------------------|
| GET | `/api/personagens` | Carregar todos os personagens |
| GET | `/api/personagens/buscar?nome={nome}` | Busca por nome |
| GET | `/api/personagens/status/{status}` | Filtro por status |
| GET | `/api/personagens/filtrar?...` | Filtros combinados |

### Configuração da API
```javascript
// dc-heroes-frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🗄️ Banco de Dados (Backend)

### H2 Database

A aplicação utiliza o banco H2 em memória para desenvolvimento. As configurações incluem:

-   **URL**: `jdbc:h2:mem:dcheroes`
-   **Usuário**: `sa`
-   **Senha**: (vazia)
-   **Console**: `http://localhost:8080/h2-console`

### Dados Iniciais

A aplicação é inicializada com 10 personagens famosos da DC: Superman, Batman, Wonder Woman, The Flash, Green Lantern, Aquaman, Cyborg, Green Arrow, Martian Manhunter, Shazam.

## ⚙️ Configurações (Backend)

### application.properties

As principais configurações da aplicação backend:

```properties
# Servidor
server.port=8080

# Banco H2
spring.datasource.url=jdbc:h2:mem:dcheroes
spring.jpa.hibernate.ddl-auto=create
spring.jpa.defer-datasource-initialization=true

# Console H2
spring.h2.console.enabled=true

# Swagger
springdoc.swagger-ui.path=/swagger-ui.html

# CORS
spring.web.cors.allowed-origins=*
```

## 🔒 Validações (Backend)

A API implementa validações usando Bean Validation para os campos do personagem.

## 🚨 Tratamento de Erros

### Backend (API)
A API possui tratamento global de exceções que retorna códigos de status HTTP apropriados (200, 201, 204, 400, 404, 500) e um formato de erro JSON padronizado.

### Frontend (Web)
A aplicação frontend trata cenários como erro de conexão, 404, 500, estados de carregamento (spinners) e estados vazios (mensagens quando não há resultados).

## 🧪 Testes

### Testando a API
-   **Swagger UI**: Acesse `http://localhost:8080/swagger-ui.html` para testar os endpoints diretamente.
-   **cURL**: Utilize os exemplos de cURL fornecidos na seção "Exemplos de Uso".
-   **Postman**: Importe a especificação OpenAPI disponível em `http://localhost:8080/api-docs`.

### Testando o Frontend
-   Interaja com a interface da aplicação em `http://localhost:5173` para testar as funcionalidades de busca, filtro e exibição.

## 🔄 CORS

A API está configurada para aceitar requisições de qualquer origem (`spring.web.cors.allowed-origins=*`), facilitando o desenvolvimento de frontends.

---

**Desenvolvido usando Spring Boot e React**
