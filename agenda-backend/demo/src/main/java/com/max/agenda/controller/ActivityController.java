package com.max.agenda.controller;

import com.max.agenda.model.Activity;
import com.max.agenda.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin

public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Activity>> getAll(@PathVariable Long userId) {
        return ResponseEntity.ok(activityService.getAllByUser(userId));
    }

    @PostMapping
    public ResponseEntity<Activity> create(@RequestBody Activity activity) {
        return ResponseEntity.ok(activityService.create(activity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> update(@PathVariable Long id, @RequestBody Activity updated) {
        return ResponseEntity.ok(activityService.update(id, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        activityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
