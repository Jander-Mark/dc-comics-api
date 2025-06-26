# DC Heroes API

Uma API RESTful completa para gerenciamento de personagens da DC Comics, desenvolvida com Spring Boot, incluindo operações CRUD, documentação Swagger/OpenAPI e integração com banco de dados.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de um estudo prático de Programação Orientada a Objetos e Spring Framework. A API permite gerenciar informações detalhadas sobre personagens da DC Comics, oferecendo endpoints REST para todas as operações básicas de um sistema CRUD.

### 🎯 Objetivos

- Aplicar conceitos de Programação Orientada a Objetos
- Explorar funcionalidades do Spring Framework
- Implementar uma API RESTful completa
- Documentar APIs usando Swagger/OpenAPI
- Integrar com banco de dados usando JPA/Hibernate
- Aplicar boas práticas de desenvolvimento

## 🚀 Tecnologias Utilizadas

- **Java 17** - Linguagem de programação
- **Spring Boot 3.2.0** - Framework principal
- **Spring Web** - Para criação de APIs REST
- **Spring Data JPA** - Para persistência de dados
- **Hibernate** - ORM (Object-Relational Mapping)
- **H2 Database** - Banco de dados em memória
- **SpringDoc OpenAPI 3** - Documentação automática da API
- **Maven** - Gerenciamento de dependências
- **Bean Validation** - Validação de dados

## 📁 Estrutura do Projeto

```
dc-heroes-api/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/dcheroes/api/
│       │       ├── DcHeroesApiApplication.java
│       │       ├── controller/
│       │       │   ├── PersonagemController.java
│       │       │   └── GlobalExceptionHandler.java
│       │       ├── model/
│       │       │   ├── Personagem.java
│       │       │   └── StatusPersonagem.java
│       │       ├── repository/
│       │       │   └── PersonagemRepository.java
│       │       ├── service/
│       │       │   └── PersonagemService.java
│       │       └── config/
│       │           └── SwaggerConfig.java
│       └── resources/
│           ├── application.properties
│           └── data.sql
├── pom.xml
└── README.md
```

## 🏗️ Arquitetura

A aplicação segue o padrão MVC (Model-View-Controller) com as seguintes camadas:

- **Controller**: Responsável por receber requisições HTTP e retornar respostas
- **Service**: Contém a lógica de negócio da aplicação
- **Repository**: Interface para acesso aos dados
- **Model**: Entidades que representam os dados

## 📊 Modelo de Dados

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

- `ATIVO` - Personagem ativo
- `INATIVO` - Personagem inativo
- `MORTO` - Personagem morto

## 🔧 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Java 17** ou superior
- **Maven 3.6** ou superior
- **Git** (para clonar o repositório)

### Verificando as instalações

```bash
java -version
mvn -version
```

## 📥 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/Jander-Mark/dc-comics-api
cd dc-heroes-api
```

### 2. Compile o projeto

```bash
mvn clean compile
```

### 3. Execute a aplicação

```bash
mvn spring-boot:run
```

A aplicação será iniciada na porta 8080. Você verá uma mensagem similar a:

```
Started DcHeroesApiApplication in X.XXX seconds
```

### 4. Acesse a aplicação

- **API Base URL**: http://localhost:8080
- **Documentação Swagger**: http://localhost:8080/swagger-ui.html
- **Console H2**: http://localhost:8080/h2-console

## 📚 Endpoints da API

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

## 🧪 Exemplos de Uso

### 1. Listar todos os personagens

```bash
curl -X GET "http://localhost:8080/api/personagens"
```

### 2. Buscar personagem por ID

```bash
curl -X GET "http://localhost:8080/api/personagens/1"
```

### 3. Criar novo personagem

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

### 4. Atualizar personagem

```bash
curl -X PUT "http://localhost:8080/api/personagens/1" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Superman",
    "nomeReal": "Clark Kent",
    "origem": "Krypton",
    "poderes": "Super força, voo, visão de raio-x, visão de calor",
    "afiliacao": "Liga da Justiça",
    "primeiraAparicao": "1938",
    "status": "ATIVO",
    "descricao": "O Último Filho de Krypton, atualizado"
  }'
```

### 5. Deletar personagem

```bash
curl -X DELETE "http://localhost:8080/api/personagens/1"
```

### 6. Buscar por nome

```bash
curl -X GET "http://localhost:8080/api/personagens/buscar?nome=Batman"
```

### 7. Buscar por afiliação

```bash
curl -X GET "http://localhost:8080/api/personagens/afiliacao/Liga%20da%20Justiça"
```

## 📖 Documentação Swagger

A API possui documentação automática gerada pelo Swagger/OpenAPI 3. Para acessar:

1. Execute a aplicação
2. Acesse: http://localhost:8080/swagger-ui.html
3. Explore todos os endpoints disponíveis
4. Teste diretamente pela interface

### Recursos da documentação:

- Descrição detalhada de todos os endpoints
- Exemplos de requisições e respostas
- Modelos de dados com validações
- Interface para testar endpoints
- Download da especificação OpenAPI

## 🗄️ Banco de Dados

### H2 Database

A aplicação utiliza o banco H2 em memória para desenvolvimento. As configurações incluem:

- **URL**: `jdbc:h2:mem:dcheroes`
- **Usuário**: `sa`
- **Senha**: (vazia)
- **Console**: http://localhost:8080/h2-console

### Dados Iniciais

A aplicação é inicializada com 10 personagens famosos da DC:

1. Superman (Clark Kent)
2. Batman (Bruce Wayne)
3. Wonder Woman (Diana Prince)
4. The Flash (Barry Allen)
5. Green Lantern (Hal Jordan)
6. Aquaman (Arthur Curry)
7. Cyborg (Victor Stone)
8. Green Arrow (Oliver Queen)
9. Martian Manhunter (J'onn J'onzz)
10. Shazam (Billy Batson)

## ⚙️ Configurações

### application.properties

As principais configurações da aplicação:

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

## 🔒 Validações

A API implementa validações usando Bean Validation:

- **Nome**: Obrigatório, máximo 100 caracteres
- **Nome Real**: Máximo 100 caracteres
- **Origem**: Máximo 150 caracteres
- **Poderes**: Máximo 500 caracteres
- **Afiliação**: Máximo 100 caracteres
- **Primeira Aparição**: Máximo 50 caracteres
- **Descrição**: Máximo 1000 caracteres

## 🚨 Tratamento de Erros

A API possui tratamento global de exceções que retorna:

### Códigos de Status HTTP

- **200 OK**: Operação realizada com sucesso
- **201 Created**: Recurso criado com sucesso
- **204 No Content**: Recurso deletado com sucesso
- **400 Bad Request**: Dados inválidos
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor

### Formato de Erro

```json
{
  "timestamp": "2025-06-11T21:15:00",
  "status": 404,
  "error": "Recurso não encontrado",
  "message": "Personagem não encontrado com ID: 999"
}
```

## 🧪 Testes

### Testando com Swagger UI

1. Acesse http://localhost:8080/swagger-ui.html
2. Selecione um endpoint
3. Clique em "Try it out"
4. Preencha os parâmetros necessários
5. Clique em "Execute"
6. Visualize a resposta

### Testando com cURL

Todos os exemplos de cURL estão disponíveis na seção "Exemplos de Uso" deste README.

### Testando com Postman

Importe a especificação OpenAPI disponível em:
http://localhost:8080/api-docs

## 🔄 CORS

A API está configurada para aceitar requisições de qualquer origem, facilitando o desenvolvimento de frontends:

```properties
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

---
**Desenvolvido usando Spring Boot**
