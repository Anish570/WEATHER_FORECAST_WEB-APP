<?php 
$servername = "localhost";
$username = "root";
$password = "";
$database = "weather1";

$conn = mysqli_connect($servername, $username, $password, $database);
if ($conn) {
    // echo "Connect successfully";
} else {
    echo "Failed to connect" . mysqli_connect_error();
}

?>