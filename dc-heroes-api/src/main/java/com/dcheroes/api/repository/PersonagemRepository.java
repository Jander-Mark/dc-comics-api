package com.dcheroes.api.repository;

import com.dcheroes.api.model.Personagem;
import com.dcheroes.api.model.StatusPersonagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonagemRepository extends JpaRepository<Personagem, Long> {
    
    // Buscar personagens por nome (case insensitive)
    List<Personagem> findByNomeContainingIgnoreCase(String nome);
    
    // Buscar personagens por afiliação
    List<Personagem> findByAfiliacao(String afiliacao);
    
    // Buscar personagens por status
    List<Personagem> findByStatus(StatusPersonagem status);
    
    // Buscar personagens por nome real
    List<Personagem> findByNomeRealContainingIgnoreCase(String nomeReal);
    
    // Buscar personagens por origem
    List<Personagem> findByOrigemContainingIgnoreCase(String origem);
    
    // Query customizada para buscar por múltiplos critérios
    @Query("SELECT p FROM Personagem p WHERE " +
           "(:nome IS NULL OR LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) AND " +
           "(:afiliacao IS NULL OR p.afiliacao = :afiliacao) AND " +
           "(:status IS NULL OR p.status = :status)")
    List<Personagem> findByMultiplosCriterios(@Param("nome") String nome, 
                                             @Param("afiliacao") String afiliacao, 
                                             @Param("status") StatusPersonagem status);
    
    // Verificar se existe personagem com o nome
    boolean existsByNomeIgnoreCase(String nome);
}

