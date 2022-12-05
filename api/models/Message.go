package models

import (
	"time"

	"gorm.io/gorm"
)

type Message struct{
	gorm.Model              	

	//Omit the name of the group chat the message belongs too
	ChatName       string    `gorm:"-"`
	
	Name           string    `gorm:"type:string; size:20; column:user_name"`
	ChatID         uint      `gorm:"type:int"`        

	//The content of the message.
	MessageContent string    `gorm:"type:string"`

	//The date of the message
	MessageDate    time.Time `gorm:"type:string"`

	//Foreign keys that point to the Users table and Chat table respectively.
	User           User      `gorm:"foreignKey:Name;   references:Username; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Chat           Chat      `gorm:"foreignKey:ChatID; references:ID"`
}