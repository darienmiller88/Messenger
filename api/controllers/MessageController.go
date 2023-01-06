package controllers

import (
	"fmt"
	"net/http"
	"encoding/json"

	"Messenger/api/database"
	"Messenger/api/models"

	"github.com/go-chi/chi"
	"github.com/unrolled/render"
	"gorm.io/gorm"
)

type MessageController struct {
	db *gorm.DB
	r  *render.Render
}

func (m *MessageController) Init() {
	m.db = database.GetDB()
	m.r = render.New()
}

func (m *MessageController) GetAllPublicMessages(res http.ResponseWriter, req *http.Request) {
	messages := []models.Message{}

	m.db.Order("created_at asc").Find(&messages)

	m.r.JSON(res, http.StatusOK, messages)
}

func (m *MessageController) GetMessageByID(res http.ResponseWriter, req *http.Request) {
	messageID := chi.URLParam(req, "id")
	message := models.Message{}

	if err := m.db.First(&message, messageID).Error; err == gorm.ErrRecordNotFound{
		m.r.JSON(res, http.StatusNotFound, jsonBody{"err": fmt.Sprintf("Message with id %s not found.", messageID)})
		return
	}

	fmt.Println(message)
	m.r.JSON(res, http.StatusOK, message)
}

func (m *MessageController) GetMessagesByUsername(res http.ResponseWriter, req *http.Request) {
	username := chi.URLParam(req, "username")
	messages := []models.Message{}
	
	
	if rowsAffected := m.db.Where(&models.Message{Name: username}).Find(&messages).RowsAffected; rowsAffected == 0{
		m.r.JSON(res, http.StatusNotFound, jsonBody{"err": fmt.Sprintf("No user found with username %s.", username)})
		return
	}

	m.r.JSON(res, http.StatusOK, messages)
}

func (m *MessageController) TestDelete(res http.ResponseWriter, req *http.Request){
	message := models.Message{}

	if err := json.NewDecoder(req.Body).Decode(&message); err != nil{
		fmt.Println("first error hit", err)
		m.r.JSON(res, http.StatusBadRequest, jsonBody{"err": err})
		return
	}

	fmt.Println("message to delete", message)

	m.r.JSON(res, http.StatusOK, jsonBody{"deleting": message})
}

func (m *MessageController) DeleteMessage(res http.ResponseWriter, req *http.Request) {
	message := models.Message{}

	if err := json.NewDecoder(req.Body).Decode(&message); err != nil{
		fmt.Println("first error hit", err)
		fmt.Println("mesasge:", message)
		m.r.JSON(res, http.StatusBadRequest, jsonBody{"err": err})
		return
	}

	if err := message.Validate(); err != nil{
		fmt.Println("second error hit")
		m.r.JSON(res, http.StatusBadRequest, err)
		return
	}

	// username := req.Context().Value("claims")

	// fmt.Println("user:", username)

	if rowsAffected := m.db.Where(&message).Delete(&message).RowsAffected; rowsAffected == 0 {
		m.r.JSON(res, http.StatusBadRequest, jsonBody{"No message found": message})
		return
	}

	m.r.JSON(res, http.StatusOK, jsonBody{"message deleted": message})
}
