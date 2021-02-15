package main

import (
	"github.com/kaspanet/kaspad/infrastructure/network/netadapter/server/grpcserver/protowire"
	"github.com/kaspanet/kaspad/infrastructure/network/rpcclient"
)

type rpcForwarder struct {
	client *rpcclient.RPCClient
}

func newRPCForwarder(rpcAddress string) (*rpcForwarder, error) {
	client, err := rpcclient.NewRPCClient(rpcAddress)
	if err != nil {
		return nil, err
	}

	return &rpcForwarder{client: client}, nil
}

func (f *rpcForwarder) close() {
	f.client.Close()
}

func (f *rpcForwarder) post(request *protowire.KaspadMessage) (*protowire.KaspadMessage, error) {
	return f.client.Post(request)
}
