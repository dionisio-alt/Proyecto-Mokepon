const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
    constructor(id) {
        this.id = id;
        this.mokepon = null;
        this.x = 0;
        this.y = 0;
        this.ataques = [];
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }

    asignarAtaques(ataques) {
        this.ataques = ataques;
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

// Endpoint para unirse al juego
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`;
    const jugador = new Jugador(id);
    jugadores.push(jugador);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(id);
});

// Endpoint para asignar un Mokepon a un jugador
app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const nombre = req.body.mokepon || "";
    const mokepon = new Mokepon(nombre);
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
        res.status(200).end();
    } else {
        res.status(404).send({ error: "Jugador no encontrado" });
    }
});

// Endpoint para actualizar la posición de un jugador
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
        const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);
        res.send({ enemigos });
    } else {
        res.status(404).send({ error: "Jugador no encontrado" });
    }
});

// Endpoint para asignar ataques a un jugador
app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const ataques = req.body.ataques || [];
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques);
        res.status(200).end();
    } else {
        res.status(404).send({ error: "Jugador no encontrado" });
    }
});

// Endpoint para obtener los ataques de un jugador
app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId);

    if (jugador) {
        res.send({ ataques: jugador.ataques || [] });
    } else {
        res.status(404).send({ error: "Jugador no encontrado" });
    }
});

// Iniciar el servidor
app.listen(8080, () => {
    console.log("Servidor funcionando");
});
