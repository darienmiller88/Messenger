package controllers

import (
	"fmt"

	"github.com/ambelovsky/gosf"
)

func PublicChatController(client *gosf.Client, request *gosf.Request) *gosf.Message{
	response := new(gosf.Message)
	response.Success = true
	response.Text = request.Message.Text

	fmt.Println("message:", request.Message.Text)
	client.Broadcast("public_chat", request.Endpoint, response)

	return nil
}

func Echo(client *gosf.Client, request *gosf.Request) *gosf.Message{
	response := new(gosf.Message)
	response.Success = true
	response.Text = request.Message.Text

	fmt.Println("message:", request.Message.Text)

	
	return response
}