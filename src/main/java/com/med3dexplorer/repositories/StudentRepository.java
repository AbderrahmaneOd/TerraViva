package com.med3dexplorer.repositories;

import com.med3dexplorer.models.Favourite;
import com.med3dexplorer.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
