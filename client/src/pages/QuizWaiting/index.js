import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementPlayer,
  readyPlayers,
  socketConnections,
  unreadyPlayers,
} from "../../redux/actions/action.js";
import NavBar from "../../components/NavBar";
import { TwitterShareButton, TwitterIcon } from "react-share";
import "./QuizWaiting.css";

const url = "http://localhost:5001";

function QuizWaiting() {
  const { id } = useParams();
  const socketConnect = io(url);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [nickname, setNickname] = useState("");
  const [nicknameChosen, setNicknameChosen] = useState("");
  const [result, setResult] = useState();
  const [message, setMessage] = useState([]);
  const [copiedURL, setCopiedURL] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const ref = useRef();

  const lobbyPlayers = useSelector((state) => state.player.playerList);
  const socketConnection = useSelector(
    (state) => state.player.socketConnection
  );
  const username = useSelector((state) => state.auth.currentUser.username);

  useEffect(() => {
    dispatch(socketConnections({ socketConnect }));
    socketConnect.emit("create", id);

    socketConnect.on("lobby-players", (list) => {
      dispatch(incrementPlayer(list));
    });

    socketConnect.on("ready", (socket) => {
      dispatch(readyPlayers(socket));
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    socketConnection.socketConnect.emit("message", {
      nicknameChosen,
      message,
    });
    setMessage((prevState) => [
      { nickname: nicknameChosen, message: message, me: true },
      ...prevState,
    ]);

    e.target.message.value = "";
  };

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 1000);
    if (socketConnection !== undefined) {
      if (username) {
        socketConnection.socketConnect.emit("username", username);
        setNicknameChosen(username);
      } else {
        socketConnection.socketConnect.emit(
          "username",
          `Guest User-${randomNumber}`
        );
        setNicknameChosen(`Guest User-${randomNumber}`);
      }

      socketConnection.socketConnect.on(
        "receive-message",
        (nickname, message) => {
          setMessage((prevState) => [
            { nickname: nickname, message: message },
            ...prevState,
          ]);
        }
      );
    }
  }, [socketConnection]);

  useEffect(() => {
    if (lobbyPlayers.length > 0) {
      if (lobbyPlayers.every((player) => player.userReady === true)) {
        navigate(`/quiz/${id}`, { replace: true });
        dispatch(unreadyPlayers());
        socketConnection.socketConnect.emit("timer");
      }
    }
  }, [lobbyPlayers]);

  const editUsername = async (e) => {
    let value = ref.current.value;

    const username = await fetch(`http://localhost:3001/user/${value}`);
    const data = await username.json();

    function userExists(username) {
      return lobbyPlayers.some(function (el) {
        return el.player.username === username;
      });
    }

    if (data.status === false || userExists(value)) return;

    setNicknameChosen(value);
    socketConnection.socketConnect.emit("username", value);
    ref.current.value = "";
  };

  function togglereadyPlayers() {
    socketConnection.socketConnect.emit(
      "isReady",
      socketConnection.socketConnect.id
    );
  }

  let players = lobbyPlayers.map((p, i) => {
    let ready;

    // If the user is ready, it changes this variable
    if (p.userReady === true) {
      ready = "(READY)";
    } else {
      ready = "(NOT READY)";
    }

    return (
      <div key={i}>
        {/* <p>{p.player.username}{ready}</p> */}
        {nicknameChosen === p.player.username ? (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {p.player.username}
            {ready}
          </p>
        ) : (
          <p>
            {p.player.username}
            {ready}
          </p>
        )}
      </div>
    );
  });

  useEffect(() => {
    // To ensure the user can't start a game with a random ID in the URL
    const findLobby = async () => {
      const findLobby = await fetch(`http://localhost:3001/exists/${id}`);
      const data = await findLobby.json();
      return data;
    };

    (async () => {
      let lobby = await findLobby();

      if (!lobby.length || lobby === "Error, cannot find a lobby") {
        setResult(`Cannot find a lobby with the name: ${id}`);
      } else {
        setResult();
      }
    })();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setCopiedURL(false);
    }, 3000);
  }, [copiedURL]);

  useEffect(() => {
    setTimeout(() => {
      setCopiedCode(false);
    }, 3000);
  }, [copiedCode]);

  const messageList = message.map((message, i) => {
    return (
      <div key={i}>
        <li className={message.me ? "my-message" : ""}>
          <b>{message.nickname}</b>: {message.message}
        </li>
      </div>
    );
  });

  return (
    <div role="waiting">
      <NavBar />
      <p id="remember-msg">
        Remember: if you're not logged in, your score won't be counted on the
        leaderboard!
      </p>
      <div className="QuizWaiting">
        {!result ? (
          <div>
            

            <div className="share-buttons">
            <TwitterShareButton
              children={<TwitterIcon size={32} round={true} />}
              url={`http://localhost:3001/room/${id}`}
              title="Join my game!"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:3000/room/${id}`
                );
                setCopiedURL(true);
              }}
            >
              Copy URL
            </button>
            {copiedURL && <div>URL copied to clipboard!</div>}
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${id}`);
                setCopiedCode(true);
              }}
            >
              Copy Code
            </button>
            {copiedCode && <div>Code copied to clipboard!</div>}

            </div>



            {!username ? (
              <div>
                <input
                  type="text"
                  // onChange={(e) => setNickname(e.target.value)}
                  className="nickname"
                  maxLength="15"
                  ref={ref}
                  required
                />
                <button onClick={editUsername} role="editUsername">
                  Change Username
                </button>
              </div>
            ) : null}

            <div className="playerList">{players}</div>

            <button onClick={togglereadyPlayers}>Ready Up</button>
          </div>
        ) : (
          <div>
            <button className="back" onClick={() => navigate("/")}>
              Back to home
            </button>
            <h1>No games found with the id '{id}'</h1>
          </div>
        )}

        <div>
          <main id="message-list">{messageList}</main>
          <h3>Write a message...</h3>
          <form id="message-form" onSubmit={sendMessage} role="sendMessage">
            <input name="message" required minLength="1" maxLength="100" />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuizWaiting;
