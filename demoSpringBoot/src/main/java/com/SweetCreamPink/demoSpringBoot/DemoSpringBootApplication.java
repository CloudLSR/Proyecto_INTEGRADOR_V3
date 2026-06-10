package com.SweetCreamPink.demoSpringBoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {
    "com.SweetCreamPink.demoSpringBoot",
    "Config",
    "Controlador",
    "DAO",
    "DTO",
    "Modelo",
    "Repositorio",
    "Security",
    "service"
})
@EnableJpaRepositories(basePackages = "Repositorio")
@EntityScan(basePackages = "Modelo")
public class DemoSpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoSpringBootApplication.class, args);
    }

}