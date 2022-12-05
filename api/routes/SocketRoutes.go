package routes

import (
	
)

type SocketRoutes struct{
}

// func (s *SocketRoutes) Init(){
// 	gosf.Listen("messenger", controllers.PublicChatController)
// 	gosf.Listen("echo", controllers.Echo)
// 	gosf.OnConnect(func(client *gosf.Client, request *gosf.Request) {
// 		fmt.Println("Client connected.", client)
// 		client.Join("public_chat")
// 	})
// 	gosf.OnDisconnect(func(client *gosf.Client, request *gosf.Request) {
// 		// fmt.Println("Client disconnected.", client)
// 		client.Leave("public_chat")
// 	}) 
// }