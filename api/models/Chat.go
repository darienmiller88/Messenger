package models

import (
	"gorm.io/gorm"
)

type Chat struct{
	gorm.Model
	ChatName string     `json:"chat_name" gorm:"type:string; size:50"`
}