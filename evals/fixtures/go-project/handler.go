package main

import (
	"encoding/json"
	"net/http"
	"strings"
	"sync"
)

// Item is the core domain type.
type Item struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var (
	store = make(map[string]Item)
	mu    sync.RWMutex
)

// handleItems handles GET (list all) and POST (create) on /api/items.
func handleItems(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	switch r.Method {
	case http.MethodGet:
		mu.RLock()
		items := make([]Item, 0, len(store))
		for _, item := range store {
			items = append(items, item)
		}
		mu.RUnlock()
		json.NewEncoder(w).Encode(items)

	case http.MethodPost:
		var item Item
		if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
			http.Error(w, `{"error":"invalid JSON"}`, http.StatusBadRequest)
			return
		}
		if item.ID == "" {
			http.Error(w, `{"error":"id is required"}`, http.StatusBadRequest)
			return
		}
		mu.Lock()
		store[item.ID] = item
		mu.Unlock()
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(item)

	default:
		http.Error(w, `{"error":"method not allowed"}`, http.StatusMethodNotAllowed)
	}
}

// handleItem handles GET on /api/items/:id.
func handleItem(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, `{"error":"method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	id := strings.TrimPrefix(r.URL.Path, "/api/items/")
	mu.RLock()
	item, ok := store[id]
	mu.RUnlock()
	if !ok {
		http.Error(w, `{"error":"not found"}`, http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(item)
}
