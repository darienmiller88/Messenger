package routes

import(
	"github.com/go-chi/chi"

	"Messenger/api/controllers"
	// "Messenger/api/middlewares"
)

type MessageRoutes struct{
	Router *chi.Mux
	controller controllers.MessageController
}

func (m *MessageRoutes) Init(){
	m.Router = chi.NewRouter()
	m.controller = controllers.MessageController{}

	m.controller.Init()
	m.Router.Get("/", m.controller.GetAllPublicMessages)
	m.Router.Delete("/", m.controller.DeleteMessage)
	m.Router.Delete("/testdelete", m.controller.TestDelete)
	m.Router.Get("/id/{id}", m.controller.GetMessageByID)
	m.Router.Get("/username/{username}", m.controller.GetMessagesByUsername)
}