package com.tadanoluka.project2.service;

import com.tadanoluka.project2.dto.FileDTO;
import com.tadanoluka.project2.entity.File;
import com.tadanoluka.project2.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;

    @Autowired
    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }


    @Override
    public void addFile(File newFile) {
        fileRepository.save(newFile);
    }

    @Override
    public List<FileDTO> getAllFilesList() {
        return fileRepository.findAll().stream().map(FileDTO::new).toList();
    }

    @Override
    public List<FileDTO> getAllPublicFilesList() {
        return null;
    }
}
