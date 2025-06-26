package com.dcheroes.api.controller;

import com.dcheroes.api.model.Personagem;
import com.dcheroes.api.model.StatusPersonagem;
import com.dcheroes.api.service.PersonagemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/personagens")
@CrossOrigin(origins = "*")
@Tag(name = "Personagens", description = "API para gerenciamento de personagens da DC Comics")
public class PersonagemController {
    
    @Autowired
    private PersonagemService personagemService;
    
    @Operation(summary = "Listar todos os personagens", description = "Retorna uma lista com todos os personagens cadastrados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de personagens retornada com sucesso",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Personagem.class)))
    })
    @GetMapping
    public ResponseEntity<List<Personagem>> listarTodos() {
        List<Personagem> personagens = personagemService.listarTodos();
        return ResponseEntity.ok(personagens);
    }
    
    @Operation(summary = "Buscar personagem por ID", description = "Retorna um personagem específico pelo seu ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Personagem encontrado",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Personagem.class))),
        @ApiResponse(responseCode = "404", description = "Personagem não encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Personagem> buscarPorId(
            @Parameter(description = "ID do personagem", required = true) @PathVariable Long id) {
        Optional<Personagem> personagem = personagemService.buscarPorId(id);
        return personagem.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Criar novo personagem", description = "Cria um novo personagem no sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Personagem criado com sucesso",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Personagem.class))),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    @PostMapping
    public ResponseEntity<Personagem> criar(
            @Parameter(description = "Dados do personagem a ser criado", required = true)
            @Valid @RequestBody Personagem personagem) {
        try {
            Personagem novoPersonagem = personagemService.criar(personagem);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoPersonagem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @Operation(summary = "Atualizar personagem", description = "Atualiza os dados de um personagem existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Personagem atualizado com sucesso",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Personagem.class))),
        @ApiResponse(responseCode = "404", description = "Personagem não encontrado"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Personagem> atualizar(
            @Parameter(description = "ID do personagem", required = true) @PathVariable Long id,
            @Parameter(description = "Dados atualizados do personagem", required = true)
            @Valid @RequestBody Personagem personagem) {
        try {
            Personagem personagemAtualizado = personagemService.atualizar(id, personagem);
            return ResponseEntity.ok(personagemAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @Operation(summary = "Deletar personagem", description = "Remove um personagem do sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Personagem deletado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Personagem não encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(
            @Parameter(description = "ID do personagem", required = true) @PathVariable Long id) {
        try {
            personagemService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @Operation(summary = "Buscar personagens por nome", description = "Busca personagens que contenham o nome especificado")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de personagens encontrados",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Personagem.class)))
    })
    @GetMapping("/buscar")
    public ResponseEntity<List<Personagem>> buscarPorNome(
            @Parameter(description = "Nome ou parte do nome do personagem", required = true)
            @RequestParam String nome) {
        List<Personagem> personagens = personagemService.buscarPorNome(nome);
        return ResponseEntity.ok(personagens);
    }
    
    @Operation(summary = "Buscar personagens por afiliação", description = "Busca personagens de uma afiliação específica")
    @GetMapping("/afiliacao/{afiliacao}")
    public ResponseEntity<List<Personagem>> buscarPorAfiliacao(
            @Parameter(description = "Afiliação do personagem", required = true) @PathVariable String afiliacao) {
        List<Personagem> personagens = personagemService.buscarPorAfiliacao(afiliacao);
        return ResponseEntity.ok(personagens);
    }
    
    @Operation(summary = "Buscar personagens por status", description = "Busca personagens com status específico")
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Personagem>> buscarPorStatus(
            @Parameter(description = "Status do personagem", required = true) @PathVariable StatusPersonagem status) {
        List<Personagem> personagens = personagemService.buscarPorStatus(status);
        return ResponseEntity.ok(personagens);
    }
    
    @Operation(summary = "Buscar personagens por nome real", description = "Busca personagens pelo nome real")
    @GetMapping("/nome-real")
    public ResponseEntity<List<Personagem>> buscarPorNomeReal(
            @Parameter(description = "Nome real ou parte do nome real", required = true)
            @RequestParam String nomeReal) {
        List<Personagem> personagens = personagemService.buscarPorNomeReal(nomeReal);
        return ResponseEntity.ok(personagens);
    }
    
    @Operation(summary = "Buscar personagens por origem", description = "Busca personagens por local de origem")
    @GetMapping("/origem")
    public ResponseEntity<List<Personagem>> buscarPorOrigem(
            @Parameter(description = "Origem ou parte da origem", required = true)
            @RequestParam String origem) {
        List<Personagem> personagens = personagemService.buscarPorOrigem(origem);
        return ResponseEntity.ok(personagens);
    }
    
    @Operation(summary = "Filtrar personagens", description = "Busca personagens usando múltiplos critérios de filtro")
    @GetMapping("/filtrar")
    public ResponseEntity<List<Personagem>> filtrar(
            @Parameter(description = "Nome do personagem (opcional)") @RequestParam(required = false) String nome,
            @Parameter(description = "Afiliação do personagem (opcional)") @RequestParam(required = false) String afiliacao,
            @Parameter(description = "Status do personagem (opcional)") @RequestParam(required = false) StatusPersonagem status) {
        List<Personagem> personagens = personagemService.buscarPorMultiplosCriterios(nome, afiliacao, status);
        return ResponseEntity.ok(personagens);
    }
    
    @Operation(summary = "Verificar existência de personagem", description = "Verifica se existe um personagem com o nome especificado")
    @GetMapping("/existe/{nome}")
    public ResponseEntity<Boolean> existePorNome(
            @Parameter(description = "Nome do personagem", required = true) @PathVariable String nome) {
        boolean existe = personagemService.existePorNome(nome);
        return ResponseEntity.ok(existe);
    }
}

