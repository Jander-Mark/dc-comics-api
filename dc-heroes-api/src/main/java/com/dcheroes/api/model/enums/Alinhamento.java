package com.dcheroes.api.model.enums;

/**
 * Enumeração que representa os possíveis alinhamentos de um personagem.
 * Os alinhamentos são usados para categorizar personagens como heróis, vilões, anti-heróis ou neutros.
 */
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