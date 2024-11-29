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
// include_once "db.php";
include_once "./sendmail/send_password_reset_code.php";

// Get input from request body
$input = json_decode(file_get_contents("php://input"), true);

// Check if both email and phone are provided
if (!isset($input['email']) || !isset($input['phone'])) {
    http_response_code(400);
    echo json_encode(["message" => "Email and phone are required."]);
    exit;
}

$email = $input['email'];
$phone = $input['phone'];

try {


    // Prepare SQL query
    $stmt = $conn->prepare("SELECT * FROM company_users WHERE company_email = ? AND company_phone = ?");
    $stmt->bind_param("ss", $email, $phone);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Match found
        sendVerificationCode($email,$conn);
        http_response_code(200);
        echo json_encode(["message" => "Email and phone number match.",
    "email"=>"$email", "status" => true]);
        
    } else {
        // No match found
        http_response_code(404);
        echo json_encode(["message" => "No match found for the given email and phone number.", "status" => false]);
    }

    // Close connections
    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
}
?>
