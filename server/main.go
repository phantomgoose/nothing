package main

import (
	"context"
	"fmt"
	"net/http"
	"nothing/api"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	port := os.Getenv("PORT")
	defaultPort := "8080"
	var Address string
	if port != "" {
		Address = fmt.Sprint(":", port)
	} else {
		Address = fmt.Sprint(":", defaultPort)
	}
	server := &http.Server{Addr: Address}
	errs := make(chan error, 1)

	go func() {
		fs := http.FileServer(http.Dir("./client"))
		http.Handle("/", fs)
		http.Handle("/api/go/test", api.Handler())

		fmt.Printf("Starting server on http://localhost%v", Address)
		errs <- server.ListenAndServe()
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	select {
	case <-stop:
		fmt.Println("Shutting server down.")
		os.Exit(0)
	case err := <-errs:
		fmt.Println("Failed to start server:", err.Error())
		os.Exit(1)
	}

	shutdown, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	if err := server.Shutdown(shutdown); err != nil {
		fmt.Println("Failed to shutdown server:", err.Error())
		os.Exit(1)
	}
}
