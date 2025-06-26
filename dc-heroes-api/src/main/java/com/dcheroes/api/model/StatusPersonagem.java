package com.dcheroes.api.model;

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

