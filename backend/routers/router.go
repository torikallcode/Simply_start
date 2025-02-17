package routers

import (
	"backend/handlers"

	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/time", handlers.GetAllTime).Methods("GET")
	router.HandleFunc("/task", handlers.GetAllTask).Methods("GET")

	return router

}
