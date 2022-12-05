package controllers

import (
	"Messenger/api/database"

	"gorm.io/gorm"
)

type MessageController struct{
	db *gorm.DB
}

func (m *MessageController) Init() {
	m.db = database.GetDB()
}

