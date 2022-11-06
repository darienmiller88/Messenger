package routes

import (
	"github.com/go-chi/chi"
)

type Index struct{
	Router *chi.Mux
}

func (i *Index) Init(){
	i.Router = chi.NewRouter()

	userRoutes := UserRoutes{}
	//socketRoutes := SocketRoutes{}

	userRoutes.Init()
	//socketRoutes.Init()

	i.Router.Mount("/users", userRoutes.Router)
}