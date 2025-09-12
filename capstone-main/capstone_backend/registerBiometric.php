<?php
<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? '';
$credential = $data['credential'] ?? null;

if (!$username || !$credential) {
    echo json_encode(['isApproved' => false, 'error' => 'Missing data']);
    exit;
}

// Connect DB
$conn = new mysqli("localhost", "root", "", "smartdb");
if ($conn->connect_error) {
    echo json_encode(['isApproved' => false, 'error' => 'DB connection failed']);
    exit;
}

// Check if user is approved
$stmt = $conn->prepare("SELECT is_approved FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($isApproved);

if ($stmt->fetch() && $isApproved) {
    $stmt->close();

    // Save credential to DB for this user
    $credJson = json_encode($credential);
    $stmt2 = $conn->prepare("UPDATE users SET credential=? WHERE username=?");
    $stmt2->bind_param("ss", $credJson, $username);
    $stmt2->execute();
    $stmt2->close();

    echo json_encode(['isApproved' => true]);
} else {
    $stmt->close();
    echo json_encode(['isApproved' => false]);