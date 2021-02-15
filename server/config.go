package main

import (
	"github.com/jessevdk/go-flags"
)

type configFlags struct {
	RPCServer     string `short:"s" long:"rpcserver" description:"RPC server to connect to"`
	ListenAddress string `short:"l" long:"listen" default:":8080"`
}

func parseConfig() (*configFlags, error) {
	cfg := &configFlags{}
	parser := flags.NewParser(cfg, flags.HelpFlag)

	_, err := parser.Parse()
	if err != nil {
		return nil, err
	}

	return cfg, nil
}
