package com.tadanoluka.project2.service;

import com.tadanoluka.project2.dto.PostDTO;
import com.tadanoluka.project2.entity.Post;
import com.tadanoluka.project2.repository.PostRepository;
import com.tadanoluka.project2.specifications.PostSpecifications;
import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public long addPost(Post post) {
        return postRepository.savePost(post.getTitle(), post.getContent());
    }

    @Override
    @Transactional
    @Nullable
    public List<PostDTO> getAllPosts() {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        return postRepository.findAll(sort).stream().map(PostDTO::new).toList();
    }

    @Override
    @Transactional
    @Nullable
    public PostDTO getPostById(long id) {
        Optional<Post> post = postRepository.getPostById(id);
        return post.map(PostDTO::new).orElse(null);
    }

    @Override
    public void updatePostById(Post editedPost, long id) {
        Optional<Post> postOptional = postRepository.getPostById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setTitle(editedPost.getTitle());
            post.setContent(editedPost.getContent());
            postRepository.save(post);
        } else {
            throw new RuntimeException();
        }
    }

    @Override
    public List<PostDTO> getAllPublishedPosts() {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Specification<Post> specification = PostSpecifications.getAllPublishedPosts();
        return postRepository.findAll(specification, sort).stream().map(PostDTO::new).toList();
    }


}
