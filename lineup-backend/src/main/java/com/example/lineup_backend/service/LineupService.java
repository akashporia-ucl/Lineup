package com.example.lineup_backend.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.lineup_backend.model.ToDoItem;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;

@Service
public class LineupService {

    @Autowired
    private final Firestore firestore;

    public LineupService(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<ToDoItem> getAllToDo() throws InterruptedException, ExecutionException {
        return firestore.collection("items").get().get().getDocuments().stream()
                .map(item -> {
                    ToDoItem toDoItem = new ToDoItem(
                            item.getId(),
                            item.getString("Title"),
                            item.getString("Content"));
                    return toDoItem;
                })
                .collect(Collectors.toList());
    }

    public ToDoItem addToDoItem(String id, String title, String description) {
        ToDoItem toDoItem = new ToDoItem(id, title, description);
        DocumentReference docRef = firestore.collection("items").document(id);
        Map<String, Object> data = new java.util.HashMap<>();
        data.put("Title", title);
        data.put("Content", description);
        docRef.set(data);
        return toDoItem;
    }

    public void deleteToDoItem(String id) {
        firestore.collection("items").document(id).delete();
    }

}
