import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel
} from "@chatscope/chat-ui-kit-react";
import { useMutation } from 'react-query';
import { sendMessage, apiReqBodyDto } from './actions/sendMessage';

function App() {
  const [messages, setMessages] = useState<MessageModel[] & apiReqBodyDto[]>([
    {
      message: 'Olá, eu sou o Chat Sonic.',
      sender: 'ChatSonic',
      position: 'single',
      direction: 'incoming',
      is_sent: true
    }
  ])

  const { mutate, isLoading, error } = useMutation('get-response', (apiRequestBody: apiReqBodyDto) => sendMessage(apiRequestBody), {
    onSuccess: (data) => {
      data?.message ? 
       setMessages(prev => [...prev, {
        sender: 'ChatSonic',
        position: 'single',
        direction: 'incoming',
        is_sent: false,
        message: data.message
      }]) 
      : alert("Não obteve resposta do servidor");
    }
  })

  const handleSend = async (message: string) => {
    const newMessage: MessageModel & apiReqBodyDto = {
      message,
      sender: "user",
      is_sent: true,
      direction: 'outgoing',
      position: 'single'
    }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    processMessageToChatSonic(newMessage)
  }

  const processMessageToChatSonic = async (chatMessage: MessageModel & apiReqBodyDto) => {

    const apiRequestBody: apiReqBodyDto = {
      enable_google_results: true,
      enable_memory: true,
      input_text: chatMessage.message,
      history_data: messages
    }

    mutate(apiRequestBody)
  }

  if (error) {
    return <h1>Ops, erro na chamada da api.</h1>
  }

  return (
    <div className='App'>
      <div className='Body'>
        <MainContainer style={{color: 'red'}}>
          <ChatContainer className="my-chat-container">
            <MessageList
              typingIndicator={isLoading && <TypingIndicator content={"Chat Sonic is typing"} />}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput
            attachButton={false}
              placeholder="Escreva sua mensagem aqui."
              onSend={handleSend}
               />
          </ChatContainer>
        </MainContainer>
      </div>
      <footer> © 2023 - Pedro Henrique </footer>
    </div>
  )
}

export default App
