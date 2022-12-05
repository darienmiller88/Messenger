package database

import (
	"fmt"
	"log"
	"os"

	"Messenger/api/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	// "gorm.io/gorm/logger"
)

var db *gorm.DB

func InitDB() {
	var err error

	db_url := os.Getenv("DATABASE_URL")
	db, err = gorm.Open(postgres.Open(db_url), &gorm.Config{
		// Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal(err)
	}

	chat := &models.Chat{}
	db.Where("chat_name = ?", "public").Find(chat)

	if chat.ChatName == ""{
		chat.ChatName = "public"
		db.Create(chat)
	}

	db.AutoMigrate(&models.User{}, &models.Chat{}, &models.Message{}, &models.UserChat{})

	fmt.Println("connected to database", db_url)
}

func GetDB() *gorm.DB {
	return db
}
