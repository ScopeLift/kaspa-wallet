package main

import (
	"fmt"

	"github.com/kaspanet/kaspad/infrastructure/os/signal"

	"github.com/kaspanet/kaspad/util/panics"
)

var ()

func main() {
	initLog()

	interrupt := signal.InterruptListener()
	defer log.Info("Shutdown complete")

	cfg, err := parseConfig()
	if err != nil {
		panics.Exit(log, fmt.Sprintf("Error parsing configuration: %+v", err))
	}

	forwarder, err := newRPCForwarder(cfg.RPCServer)
	if err != nil {
		panics.Exit(log, fmt.Sprintf("Error constructing RPC forwarder: %+v", err))
	}
	defer forwarder.close()

	server := newServer(cfg.ListenAddress, forwarder)
	server.Start()

	<-interrupt
}
