package com.med3dexplorer.exceptions;

import java.io.IOException;

public class FileNotFoundException extends IOException {
    public FileNotFoundException(String message) {
        super(message);
    }
}
