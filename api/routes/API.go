package routes

import (
	"github.com/go-chi/chi"
)

type API struct{
	Router *chi.Mux
}

func (a *API) Init(){
	a.Router = chi.NewRouter()

	userRoutes := UserRoutes{}
	messageRoutes := MessageRoutes{}

	userRoutes.Init()
	messageRoutes.Init()

	a.Router.Mount("/users", userRoutes.Router)
	a.Router.Mount("/messages", messageRoutes.Router)
}