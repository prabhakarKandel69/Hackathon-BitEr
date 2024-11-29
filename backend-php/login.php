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

// Include database connection
include_once "db.php";

// Ensure the database connection is valid
if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed.']);
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Extract email and password from the input
    $email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $password = $input['password'] ?? null;

    // Validate required fields
    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required.']); 
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format.']);
        exit;
    }

    // Query the database to get the hashed password
    $query = "SELECT company_user_id, password FROM company_users WHERE company_email = ?";
    $stmt = $conn->prepare($query);
    if ($stmt) {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($userId, $hashedPassword);
            $stmt->fetch();

            // Verify the password
            if (password_verify($password, $hashedPassword)) {
                http_response_code(200);
                echo json_encode([
                    'success' => 'Login successful.',
                    'id' => $userId,
                    'email' => $email
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid credentials.']);
            }
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid password or email.']);
        }
        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Database query preparation failed.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method.']);
}

// Close the database connection
$conn->close();
?>
