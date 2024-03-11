package com.tadanoluka.project2.specifications;

import com.tadanoluka.project2.entity.Post;
import org.springframework.data.jpa.domain.Specification;

public class PostSpecifications {

    public static Specification<Post> getAllPublishedPosts() {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get("isPublished").as(Boolean.class)));
    }
}
