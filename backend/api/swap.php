<?php
require __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $items = [
    ['id'=>1,'user_id'=>1,'title'=>'Reusable Bottle','description'=>'500ml, like new','category'=>'home','status'=>'active'],
    ['id'=>2,'user_id'=>2,'title'=>'Old Textbooks','description'=>'CS101, CS102','category'=>'books','status'=>'active'],
  ];
  json_out($items);
}

if ($method === 'POST') {
  $payload = json_decode(file_get_contents('php://input'), true) ?? [];
  json_out(['ok'=>true,'id'=>rand(100,999),'title'=>$payload['title'] ?? 'Untitled','category'=>$payload['category'] ?? 'other']);
}
