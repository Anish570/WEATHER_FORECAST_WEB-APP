<?php
include('db_config.php');
// Retrieve data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

$date = date("Y-m-d");
   
if ($data !== null) {
    // Extract individual data fields
    $city = $data['city'];
    $temp = $data['temp_c'];
    $wind_speed = $data['wind_kph'];
    $humidity = $data['humidity'];
    $weather_description = $data['description'];
    $country = $data['country'];
    $pressure = $data['pressure'];
    $icon = $data['icon'];
}
$day_of_week = date("l");
// Check if the data already exists based on the city name and day of the week
$sql_check = "SELECT * FROM weather_data WHERE city='" . $data['city'] . "' AND day_of_week='$day_of_week'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    // Data already exists, so update it
    $sql_update = "UPDATE weather_data SET 
    date = '$date',
    temperature = $temp,
    wind_speed = $wind_speed,
    humidity = $humidity,
    description = '$weather_description',
    pressure = $pressure,
    icon = '$icon',
    country = '$country'
    WHERE city = '$city' AND day_of_week = '$day_of_week' ";

    
    if ($conn->query($sql_update) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Data updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
} else {
    // Data does not exist, so insert it
    $sql_insert = "INSERT INTO weather_data (date, day_of_week, city, country, temperature, wind_speed, humidity, description, pressure, icon)
    VALUES ('$date', '$day_of_week', '$city', '$country', $temp, $wind_speed, $humidity, '$weather_description', $pressure, '$icon')";
    
    if ($conn->query($sql_insert) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}

$conn->close();
?>
