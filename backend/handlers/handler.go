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

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var task models.Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, "invalid task", http.StatusBadRequest)
		return
	}

	query := "INSERT INTO task (name_task, from_time, to_time, content, status) VALUE (?, ?, ?, ?, ?)"
	result, err := database.DB.Exec(query, task.Name_task, task.From_time, task.To_time, task.Content, task.Status)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	task.ID = int(id)
	json.NewEncoder(w).Encode(task)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid task", http.StatusBadRequest)
		return
	}

	var task models.Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, "Invalid task", http.StatusBadRequest)
		return
	}

	query := "UPDATE task SET name_task = ?, from_time = ?, to_time = ?, content = ?, status = ? WHERE id = ?"
	_, err = database.DB.Exec(query, task.Name_task, task.From_time, task.To_time, task.Content, task.Status, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	task.ID = id
	json.NewEncoder(w).Encode(task)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "invalid task", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM task WHERE id = ?"
	result, err := database.DB.Exec(query, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "task not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func UpdateTaskStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "invalid list", http.StatusBadRequest)
		return
	}

	query := "UPDATE task SET status = NOT status WHERE id = ?"
	result, err := database.DB.Exec(query, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "list not found", http.StatusNotFound)
		return
	}

	var UpdateTask models.Task
	selectQuery := "SELECT id, name_task, from_time, to_time, content, status FROM task WHERE id = ?"
	err = database.DB.QueryRow(selectQuery, id).Scan(&UpdateTask.ID, &UpdateTask.Name_task, &UpdateTask.From_time, &UpdateTask.To_time, &UpdateTask.Content, &UpdateTask.Status)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(UpdateTask)
}
