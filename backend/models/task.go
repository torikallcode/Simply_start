package models

type Task struct {
	ID        int    `json:"id"`
	Name_task string `json:"name_task"`
	From_time string `json:"from_time"`
	To_time   string `json:"to_time"`
}
