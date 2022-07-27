package routes

import (

	"github.com/go-chi/chi"
	"Messenger/api/controllers"
	"Messenger/api/middlewares"
)

type UserRoutes struct{
	Router     *chi.Mux
	controller controllers.UserController
}
 
func (u *UserRoutes) Init(){
	u.Router = chi.NewRouter()
	u.controller.Init()

	u.Router.With(middlewares.Auth).Get("/", u.controller.GetUsers)
	u.Router.With(middlewares.Auth).Get("/checkauth", u.controller.Checkauth)
	u.Router.With(middlewares.Auth, middlewares.ProtectUser).Get("/{username}", u.controller.GetUser)
	u.Router.With(middlewares.Auth, middlewares.ProtectUser).Delete("/{username}", u.controller.DeleteUser)
	u.Router.With(middlewares.ProtectSignin).Post("/signin", u.controller.Signin)
	u.Router.With(middlewares.ProtectSignin).Post("/signup", u.controller.Signup)
	u.Router.Post("/signout", u.controller.Signout)
}