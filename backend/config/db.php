<?php
function db() {
  static $pdo;
  if ($pdo) return $pdo;
  $envPath = __DIR__ . '/env.php';
  $env = file_exists($envPath) ? require $envPath : require __DIR__ . '/env.example.php';
  $dsn = "mysql:host={$env['db_host']};dbname={$env['db_name']};charset={$env['db_charset']}";
  $pdo = new PDO($dsn, $env['db_user'], $env['db_pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  ]);
  return $pdo;
}
function json_out($data, $code=200){
  http_response_code($code);
  header('Content-Type: application/json');
  echo json_encode($data);
  exit;
}
