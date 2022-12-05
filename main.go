package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	// "github.com/darienmiller88/WebSocketServer"
	"github.com/joho/godotenv"
	"Messenger/api/database"
	"Messenger/api/routes"
	"Messenger/api/controllers"
	"Messenger/WebSocketServer"
)

func main (){
	godotenv.Load("./env/.env")
	database.InitDB()

	api              := routes.API{}
	socketController := controllers.SocketController{}
	router           := chi.NewRouter()
	ws               := WebsocketServer.NewSocketServer(true)
	newCors          := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://facebookmessenger.netlify.app"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
	})

	api.Init()
	socketController.Init()
	router.Use(newCors.Handler)
	router.Use(middleware.Logger)
	router.Mount("/api/v1", api.Router)

	router.Get("/ws", func(res http.ResponseWriter, req *http.Request) {
		WebsocketServer.ServeWebSocketServer(ws, res, req)
	})

	go ws.Start(socketController.AddPublicMessage)
	
	fmt.Println("Listening on port:", os.Getenv("PORT"))
	http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), router)
}