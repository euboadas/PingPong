# PingPong

Juego web de ping pong con Canvas y JavaScript vanilla.

## Jugar en línea

**URL pública:** https://euboadas.github.io/PingPong/

El despliegue es automático con GitHub Actions cada vez que se hace push a `main`.

## Características

- Modo **1 jugador vs CPU**
- Modo **2 jugadores** en el mismo teclado
- Pelota, paletas, colisiones y marcador
- Partida a 11 puntos
- Reinicio con `R` y retorno al menú con `Esc`

## Requisitos

- Navegador moderno con soporte ES modules
- [Node.js](https://nodejs.org/) (opcional, solo para servir archivos localmente)

## Instalación

```bash
git clone https://github.com/euboadas/PingPong.git
cd PingPong
```

No hay dependencias npm que instalar.

## Ejecutar localmente

Opción 1 — con Node.js:

```bash
npx serve .
```

Opción 2 — con Python:

```bash
python -m http.server 8080
```

Luego abre en el navegador:

- `http://localhost:3000` (serve)
- `http://localhost:8080` (python)

> **Importante:** abre el proyecto con un servidor local. Abrir `index.html` directamente puede bloquear los ES modules por CORS.

## Controles

| Acción | Tecla |
|---|---|
| Jugador 1 (izquierda) subir | `W` |
| Jugador 1 (izquierda) bajar | `S` |
| Jugador 2 (derecha) subir | `↑` |
| Jugador 2 (derecha) bajar | `↓` |
| Reiniciar partida | `R` |
| Volver al menú | `Esc` |

## Estructura del proyecto

```
PingPong/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── game.js
│   ├── ball.js
│   ├── paddle.js
│   ├── collision.js
│   ├── score.js
│   ├── cpu.js
│   ├── input.js
│   └── config.js
└── README.md
```

## Probar el juego

1. Inicia el servidor local.
2. Abre la URL en el navegador.
3. Elige **1 Jugador vs CPU** o **2 Jugadores**.
4. Juega hasta llegar a 11 puntos.
5. Pulsa `R` para reiniciar o `Esc` para volver al menú.

## Despliegue automático (GitHub Pages)

Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica el juego en:

**https://euboadas.github.io/PingPong/**

### Configuración obligatoria (solo la primera vez)

1. Abre https://github.com/euboadas/PingPong/settings/pages
2. En **Build and deployment → Source**, selecciona **GitHub Actions** (no "Deploy from a branch")
3. Guarda si aparece el botón **Save**
4. Ve a **Actions**, abre el workflow **Build and Deploy to GitHub Pages** y verifica que termine en verde
5. Espera 1–2 minutos y abre la URL pública

> Si ves 404, casi siempre es porque el origen sigue en "Deploy from a branch" en lugar de **GitHub Actions**.

## Git — commit y push

```bash
git add .
git commit -m "tu mensaje"
git push origin main
```

## Próximas mejoras sugeridas

- Sonidos de rebote y punto
- Dificultad configurable para la CPU
- Modo pantalla completa
- Controles táctiles para móvil
- Animación de saque inicial
