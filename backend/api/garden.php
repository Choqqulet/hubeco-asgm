<?php
require __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $gardens = [
    ['id'=>1,'name'=>'Rooftop Garden','location'=>'Block A Roof','total_plots'=>12,'taken_plots'=>8],
    ['id'=>2,'name'=>'Courtyard Beds','location'=>'Between Block B/C','total_plots'=>6,'taken_plots'=>6],
  ];
  json_out($gardens);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $payload = json_decode(file_get_contents('php://input'), true) ?? [];
  // TODO: write to DB; demo echo
  json_out(['ok'=>true,'action'=>$payload['action'] ?? 'join','garden_id'=>$payload['garden_id'] ?? null]);
}
