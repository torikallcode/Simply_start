package routers

import (
	"backend/handlers"

	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/time", handlers.GetAllTime).Methods("GET")
	router.HandleFunc("/task", handlers.GetAllTask).Methods("GET")
	router.HandleFunc("/task/{id}", handlers.GetTask).Methods("GET")
	router.HandleFunc("/task", handlers.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/task/{id}", handlers.UpdateTask).Methods("PUT")
	router.HandleFunc("/task/{id}", handlers.DeleteTask).Methods("DELETE")
	router.HandleFunc("/task/{id}/status", handlers.UpdateTaskStatus).Methods("PATCH")

	return router

}
