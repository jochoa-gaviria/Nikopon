const express = require('express')

const app = express()

const players = [];

class Player {
    constructor(id){
        this.id = id;
    }
}

app.get("/getIn", (req, res) => {
    const id = `${Math.random()}`
    const player = new Player(id);
    players.push(player);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(id);
})

app.listen(8000, () => {
    console.log("I'm listen!! at 8000 port")
})