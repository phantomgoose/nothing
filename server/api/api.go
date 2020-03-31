package api

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

// Handler replies with a Hello after a random duration
func Handler() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")

		r := rand.Intn(5000)
		time.Sleep(time.Duration(r) * time.Millisecond)

		body, err := json.Marshal(map[string]interface{}{
			"data": fmt.Sprint("Hello from Go! Server randomly delayed response by ", r, " milliseconds"),
		})

		if err != nil {
			res.WriteHeader(500)
			return
		}

		res.WriteHeader(200)
		res.Write(body)
	}
}
