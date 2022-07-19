package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"

	"Messenger/api/routes"
	"Messenger/api/database"
)

func main (){
	godotenv.Load()
	database.InitDB()

	index   := routes.Index{}
	router  := chi.NewRouter()
	newCors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://facebookmessenger.netlify.app"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
	})

	index.Init()
	router.Use(newCors.Handler)
	router.Use(middleware.Logger)
	router.Mount("/api/v1", index.Router)

	fmt.Println("Listening on port:", os.Getenv("PORT"))
	http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), router)
}