import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { incrementPlayer, readyPlayers, socketConnections, unreadyPlayers } from '../../redux/actions/action.js'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";

const url = "http://localhost:5001"

function QuizWaiting() {
    // return (
//   <div>
//     <NavBar />

//   </div>
// );

    const { id } = useParams()
    const socketConnect = io(url);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [nickname, setNickname] = useState("");
    const [result, setResult] = useState()

    const lobbyPlayers = useSelector(state => state.player.playerList)
    const socketConnection = useSelector(state => state.player.socketConnection)

    useEffect(() => {

        dispatch(socketConnections({ socketConnect }))
        socketConnect.emit("create", id);

        socketConnect.on("lobby-players", (list) => {
            dispatch(incrementPlayer(list))
        });

        socketConnect.on("ready", (socket) => {
            dispatch(readyPlayers(socket))
        });


    }, [])


    useEffect(() => {
        if (lobbyPlayers.length > 0) {
            if (lobbyPlayers.every(player => player.userReady === true)) {
                navigate(`/quiz/${id}`)
                dispatch(unreadyPlayers())
                socketConnection.socketConnect.emit('timer')
            }
        }
    }, [lobbyPlayers])



    const editUsername = (e) => {
        socketConnection.socketConnect.emit("username", nickname)
    }

    function togglereadyPlayers() {
        socketConnection.socketConnect.emit("isReady", socketConnection.socketConnect.id)
    }

    let players = lobbyPlayers.map((p, i) => {

        let ready;

        // If the user is ready, it changes this variable
        if (p.userReady === true) {
            ready = "(READY)"
        } else {
            ready = "(NOT READY)"
        }
        return (
            <div key={i}>
                <p><b>{p.player.username}</b> {ready}</p>
            </div>
        )
    });

    useEffect(() => {
        // To ensure the user can't start a game with a random ID in the URL
        const findLobby = async () => {
            const findLobby = await fetch(`http://localhost:3001/exists/${id}`)
            const data = await findLobby.json();
            return data
        }

        (async () => {
            let lobby = await findLobby()

            if (!lobby.length || lobby === "Error, cannot find a lobby") {
                setResult(`Cannot find a lobby with the name: ${id}`)
            }
        })()
    }, [id])

    return (
        <div>

            {
                !result ?
                    <div>

                        <TwitterShareButton children={<TwitterIcon size={64} round={true} />} url={`http://localhost:3001/room/${id}`} title="Join my game!" />
                        <button onClick={() => { navigator.clipboard.writeText(`http://localhost:3000/room/${id}`) }}>Copy URL</button>
                        <button onClick={() => { navigator.clipboard.writeText(`${id}`) }}>Copy Code</button>

                        {/* <FacebookShareButton children={<FacebookIcon size={32} round={true} />} url={`http://localhost:3001/room/${id}`} quote="Join my game!"/> */}

                        <input type="text" onChange={(e) => setNickname(e.target.value)} />
                        <button onClick={editUsername}>Change Username</button>

                        <div className="playerList">
                            {players}
                        </div>

                        <button onClick={togglereadyPlayers}>
                            Ready Up
                        </button>

                    </div>
                    :
                    <div>
                        <button className="back" onClick={() => navigate('/')}>Back to home</button>
                        <h1>No games found with the id '{id}'</h1>
                    </div>

            }
        </div>
    )
}



export default QuizWaiting;
