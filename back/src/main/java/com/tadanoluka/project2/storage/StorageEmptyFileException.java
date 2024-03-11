package com.tadanoluka.project2.storage;

public class StorageEmptyFileException extends StorageException{

    public StorageEmptyFileException(String message) {
        super(message);
    }

    public StorageEmptyFileException(String message, Throwable cause) {
        super(message, cause);
    }
}
