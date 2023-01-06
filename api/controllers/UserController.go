package controllers

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
	"encoding/json"

	"Messenger/api/database"
	"Messenger/api/models"

	"github.com/go-chi/chi"
	chi_render "github.com/go-chi/render"
	"github.com/golang-jwt/jwt"
	"github.com/unrolled/render"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

const sessionLen int = 10000

type jsonBody map[string]interface{}
type UserController struct{
	r  render.Render
	db *gorm.DB
}

func (u *UserController) Init(){
	u.r  = *render.New()
	u.db =  database.GetDB()
}

func (u *UserController) Checkauth(res http.ResponseWriter, req *http.Request){
	u.r.JSON(res, http.StatusOK, jsonBody{"message": "Signed in!"})
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

	if err := json.NewDecoder(req.Body).Decode(&user); err != nil{
		u.r.JSON(res, http.StatusBadRequest, jsonBody{"err": err})
		return
	}

	u.db.Where("username = ?", username).Delete(&user)

	u.r.JSON(res, http.StatusOK, jsonBody{"deleting": user})
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
		u.r.JSON(res, http.StatusBadRequest, err)
		return
	}

 	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	user.Password = string(hashedPassword)

	if err := u.db.Create(&user).Error; err != nil{
		u.r.JSON(res, http.StatusBadRequest, jsonBody{"username": fmt.Sprintf("User \"%s\" already exists! Please select another username.", user.Username)})
		return
	}

	setCookie(getJwtToken(user), sessionLen, res)
	u.r.JSON(res, http.StatusOK, jsonBody{"success": "Signed up!"})
}

func (u *UserController) Signin(res http.ResponseWriter, req *http.Request) {
	user := models.User{}

	if err := chi_render.DecodeJSON(req.Body, &user); err != nil{
		u.r.JSON(res, http.StatusBadRequest, jsonBody{"err": err.Error()})
		return
	}

	possibleUser := models.User{}
	usernameErr := u.db.Where("username = ?", user.Username).Find(&possibleUser).Error
	passwordErr := bcrypt.CompareHashAndPassword([]byte(possibleUser.Password), []byte(user.Password))
	
	if usernameErr != nil || passwordErr != nil{
		u.r.JSON(res, http.StatusNotFound, jsonBody{"signinError": "Username or Password not connected to any account. Please try again."})
		return
	}
	
	setCookie(getJwtToken(user), sessionLen, res)
	u.r.JSON(res, http.StatusOK, jsonBody{"message": "You're signed in!"})
}

func (u *UserController) Signout(res http.ResponseWriter, req *http.Request) {
	setCookie("", -1, res)
	u.r.JSON(res, http.StatusOK, jsonBody{"message": "signout"})
}

func getJwtToken(user models.User) string{
	expiry := time.Now().Add(time.Duration(sessionLen) * time.Second)
	tokenString, _ := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"exp"     : expiry.Unix(),
	}).SignedString([]byte(os.Getenv("JWT_SECRET")))

	return tokenString
}

func setCookie(tokenString string, expiry int, res http.ResponseWriter) {
	http.SetCookie(res, &http.Cookie{
		Name:     "jwt",
		Path:     "/",
		HttpOnly: true,
		Value:    tokenString,
		MaxAge:   expiry,
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
	})
}