package com.dcheroes.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("DC Heroes API")
                        .description("API RESTful para gerenciamento de personagens da DC Comics")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Equipe DC Heroes")
                                .email("contato@dcheroes.com")
                                .url("https://github.com/dcheroes/api"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor de Desenvolvimento"),
                        new Server()
                                .url("https://dcheroes-api.herokuapp.com")
                                .description("Servidor de Produção")
                ));
    }
}

