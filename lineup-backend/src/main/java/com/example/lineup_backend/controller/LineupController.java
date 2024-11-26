package com.example.lineup_backend.controller;

import java.util.concurrent.ExecutionException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lineup_backend.service.LineupService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.lineup_backend.model.ToDoItem;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class LineupController {

    @Autowired
    private final LineupService lineupService;

    public LineupController(LineupService lineupService) {
        this.lineupService = lineupService;
    }

    @GetMapping("/")
    public ResponseEntity<List<ToDoItem>> getList() throws InterruptedException, ExecutionException {
        return ResponseEntity.status(200).body(lineupService.getAllToDo());
    }

    @PostMapping("/")
    public ResponseEntity<ToDoItem> putToDo(@RequestParam String id, @RequestParam String title,
            @RequestParam String description) {
        ToDoItem toDoItem = lineupService.addToDoItem(id, title, description);
        return ResponseEntity.status(201).body(toDoItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable String id) {
        lineupService.deleteToDoItem(id);
        return ResponseEntity.status(204).body("Item deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDoItem> putMethodName(@PathVariable String id, @RequestBody ToDoItem item) {
        ToDoItem updatedItem = lineupService.addToDoItem(id, item.getTitle(), item.getDescription());
        return ResponseEntity.status(200).body(updatedItem);
    }

}
