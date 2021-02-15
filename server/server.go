package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

type server struct {
	router        *mux.Router
	listenAddress string
}

func newServer(listenAddress string, forwarder *rpcForwarder) *server {
	handlers := newHandlers(forwarder)
	router := newRouter(handlers)

	return &server{
		router:        router,
		listenAddress: listenAddress,
	}
}

func (s *server) Start() {
	spawn("ListenAndServe", func() {
		err := http.ListenAndServe(s.listenAddress, s.router)
		if err != nil {
			panic(err)
		}
	})
}
