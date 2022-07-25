import styled from "styled-components";
import React, { useState,useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import firebase from "firebase";
import MicIcon from "@mui/icons-material/Mic";
import getRecipientEmail from "../utils/getRecipientEmail";
import ReactTimeAgo from 'react-time-ago'



function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const endOfMessagesRef=useRef(null)
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };
  const scrollToBottom=() => {
    endOfMessagesRef.current.scrollIntoView({
        behavior:"smooth",
        block:"start"
    })
}
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
    scrollToBottom()
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  console.log(recipientSnapshot)

  return (
    <div>
      <Container>
        <Header>
          {recipient ? (
            <Avatar src={recipient?.photoURL} />
          ) : (
            <Avatar>{recipientEmail[0]}</Avatar>
          )}

          <HeaderInformation>
            <h3>{recipientEmail}</h3>
            {recipientSnapshot ? (
                <p>Last active: {' '}
                {recipient?.lastSeen?.toDate() ?(
                    <ReactTimeAgo date={recipient?.lastSeen?.toDate()} locale="en-US" />
                ):"Unavailable"}
                </p>
            ):(
                <p>Loading Last active...</p>
            )}
          </HeaderInformation>
          <HeaderIcons>
            <IconButton>
              <AttachFileIcon />
              <MoreVertIcon />
            </IconButton>
          </HeaderIcons>
        </Header>
        <MessageContainer>
          {showMessages()}
          <EndOfMeassages ref={endOfMessagesRef} />
        </MessageContainer>
        <InputContainer>
          <InsertEmoticonIcon />
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <button
            hidden
            disabled={!input}
            type={"submit"}
            onClick={sendMessage}
          >
            SendMessage
          </button>
          <MicIcon />
        </InputContainer>
      </Container>
    </div>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  display: flex;
  padding: 11px;
  height: 80 px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;
const EndOfMeassages = styled.div`
margin-bottom:50px`;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  margin-left: 15px;
  margin-right: 15px;
  padding: 20px;
`;
