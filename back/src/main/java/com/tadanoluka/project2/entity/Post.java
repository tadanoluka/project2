package com.tadanoluka.project2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "created_at")
    private OffsetDateTime createdAt;
    @Column(name = "is_published")
    private boolean isPublished;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "preview_image_file_id")
    private File previewImage;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String content;

    public Post(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
