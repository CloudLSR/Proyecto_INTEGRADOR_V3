# Proyecto_INTEGRADOR_V2
# 🎂 Proyecto Integrador — Sweet Cream Rose / SweetCreamPink
**Repostería artesanal — Sistema web fullstack**

---

## 📋 Resumen General

| Aspecto | Detalle |
|---|---|
| **Nombre del proyecto** | Sweet Cream Rose (también mencionado como Sweet Kiss / SweetCreamPink) |
| **Backend** | Java 17 + Spring Boot 3.4.1 |
| **Frontend** | React (Create React App) |
| **Base de datos** | MySQL 8.0.45 |
| **Seguridad** | JWT + Spring Security + BCrypt |
| **Build tool** | Maven |
| **Puerto backend** | 8080 (por defecto Spring Boot) |

---

## 🗂️ Estructura del Proyecto

```
Proyecto_INTEGRADOR_V3/
├── demoSpringBoot/          ← Backend Spring Boot
│   ├── src/main/java/
│   │   ├── Config/          ← Configuración de seguridad y CORS
│   │   ├── Controlador/     ← Endpoints REST (API)
│   │   ├── DAO/             ← Acceso a datos (patrón DAO)
│   │   ├── DTO/             ← Objetos de transferencia de datos
│   │   ├── Modelo/          ← Entidades JPA (tablas de la BD)
│   │   ├── Repositorio/     ← Interfaces Spring Data JPA
│   │   ├── Security/        ← JWT y autenticación
│   │   └── service/         ← Lógica de negocio
│   ├── logback.xml          ← Configuración de logs
│   ├── nbactions.xml        ← Acciones NetBeans (run/debug)
│   └── pom.xml              ← Dependencias Maven
├── frontend-pink-sweet/     ← Frontend React
│   └── src/
│       ├── App.jsx          ← Componente raíz + enrutamiento
│       ├── Login.js         ← Pantalla de login
│       ├── Registro.js      ← Registro de clientes
│       ├── Carrito.js       ← Carrito de compras
│       ├── Productos.js     ← Catálogo de productos
│       ├── Ofertas.js       ← Sección de ofertas
│       ├── Perfil.js        ← Perfil del usuario
│       ├── DashboardAdmin.js← Panel de administrador
│       ├── Recibo.js/2/3    ← Comprobantes de pago (variantes de diseño)
│       ├── Boletas.js       ← Generador de boletas
│       └── CambiarPassword1-4.js ← Flujo de recuperación de contraseña
└── Dump20260427.sql         ← Volcado completo de la base de datos
```

---

## 🗄️ Base de Datos (`reposteria`)

### Tablas principales

| Tabla | Descripción |
|---|---|
| `usuario` | Clientes registrados (nombre, correo, contraseña BCrypt, teléfono, rol) |
| `rol` | Solo 2 valores: `Admin (1)` y `Cliente (2)` |
| `categoria` | 10 categorías: Cupcakes, Galletas, Tortas, Alfajores, Trufas, etc. |
| `producto` | Productos del catálogo, asociados a una categoría |
| `producto_variantes` | Sabores/tamaños de cada producto con precio adicional |
| `orden` | Pedidos del cliente: estado, dirección de entrega, método de pago, total |
| `detalles_orden` | Líneas de cada orden (producto, variante, cantidad, precio, subtotal) |
| `materia_prima` | Inventario de insumos (harina, azúcar, huevos, etc.) con stock |
| `receta_fija` | Cuánto insumo usa cada variante de producto |
| `insumos_personalizados_orden` | Insumos extra para pedidos personalizados |
| `productos` | Segunda tabla de catálogo con imagen binaria (tabla legacy) |
| `comentarios` | Reseñas de clientes con flag de aprobación |

### Triggers automáticos en MySQL

```sql
-- 1. tr_calculo_subtotal
-- Al insertar un detalle de orden, calcula automáticamente el subtotal
-- (cantidad × precio) sin que el backend lo tenga que hacer.
BEFORE INSERT ON detalles_orden
  SET NEW.detoSubTotal = NEW.detoCantidad * NEW.detoPrecio;

-- 2. tr_descuento_stock_estandar
-- Al confirmar un pedido estándar, descuenta del stock de materia_prima
-- usando la receta_fija de cada variante pedida.
AFTER INSERT ON detalles_orden
  UPDATE materia_prima ... JOIN receta_fija ...

-- 3. tr_actualizar_total_orden
-- Cada vez que se agrega un detalle, recalcula el total de la orden
-- sumando todos los subtotales.
AFTER INSERT ON detalles_orden
  UPDATE orden SET ordTotal = SUM(detoSubTotal) ...

-- 4. tr_reponer_stock_borrado
-- Si se borra un detalle de orden (cancelación), devuelve el stock
-- de materia prima que se había descontado.
AFTER DELETE ON detalles_orden
  UPDATE materia_prima ... (suma de vuelta)

-- 5. tr_descuento_stock_personalizado
-- Para pedidos personalizados, descuenta los insumos específicos
-- registrados en insumos_personalizados_orden.
AFTER INSERT ON insumos_personalizados_orden
  UPDATE materia_prima SET matStock = matStock - NEW.cantidad_usada
```

---

## ☕ Backend — Spring Boot

### Dependencias clave (`pom.xml`)

```xml
<!-- Spring Boot Core: servidor web, JPA, seguridad, validación y email -->
<dependency>spring-boot-starter-web</dependency>
<dependency>spring-boot-starter-data-jpa</dependency>
<dependency>spring-boot-starter-security</dependency>
<dependency>spring-boot-starter-validation</dependency>
<dependency>spring-boot-starter-mail</dependency>
<!-- Conecta con MySQL -->
<dependency>mysql-connector-j</dependency>
<!-- JWT para tokens de autenticación (versión 0.11.5) -->
<dependency>jjwt-api / jjwt-impl / jjwt-jackson</dependency>
<!-- Google Guava: utilidades de colecciones -->
<dependency>guava</dependency>
<!-- Apache Commons: utilidades de texto y validación -->
<dependency>commons-lang3 / commons-validator / commons-collections4</dependency>
<!-- Apache POI: exportar reportes a Excel (.xlsx) -->
<dependency>poi / poi-ooxml</dependency>
<!-- Lombok: genera getters/setters/constructores automáticamente -->
<dependency>lombok</dependency>
<!-- H2: base de datos en memoria solo para tests -->
<dependency>h2 (scope test)</dependency>
```

---

### 🔐 Seguridad — `SecurityConfig.java`

```java
/**
 * Configura toda la seguridad HTTP de la aplicación.
 * Conecta con: JwtAuthFilter (intercepta cada request) y
 * CustomUserDetailsService (carga el usuario desde la BD).
 *
 * Sin sesiones en servidor — usa JWT stateless.
 * CSRF desactivado porque el frontend es React (no forms HTML tradicionales).
 *
 * CORS: acepta solicitudes solo del origen configurado en application.properties
 * (variable cors.allowed-origins), típicamente http://localhost:3000.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // habilita @PreAuthorize en los controladores
public class SecurityConfig {

    // Rutas completamente públicas (sin token):
    //   POST /api/auth/registro, /login, /olvide-contrasena, /restablecer-contrasena
    //   POST /api/admin/auth/verificar-admin, /pin  ← login de 2 pasos del admin
    //   GET  /api/productos/**, /api/comentarios/aprobados/**, /api/ofertas/vigentes
    //   GET  /uploads/**  ← imágenes subidas

    // Solo ADMIN (rol=1):
    //   /api/admin/**
    //   DELETE/POST/PUT /api/productos/**
    //   PUT /api/comentarios/*/aprobar

    // CLIENTE o ADMIN autenticados (con JWT válido):
    //   /api/perfil/**, /api/direcciones/**, /api/metodos-pago/**
    //   /api/ordenes/**, POST /api/comentarios/**

    // Contraseñas hasheadas con BCrypt (sin texto plano en ningún momento)
    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}
```

---

### 🔑 Seguridad JWT — `Security/`

```java
// ── JwtUtil.java ──────────────────────────────────────────────
// Genera y valida tokens JWT.
// La clave secreta se lee de application.properties (jwt.secret).
// Expiración configurable (jwt.expiration-ms, por defecto 24h).
// Extrae el correo del usuario desde el token para identificarlo.

// ── JwtAuthFilter.java ────────────────────────────────────────
// Filtro que corre ANTES de cada request HTTP.
// Lee el header "Authorization: Bearer <token>".
// Si el token es válido, carga el usuario y lo pone en el contexto
// de seguridad de Spring — así los controladores saben quién hizo la petición.

// ── CustomUserDetailsService.java ─────────────────────────────
// Implementa UserDetailsService de Spring Security.
// Conecta con UsuarioRepository para buscar el usuario por correo.
// Convierte la entidad Usuario en un UserDetails que Spring entiende,
// incluyendo el rol como autoridad (ROLE_ADMIN o ROLE_CLIENTE).
```

---

### 📦 Modelos / Entidades — `Modelo/`

```java
// ── Usuario.java ──────────────────────────────────────────────
// Tabla: usuario
// Campos clave: correo (único), contrasena (BCrypt), resetToken (recuperación)
// Relaciones:
//   → ManyToOne con Rol (Admin o Cliente)
//   → OneToMany con Direccion (varias direcciones de envío)
//   → OneToMany con MetodoPago (varios métodos guardados)
//   → OneToMany con Orden (historial de compras)

// ── Producto.java ─────────────────────────────────────────────
// Tabla: producto
// Un producto (ej: "Cupcakes Especiales") pertenece a una Categoría
// y tiene N variantes (sabores/tamaños) en ProductoVariante.
// También tiene campos de catálogo: descripción, precio, imagenUrl.

// ── ProductoVariante.java ─────────────────────────────────────
// Tabla: producto_variantes
// Cada variante (ej: "Chocolate S/ 7.50") tiene un precioAdicional
// y está ligada a la receta de insumos en receta_fija.

// ── Orden.java ───────────────────────────────────────────────
// Tabla: orden
// Representa un pedido completo del cliente.
// Estados: Pendiente → Preparando → Enviado → Entregado | Cancelado
// Métodos de pago aceptados: Efectivo, Transferencia, Tarjeta, Yape
// → OneToMany con DetalleOrden (los productos del pedido)

// ── Personal.java ─────────────────────────────────────────────
// Tabla: personal
// Empleados del negocio: Administrador, Repostero, Repartidor, Atencion, Caja
// → OneToMany con HorarioPersonal (turnos asignados)

// ── Comentario.java ───────────────────────────────────────────
// Tabla: comentarios
// Reseña de un cliente. Empieza sin aprobar.
// El admin la revisa y la aprueba — solo entonces se muestra en el frontend.
```

---

### 🎮 Controladores REST — `Controlador/`

```java
// ── AuthController.java ───────────────────────────────────────
// Ruta base: /api/auth
// Conecta con: AuthService (lógica), AuthServiceImpl
//
// POST /registro       → registra nuevo cliente, hashea contraseña, asigna rol=Cliente
// POST /login          → valida credenciales con BCrypt, devuelve JWT
// POST /olvide-contrasena    → genera token de recuperación y lo envía por email
// POST /restablecer-contrasena → cambia la contraseña usando el token del email

// ── AdminAuthController.java ──────────────────────────────────
// Ruta base: /api/admin/auth
// Login en 2 pasos para el administrador:
// Paso 1: POST /verificar-admin → verifica que sea ADMIN válido (correo + contraseña)
// Paso 2: POST /pin            → valida el PIN de 2do factor, emite JWT con rol ADMIN

// ── ProductoController.java ───────────────────────────────────
// Ruta base: /api/productos
// Conecta con: ProductoRepository (directo a BD)
//
// GET  /                   → lista todos los productos (público)
// GET  /{id}               → detalle de un producto (público)
// GET  /buscar?q=          → busca por nombre, case-insensitive (público)
// GET  /categoria/{catId}  → filtra por categoría (público)
// POST /guardar            → crea producto con imagen (solo ADMIN)
//   ↳ Guarda la imagen en disco (directorio configurado en uploads.directory)
//   ↳ Registra la URL "/uploads/nombreArchivo" en la BD
// PUT  /{id}               → actualiza nombre/precio/descripción (solo ADMIN)
// DELETE /{id}             → elimina producto (solo ADMIN, registra log de warning)

// ── CarritoController.java ────────────────────────────────────
// Ruta base: /api/carrito
// IMPORTANTE: el carrito se guarda en memoria del servidor (lista estática),
// no en BD. Se pierde si el servidor reinicia.
//
// GET  /                   → devuelve los ítems actuales del carrito
// POST /agregar            → agrega producto; si ya existe, incrementa cantidad
// POST /pagar              → confirma el pago y vacía el carrito
// DELETE /limpiar          → vacía el carrito sin pagar

// ── OrdenController.java ─────────────────────────────────────
// Ruta base: /api/ordenes
// Conecta con: OrdenService → OrdenRepository + UsuarioRepository
//
// POST /                         → crea una nueva orden (cliente autenticado)
// GET  /usuario/{usuarioId}      → historial de órdenes del cliente
// GET  /{id}                     → detalle de una orden específica
// PUT  /{id}/estado              → cambia estado de la orden (solo ADMIN)

// ── ComentarioController.java ────────────────────────────────
// Ruta base: /api/comentarios
// Conecta con: ComentarioService → ComentarioRepository
//
// GET  /aprobados                    → comentarios visibles en el frontend (público)
// GET  /aprobados/producto/{id}      → filtrados por producto (público)
// POST /                             → cliente crea reseña (queda en "pendiente")
// GET  /pendientes                   → admin revisa las que esperan aprobación
// PUT  /{id}/aprobar                 → admin aprueba un comentario
// DELETE /{id}                       → admin elimina un comentario

// ── DireccionController.java ──────────────────────────────────
// Ruta base: /api/direcciones
// Conecta con: DireccionService → DireccionRepository + UsuarioRepository
//
// Permite al cliente tener múltiples direcciones de envío guardadas.
// GET    /usuario/{id}              → lista sus direcciones
// POST   /usuario/{id}             → agrega nueva (con opción "esPrincipal")
// PUT    /{id}/usuario/{uid}        → edita una existente
// DELETE /{id}/usuario/{uid}        → elimina una

// ── MetodoPagoController.java ────────────────────────────────
// Ruta base: /api/metodos-pago
// Conecta con: MetodoPagoService → MetodoPagoRepository
// Tipos aceptados: VISA, BANCO, YAPE
//
// Permite guardar y gestionar métodos de pago del cliente.
// Similar en estructura a DireccionController.

// ── PerfilController.java ────────────────────────────────────
// Ruta base: /api/perfil
// Conecta con: UsuarioService → UsuarioRepository
//
// GET /perfil/{id}   → obtiene datos del usuario (nunca devuelve la contraseña)
// PUT /perfil/{id}   → actualiza nombre, apellido, teléfono

// ── ConfiguracionController.java ─────────────────────────────
// Ruta base: /api/configuracion
// Conecta directamente con UsuarioRepository + PasswordEncoder
//
// PUT /actualizar-datos/{id}    → actualiza datos básicos de la cuenta
// POST /cambiar-password/{id}   → cambia contraseña verificando la actual con BCrypt

// ── AdminDashboardController.java ────────────────────────────
// Ruta base: /api/admin/dashboard
// Solo ADMIN. Conecta con múltiples repositorios para armar estadísticas.
// GET /resumen  → devuelve totales del mes: órdenes, ingresos, clientes, personal activo

// ── AdminProductosController.java ────────────────────────────
// Ruta base: /api/admin/productos
// Solo ADMIN. CRUD completo de productos desde el panel admin.

// ── AdminPedidosController.java ──────────────────────────────
// Ruta base: /api/admin/pedidos
// Solo ADMIN. Gestión de pedidos: ver todos, cambiar estado, filtrar.

// ── AdminPersonalController.java ─────────────────────────────
// Ruta base: /api/admin/personal
// Solo ADMIN. CRUD de empleados y sus horarios.

// ── AdminOfertasController.java ──────────────────────────────
// Ruta base: /api/admin/ofertas  (y GET /api/ofertas/vigentes → público)
// Gestión de ofertas/descuentos. Las vigentes se muestran en el frontend.

// ── AdminReportesController.java ─────────────────────────────
// Ruta base: /api/admin/reportes
// Solo ADMIN. Genera reportes de ventas. Puede exportar a Excel (Apache POI).

// ── AdminVentasController.java ───────────────────────────────
// Ruta base: /api/admin/ventas
// Solo ADMIN. Historial y análisis de ventas.

// ── UsuarioApiController.java ────────────────────────────────
// Ruta base: /api/usuarios
// Controlador legacy/alternativo con registro y login básico.
// Conecta directo con UsuarioRepository (sin pasar por AuthService).
// POST /registrar  → registra usuario, asigna rol Cliente (id=2), hashea con BCrypt
// POST /login      → verifica credenciales con BCrypt, devuelve objeto usuario

// ── mycontroller.java ─────────────────────────────────────────
// Controlador MVC (no REST) — sirve vistas Thymeleaf/plantillas HTML.
// Conecta con UsuarioRepository, ProductoRepository, ComentarioRepository.
// GET /  → carga productos y comentarios aprobados para la vista principal
```

---

### 🔧 Servicios — `service/`

```java
// ── AuthService.java (interfaz) ───────────────────────────────
// Define el contrato para: registrar, login, solicitarRecuperacion,
// restablecerContrasena.

// ── AuthServiceImpl.java ──────────────────────────────────────
// Implementación real. Conecta con:
//   → UsuarioDAO/UsuarioRepository   (verificar/guardar usuario en BD)
//   → JwtUtil                        (generar el token JWT al hacer login)
//   → PasswordEncoder                (hashear y verificar contraseñas BCrypt)
//   → JavaMailSender                 (enviar email con link/token de recuperación)
// El método solicitarRecuperacion NO revela si el correo existe (evita enumeración).
// El token de recuperación tiene expiración guardada en resetTokenExpiry del usuario.

// ── DireccionService / DireccionServiceImpl ───────────────────
// Lógica de negocio de direcciones.
// Conecta con DireccionRepository y UsuarioRepository.
// Valida que la dirección pertenece al usuario antes de editar/eliminar.

// ── MetodoPagoService / MetodoPagoServiceImpl ─────────────────
// Lógica de métodos de pago.
// Conecta con MetodoPagoRepository y UsuarioRepository.
// Valida tipos de pago (VISA, BANCO, YAPE).

// ── OrdenService / OrdenServiceImpl ──────────────────────────
// Lógica de creación y gestión de órdenes.
// Conecta con OrdenRepository, ProductoRepository, UsuarioRepository.
// Al crear una orden recorre los ítems, calcula totales y guarda detalles.

// ── ComentarioService ────────────────────────────────────────
// Lógica de moderación de comentarios.
// Conecta con ComentarioRepository.
// Nuevo comentario: siempre empieza con aprobado=false.

// ── UsuarioService ───────────────────────────────────────────
// Conecta con UsuarioRepository.
// Obtener y actualizar datos del perfil del usuario.
```

---

### 📁 DAOs — `DAO/`

```java
// Los DAOs son una capa de acceso a datos adicional al patrón Repository.
// Algunos usan directamente los Repository de Spring Data;
// otros (OrdenDAOImpl, UsuarioDAOImpl) implementan lógica de consulta personalizada.

// ── UsuarioDAOImpl ────────────────────────────────────────────
// Conecta con UsuarioRepository.
// Métodos: buscar por correo, guardar, verificar si existe correo.

// ── OrdenDAOImpl ──────────────────────────────────────────────
// Conecta con OrdenRepository y DetalleOrdenRepository.
// Métodos de consulta más complejos: órdenes por fecha, por estado, etc.
```

---

### 📬 DTOs — `DTO/`

```java
// Los DTOs evitan exponer las entidades directamente en la API.

// ── AdminDTOs.java ────────────────────────────────────────────
// AdminPinRequest   → correo + pin para el 2do factor del login admin
// DashboardResumen  → estadísticas del mes: órdenes, ingresos, clientes, personal
// VentaResumen      → ventas agrupadas por período (para reportes)

// ── DTOs.java ─────────────────────────────────────────────────
// Contiene varios DTOs generales: LoginRequest, LoginResponse (con JWT),
// RegistroRequest simplificado, etc.

// ── CarritoResumenDTO.java ────────────────────────────────────
// Resumen del carrito: lista de ítems + total calculado.

// ── UsuarioDTO.java ───────────────────────────────────────────
// Datos básicos del usuario para mostrar en perfil (sin contraseña).
```

---

### 📋 XMLs de configuración

```xml
<!-- ── logback.xml ─────────────────────────────────────────── -->
<!-- Configura el sistema de logs de la aplicación (Logback).    -->
<!-- Define dónde y cómo se guardan/muestran los logs:           -->
<!--   - Consola: muestra logs en tiempo real al ejecutar        -->
<!--   - Archivo: guarda logs en un .log para revisión posterior -->
<!-- Niveles: TRACE < DEBUG < INFO < WARN < ERROR                 -->
<!-- En producción se recomienda INFO o WARN para no saturar.    -->

<!-- ── nbactions.xml ───────────────────────────────────────── -->
<!-- Archivo de NetBeans IDE que mapea botones del IDE a comandos Maven. -->
<!--                                                              -->
<!-- Acción "run":                                                -->
<!--   Ejecuta: mvn process-classes + exec:exec                  -->
<!--   Clase principal: DemoSpringBootApplication                -->
<!--   Arranca el servidor Spring Boot normalmente.              -->
<!--                                                              -->
<!-- Acción "debug":                                              -->
<!--   Igual que run pero agrega el agente JDWP de Java          -->
<!--   (transport=dt_socket) para conectar el debugger remoto.   -->
<!--   Parámetro jpda.address → puerto de depuración.            -->
<!--                                                              -->
<!-- Acción "profile":                                            -->
<!--   Para analizar rendimiento (profiling).                    -->
<!--   Ejecuta la app sin agente de debug.                       -->

<!-- ── pom.xml ─────────────────────────────────────────────── -->
<!-- Archivo principal de Maven. Define:                          -->
<!-- - Identidad del proyecto (groupId, artifactId, version)     -->
<!-- - Versión de Java (17) y Spring Boot padre (3.4.1)          -->
<!-- - Todas las dependencias (librerías) del proyecto            -->
<!-- - Plugin spring-boot-maven-plugin para generar el .jar       -->
<!-- Spring Boot como "parent" hereda versiones compatibles       -->
<!-- de todas las librerías — no hay que especificar versiones    -->
<!-- para las dependencias core de Spring.                        -->
```

---

## ⚛️ Frontend — React

### Flujo de la aplicación

```
App.jsx (enrutador principal)
  ├── Layout.js           ← Navbar + estructura común
  ├── / (inicio)          ← Slider de banners + productos destacados + testimonios
  ├── /productos          ← Catálogo completo con filtros por categoría
  ├── /ofertas            ← Productos en descuento (consume /api/ofertas/vigentes)
  ├── /carrito            ← Carrito de compras
  ├── /perfil             ← Datos del usuario autenticado
  ├── /nosotros           ← Página informativa
  ├── /login              ← Formulario de login → POST /api/auth/login
  ├── /registro           ← Formulario de registro → POST /api/auth/registro
  ├── /cambiar-password/* ← Flujo de 4 pasos para recuperar contraseña
  ├── /boletas            ← Vista de historial de boletas
  ├── /recibo             ← Variantes de diseño del comprobante (Recibo, Recibo2, Recibo3)
  └── /admin              ← Panel de administrador (DashboardAdmin.js)
```

### Componentes notables

- **`App.jsx`**: tiene datos estáticos de productos, categorías y ofertas hardcodeados (arreglos JS). Son los que se muestran cuando el backend no está conectado o para la vista estática.
- **`DashboardAdmin.js`**: panel con estadísticas, gestión de productos, pedidos, personal y reportes. Consume los endpoints `/api/admin/**`.
- **`Recibo.js / Recibo2.js / Recibo3.js`**: tres diseños distintos de comprobante de pago (probablemente iteraciones de diseño). Recibo usa datos hardcodeados de ejemplo (María López, RUC 20458706521).
- **`CambiarPassword1-4.js`**: flujo completo de recuperación de contraseña en 4 pantallas: ingresar correo → revisar email → ingresar nueva contraseña → confirmación.

---

## 🔄 Flujo completo: Login de cliente

```
1. Cliente llena formulario en Login.js
2. POST /api/auth/login  { correo, contrasena }
3. AuthController → AuthServiceImpl
4. AuthServiceImpl consulta UsuarioRepository.findByCorreo()
5. BCrypt.matches(contrasenaIngresada, hashEnBD)
6. Si OK → JwtUtil.generateToken(correo) → devuelve JWT
7. Frontend guarda el JWT en localStorage/state
8. Siguientes requests llevan header: Authorization: Bearer <token>
9. JwtAuthFilter intercepta → valida JWT → pone usuario en contexto
10. Los controladores ya saben quién es el usuario autenticado
```

## 🔄 Flujo completo: Login de administrador (2 pasos)

```
1. Admin ingresa correo + contraseña en /admin/login
2. POST /api/admin/auth/verificar-admin → verifica que sea rol ADMIN
3. Si OK, el sistema envía/muestra un PIN de segundo factor
4. Admin ingresa el PIN
5. POST /api/admin/auth/pin  { correo, pin }
6. Si el PIN es correcto → genera JWT con rol ADMIN
7. Frontend usa ese JWT para acceder a /api/admin/**
```

## 🔄 Flujo completo: Hacer un pedido

```
1. Cliente agrega productos → POST /api/carrito/agregar
2. Revisa carrito → GET /api/carrito
3. Confirma pago → POST /api/carrito/pagar (vacía carrito en memoria)
4. Se crea la orden → POST /api/ordenes
5. OrdenService guarda Orden + DetalleOrden en BD
6. Triggers MySQL se activan automáticamente:
   - tr_calculo_subtotal      → calcula subtotal de cada detalle
   - tr_descuento_stock_estandar → descuenta materia prima del inventario
   - tr_actualizar_total_orden → actualiza el total de la orden
7. Admin ve la nueva orden en estado "Pendiente" en el dashboard
8. Admin cambia estado → PUT /api/ordenes/{id}/estado
```

---

## ⚠️ Notas técnicas importantes

- El **carrito está en memoria del servidor** (lista estática en `CarritoController`), no persiste en BD. Si el servidor se reinicia, se pierde. Para producción habría que guardarlo en BD o en sesión del usuario.
- Hay **dos tablas de productos**: `producto` (con categorías y variantes) y `productos` (con imagen binaria en BLOB). Parece ser una evolución del modelo — la tabla `producto` es la activa.
- El `mycontroller.java` es un **controlador MVC legacy** para servir vistas HTML (Thymeleaf), coexistiendo con los REST controllers. En producción con React en frontend separado, este controlador quedaría sin uso.
- `UsuarioApiController.java` es un controlador **duplicado/legacy** del AuthController. Ambos tienen registro y login. El correcto es AuthController (usa AuthService con la lógica completa).
- Los datos de productos en `App.jsx` del frontend son **estáticos hardcodeados** — en un entorno real deberían cargarse desde `/api/productos`.