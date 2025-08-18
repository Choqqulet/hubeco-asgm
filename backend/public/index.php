<?php
// Health check and routing hint
header('Content-Type: application/json');
echo json_encode(['ok'=>true, 'service'=>'HubEco backend', 'ts'=>time()]);
