<?php
require __DIR__ . '/../config/db.php';

$materials = isset($_GET['materials']) ? explode(',', $_GET['materials']) : [];
$acceptAll = empty($materials);

$data = [
  ['id'=>1,'name'=>'Block A Recycling Point','address'=>'Near Cafeteria','materials'=>['paper','plastic','metal']],
  ['id'=>2,'name'=>'Library E-Waste Box','address'=>'Library Ground Floor','materials'=>['ewaste']],
  ['id'=>3,'name'=>'Hostel Bin','address'=>'Dorm Entrance','materials'=>['paper','plastic','glass']],
];

if (!$acceptAll) {
  $data = array_values(array_filter($data, function($p) use ($materials){
    return count(array_intersect($p['materials'], $materials)) > 0;
  }));
}

json_out($data);
