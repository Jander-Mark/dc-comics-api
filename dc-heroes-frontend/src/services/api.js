import axios from 'axios';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8080/api';

// Instância do axios configurada
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error);
    
    // Tratamento de erros específicos
    if (error.response) {
      // Erro com resposta do servidor
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          console.error('Dados inválidos:', data);
          break;
        case 404:
          console.error('Recurso não encontrado:', data);
          break;
        case 500:
          console.error('Erro interno do servidor:', data);
          break;
        default:
          console.error(`Erro ${status}:`, data);
      }
    } else if (error.request) {
      // Erro de rede
      console.error('Erro de rede - API não está respondendo');
    } else {
      // Outro tipo de erro
      console.error('Erro desconhecido:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;

