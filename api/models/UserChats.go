package models

import(
	"gorm.io/gorm"
)

type UserChat struct{
	gorm.Model

	UsernameRef       string `gorm:"type:string; size:20"`
	ChatIDRef         uint   `gorm:"type:int"` 

	User           User   `gorm:"foreignKey:UsernameRef; references:Username; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Chat           Chat   `gorm:"foreignKey:ChatIDRef;   references:ID"`
}