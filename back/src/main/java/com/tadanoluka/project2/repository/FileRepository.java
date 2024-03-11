package com.tadanoluka.project2.repository;

import com.tadanoluka.project2.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
