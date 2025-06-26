package com.dcheroes.api.service;

import com.dcheroes.api.model.Personagem;
import com.dcheroes.api.model.StatusPersonagem;
import com.dcheroes.api.repository.PersonagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonagemService {
    
    @Autowired
    private PersonagemRepository personagemRepository;
    
    // Listar todos os personagens
    public List<Personagem> listarTodos() {
        return personagemRepository.findAll();
    }
    
    // Buscar personagem por ID
    public Optional<Personagem> buscarPorId(Long id) {
        return personagemRepository.findById(id);
    }
    
    // Criar novo personagem
    public Personagem criar(Personagem personagem) {
        return personagemRepository.save(personagem);
    }
    
    // Atualizar personagem
    public Personagem atualizar(Long id, Personagem personagemAtualizado) {
        return personagemRepository.findById(id)
                .map(personagem -> {
                    personagem.setNome(personagemAtualizado.getNome());
                    personagem.setNomeReal(personagemAtualizado.getNomeReal());
                    personagem.setOrigem(personagemAtualizado.getOrigem());
                    personagem.setPoderes(personagemAtualizado.getPoderes());
                    personagem.setAfiliacao(personagemAtualizado.getAfiliacao());
                    personagem.setPrimeiraAparicao(personagemAtualizado.getPrimeiraAparicao());
                    personagem.setStatus(personagemAtualizado.getStatus());
                    personagem.setDescricao(personagemAtualizado.getDescricao());
                    return personagemRepository.save(personagem);
                })
                .orElseThrow(() -> new RuntimeException("Personagem não encontrado com ID: " + id));
    }
    
    // Deletar personagem
    public void deletar(Long id) {
        if (personagemRepository.existsById(id)) {
            personagemRepository.deleteById(id);
        } else {
            throw new RuntimeException("Personagem não encontrado com ID: " + id);
        }
    }
    
    // Buscar personagens por nome
    public List<Personagem> buscarPorNome(String nome) {
        return personagemRepository.findByNomeContainingIgnoreCase(nome);
    }
    
    // Buscar personagens por afiliação
    public List<Personagem> buscarPorAfiliacao(String afiliacao) {
        return personagemRepository.findByAfiliacao(afiliacao);
    }
    
    // Buscar personagens por status
    public List<Personagem> buscarPorStatus(StatusPersonagem status) {
        return personagemRepository.findByStatus(status);
    }
    
    // Buscar personagens por nome real
    public List<Personagem> buscarPorNomeReal(String nomeReal) {
        return personagemRepository.findByNomeRealContainingIgnoreCase(nomeReal);
    }
    
    // Buscar personagens por origem
    public List<Personagem> buscarPorOrigem(String origem) {
        return personagemRepository.findByOrigemContainingIgnoreCase(origem);
    }
    
    // Buscar por múltiplos critérios
    public List<Personagem> buscarPorMultiplosCriterios(String nome, String afiliacao, StatusPersonagem status) {
        return personagemRepository.findByMultiplosCriterios(nome, afiliacao, status);
    }
    
    // Verificar se personagem existe por nome
    public boolean existePorNome(String nome) {
        return personagemRepository.existsByNomeIgnoreCase(nome);
    }
}

