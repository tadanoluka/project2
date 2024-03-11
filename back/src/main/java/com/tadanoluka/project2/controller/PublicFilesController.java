package com.tadanoluka.project2.controller;

import com.tadanoluka.project2.controller.request.AddNewFileRequest;
import com.tadanoluka.project2.dto.FileDTO;
import com.tadanoluka.project2.entity.File;
import com.tadanoluka.project2.service.FileService;
import com.tadanoluka.project2.storage.StorageEmptyFileException;
import com.tadanoluka.project2.storage.StorageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("api/v1/files")
public class PublicFilesController {

    private final StorageService storageService;
    private final FileService fileService;

    @Autowired
    public PublicFilesController(StorageService storageService, FileService fileService) {
        this.storageService = storageService;
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<?> getAllFilesList() {
        List<FileDTO> files = fileService.getAllPublicFilesList();
        if (files == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(files);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addFile(AddNewFileRequest addNewFileRequest) {
        try {
            String filename = storageService.store(addNewFileRequest.getFile());
            Path fullFilepath = storageService.load(filename);

            if (fullFilepath.toFile().exists()) {
                // save
                File newFile = new File(fullFilepath.toString().replace(filename, ""), filename);
                fileService.addFile(newFile);

                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .build();
            }
        } catch (StorageEmptyFileException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .build();
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = storageService.loadAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
//            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
