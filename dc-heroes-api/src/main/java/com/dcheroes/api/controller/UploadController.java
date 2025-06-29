package com.dcheroes.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@Tag(name = "Upload", description = "Operações de upload de arquivos")
@CrossOrigin(origins = "*")
public class UploadController {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    // Endpoint para upload de imagem
    @PostMapping(value = "/imagem", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload de imagem", description = "Faz upload de uma imagem para o servidor")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Upload realizado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Arquivo inválido"),
        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<Map<String, String>> uploadImagem(
            @Parameter(description = "Arquivo de imagem", required = true)
            @RequestParam("file") MultipartFile file) {
        
        Map<String, String> response = new HashMap<>();
        
        try {
            // Validar arquivo
            if (file.isEmpty()) {
                response.put("error", "Arquivo não pode estar vazio");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Validar tipo de arquivo
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                response.put("error", "Arquivo deve ser uma imagem");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Validar tamanho (máximo 10MB)
            if (file.getSize() > 10 * 1024 * 1024) {
                response.put("error", "Arquivo muito grande. Máximo 10MB");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Criar diretório se não existir
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Gerar nome único para o arquivo
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID().toString() + extension;
            
            // Salvar arquivo
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Retornar URL da imagem
            String imageUrl = "/uploads/" + filename;
            response.put("url", imageUrl);
            response.put("filename", filename);
            response.put("message", "Upload realizado com sucesso");
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("error", "Erro ao salvar arquivo: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    @GetMapping("/imagem/{filename}")
    @Operation(summary = "Obter imagem", description = "Retorna uma imagem pelo nome do arquivo")
    public ResponseEntity<Resource> obterImagem(
            @Parameter(description = "Nome do arquivo da imagem")
            @PathVariable String filename) {
        
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                // Determinar tipo de conteúdo
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @DeleteMapping("/imagem/{filename}")
    @Operation(summary = "Deletar imagem", description = "Remove uma imagem do servidor")
    public ResponseEntity<Map<String, String>> deletarImagem(
            @Parameter(description = "Nome do arquivo da imagem")
            @PathVariable String filename) {
        
        Map<String, String> response = new HashMap<>();
        
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                response.put("message", "Imagem deletada com sucesso");
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Imagem não encontrada");
                return ResponseEntity.status(404).body(response);
            }
            
        } catch (IOException e) {
            response.put("error", "Erro ao deletar imagem: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}

