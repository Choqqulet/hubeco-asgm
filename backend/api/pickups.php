<?php
require __DIR__ . '/../config/db.php';

$data = [
  ['id'=>1,'area'=>'Block A','day'=>'Wed','time_range'=>'7:00–9:00 PM'],
  ['id'=>2,'area'=>'Block B','day'=>'Thu','time_range'=>'7:00–9:00 PM'],
  ['id'=>3,'area'=>'Hostel','day'=>'Sat','time_range'=>'9:00–11:00 AM'],
];

json_out($data);
