package handlers

import (
	"backend/database"
	"backend/models"
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
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

func GetAllTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var tasks []models.Task

	query := "SELECT id, name_task, from_time, to_time, content, status FROM task"
	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	for rows.Next() {
		var task models.Task
		if err := rows.Scan(&task.ID, &task.Name_task, &task.From_time, &task.To_time, &task.Content, &task.Status); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		tasks = append(tasks, task)
	}
	json.NewEncoder(w).Encode(tasks)
}

func GetTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "applications/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid task", http.StatusBadRequest)
		return
	}

	var task models.Task
	query := "SELECT id, name_task, from_time, to_time, content, status FROM task WHERE id = ?"
	err = database.DB.QueryRow(query, id).Scan(&task.ID, &task.Name_task, &task.From_time, &task.To_time, &task.Content, &task.Status)
	if err == sql.ErrNoRows {
		http.Error(w, "Rows not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(task)
}
