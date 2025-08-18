<?php
require __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $tips = [
    ['id'=>1,'title'=>'Switch to LED bulbs','body'=>'LEDs use ~75% less energy than incandescent.'],
    ['id'=>2,'title'=>'Set AC to 24–26°C','body'=>'Each +1°C can save 3–5% energy.'],
    ['id'=>3,'title'=>'Unplug idle chargers','body'=>'Phantom loads add up over time.'],
  ];
  json_out($tips);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // TODO: insert to DB, for now echo back
  $payload = json_decode(file_get_contents('php://input'), true) ?? [];
  json_out(['ok'=>true,'received'=>$payload]);
}
