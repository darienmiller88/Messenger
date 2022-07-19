package controllers

import (
	"fmt"
	"net/http"
	"strings"

	"Messenger/api/database"
	"Messenger/api/models"

	"github.com/go-chi/chi"
	chi_render "github.com/go-chi/render"
	"github.com/unrolled/render"
	"gorm.io/gorm"
)

type jsonBody map[string]interface{}
type UserController struct{
	r  render.Render
	db *gorm.DB
}

func (u *UserController) Init(){
	u.r  = *render.New()
	u.db =  database.GetDB()
}

func (u *UserController) GetUsers(res http.ResponseWriter, req *http.Request) {
	users := []models.User{}

	u.db.Find(&users)

	u.r.JSON(res, http.StatusOK, users)
}

func (u *UserController) GetUser(res http.ResponseWriter, req *http.Request){
	username := chi.URLParam(req, "username")
	user     := models.User{}

	u.db.Where("username = ?", username).Find(&user)

	u.r.JSON(res, http.StatusOK, user)
}

func (u *UserController) DeleteUser(res http.ResponseWriter, req *http.Request){
	username := chi.URLParam(req, "username")
	user     := models.User{}

	u.db.Where("username = ?", username).Delete(&user)

	u.r.JSON(res, http.StatusOK, jsonBody{"deleting": "deleting user"})
}

func (u *UserController) Signup(res http.ResponseWriter, req *http.Request) {
	user := models.User{}

	if err := chi_render.DecodeJSON(req.Body, &user); err != nil{
		u.r.JSON(res, http.StatusBadRequest, jsonBody{"err": err.Error()})
		return
	}

	//Trim the password for any empty spaces.
	user.Password = strings.Trim(user.Password, " ")

	if err := user.Validate(); err != nil{
		u.r.JSON(res, http.StatusBadRequest, err.Error())
		return
	}

	if err := u.db.Create(&user).Error; err != nil{
		u.r.JSON(res, http.StatusBadRequest, jsonBody{"err": fmt.Sprintf("User \"%s\" already exists!", user.Username)})
		return
	}

	u.r.JSON(res, http.StatusOK, user)
}

func (u *UserController) Signin(res http.ResponseWriter, req *http.Request) {
	u.r.JSON(res, http.StatusOK, jsonBody{"message": "signin"})
}

func (u *UserController) Signout(res http.ResponseWriter, req *http.Request) {
	u.r.JSON(res, http.StatusOK, jsonBody{"message": "signout"})
}