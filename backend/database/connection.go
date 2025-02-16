package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDatabase() {
	connectionString := "root:torikal@tcp(localhost:3306)/Simply_start"
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		log.Fatal("error connecting to database:", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Error ping database:", err)
	}

	DB = db
	fmt.Println("Database connected sucsesfully")
}
