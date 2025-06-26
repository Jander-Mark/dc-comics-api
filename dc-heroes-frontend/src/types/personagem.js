// Enum para status do personagem
export const StatusPersonagem = {
  ATIVO: 'ATIVO',
  INATIVO: 'INATIVO',
  MORTO: 'MORTO'
};

// --- Bloco de código para Alinhamento ---
export const Alinhamento = {
    HEROI: 'HEROI',
    VILAO: 'VILAO',
    ANTI_HEROI: 'ANTI_HEROI',
    NEUTRO: 'NEUTRO',
};

// Constantes para afiliações comuns
export const AFILIACOES_COMUNS = [
  'Liga da Justiça',
  'Sociedade da Justiça',
  'Titãs',
  'Jovens Titãs',
  'Patrulha do Destino',
  'Legião dos Super-Heróis',
  'Esquadrão Suicida',
  'Injustice League',
  'Independente'
];

// Constantes para origens comuns
export const ORIGENS_COMUNS = [
  'Terra',
  'Krypton',
  'Themyscira',
  'Atlantis',
  'Mars',
  'Oa',
  'Apokolips',
  'New Genesis',
  'Gotham City',
  'Metropolis',
  'Central City',
  'Star City',
  'Coast City'
];

// Constantes para universos comuns
export const UNIVERSOS_COMUNS = [
  'Terra-1',
  'Terra-2',
  'Terra-3',
  'Terra-Prime',
  'Terra-S',
  'Terra-X',
  'Universo Animado',
  'Arrowverse',
  'DCEU',
  'Injustice',
  'Elseworlds',
  'Multiverso'
];

// Labels para status
export const STATUS_LABELS = {
  [StatusPersonagem.ATIVO]: 'Ativo',
  [StatusPersonagem.INATIVO]: 'Inativo',
  [StatusPersonagem.MORTO]: 'Morto'
};

// Cores para status
export const STATUS_COLORS = {
  [StatusPersonagem.ATIVO]: 'bg-green-100 text-green-800',
  [StatusPersonagem.INATIVO]: 'bg-yellow-100 text-yellow-800',
  [StatusPersonagem.MORTO]: 'bg-red-100 text-red-800'
};

// --- Labels e Cores para Alinhamento ---
export const ALINHAMENTO_LABELS = {
    [Alinhamento.HEROI]: 'Herói',
    [Alinhamento.VILAO]: 'Vilão',
    [Alinhamento.ANTI_HEROI]: 'Anti-herói',
    [Alinhamento.NEUTRO]: 'Neutro',
};

export const ALINHAMENTO_COLORS = {
    [Alinhamento.HEROI]: 'bg-sky-100 text-sky-800',
    [Alinhamento.VILAO]: 'bg-rose-200 text-rose-900',
    [Alinhamento.ANTI_HEROI]: 'bg-purple-200 text-purple-900',
    [Alinhamento.NEUTRO]: 'bg-gray-200 text-gray-800',
};

// Função para criar um personagem vazio
export const criarPersonagemVazio = () => ({
  nome: '',
  nomeReal: '',
  origem: '',
  universo: '',
  poderes: '',
  afiliacao: '',
  primeiraAparicao: '',
  status: StatusPersonagem.ATIVO,
  descricao: '',
  imagemUrl: '',
  alinhamento: '' // <-- Campo adicionado
});

// Função para validar personagem
export const validarPersonagem = (personagem) => {
  const erros = {};
  
  if (!personagem.nome || personagem.nome.trim().length === 0) {
    erros.nome = 'Nome é obrigatório';
  } else if (personagem.nome.length > 100) {
    erros.nome = 'Nome deve ter no máximo 100 caracteres';
  }
  
  if (personagem.nomeReal && personagem.nomeReal.length > 100) {
    erros.nomeReal = 'Nome real deve ter no máximo 100 caracteres';
  }
  
  if (personagem.origem && personagem.origem.length > 150) {
    erros.origem = 'Origem deve ter no máximo 150 caracteres';
  }
  
  if (personagem.universo && personagem.universo.length > 100) {
    erros.universo = 'Universo deve ter no máximo 100 caracteres';
  }
  
  if (personagem.poderes && personagem.poderes.length > 500) {
    erros.poderes = 'Poderes deve ter no máximo 500 caracteres';
  }
  
  if (personagem.afiliacao && personagem.afiliacao.length > 100) {
    erros.afiliacao = 'Afiliação deve ter no máximo 100 caracteres';
  }
  
  if (personagem.primeiraAparicao && personagem.primeiraAparicao.length > 50) {
    erros.primeiraAparicao = 'Primeira aparição deve ter no máximo 50 caracteres';
  }
  
  if (personagem.descricao && personagem.descricao.length > 1000) {
    erros.descricao = 'Descrição deve ter no máximo 1000 caracteres';
  }
  
  if (personagem.imagemUrl && personagem.imagemUrl.length > 500) {
    erros.imagemUrl = 'URL da imagem deve ter no máximo 500 caracteres';
  }
  
  if (!personagem.status || !Object.values(StatusPersonagem).includes(personagem.status)) {
    erros.status = 'Status é obrigatório e deve ser válido';
  }

  // --- Validação para Alinhamento ---
  if (!personagem.alinhamento || !Object.values(Alinhamento).includes(personagem.alinhamento)) {
      erros.alinhamento = 'Alinhamento é obrigatório e deve ser válido';
  }
  
  return {
    valido: Object.keys(erros).length === 0,
    erros
  };
};
