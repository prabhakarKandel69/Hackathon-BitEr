<?php
// Autoload dependencies
require 'vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Database connection
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



use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendVerificationCode($gmail,$conn) {

    // Generate a 4-digit numeric code
    $verificationCode = mt_rand(1000, 9999);
    
    $stmt = $conn->prepare("INSERT INTO otp (email, otp) VALUES (?, ?)");
if ($stmt === false) {
    throw new Exception('Prepare statement failed: ' . $conn->error);
}

// Bind the parameters (gmail as string and verificationCode as integer)
$stmt->bind_param("si", $gmail, $verificationCode);

if (!$stmt->execute()) {
    throw new Exception('Could not store verification code in the database: ' . $stmt->error);
}
    

    // SMTP server configuration
    $mail = new PHPMailer(true);
    try {
        // SMTP server configuration
          
        $mail->isSMTP();
        $mail->Host = '';  // Use environment variables
        $mail->SMTPAuth = true;
        $mail->Username = '';  // Use environment variables
        $mail->Password ='';  // Use environment variables
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Set email sender and recipient
        $mail->setFrom('', 'Bit_Er');
        $mail->addAddress($gmail, 'Recipient');

        // Set email content
        $mail->isHTML(true);
        $mail->Subject = 'Verification Code';
        $mail->Body = 'Your verification code is: <b>' . $verificationCode . '</b>';

        // Send the email
        $mail->send();

        return $verificationCode;
    } catch (Exception $e) {
        // Handle errors
        throw new Exception('Mail could not be sent. Error: ' . $mail->ErrorInfo);
    }
}

?>
