import api from './api.js';

const PERSONAGENS_ENDPOINT = '/personagens';
const UPLOAD_ENDPOINT = '/upload';

// Serviço para operações com personagens
export const personagemService = {
  // Listar todos os personagens
  async listarTodos() {
    try {
      const response = await api.get(PERSONAGENS_ENDPOINT);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Buscar personagem por ID
  async buscarPorId(id) {
    try {
      const response = await api.get(`${PERSONAGENS_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Criar novo personagem
  async criar(personagem) {
    try {
      const response = await api.post(PERSONAGENS_ENDPOINT, personagem);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Atualizar personagem
  async atualizar(id, personagem) {
    try {
      const response = await api.put(`${PERSONAGENS_ENDPOINT}/${id}`, personagem);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Deletar personagem
  async deletar(id) {
    try {
      await api.delete(`${PERSONAGENS_ENDPOINT}/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Buscar personagens por nome
  async buscarPorNome(nome) {
    try {
      const response = await api.get(`${PERSONAGENS_ENDPOINT}/buscar`, {
        params: { nome }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Buscar personagens por afiliação
  async buscarPorAfiliacao(afiliacao) {
    try {
      const response = await api.get(`${PERSONAGENS_ENDPOINT}/afiliacao/${encodeURIComponent(afiliacao)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Buscar personagens por status
  async buscarPorStatus(status) {
    try {
      const response = await api.get(`${PERSONAGENS_ENDPOINT}/status/${status}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Buscar personagens por nome real
  async buscarPorNomeReal(nomeReal) {
    try {
      const response = await api.get(`${PERSONAGENS_ENDPOINT}/nome-real`, {
        params: { nomeReal }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Buscar personagens por origem
  async buscarPorOrigem(origem) {
    try {
      const response = await api.get(`${PERSONAGENS_ENDPOINT}/origem`, {
        params: { origem }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Filtrar personagens por múltiplos critérios
  async filtrar(filtros) {
    try {
      const params = {};
      
      // Adicionar apenas parâmetros não vazios
      if (filtros.nome) params.nome = filtros.nome;
      if (filtros.afiliacao) params.afiliacao = filtros.afiliacao;
      if (filtros.status) params.status = filtros.status;
      if (filtros.universo) params.universo = filtros.universo;
      if (filtros.origem) params.origem = filtros.origem;
      
      const response = await api.get(`${PERSONAGENS_ENDPOINT}/filtrar`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Verificar se personagem existe por nome
  async existePorNome(nome) {
    try {
      const response = await api.get(`${PERSONAGENS_ENDPOINT}/existe/${encodeURIComponent(nome)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Upload de imagem
  async uploadImagem(arquivo) {
    try {
      // Validar arquivo antes do upload
      this.validarArquivoImagem(arquivo);

      const formData = new FormData();
      formData.append('file', arquivo);

      const response = await api.post(`${UPLOAD_ENDPOINT}/imagem`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Deletar imagem
  async deletarImagem(filename) {
    try {
      const response = await api.delete(`${UPLOAD_ENDPOINT}/imagem/${filename}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Obter URL completa da imagem
  getImagemUrl(imagemUrl) {
    if (!imagemUrl) return null;
    if (imagemUrl.startsWith('http')) return imagemUrl;
    
    // Construir URL completa para imagens locais
    const baseUrl = 'http://localhost:8080';
    return `${baseUrl}${imagemUrl}`;
  },

  // Validar arquivo de imagem
  validarArquivoImagem(arquivo) {
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const tamanhoMaximo = 10 * 1024 * 1024; // 10MB

    if (!arquivo) {
      throw new Error('Nenhum arquivo selecionado.');
    }

    if (!tiposPermitidos.includes(arquivo.type)) {
      throw new Error('Tipo de arquivo não permitido. Use JPEG, PNG, GIF ou WebP.');
    }

    if (arquivo.size > tamanhoMaximo) {
      throw new Error('Arquivo muito grande. Tamanho máximo: 10MB.');
    }

    return true;
  },

  // Calcular estatísticas dos personagens
  calcularEstatisticas(personagens) {
    if (!Array.isArray(personagens)) return null;

    const stats = {
      total: personagens.length,
      ativos: 0,
      inativos: 0,
      mortos: 0,
      afiliacoes: {},
      universos: {}
    };

    personagens.forEach(personagem => {
      // Contar por status
      switch (personagem.status) {
        case 'ATIVO':
          stats.ativos++;
          break;
        case 'INATIVO':
          stats.inativos++;
          break;
        case 'MORTO':
          stats.mortos++;
          break;
      }

      // Contar por afiliação
      if (personagem.afiliacao) {
        stats.afiliacoes[personagem.afiliacao] = (stats.afiliacoes[personagem.afiliacao] || 0) + 1;
      }

      // Contar por universo
      if (personagem.universo) {
        stats.universos[personagem.universo] = (stats.universos[personagem.universo] || 0) + 1;
      }
    });

    return stats;
  },

  // Tratamento de erros
  handleError(error) {
    if (error.response) {
      // Erro com resposta do servidor
      const { status, data } = error.response;
      
      return {
        status,
        message: data.message || data.error || 'Erro no servidor',
        validationErrors: data.validationErrors || null,
        timestamp: data.timestamp || new Date().toISOString()
      };
    } else if (error.request) {
      // Erro de rede
      return {
        status: 0,
        message: 'Erro de conexão - Verifique se a API está rodando',
        timestamp: new Date().toISOString()
      };
    } else {
      // Outro tipo de erro
      return {
        status: -1,
        message: error.message || 'Erro desconhecido',
        timestamp: new Date().toISOString()
      };
    }
  }
};

export default personagemService;

