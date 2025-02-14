<?php
include 'db.php';

$query = "SELECT * FROM products";
$result = $conn->query($query);

$products = array();
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

header('Content-Type: application/json');
echo json_encode($products);
?>
