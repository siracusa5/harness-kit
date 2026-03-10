package main

import (
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/items", handleItems)
	mux.HandleFunc("/api/items/", handleItem)
	log.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
