package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/kaspanet/kaspad/util/panics"
)

func newRouter(handlers *requestHandlers) *mux.Router {
	router := mux.NewRouter()
	router.Use(mux.CORSMethodMiddleware(router))
	router.Use(handlePanicWrapper)

	router.HandleFunc("/getUtxosByAddresses", handlers.getUTXOsByAddress).Methods("POST")
	router.HandleFunc("/submitTransaction", handlers.submitTransaction).Methods("POST")

	return router
}

func handlePanicWrapper(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		defer panics.HandlePanic(log, "request handler", nil)
		next.ServeHTTP(w, req)
	})
}
