package handlers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"net/http"
)

func GetAllTime(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var times []models.Time

	query := "SELECT id, date_recorded, time_recorded FROM waktu"
	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer rows.Close()
	for rows.Next() {
		var time models.Time
		if err := rows.Scan(&time.ID, &time.Date, &time.Time); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		times = append(times, time)
	}
	json.NewEncoder(w).Encode(times)
}
