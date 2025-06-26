import { useState, useEffect } from 'react';
import './App.css';
import personagemService from './services/personagemService.js';
import { 
  StatusPersonagem, 
  STATUS_LABELS, 
  STATUS_COLORS, 
  Alinhamento,             // <-- ADICIONADO
  ALINHAMENTO_LABELS,      // <-- ADICIONADO
  ALINHAMENTO_COLORS,      // <-- ADICIONADO
  criarPersonagemVazio, 
  validarPersonagem,
  AFILIACOES_COMUNS,
  ORIGENS_COMUNS,
  UNIVERSOS_COMUNS
} from './types/personagem.js';

function App() {
  const [personagens, setPersonagens] = useState([]);
  const [personagensFiltrados, setPersonagensFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroAlinhamento, setFiltroAlinhamento] = useState(''); // <-- ADICIONADO

  // Estados para modais
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState(''); // 'adicionar', 'editar', 'visualizar'
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
  const [personagemForm, setPersonagemForm] = useState(criarPersonagemVazio());
  const [errosValidacao, setErrosValidacao] = useState({});
  
  // Estados para upload de imagem
  const [uploadingImagem, setUploadingImagem] = useState(false);
  const [previewImagem, setPreviewImagem] = useState(null);

  // Carregar personagens ao inicializar
  useEffect(() => {
    carregarPersonagens();
  }, []);

  // Filtrar personagens quando busca ou filtro mudam
  useEffect(() => {
    filtrarPersonagens();
  }, [personagens, busca, filtroStatus, filtroAlinhamento]); // <-- ADICIONADO filtroAlinhamento

  const carregarPersonagens = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await personagemService.listarTodos();
      setPersonagens(dados);
    } catch (err) {
      setError('Erro ao carregar personagens: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtrarPersonagens = () => {
    let resultado = [...personagens];

    if (busca.trim()) {
      resultado = resultado.filter(p => 
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (p.nomeReal && p.nomeReal.toLowerCase().includes(busca.toLowerCase()))
      );
    }

    if (filtroStatus) {
      resultado = resultado.filter(p => p.status === filtroStatus);
    }

    // <-- LÓGICA DE FILTRO ADICIONADA -->
    if (filtroAlinhamento) {
        resultado = resultado.filter(p => p.alinhamento === filtroAlinhamento);
    }

    setPersonagensFiltrados(resultado);
  };

  const abrirModal = (tipo, personagem = null) => {
    setModalTipo(tipo);
    setModalAberto(true);
    setErrosValidacao({});
    setPreviewImagem(null);

    if (tipo === 'adicionar') {
      setPersonagemForm(criarPersonagemVazio());
      setPersonagemSelecionado(null);
    } else if (personagem) {
      setPersonagemSelecionado(personagem);
      if (tipo === 'editar') {
        setPersonagemForm({ ...personagem });
        if (personagem.imagemUrl) {
          setPreviewImagem(personagemService.getImagemUrl(personagem.imagemUrl));
        }
      }
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setModalTipo('');
    setPersonagemSelecionado(null);
    setPersonagemForm(criarPersonagemVazio());
    setErrosValidacao({});
    setPreviewImagem(null);
    setUploadingImagem(false);
  };

  const handleInputChange = (campo, valor) => {
    setPersonagemForm(prev => ({
      ...prev,
      [campo]: valor
    }));
    
    if (errosValidacao[campo]) {
      setErrosValidacao(prev => ({
        ...prev,
        [campo]: null
      }));
    }
  };

  const handleImagemUpload = async (event) => {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    try {
      setUploadingImagem(true);
      personagemService.validarArquivoImagem(arquivo);
      
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImagem(e.target.result);
      reader.readAsDataURL(arquivo);
      
      const resultado = await personagemService.uploadImagem(arquivo);
      
      handleInputChange('imagemUrl', resultado.url);
      
      setTimeout(() => {
        const urlCompleta = personagemService.getImagemUrl(resultado.url);
        setPreviewImagem(urlCompleta);
      }, 500);
      
    } catch (err) {
      setError('Erro no upload: ' + err.message);
      setPreviewImagem(null);
      handleInputChange('imagemUrl', '');
    } finally {
      setUploadingImagem(false);
    }
  };

  const salvarPersonagem = async () => {
    try {
      const validacao = validarPersonagem(personagemForm);
      if (!validacao.valido) {
        setErrosValidacao(validacao.erros);
        return;
      }

      setLoading(true);

      if (modalTipo === 'adicionar') {
        await personagemService.criar(personagemForm);
      } else if (modalTipo === 'editar') {
        await personagemService.atualizar(personagemSelecionado.id, personagemForm);
      }

      await carregarPersonagens();
      fecharModal();
    } catch (err) {
      setError('Erro ao salvar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletarPersonagem = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este personagem?')) {
      return;
    }

    try {
      setLoading(true);
      await personagemService.deletar(id);
      await carregarPersonagens();
    } catch (err) {
      setError('Erro ao deletar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const limparFiltros = () => {
    setBusca('');
    setFiltroStatus('');
    setFiltroAlinhamento(''); // <-- ADICIONADO
  };

  const calcularEstatisticas = () => {
    return personagemService.calcularEstatisticas(personagens);
  };

  const stats = calcularEstatisticas();

  if (loading && personagens.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando personagens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">DC Heroes Manager</h1>
              <p className="text-gray-600">Gerencie os personagens da DC Comics</p>
            </div>
            <button
              onClick={() => abrirModal('adicionar')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Adicionar Herói
            </button>
          </div>
        </div>
      </header>

      {/* Estatísticas */}
      {stats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Total</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Ativos</h3>
              <p className="text-2xl font-bold text-green-600">{stats.ativos}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Inativos</h3>
              <p className="text-2xl font-bold text-yellow-600">{stats.inativos}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Mortos</h3>
              <p className="text-2xl font-bold text-red-600">{stats.mortos}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="sm:col-span-2 md:col-span-1">
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os status</option>
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            {/* <-- FILTRO DE ALINHAMENTO ADICIONADO --> */}
            <div>
              <select
                value={filtroAlinhamento}
                onChange={(e) => setFiltroAlinhamento(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os alinhamentos</option>
                {Object.entries(ALINHAMENTO_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={limparFiltros}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Lista de personagens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {personagensFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum personagem encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personagensFiltrados.map((personagem) => (
              <div key={personagem.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Imagem do personagem */}
                <div className="h-48 bg-gray-200 relative">
                  {personagem.imagemUrl ? (
                    <img
                      src={personagemService.getImagemUrl(personagem.imagemUrl)}
                      alt={personagem.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center text-gray-400" style={{display: personagem.imagemUrl ? 'none' : 'flex'}}>
                    <span className="text-4xl">🦸</span>
                  </div>

                  {/* <-- TAG DE ALINHAMENTO ADICIONADA AO CARD --> */}
                  {personagem.alinhamento && (
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${ALINHAMENTO_COLORS[personagem.alinhamento]}`}>
                      {ALINHAMENTO_LABELS[personagem.alinhamento]}
                    </div>
                  )}

                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[personagem.status]}`}>
                    {STATUS_LABELS[personagem.status]}
                  </div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{personagem.nome}</h3>
                  {personagem.nomeReal && (
                    <p className="text-gray-600 mb-2">({personagem.nomeReal})</p>
                  )}
                  
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    {personagem.afiliacao && (
                      <p><span className="font-medium">Afiliação:</span> {personagem.afiliacao}</p>
                    )}
                    {personagem.origem && (
                      <p><span className="font-medium">Origem:</span> {personagem.origem}</p>
                    )}
                    {personagem.universo && (
                      <p><span className="font-medium">Universo:</span> {personagem.universo}</p>
                    )}
                  </div>

                  {/* Botões de ação */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => abrirModal('visualizar', personagem)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors"
                    >
                      Ver Detalhes
                    </button>
                    <button
                      onClick={() => abrirModal('editar', personagem)}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarPersonagem(personagem.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do modal */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">
                {modalTipo === 'adicionar' && 'Adicionar Personagem'}
                {modalTipo === 'editar' && 'Editar Personagem'}
                {modalTipo === 'visualizar' && 'Detalhes do Personagem'}
              </h2>
              <button
                onClick={fecharModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Conteúdo do modal */}
            <div className="p-6">
              {modalTipo === 'visualizar' && personagemSelecionado ? (
                // Modo visualização
                <div className="space-y-4">
                  {personagemSelecionado.imagemUrl && (
                    <div className="text-center">
                      <img
                        src={personagemService.getImagemUrl(personagemSelecionado.imagemUrl)}
                        alt={personagemSelecionado.nome}
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome</label>
                      <p className="text-gray-900">{personagemSelecionado.nome}</p>
                    </div>
                    {personagemSelecionado.nomeReal && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nome Real</label>
                        <p className="text-gray-900">{personagemSelecionado.nomeReal}</p>
                      </div>
                    )}
                    {personagemSelecionado.origem && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Origem</label>
                        <p className="text-gray-900">{personagemSelecionado.origem}</p>
                      </div>
                    )}
                    {personagemSelecionado.universo && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Universo</label>
                        <p className="text-gray-900">{personagemSelecionado.universo}</p>
                      </div>
                    )}
                    {personagemSelecionado.afiliacao && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Afiliação</label>
                        <p className="text-gray-900">{personagemSelecionado.afiliacao}</p>
                      </div>
                    )}
                    {personagemSelecionado.primeiraAparicao && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Primeira Aparição</label>
                        <p className="text-gray-900">{personagemSelecionado.primeiraAparicao}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[personagemSelecionado.status]}`}>
                        {STATUS_LABELS[personagemSelecionado.status]}
                      </span>
                    </div>
                    {/* <-- VISUALIZAÇÃO DE ALINHAMENTO ADICIONADA --> */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Alinhamento</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${ALINHAMENTO_COLORS[personagemSelecionado.alinhamento]}`}>
                        {ALINHAMENTO_LABELS[personagemSelecionado.alinhamento]}
                      </span>
                    </div>
                  </div>
                  {personagemSelecionado.poderes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Poderes</label>
                      <p className="text-gray-900">{personagemSelecionado.poderes}</p>
                    </div>
                  )}
                  {personagemSelecionado.descricao && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descrição</label>
                      <p className="text-gray-900">{personagemSelecionado.descricao}</p>
                    </div>
                  )}
                </div>
              ) : (
                // Modo edição/adição
                <form onSubmit={(e) => { e.preventDefault(); salvarPersonagem(); }} className="space-y-4">
                  {/* Upload de imagem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagem</label>
                    <div className="flex items-center space-x-4">
                      {previewImagem && (
                        <img
                          src={previewImagem}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImagemUpload}
                          disabled={uploadingImagem}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {uploadingImagem && <p className="text-sm text-gray-500">Fazendo upload...</p>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome *</label>
                      <input
                        type="text"
                        value={personagemForm.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.nome ? 'border-red-500' : 'border-gray-300'}`}
                        required
                      />
                      {errosValidacao.nome && <p className="text-red-500 text-sm mt-1">{errosValidacao.nome}</p>}
                    </div>

                    {/* Nome Real */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome Real</label>
                      <input
                        type="text"
                        value={personagemForm.nomeReal}
                        onChange={(e) => handleInputChange('nomeReal', e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.nomeReal ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errosValidacao.nomeReal && <p className="text-red-500 text-sm mt-1">{errosValidacao.nomeReal}</p>}
                    </div>

                    {/* Origem */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Origem</label>
                      <input
                        type="text"
                        list="origens"
                        value={personagemForm.origem}
                        onChange={(e) => handleInputChange('origem', e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.origem ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      <datalist id="origens">
                        {ORIGENS_COMUNS.map(origem => (
                          <option key={origem} value={origem} />
                        ))}
                      </datalist>
                      {errosValidacao.origem && <p className="text-red-500 text-sm mt-1">{errosValidacao.origem}</p>}
                    </div>

                    {/* Universo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Universo</label>
                      <input
                        type="text"
                        list="universos"
                        value={personagemForm.universo}
                        onChange={(e) => handleInputChange('universo', e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.universo ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      <datalist id="universos">
                        {UNIVERSOS_COMUNS.map(universo => (
                          <option key={universo} value={universo} />
                        ))}
                      </datalist>
                      {errosValidacao.universo && <p className="text-red-500 text-sm mt-1">{errosValidacao.universo}</p>}
                    </div>

                    {/* Afiliação */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Afiliação</label>
                      <input
                        type="text"
                        list="afiliacoes"
                        value={personagemForm.afiliacao}
                        onChange={(e) => handleInputChange('afiliacao', e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.afiliacao ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      <datalist id="afiliacoes">
                        {AFILIACOES_COMUNS.map(afiliacao => (
                          <option key={afiliacao} value={afiliacao} />
                        ))}
                      </datalist>
                      {errosValidacao.afiliacao && <p className="text-red-500 text-sm mt-1">{errosValidacao.afiliacao}</p>}
                    </div>

                    {/* Primeira Aparição */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Primeira Aparição</label>
                      <input
                        type="text"
                        value={personagemForm.primeiraAparicao}
                        onChange={(e) => handleInputChange('primeiraAparicao', e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.primeiraAparicao ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Ex: 1938"
                      />
                      {errosValidacao.primeiraAparicao && <p className="text-red-500 text-sm mt-1">{errosValidacao.primeiraAparicao}</p>}
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={personagemForm.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.status ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                      {errosValidacao.status && <p className="text-red-500 text-sm mt-1">{errosValidacao.status}</p>}
                    </div>

                    {/* <-- CAMPO DE ALINHAMENTO ADICIONADO AO FORMULÁRIO --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Alinhamento *</label>
                        <select
                            value={personagemForm.alinhamento}
                            onChange={(e) => handleInputChange('alinhamento', e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.alinhamento ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        >
                            <option value="" disabled>Selecione um alinhamento</option>
                            {Object.entries(ALINHAMENTO_LABELS).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                        {errosValidacao.alinhamento && <p className="text-red-500 text-sm mt-1">{errosValidacao.alinhamento}</p>}
                    </div>

                  </div>

                  {/* Poderes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Poderes</label>
                    <textarea
                      value={personagemForm.poderes}
                      onChange={(e) => handleInputChange('poderes', e.target.value)}
                      rows={3}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.poderes ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ex: Super força, voo, visão de raio-x..."
                    />
                    {errosValidacao.poderes && <p className="text-red-500 text-sm mt-1">{errosValidacao.poderes}</p>}
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                      value={personagemForm.descricao}
                      onChange={(e) => handleInputChange('descricao', e.target.value)}
                      rows={4}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errosValidacao.descricao ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Descrição detalhada do personagem..."
                    />
                    {errosValidacao.descricao && <p className="text-red-500 text-sm mt-1">{errosValidacao.descricao}</p>}
                  </div>

                  {/* Botões */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={fecharModal}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading || uploadingImagem}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;