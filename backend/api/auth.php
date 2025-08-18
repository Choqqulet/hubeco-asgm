<?php
require __DIR__ . '/../config/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $payload = json_decode(file_get_contents('php://input'), true) ?? [];
  $email = $payload['email'] ?? '';
  $password = $payload['password'] ?? '';
  // Demo: accept any @apu.edu.my email
  if (preg_match('/@apu\.edu\.my$/', $email)) {
    $_SESSION['user'] = ['email'=>$email,'role'=> (str_contains($email,'admin') ? 'admin' : 'resident')];
    json_out(['ok'=>true,'role'=>$_SESSION['user']['role']]);
  } else {
    json_out(['ok'=>false], 401);
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  json_out(['user'=>$_SESSION['user'] ?? null]);
}
