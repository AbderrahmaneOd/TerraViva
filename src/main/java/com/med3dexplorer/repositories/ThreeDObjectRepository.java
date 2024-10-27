package com.med3dexplorer.repositories;

import com.med3dexplorer.models.ThreeDObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThreeDObjectRepository extends JpaRepository<ThreeDObject, Long> {
    Optional<ThreeDObject> findByName(String name);
}
