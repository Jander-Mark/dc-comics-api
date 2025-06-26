package com.dcheroes.api.config;

import com.dcheroes.api.model.Personagem;
import com.dcheroes.api.model.StatusPersonagem;
import com.dcheroes.api.repository.PersonagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private PersonagemRepository personagemRepository;

    @Override
    public void run(String... args) throws Exception {
        // Só inicializa dados se o banco estiver vazio
        if (personagemRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Superman
        Personagem superman = new Personagem();
        superman.setNome("Superman");
        superman.setNomeReal("Clark Kent");
        superman.setOrigem("Krypton");
        superman.setUniverso("Terra-1");
        superman.setAfiliacao("Liga da Justiça");
        superman.setPrimeiraAparicao("1938");
        superman.setStatus(StatusPersonagem.ATIVO);
        superman.setPoderes("Super força, voo, visão de raio-x, visão de calor, super velocidade, invulnerabilidade");
        superman.setDescricao("O Último Filho de Krypton, defensor da Terra e símbolo de esperança para toda a humanidade.");
        superman.setImagemUrl("https://via.placeholder.com/300x400/0066cc/ffffff?text=Superman");
        personagemRepository.save(superman);

        // Batman
        Personagem batman = new Personagem();
        batman.setNome("Batman");
        batman.setNomeReal("Bruce Wayne");
        batman.setOrigem("Gotham City");
        batman.setUniverso("Terra-1");
        batman.setAfiliacao("Liga da Justiça");
        batman.setPrimeiraAparicao("1939");
        batman.setStatus(StatusPersonagem.ATIVO);
        batman.setPoderes("Inteligência genial, artes marciais, tecnologia avançada, detetive excepcional");
        batman.setDescricao("O Cavaleiro das Trevas de Gotham City, usando sua riqueza e inteligência para combater o crime.");
        batman.setImagemUrl("https://via.placeholder.com/300x400/333333/ffffff?text=Batman");
        personagemRepository.save(batman);

        // Wonder Woman
        Personagem wonderWoman = new Personagem();
        wonderWoman.setNome("Wonder Woman");
        wonderWoman.setNomeReal("Diana Prince");
        wonderWoman.setOrigem("Themyscira");
        wonderWoman.setUniverso("Terra-1");
        wonderWoman.setAfiliacao("Liga da Justiça");
        wonderWoman.setPrimeiraAparicao("1941");
        wonderWoman.setStatus(StatusPersonagem.ATIVO);
        wonderWoman.setPoderes("Super força, voo, laço da verdade, bracelete indestrutível, velocidade sobre-humana");
        wonderWoman.setDescricao("Princesa Amazona e embaixadora da paz, guerreira divina com o coração de uma heroína.");
        wonderWoman.setImagemUrl("https://via.placeholder.com/300x400/cc0066/ffffff?text=Wonder+Woman");
        personagemRepository.save(wonderWoman);

        // The Flash
        Personagem flash = new Personagem();
        flash.setNome("The Flash");
        flash.setNomeReal("Barry Allen");
        flash.setOrigem("Central City");
        flash.setUniverso("Terra-1");
        flash.setAfiliacao("Liga da Justiça");
        flash.setPrimeiraAparicao("1956");
        flash.setStatus(StatusPersonagem.ATIVO);
        flash.setPoderes("Super velocidade, viagem no tempo, vibração molecular, força da velocidade");
        flash.setDescricao("O homem mais rápido vivo, conectado à Força da Velocidade e protetor de Central City.");
        flash.setImagemUrl("https://via.placeholder.com/300x400/ff0000/ffffff?text=The+Flash");
        personagemRepository.save(flash);

        // Green Lantern
        Personagem greenLantern = new Personagem();
        greenLantern.setNome("Green Lantern");
        greenLantern.setNomeReal("Hal Jordan");
        greenLantern.setOrigem("Coast City");
        greenLantern.setUniverso("Terra-1");
        greenLantern.setAfiliacao("Liga da Justiça");
        greenLantern.setPrimeiraAparicao("1959");
        greenLantern.setStatus(StatusPersonagem.ATIVO);
        greenLantern.setPoderes("Anel do poder, construtos de energia verde, voo, força de vontade");
        greenLantern.setDescricao("Membro da Tropa dos Lanternas Verdes, protetor do setor espacial 2814.");
        greenLantern.setImagemUrl("https://via.placeholder.com/300x400/00cc00/ffffff?text=Green+Lantern");
        personagemRepository.save(greenLantern);

        // Aquaman
        Personagem aquaman = new Personagem();
        aquaman.setNome("Aquaman");
        aquaman.setNomeReal("Arthur Curry");
        aquaman.setOrigem("Atlantis");
        aquaman.setUniverso("Terra-1");
        aquaman.setAfiliacao("Liga da Justiça");
        aquaman.setPrimeiraAparicao("1941");
        aquaman.setStatus(StatusPersonagem.ATIVO);
        aquaman.setPoderes("Comunicação com vida marinha, super força, respiração aquática, tridente de Netuno");
        aquaman.setDescricao("Rei de Atlantis e protetor dos oceanos, ponte entre o mundo terrestre e aquático.");
        aquaman.setImagemUrl("https://via.placeholder.com/300x400/0099cc/ffffff?text=Aquaman");
        personagemRepository.save(aquaman);

        // Cyborg
        Personagem cyborg = new Personagem();
        cyborg.setNome("Cyborg");
        cyborg.setNomeReal("Victor Stone");
        cyborg.setOrigem("Detroit");
        cyborg.setUniverso("Terra-1");
        cyborg.setAfiliacao("Liga da Justiça");
        cyborg.setPrimeiraAparicao("1980");
        cyborg.setStatus(StatusPersonagem.ATIVO);
        cyborg.setPoderes("Tecnologia alienígena, interface com computadores, canhões sonoros, super força");
        cyborg.setDescricao("Meio homem, meio máquina, conectado à tecnologia de Mother Box e membro vital da Liga.");
        cyborg.setImagemUrl("https://via.placeholder.com/300x400/666666/ffffff?text=Cyborg");
        personagemRepository.save(cyborg);

        // Green Arrow
        Personagem greenArrow = new Personagem();
        greenArrow.setNome("Green Arrow");
        greenArrow.setNomeReal("Oliver Queen");
        greenArrow.setOrigem("Star City");
        greenArrow.setUniverso("Terra-1");
        greenArrow.setAfiliacao("Liga da Justiça");
        greenArrow.setPrimeiraAparicao("1941");
        greenArrow.setStatus(StatusPersonagem.ATIVO);
        greenArrow.setPoderes("Arqueiro excepcional, flechas especializadas, artes marciais, acrobacia");
        greenArrow.setDescricao("O Arqueiro Esmeralda, defensor dos oprimidos e justiceiro social de Star City.");
        greenArrow.setImagemUrl("https://via.placeholder.com/300x400/009900/ffffff?text=Green+Arrow");
        personagemRepository.save(greenArrow);

        // Martian Manhunter
        Personagem martianManhunter = new Personagem();
        martianManhunter.setNome("Martian Manhunter");
        martianManhunter.setNomeReal("J'onn J'onzz");
        martianManhunter.setOrigem("Mars");
        martianManhunter.setUniverso("Terra-1");
        martianManhunter.setAfiliacao("Liga da Justiça");
        martianManhunter.setPrimeiraAparicao("1955");
        martianManhunter.setStatus(StatusPersonagem.ATIVO);
        martianManhunter.setPoderes("Telepatia, mudança de forma, invisibilidade, intangibilidade, super força, voo");
        martianManhunter.setDescricao("Último Marciano Verde, detetive e coração emocional da Liga da Justiça.");
        martianManhunter.setImagemUrl("https://via.placeholder.com/300x400/990000/ffffff?text=Martian+Manhunter");
        personagemRepository.save(martianManhunter);

        // Shazam
        Personagem shazam = new Personagem();
        shazam.setNome("Shazam");
        shazam.setNomeReal("Billy Batson");
        shazam.setOrigem("Fawcett City");
        shazam.setUniverso("Terra-S");
        shazam.setAfiliacao("Liga da Justiça");
        shazam.setPrimeiraAparicao("1940");
        shazam.setStatus(StatusPersonagem.ATIVO);
        shazam.setPoderes("Força de Hércules, velocidade de Mercúrio, resistência de Atlas, poder de Zeus, coragem de Aquiles, sabedoria de Salomão");
        shazam.setDescricao("Jovem herói com o poder dos deuses antigos, transformando-se ao gritar 'Shazam!'");
        shazam.setImagemUrl("https://via.placeholder.com/300x400/ffcc00/ffffff?text=Shazam");
        personagemRepository.save(shazam);

        System.out.println("✅ Dados iniciais carregados com sucesso! Total de personagens: " + personagemRepository.count());
    }
}

