<?php
header('Content-Type: application/json');

// Allow requests from specific origins for CORS
$allowedOrigins = ['http://localhost:3000', 'https://your-production-frontend.com'];
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

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include database connection
include_once "db.php";

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Extract sign-up data
    $firstName = $input['firstName'] ?? null;
    $lastName = $input['lastName'] ?? null;
    $companyName = $input['companyName'] ?? null;
    $companyPhone = $input['companyPhone'] ?? null;
    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;

    // Validate required fields
    if (!$firstName || !$lastName || !$companyName || !$email || !$companyPhone || !$password) {
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }

    // Hash the password using PASSWORD_BCRYPT (you can also use other algorithms like Argon2)
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Prepare and execute the SQL query
    $stmt = $conn->prepare(
        "INSERT INTO company_users (company_user_firstname, company_user_lastname, company_name, company_email, company_phone, password) 
         VALUES (?, ?, ?, ?, ?, ?)"
    );

    if (!$stmt) {
        echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
        exit;
    }

    // Bind parameters (we're binding the hashed password here)
    $stmt->bind_param('ssssss', $firstName, $lastName, $companyName, $email, $companyPhone, $hashedPassword);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(['success' => 'User signed up successfully.']);
    } else {
        echo json_encode(['error' => 'Failed to insert data: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}

// Close the database connection
$conn->close();
?>
