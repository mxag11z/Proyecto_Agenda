package com.max.agenda.service;

import com.max.agenda.model.Activity;
import com.max.agenda.model.Status;
import com.max.agenda.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getAllByUser(Long userId) {
        System.out.println(userId);
        return activityRepository.findByUserId(userId);
    }

    public Activity create(Activity activity) {
        if (activity.getEstatus() == null)
            activity.setEstatus(Status.PENDIENTE);
        return activityRepository.save(activity);
    }

    public Activity update(Long id, Activity updated) {
        Activity existing = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Actividad no encontrada"));

        existing.setNombre(updated.getNombre());
        existing.setFecha(updated.getFecha());
        existing.setHoraInicio(updated.getHoraInicio());
        existing.setHoraFin(updated.getHoraFin());
        existing.setComentarios(updated.getComentarios());
        existing.setEstatus(updated.getEstatus());

        return activityRepository.save(existing);
    }

    public void delete(Long id) {
        activityRepository.deleteById(id);
    }
}
