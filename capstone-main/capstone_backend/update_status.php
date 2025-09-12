<?php

// Database connection
$mysqli = new mysqli("192.168.137.1", "root", "oneinamillion", "smartdb");
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Get POST data
$username = isset($_POST['name']) ? $_POST['name'] : '';
$status = isset($_POST['status']) ? intval($_POST['status']) : 0;

if ($username !== '') {
    // Update user approval status
    $stmt = $mysqli->prepare("UPDATE users SET is_approved = ? WHERE username = ?");
    $stmt->bind_param("is", $status, $username);
    if ($stmt->execute()) {
        echo "Success";
    } else {
        echo "Failed";
    }
    $stmt->close();
} else {
    echo "Invalid request";
}

$mysqli->close();
?>