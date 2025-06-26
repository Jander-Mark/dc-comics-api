package com.dcheroes.api.model.enums;

public enum Alinhamento {
    HEROI("Herói"),
    VILAO("Vilão"),
    ANTI_HEROI("Anti-herói"),
    NEUTRO("Neutro");

    private final String descricao;

    Alinhamento(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}