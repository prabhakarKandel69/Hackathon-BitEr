<?php


// Example email to verify
$email = $_POST['Gmail'];

// Hunter.io API Key
$api_key = '4996637fed06d7a1f125d92a1f4591c39b4d3ba1';  // Replace with your API key

// Hunter.io API URL
$api_url = "https://api.hunter.io/v2/email-verifier?email=$email&api_key=$api_key";

// cURL request to Hunter.io API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
curl_close($ch);

// Decode the response
$response_data = json_decode($response, true);


?>
