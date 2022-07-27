package database

import (
	"fmt"
	"log"
	"os"

	"Messenger/api/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB() {
	var err error

	db_url := os.Getenv("DATABASE_URL")
	db, err = gorm.Open(postgres.Open(db_url), &gorm.Config{
		//Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&models.User{})

	fmt.Println("connected to database", db_url)
}

func GetDB() *gorm.DB {
	return db
}
