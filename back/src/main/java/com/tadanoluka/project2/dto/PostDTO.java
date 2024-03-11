package com.tadanoluka.project2.dto;

import com.tadanoluka.project2.entity.Post;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class PostDTO {
    private long id;
    private OffsetDateTime createdAt;
    private String title;
    private String content;

    public PostDTO(Post post) {
        this.id = post.getId();
        this.createdAt = post.getCreatedAt();
        this.title = post.getTitle();
        this.content = post.getContent();
    }
}
