package com.terraViva.controllers;

import com.terraViva.dto.ThreeDObjectDTO;
import com.terraViva.exceptions.ThreeDObjectNotFoundException;
import com.terraViva.models.Note;
import com.terraViva.models.ThreeDObject;
import com.terraViva.services.implementations.ThreeDObjectServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/threeDObjects")
@CrossOrigin("*")
public class ThreeDObjectController {

    private ThreeDObjectServiceImpl threeDObjectService;

    public  ThreeDObjectController( ThreeDObjectServiceImpl  threeDObjectService) {
        this. threeDObjectService =  threeDObjectService;
    }


    @PostMapping
    public ResponseEntity<ThreeDObjectDTO> saveProfessor(@RequestBody ThreeDObjectDTO threeDObjectDTO) {
        return ResponseEntity.ok(threeDObjectService.saveThreeDObject(threeDObjectDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThreeDObjectDTO> getThreeDObjectById(@PathVariable Long id){
        return ResponseEntity.ok(threeDObjectService.getThreeDObjectById(id));
    }

    @GetMapping
    public ResponseEntity<List<ThreeDObjectDTO>> getAllThreeDObjects() {
        return ResponseEntity.ok(threeDObjectService.getAllThreeDObjects());
    }

    @GetMapping("/prof/{profId}")
    public ResponseEntity<List<ThreeDObjectDTO>> getThreeDObjectByProfessorId(@PathVariable Long profId) {
        try {
            List<ThreeDObjectDTO> threeDObjects = threeDObjectService.getThreeDObjectByProfessorId(profId);
            return ResponseEntity.ok(threeDObjects);
        } catch (ThreeDObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    @GetMapping("/count-by/{professorId}")
    public Long getThreeDObjectCountByProfessor(@PathVariable Long professorId) {
        return threeDObjectService.getThreeDObjectCountByProfessor(professorId);
    }

    @GetMapping("/{professorId}/by-categories")
    public List<Object[]> getProfessorsByCategory(@PathVariable Long professorId) {
        return threeDObjectService.getThreeDObjectByProfessorSubCategories(professorId);
    }

    @GetMapping("/by-category/{categoryId}")
    public List<ThreeDObject> getThreeDObjectByCategory(@PathVariable Long categoryId) {
        return threeDObjectService.getThreeDObjectByCategory(categoryId);
    }

    @GetMapping("{threeDObjectId}/student/{studentId}/notes")
    public List<Note> getNotesByThreeDObjects(@PathVariable Long studentId, @PathVariable Long threeDObjectId) {
        return threeDObjectService.getNotesByThreeDObjects(studentId, threeDObjectId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ThreeDObjectDTO> updateThreeDObject(@PathVariable Long id, @RequestBody ThreeDObjectDTO threeDObjectDTO) {
        threeDObjectDTO.setId(id);
        ThreeDObjectDTO updatedThreeDObject = threeDObjectService.updateThreeDObject(threeDObjectDTO);
        return ResponseEntity.ok(updatedThreeDObject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteThreeDObject(@PathVariable Long id){
        threeDObjectService.deleteThreeDObject(id);
        return new ResponseEntity("ThreeDObject deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/last-five")
    public ResponseEntity<List<ThreeDObjectDTO>> getLastFiveThreeDObjects() {
        List<ThreeDObjectDTO> lastFiveThreeDObjects = threeDObjectService.getLastFiveThreeDObjects();
        return ResponseEntity.ok(lastFiveThreeDObjects);
    }
}
