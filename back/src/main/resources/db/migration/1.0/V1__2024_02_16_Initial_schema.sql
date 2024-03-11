--date: 2024-02-16
--author: tadanoluka


DROP TABLE IF EXISTS feedback_messages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS files;

CREATE TABLE feedback_messages
(
    id        BIGSERIAL PRIMARY KEY,
    title     TEXT,
    text      TEXT    NOT NULL,
    is_unread BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE users
(
    id         BIGSERIAL PRIMARY KEY,
    login      VARCHAR(64)  NOT NULL UNIQUE,
    password   VARCHAR(256) NOT NULL,
    first_name VARCHAR(64),
    last_name  VARCHAR(64)
);

CREATE TABLE access_types
(
    id   SERIAL PRIMARY KEY,
    name varchar(64) NOT NULL
);

CREATE TABLE files
(
    id       BIGSERIAL PRIMARY KEY,
    path     TEXT NOT NULL,
    filename TEXT NOT NULL UNIQUE
);

CREATE TABLE post_images
(
    file_id BIGINT PRIMARY KEY REFERENCES files (id)
);

CREATE TABLE user_files
(
    file_id        BIGINT PRIMARY KEY REFERENCES files (id),
    uploaded_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    published_at   TIMESTAMP WITH TIME ZONE,
    access_type_id INTEGER                  NOT NULL REFERENCES access_types (id)
);

CREATE TABLE posts
(
    id                    BIGSERIAL PRIMARY KEY,
    created_at            TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    published_at          TIMESTAMP WITH TIME ZONE,
    is_published          BOOLEAN                  NOT NULL DEFAULT FALSE,
    preview_image_file_id BIGINT REFERENCES post_images (file_id),
    title                 TEXT                     NOT NULL,
    content               TEXT                     NOT NULL
);