package controllers

import (
	"Messenger/api/database"
	"Messenger/api/models"
	"fmt"

	"gorm.io/gorm"
)

type SocketController struct{
	db *gorm.DB
}

func (s *SocketController) Init(){
	s.db = database.GetDB()
}

func (s *SocketController) AddPublicMessage(message models.Message) {
	message.ChatID = 5
	message.ChatName = "public"
		
	if err := s.db.Create(&message).Error; err != nil{
		fmt.Println(err)
	}
}

// func PublicChatController(client *gosf.Client, request *gosf.Request) *gosf.Message{
// 	response := new(gosf.Message)
// 	response.Success = true
// 	response.Text = request.Message.Text

// 	fmt.Println("message:", request.Message.Text)
// 	client.Broadcast("public_chat", request.Endpoint, response)

// 	return nil
// }

// func Echo(client *gosf.Client, request *gosf.Request) *gosf.Message{
// 	response := new(gosf.Message)
// 	response.Success = true
// 	response.Text = request.Message.Text

// 	fmt.Println("message:", request.Message.Text)

	
// 	return response
// }

