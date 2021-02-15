package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/kaspanet/kaspad/util"

	"github.com/kaspanet/kaspad/infrastructure/logger"
	"github.com/kaspanet/kaspad/util/panics"
)

var (
	backendLog = logger.NewBackend()
	log        = backendLog.Logger("WLTS")
	spawn      = panics.GoroutineWrapperFunc(log)
)

func initLog() {
	homeDir := util.AppDataDir("kaspa_wallet_server", false)
	logFile := filepath.Join(homeDir, "kaspa_wallet_server.log")
	errLogFile := filepath.Join(homeDir, "kaspa_wallet_server_err.log")

	err := backendLog.AddLogFile(logFile, logger.LevelTrace)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error adding log file %s as log rotator for level %s: %s",
			logFile, logger.LevelTrace, err)
		os.Exit(1)
	}
	err = backendLog.AddLogFile(errLogFile, logger.LevelWarn)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error adding log file %s as log rotator for level %s: %s",
			errLogFile, logger.LevelWarn, err)
		os.Exit(1)
	}
}
