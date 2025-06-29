package com.dcheroes.api.model;

/**
 * Enumeração que representa os possíveis status de um personagem.
 * Os status são usados para indicar se o personagem está ativo, inativo ou morto.
 */

public enum StatusPersonagem {
    ATIVO("Ativo"),
    INATIVO("Inativo"),
    MORTO("Morto");
    
    private final String descricao;
    
    StatusPersonagem(String descricao) {
        this.descricao = descricao;
    }
    
    public String getDescricao() {
        return descricao;
    }
}

