import React, { useEffect, useState } from "react";
import styles from './Chatroom.module.css'
import { useUser } from "../../context/UserContext";
import { io } from "socket.io-client";

const ChatRoom = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useUser();

  useEffect(() => {
    // Connect to Socket.IO server
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      const messageData = {
        username: user.username, 
        text: input,
      };

      // Emit message to the server
      socket.emit("message", messageData);

      setInput(""); // Clear input
    }
  };

  return (
    <div className={styles.chatRoom}>
      <h2>Chat Room</h2>
      <div className={styles.chatBox}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            <strong>{message.username}</strong>: {message.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} className={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
