const express = require('express')
const cors = require('cors');
const app = express()

const players = [];

class Player {
    constructor(id){
        this.id = id;
    }

    setSinger(singer){
        this.singer = singer;
    }

    setLocation(x,y){
        this.x = x;
        this.y = y;
    }
}


class Singer {
    constructor(name){
        this.name = name;
    }
}

app.use(cors());
app.use(express.json());

app.get("/getIn", (req, res) => {
    const id = `${Math.random()}`
    const player = new Player(id);
    players.push(player);
    res.send(id);
})

app.post("/singer/:playerId", (req, res) => {
    console.log(players);
    const playerId = req.params.playerId;
    const singerName = req.body.singer;
    const singer = new Singer(singerName);
    const playerIndex = players.findIndex((player) => playerId === player.id);
    if (playerIndex >= 0){
        players[playerIndex].setSinger(singer);
    }
    res.end();
})

app.post("/singer/:playerId/location", (req, res) => {
    const playerId = req.params.playerId;
    const x = req.body.x || 0;
    const y = req.body.y || 0;
    const playerIndex = players.findIndex((player) => playerId === player.id);
    if (playerIndex >= 0){
        players[playerIndex].setLocation(x,y);
    }
    const enemies = players.filter((player) => player.id !== playerId)
    res.send({enemies});

})

app.listen(8000, () => {
    console.log("I'm listen!! at 8000 port")
})