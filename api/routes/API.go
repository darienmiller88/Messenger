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

	userRoutes.Init()

	a.Router.Mount("/users", userRoutes.Router)
}