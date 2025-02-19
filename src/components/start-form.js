import React, { useState } from "react"
import axios from "axios"

const StartForm = ({ storeToken }) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")

    const handleSubmit = async event => {
        event.preventDefault()

        const result = await axios({
            method: "POST",
            url: "https://wisteria-pelican-6282.twil.io/create-token",
            data: {
                identity: name,
            },
        })
        console.log(result);
        const jwt = result.data;
        storeToken(jwt);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Display Name: <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <br />
            <label htmlFor="room">
                Room to Join: <br />
                <input
                    type="text"
                    id="room"
                    name="room"
                    value={room}
                    onChange={e => setRoom(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Join Video Chat</button>
        </form>
    )
}

export default StartForm