package routers

import (
	"backend/handlers"

	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/home", handlers.GetAllTime).Methods("GET")

	return router

}
