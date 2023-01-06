package socketServer

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
    "Messenger/api/models"
)

type client struct {
	ID   string
	Conn *websocket.Conn
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

        clientMessage := models.Message{}
        json.Unmarshal(messageBody, &clientMessage)
        clientMessage.ClientID = c.ID
        clientMessage.Type = messageType
    
        ws.Broadcast <- clientMessage
        fmt.Printf("Message Received: %+v\n", clientMessage)
    }
}