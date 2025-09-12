<?php

header('Content-Type: application/json');
include 'dbconnect.php';

$latest = isset($_GET['latest']);
$query = $latest
  ? "SELECT notify AS message, timestamp FROM logs ORDER BY timestamp DESC LIMIT 10"
  : "SELECT notify AS message, timestamp FROM logs ORDER BY timestamp DESC";

$result = $conn->query($query);
$notifications = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $notifications[] = $row;
    }
}
echo json_encode($notifications);
?>