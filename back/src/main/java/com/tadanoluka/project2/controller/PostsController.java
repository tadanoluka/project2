package com.tadanoluka.project2.controller;

import com.tadanoluka.project2.controller.request.CreateNewPostRequest;
import com.tadanoluka.project2.dto.PostDTO;
import com.tadanoluka.project2.entity.Post;
import com.tadanoluka.project2.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/posts")
public class PostsController {
    private final PostService postService;

    @Autowired
    public PostsController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<?> getAllPublishedPosts() {
        List<PostDTO> posts = postService.getAllPublishedPosts();
        if (posts == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(posts);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable long postId) {
        PostDTO post = postService.getPostById(postId);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(post);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<?> patchPostById(@PathVariable long postId, @RequestBody Post post) {
        if (postId == post.getId()) {
            postService.updatePostById(post, postId);
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNewPost(@Valid @RequestBody CreateNewPostRequest createNewPostRequest) {
        System.out.println(createNewPostRequest.getTitle());
        Post post = new Post(createNewPostRequest.getTitle(), createNewPostRequest.getContent());
        long id = postService.addPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
}
