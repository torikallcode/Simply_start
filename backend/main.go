package main

import (
	"backend/database"
	"backend/routers"
	"log"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	database.InitDatabase()
	defer database.DB.Close()

	routers := routers.SetupRouter()

	// Gunakan konfigurasi CORS yang lebih spesifik
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		Debug:            true,
	})

	handler := c.Handler(routers)

	log.Println("Server sedang berjalan di port :8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
