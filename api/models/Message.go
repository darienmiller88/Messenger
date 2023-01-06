package models

import (
	"gorm.io/gorm"
	"github.com/go-ozzo/ozzo-validation"
)

type Message struct{
	gorm.Model         	       	

	//Type describes what type of message is sent by the client to the websocket server.
	Type           int     `json:"type" gorm:"-"`
    ClientID       string  `json:"-"    gorm:"-"`

	//Omit the name of the group chat the message belongs too
	ChatName       string  `gorm:"-"`
	
	Name           string  `json:"username" gorm:"type:string; size:20; column:user_name"`
	ChatID         uint    `json:"-"        gorm:"type:int"`        

	//The content of the message.
	MessageContent string  `json:"message_content" gorm:"type:string"`

	//The date of the message
	MessageDate    string  `json:"message_date"`

	//Foreign keys that point to the Users table and Chat table respectively.
	User           User    `json:"-" gorm:"foreignKey:Name;   references:Username; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Chat           Chat    `json:"-" gorm:"foreignKey:ChatID; references:ID;"`
}

func (m *Message) Validate() error{
	return validation.ValidateStruct(
		m,
		validation.Field(&m.Name, validation.Required),
		validation.Field(&m.MessageDate, validation.Required),
		validation.Field(&m.MessageContent, validation.Required),
	)
}