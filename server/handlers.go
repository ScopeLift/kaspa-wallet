package main

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"google.golang.org/protobuf/encoding/protojson"

	"github.com/pkg/errors"

	"github.com/kaspanet/kaspad/infrastructure/network/netadapter/server/grpcserver/protowire"
)

type requestHandlers struct {
	forwarder *rpcForwarder
}

func newHandlers(forwarder *rpcForwarder) *requestHandlers {
	return &requestHandlers{
		forwarder: forwarder,
	}
}

func (h *requestHandlers) getUTXOsByAddress(w http.ResponseWriter, req *http.Request) {
	request := &protowire.KaspadMessage_GetUtxosByAddressesRequest{
		GetUtxosByAddressesRequest: &protowire.GetUtxosByAddressesRequestMessage{},
	}

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		panic(errors.Wrapf(err, "Error reading request body"))
	}

	err = protojson.Unmarshal(body, request.GetUtxosByAddressesRequest)
	if err != nil {
		writeError(w, http.StatusBadRequest, fmt.Sprintf("Unable to unmarshal request JSON: %s", err))
		return
	}

	requestKaspadMessage := &protowire.KaspadMessage{Payload: request}
	responseKaspadMessage, err := h.forwarder.post(requestKaspadMessage)
	if err != nil {
		panic(errors.Wrapf(err, "Error posting request"))
	}

	response :=
		responseKaspadMessage.Payload.(*protowire.KaspadMessage_GetUtxosByAddressesResponse).GetUtxosByAddressesResponse

	if response.Error != nil {
		writeError(w, http.StatusBadRequest, response.Error.Message)
	}

	responseJSON, err := protojson.Marshal(response)
	if err != nil {
		panic(errors.Wrapf(err, "Error marshalling response"))
	}

	_, err = w.Write(responseJSON)
	if err != nil {
		panic(errors.Wrapf(err, "Error writing response"))
	}
}

func (h *requestHandlers) submitTransaction(w http.ResponseWriter, req *http.Request) {
	request := &protowire.KaspadMessage_SubmitTransactionRequest{
		SubmitTransactionRequest: &protowire.SubmitTransactionRequestMessage{},
	}

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		panic(errors.Wrapf(err, "Error reading request body"))
	}

	err = protojson.Unmarshal(body, request.SubmitTransactionRequest)
	if err != nil {
		writeError(w, http.StatusBadRequest, fmt.Sprintf("Unable to unmarshal request JSON: %s", err))
		return
	}

	requestKaspadMessage := &protowire.KaspadMessage{Payload: request}
	responseKaspadMessage, err := h.forwarder.post(requestKaspadMessage)
	if err != nil {
		panic(errors.Wrapf(err, "Error posting request"))
	}

	response :=
		responseKaspadMessage.Payload.(*protowire.KaspadMessage_SubmitTransactionResponse).SubmitTransactionResponse

	if response.Error != nil {
		writeError(w, http.StatusBadRequest, response.Error.Message)
	}

	responseJSON, err := protojson.Marshal(response)
	if err != nil {
		panic(errors.Wrapf(err, "Error marshalling response"))
	}

	_, err = w.Write(responseJSON)
	if err != nil {
		panic(errors.Wrapf(err, "Error writing response"))
	}
}

func writeError(w http.ResponseWriter, statusCode int, errorMessage string) {
	log.Warnf("Got error for request: %s", errorMessage)
	w.WriteHeader(statusCode)
	_, e := w.Write([]byte(errorMessage))
	if e != nil {
		panic(e)
	}
}
