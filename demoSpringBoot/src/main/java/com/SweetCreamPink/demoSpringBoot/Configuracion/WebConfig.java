package com.SweetCreamPink.demoSpringBoot.Configuracion;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${uploads.directory}")
    private String directorioUploads;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Imágenes subidas por el admin (carpeta C:/uploads/productos/)
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + directorioUploads);

        // Imágenes estáticas del catálogo inicial (carpeta del frontend)
        registry.addResourceHandler("/uploads/productos/**")
                .addResourceLocations(
                        "file:C:/Users/User/OneDrive/Desktop/Proyecto_INTEGRADOR_V3/frontend-pink-sweet/src/assets/products/"
                );
    }
}