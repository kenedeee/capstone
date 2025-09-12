<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
include 'dbconnect.php';

$result = $conn->query("SELECT username, is_approved FROM users ORDER BY timestamp DESC");
$users = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}
echo json_encode($users);
?>