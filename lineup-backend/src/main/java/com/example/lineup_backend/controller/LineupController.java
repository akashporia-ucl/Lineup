package com.example.lineup_backend.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lineup_backend.model.ToDoItem;
import com.example.lineup_backend.service.LineupService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
@Log4j2
public class LineupController {

    @Autowired
    private final LineupService lineupService;

    public LineupController(LineupService lineupService) {
        this.lineupService = lineupService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ToDoItem>> getList(@PathVariable String userId)
            throws InterruptedException, ExecutionException {
        log.info("Getting all to do items for user: " + userId);
        List<ToDoItem> toDoList = lineupService.getAllToDo(userId);
        return ResponseEntity.status(200).body(toDoList);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<ToDoItem> putToDo(@PathVariable String userId, @RequestParam String toDoId,
            @RequestParam String title,
            @RequestParam String description) {
        log.info("Adding to do item for user: {} with toDoId: {}, title: {}, description: {}", userId, toDoId, title,
                description);
        ToDoItem toDoItem = lineupService.addToDoItem(userId, toDoId, title, description);
        log.info("Added to do item: {}", toDoItem);
        return ResponseEntity.status(201).body(toDoItem);
    }

    @DeleteMapping("/{userId}/{toDoId}")
    public ResponseEntity<String> deleteToDo(@PathVariable String userId, @PathVariable String toDoId) {
        lineupService.deleteToDoItem(userId, toDoId);
        return ResponseEntity.status(204).body("Item deleted");
    }

    @PutMapping("/{userId}/{toDoId}")
    public ResponseEntity<ToDoItem> putMethodName(@PathVariable String userId, @PathVariable String toDoId,
            @RequestBody ToDoItem item) {
        ToDoItem updatedItem = lineupService.addToDoItem(userId, toDoId, item.getTitle(), item.getDescription());
        return ResponseEntity.status(200).body(updatedItem);
    }

}
