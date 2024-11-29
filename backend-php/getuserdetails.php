<?php
// Enable CORS (optional, adjust for your use case)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
 include_once "db.php";


// Get the user ID from the request
$userId = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing user ID."]);
    exit();
}

// Prepare and execute the SQL query
$sql = "select * FROM company_users WHERE company_user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

// Check if a user is found
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user);
} else {
    http_response_code(404);
    echo json_encode(["error" => "User not found."]);
}

// Close the database connection
$stmt->close();
$conn->close();
?>
