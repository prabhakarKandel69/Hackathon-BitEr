<?php
header('Content-Type: application/json');

// Allow requests from specific origins for CORS
$allowedOrigins = ['http://localhost:3000'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Respond with an error if the origin is not allowed
    http_response_code(403);
    echo json_encode(['error' => 'CORS policy: Origin not allowed.']);
    exit;
}

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond to preflight request
    http_response_code(200);
    exit;
}

// Enable error reporting (Disable this in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection using mysqli
$servername = "localhost";
$username = "";
$password = "";
$dbname = "";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Define the upload directory
$uploadDir = __DIR__ . '/cv/';

// Ensure the directory exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Handle file upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['id'] ?? null;

    if (!$userId) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'User ID is required.']);
        exit;
    }
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        
        $file = $_FILES['file'];

        // Get file information
        $fileTmpPath = $file['tmp_name'];
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);

        // Generate new file name (e.g., cv1, cv2, etc.)
        $result = $conn->query("SELECT COUNT(*) AS fileCount FROM uploadfiles");
        $row = $result->fetch_assoc();
        $fileCount = $row['fileCount'];
        $newFileName = 'cv' . ($fileCount + 1) . '.' . $fileExtension;

        // Define the target file path
        $targetFilePath = $uploadDir . $newFileName;

        // Move the uploaded file to the upload directory
        if (move_uploaded_file($fileTmpPath, $targetFilePath)) {
            try {
                // Insert file details into the database
                $stmt = $conn->prepare("INSERT INTO uploadfiles (user_id, filename) VALUES (?, ?)");
                $stmt->bind_param("is", $userId, $newFileName);
                $stmt->execute();

                // Respond with success
                header('Content-Type: application/json');
                echo json_encode([
                    'status' => 'success',
                    'message' => 'File uploaded and saved to the database successfully!',
                    'fileName' => $newFileName,
                    'filePath' => $targetFilePath,
                ]);
            } catch (mysqli_sql_exception $e) {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to move the uploaded file.']);
        }
    } else {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE => 'The uploaded file exceeds the upload_max_filesize directive in php.ini.',
            UPLOAD_ERR_FORM_SIZE => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.',
            UPLOAD_ERR_PARTIAL => 'The uploaded file was only partially uploaded.',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing a temporary folder.',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk.',
            UPLOAD_ERR_EXTENSION => 'A PHP extension stopped the file upload.',
        ];

        $errorCode = $_FILES['file']['error'];
        $errorMessage = $errorMessages[$errorCode] ?? 'Unknown upload error.';

        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => $errorMessage]);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

// Close the database connection
$conn->close();
?>
