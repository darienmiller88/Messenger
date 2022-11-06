package models

import (
	"regexp"
	"time"

	"github.com/go-ozzo/ozzo-validation"
	"github.com/nerock/ozzo-validation/is"
)

type User struct{
	ID          uint      `gorm:"primaryKey"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Username    string    `json:"username"     gorm:"type:string; size:20;  unique; not null"`
	Password    string    `json:"password"     gorm:"type:string; size:100; not null"`
	Email       string    `json:"email"        gorm:"type:string"`
	PhoneNumber string    `json:"phone_number" gorm:"type:string"`
}

func (u *User) Validate () error {
	return validation.ValidateStruct(
		u,
		validation.Field(&u.Username, validation.Required, validation.Length(5, 20), is.Alphanumeric),
		validation.Field(&u.Password, 
			validation.Required,
			validation.Length(6, 50),
			validation.Match(regexp.MustCompile("[a-z]")).Error("Password must contain at least one lowercase letter"),
			validation.Match(regexp.MustCompile("[A-Z]")).Error("Password must contain at least one uppercase letter"),
			validation.Match(regexp.MustCompile("[0-9]")).Error("Password must contain at least one number"),
		),
		validation.Field(&u.Email, is.Email),
		validation.Field(&u.PhoneNumber, 
			validation.Match(regexp.MustCompile("[0-9]{3}-[0-9]{3}-[0-9]{4}")).Error("Phone must be of form 111-111-1111"),
		),
	)
}

