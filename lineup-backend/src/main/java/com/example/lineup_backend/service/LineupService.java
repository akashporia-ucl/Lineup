package com.example.lineup_backend.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lineup_backend.model.ToDoItem;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class LineupService {

    @Autowired
    private final Firestore firestore;

    public LineupService(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<ToDoItem> getAllToDo(String userId) throws InterruptedException, ExecutionException {
        DocumentReference userDocRef = firestore.collection("users").document(userId);
        CollectionReference toDos = userDocRef.collection("toDos");
        return toDos.get().get().getDocuments().stream()
                .map(item -> {
                    ToDoItem toDoItem = new ToDoItem(
                            item.getId(),
                            item.getString("Title"),
                            item.getString("Content"));
                    return toDoItem;
                })
                .collect(Collectors.toList());
    }

    public ToDoItem addToDoItem(String userId, String toDoId, String title, String description) {
        ToDoItem toDoItem = new ToDoItem(toDoId, title, description);
        DocumentReference userDocRef = firestore.collection("users").document(userId);
        CollectionReference toDos = userDocRef.collection("toDos");
        DocumentReference toDoRef = toDos.document(toDoId);
        Map<String, Object> data = new java.util.HashMap<>();
        data.put("Title", title);
        data.put("Content", description);
        toDoRef.set(data);
        return toDoItem;
    }

    public void deleteToDoItem(String userId, String toDoId) {
        DocumentReference userDocRef = firestore.collection("users").document(userId);
        CollectionReference toDos = userDocRef.collection("toDos");
        DocumentReference toDoRef = toDos.document(toDoId);
        log.info("Deleting to do item: {}", toDoId);
        toDoRef.delete();
    }

}
