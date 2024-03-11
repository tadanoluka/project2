package com.tadanoluka.project2.service;

import com.tadanoluka.project2.dto.FileDTO;
import com.tadanoluka.project2.dto.PostDTO;
import com.tadanoluka.project2.entity.File;

import java.util.List;

public interface FileService {
    void addFile(File newFile);

    List<FileDTO> getAllFilesList();

    List<FileDTO> getAllPublicFilesList();
}
