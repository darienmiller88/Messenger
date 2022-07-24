package routes

import (

	"github.com/go-chi/chi"
	"Messenger/api/controllers"
)

type UserRoutes struct{
	Router     *chi.Mux
	controller controllers.UserController
}

func (u *UserRoutes) Init(){
	u.Router = chi.NewRouter()
	u.controller.Init()

	u.Router.Get("/", u.controller.GetUsers)
	u.Router.Post("/signin", u.controller.Signin)
	u.Router.Post("/signup", u.controller.Signup)
	u.Router.Post("/signout", u.controller.Signout)
	u.Router.Get("/{username}", u.controller.GetUser)
	u.Router.Delete("/{username}", u.controller.DeleteUser)
}