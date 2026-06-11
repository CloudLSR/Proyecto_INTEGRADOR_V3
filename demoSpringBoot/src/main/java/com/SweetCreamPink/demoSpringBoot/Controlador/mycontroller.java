package com.SweetCreamPink.demoSpringBoot.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.SweetCreamPink.demoSpringBoot.Modelo.Comentario;
import com.SweetCreamPink.demoSpringBoot.Modelo.Rol;
import com.SweetCreamPink.demoSpringBoot.Modelo.Usuario;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ComentarioRepository;
import com.SweetCreamPink.demoSpringBoot.Repositorio.ProductoRepository;
import com.SweetCreamPink.demoSpringBoot.Repositorio.UsuarioRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class mycontroller {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private ProductoRepository productoRepo;

    @Autowired
    private ComentarioRepository comentarioRepo;

    // FIX: se inyecta PasswordEncoder para hashear y verificar contraseñas correctamente
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/")
    public String inicio(Model model) {
        model.addAttribute("productos", productoRepo.findAll());
        List<Comentario> aprobados = comentarioRepo.findAll().stream()
                .filter(Comentario::isAprobado)
                .collect(Collectors.toList());
        model.addAttribute("comentariosAprobados", aprobados);
        return "index";
    }

    @GetMapping("/login")
    public String mostrarLogin() {
        return "login";
    }

    @PostMapping("/ingresar")
    public String procesarLogin(@RequestParam String correo,
                                @RequestParam String password,
                                Model model) {
        Optional<Usuario> userOpt = usuarioRepo.findByCorreo(correo);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getContrasena())) {
            Usuario u = userOpt.get();
            Integer rolId = (u.getRol() != null) ? u.getRol().getId() : 2;
            return rolId == 1 ? "redirect:/admin" : "redirect:/";
        } else {
            model.addAttribute("error", "Credenciales incorrectas");
            return "login";
        }
    }

    @GetMapping("/registro")
    public String mostrarRegistro(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "registro";
    }

    @PostMapping("/registrar")
    public String guardarUsuario(@ModelAttribute Usuario usuario,
                                 @RequestParam String confirmPassword,
                                 Model model) {
        if (!usuario.getContrasena().equals(confirmPassword)) {
            model.addAttribute("error", "Las contraseñas no coinciden");
            return "registro";
        }

        Rol rolCliente = new Rol();
        rolCliente.setId(2);
        usuario.setRol(rolCliente);

        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        usuarioRepo.save(usuario);
        return "redirect:/login";
    }

    @PostMapping("/enviar-comentario")
    public String guardarComentario(@RequestParam String nombre, @RequestParam String contenido) {
        Comentario nuevo = new Comentario();
        nuevo.setNombre(nombre);
        nuevo.setContenido(contenido);
        nuevo.setAprobado(false);
        comentarioRepo.save(nuevo);
        return "redirect:/?mensaje=enviado";
    }
}