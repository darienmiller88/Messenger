package models

import (
	"regexp"

	"github.com/go-ozzo/ozzo-validation"
	"github.com/nerock/ozzo-validation/is"
	"gorm.io/gorm"
)

type User struct{
	gorm.Model
	Username string `json:"username" gorm:"type:string; size:20; unique; not null"`
	Password string `json:"password" gorm:"type:string; size:50;"`
}

func (u User) Validate () error {
	return validation.ValidateStruct(
		&u,
		validation.Field(&u.Username, validation.Required, validation.Length(5, 20), is.Alphanumeric),
		validation.Field(&u.Password, 
			validation.Required,
			validation.Length(6, 50),
			validation.Match(regexp.MustCompile("[a-z]")).Error("Password must contain at least one lowercase letter"),
			validation.Match(regexp.MustCompile("[A-Z]")).Error("Password must contain at least one uppercase letter"),
			validation.Match(regexp.MustCompile("[0-9]")).Error("Password must contain at least one number"),
		),
	)
}

