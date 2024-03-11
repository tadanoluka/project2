package com.tadanoluka.project2.controller.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AddNewFileRequest {
    private MultipartFile file;
}
