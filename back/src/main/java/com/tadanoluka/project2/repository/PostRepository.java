package com.tadanoluka.project2.repository;

import com.tadanoluka.project2.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    @Query(value = "INSERT INTO posts (title, content) VALUES (:postTitle,:postContent) RETURNING id", nativeQuery = true)
    long savePost(@Param("postTitle") String postTitle, @Param("postContent") String postContent);

    Optional<Post> getPostById(long id);
}
