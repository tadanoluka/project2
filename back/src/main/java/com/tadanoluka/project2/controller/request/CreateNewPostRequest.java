package com.tadanoluka.project2.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateNewPostRequest {
    private MultipartFile image;
    @NotBlank(message = "Необходимо указать заголовок поста")
    private String title;
    @NotBlank(message = "Необходимо указать содержимое поста")
    private String content;
}
