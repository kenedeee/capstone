<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
session_unset();
session_destroy();

echo json_encode(["success" => true]);
exit();