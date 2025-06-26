package com.dcheroes.api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "personagens")
@Schema(description = "Entidade que representa um personagem da DC Comics")
public class Personagem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único do personagem", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    @Column(nullable = false, length = 100)
    @Schema(description = "Nome do personagem", example = "Superman", required = true)
    private String nome;
    
    @Size(max = 100, message = "Nome real deve ter no máximo 100 caracteres")
    @Column(name = "nome_real", length = 100)
    @Schema(description = "Nome real do personagem", example = "Clark Kent")
    private String nomeReal;
    
    @Size(max = 150, message = "Origem deve ter no máximo 150 caracteres")
    @Column(length = 150)
    @Schema(description = "Local de origem do personagem", example = "Krypton")
    private String origem;
    
    @Size(max = 100, message = "Universo deve ter no máximo 100 caracteres")
    @Column(length = 100)
    @Schema(description = "Universo do personagem", example = "Terra-1")
    private String universo;
    
    @Size(max = 500, message = "Poderes deve ter no máximo 500 caracteres")
    @Column(length = 500)
    @Schema(description = "Lista de poderes do personagem", example = "Super força, voo, visão de raio-x")
    private String poderes;
    
    @Size(max = 100, message = "Afiliação deve ter no máximo 100 caracteres")
    @Column(length = 100)
    @Schema(description = "Afiliação do personagem", example = "Liga da Justiça")
    private String afiliacao;
    
    @Size(max = 50, message = "Primeira aparição deve ter no máximo 50 caracteres")
    @Column(name = "primeira_aparicao", length = 50)
    @Schema(description = "Ano da primeira aparição", example = "1938")
    private String primeiraAparicao;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @Schema(description = "Status atual do personagem", example = "ATIVO")
    private StatusPersonagem status = StatusPersonagem.ATIVO;
    
    @Size(max = 1000, message = "Descrição deve ter no máximo 1000 caracteres")
    @Column(length = 1000)
    @Schema(description = "Descrição detalhada do personagem", example = "O Último Filho de Krypton...")
    private String descricao;
    
    @Size(max = 500, message = "URL da imagem deve ter no máximo 500 caracteres")
    @Column(name = "imagem_url", length = 500)
    @Schema(description = "URL da imagem do personagem", example = "/uploads/superman.jpg")
    private String imagemUrl;
    
    // Construtores
    public Personagem() {}
    
    public Personagem(String nome, String nomeReal, String origem, String universo, String poderes, 
                     String afiliacao, String primeiraAparicao, StatusPersonagem status, String descricao, String imagemUrl) {
        this.nome = nome;
        this.nomeReal = nomeReal;
        this.origem = origem;
        this.universo = universo;
        this.poderes = poderes;
        this.afiliacao = afiliacao;
        this.primeiraAparicao = primeiraAparicao;
        this.status = status;
        this.descricao = descricao;
        this.imagemUrl = imagemUrl;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getNomeReal() {
        return nomeReal;
    }
    
    public void setNomeReal(String nomeReal) {
        this.nomeReal = nomeReal;
    }
    
    public String getOrigem() {
        return origem;
    }
    
    public void setOrigem(String origem) {
        this.origem = origem;
    }
    
    public String getUniverso() {
        return universo;
    }
    
    public void setUniverso(String universo) {
        this.universo = universo;
    }
    
    public String getPoderes() {
        return poderes;
    }
    
    public void setPoderes(String poderes) {
        this.poderes = poderes;
    }
    
    public String getAfiliacao() {
        return afiliacao;
    }
    
    public void setAfiliacao(String afiliacao) {
        this.afiliacao = afiliacao;
    }
    
    public String getPrimeiraAparicao() {
        return primeiraAparicao;
    }
    
    public void setPrimeiraAparicao(String primeiraAparicao) {
        this.primeiraAparicao = primeiraAparicao;
    }
    
    public StatusPersonagem getStatus() {
        return status;
    }
    
    public void setStatus(StatusPersonagem status) {
        this.status = status;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public String getImagemUrl() {
        return imagemUrl;
    }
    
    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
    
    @Override
    public String toString() {
        return "Personagem{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", nomeReal='" + nomeReal + '\'' +
                ", origem='" + origem + '\'' +
                ", universo='" + universo + '\'' +
                ", afiliacao='" + afiliacao + '\'' +
                ", status=" + status +
                '}';
    }
}

