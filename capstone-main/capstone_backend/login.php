<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Example credentials
$valid_username = "051123";
$valid_password = "admin11";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if ($username === $valid_username && $password === $valid_password) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Invalid credentials"]);
    }
    exit;
}
echo json_encode(["success" => false, "error" => "Invalid request"]);
?>