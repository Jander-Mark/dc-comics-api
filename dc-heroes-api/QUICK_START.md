# Guia Rápido de Execução - DC Heroes API

## 🚀 Execução Rápida

### 1. Pré-requisitos
- Java 17+
- Maven 3.6+

### 2. Comandos de Execução

```bash
# Navegar para o diretório do projeto
cd dc-heroes-api

# Executar a aplicação
mvn spring-boot:run
```

### 3. URLs Importantes

- **API**: http://localhost:8080/api/personagens
- **Swagger**: http://localhost:8080/swagger-ui.html
- **H2 Console**: http://localhost:8080/h2-console

### 4. Teste Rápido

```bash
# Listar todos os personagens
curl http://localhost:8080/api/personagens

# Buscar Superman (ID 1)
curl http://localhost:8080/api/personagens/1
```

### 5. Parar a Aplicação

Pressione `Ctrl + C` no terminal onde a aplicação está rodando.

---

Para documentação completa, consulte o [README.md](README.md)

