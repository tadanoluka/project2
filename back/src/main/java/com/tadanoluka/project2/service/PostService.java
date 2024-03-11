package com.tadanoluka.project2.service;

import com.tadanoluka.project2.dto.PostDTO;
import com.tadanoluka.project2.entity.Post;

import java.util.List;

public interface PostService {
    long addPost(Post post);

    List<PostDTO> getAllPosts();
    PostDTO getPostById(long id);

    void updatePostById(Post post, long id);

    List<PostDTO> getAllPublishedPosts();
}
