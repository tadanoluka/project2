package com.tadanoluka.project2.dto;

import com.tadanoluka.project2.entity.File;
import lombok.Data;

@Data
public class FileDTO {
    private long id;
    private String path;
    private String filename;

    public FileDTO(File file) {
        this.id = file.getId();
        this.path = file.getPath();
        this.filename = file.getFilename();
    }
}
