package socketServer

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type client struct {
	ID   string
	Conn *websocket.Conn
}

type message struct {
    Type      int    `json:"type"`
    Body      string `json:"body"`
    Username  string 
    ClientID  string 
}

//Function to continously read incoming messages from the client in real time.
func (c *client) processMessage(ws *WebsocketServer){
	defer func() {
        ws.Unregister <- c
        c.Conn.Close()
    }()

    for {
        messageType, messageBody, err := c.Conn.ReadMessage()

        if err != nil {
            log.Println(err)
            return
        }

        messageMap := make(map[string]string)
        json.Unmarshal(messageBody, &messageMap)
        message := message{
            Type:     messageType, 
            Body:     messageMap["body"], 
            Username: messageMap["username"], 
            ClientID: c.ID,
        }
    
        ws.Broadcast <- message
        fmt.Printf("Message Received: %+v\n", message)
    }
}