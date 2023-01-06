package middlewares

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
)

func ProtectUser(next http.Handler) http.Handler{
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		usernameFromUrl := chi.URLParam(req, "username")
		usernameFromClaims := req.Context().Value("username").(string)

		if usernameFromUrl != usernameFromClaims{
			r.JSON(res, http.StatusForbidden, jsonBody{"errUnauthorizedUser": fmt.Sprintf("Username \"%s\" forbidden to view for user \"%s\"", usernameFromUrl, usernameFromClaims)})
			return
		}

		next.ServeHTTP(res, req)
	})
}