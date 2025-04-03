package com.example.clockee_server;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.lenient;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.example.clockee_server.config.ApplicationProperties;
import com.example.clockee_server.file.FileStorageServiceImpl;

/**
 * FileStorageServiceTest
 */
@ExtendWith(MockitoExtension.class)
public class FileStorageServiceTest {
  @Mock
  private ApplicationProperties applicationProperties;

  @InjectMocks
  private FileStorageServiceImpl fileStorageService;

  @Mock
  private MultipartFile multipartFile;

  @BeforeEach
  void setUp() {
    lenient().when(applicationProperties.getUploadPath()).thenReturn("target/test-uploads");
  }

  @Test
  void readFileFromLocation_success() throws IOException {
    // Arrange
    Path tempFile = Files.createTempFile("test", ".txt");
    byte[] expectedContent = "Hello, World!".getBytes();
    Files.write(tempFile, expectedContent);
    String fileUrl = tempFile.toString();

    // Act
    byte[] result = fileStorageService.readFileFromLocation(fileUrl);

    // Assert
    assertNotNull(result);
    assertArrayEquals(expectedContent, result);

    // Cleanup
    Files.deleteIfExists(tempFile);
  }

  @Test
  void readFileFromLocation_fail() {
  String invalidFileUrl = "nonexistent/file.txt";
  byte[] result = fileStorageService.readFileFromLocation(invalidFileUrl);
  assertNull(result);
  }

  // TODO: handle disk full when io
  // @Test
  // void saveFile_withoutRelativePath_ioException() throws IOException {
  // // Arrange
  // MockMultipartFile mockFile = new MockMultipartFile(
  // "file",
  // "test.txt",
  // "text/plain",
  // "Hello, World!".getBytes());
  // doThrow(new IOException("IO  error")).when(mockFile).transferTo(any(Path.class));

  // // Act
  // String filePath = fileStorageService.saveFile(mockFile);

  // // Assert
  // assertNull(filePath);
  // }

  @Test
  void saveFile_withRelativePath_success() throws IOException {
    // Arrange
    String relativePath = "subfolder";
    String originalFilename = "test.txt";
    byte[] content = "Hello, World!".getBytes();
    MockMultipartFile mockFile = new MockMultipartFile(
        "file",
        originalFilename,
        "text/plain",
        content);

    // Act
    String filePath = fileStorageService.saveFile(mockFile, relativePath);

    // Assert
    assertNotNull(filePath);
    Path savedFilePath = Paths.get(filePath);
    assertTrue(Files.exists(savedFilePath));
    byte[] savedContent = Files.readAllBytes(savedFilePath);
    assertArrayEquals(content, savedContent);
    assertTrue(filePath.contains(relativePath));

    // Cleanup
    Files.deleteIfExists(savedFilePath);
    Files.deleteIfExists(savedFilePath.getParent());
  }

}
