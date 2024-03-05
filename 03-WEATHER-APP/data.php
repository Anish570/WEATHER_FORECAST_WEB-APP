<?php
include('connect.php');

if (isset($_GET['city']) && !empty($_GET['city'])) {
    $city = $_GET['city'];
} else {
    $city = "Orai";
}

$url = "https://api.openweathermap.org/data/2.5/weather?q=" . $city ."&appid=d5d7580d4a49d2cfef1e1c61359ad0a8&units=metric";

$response = file_get_contents($url);

// Check if data retrieval was successful
if ($response === FALSE) {
    http_response_code(404);
    echo json_encode(['error' => true, 'message' => 'City Not found']);
    header('Content-Type: application/json');
    exit; // Stop further execution
}

$data = json_decode($response, true);
$cityName = $data['name'];
$country = $data['sys']['country'];
$temperature = $data['main']['temp'];
$pressure = $data['main']['pressure'];
$humidity = $data['main']['humidity'];
$speed = $data['wind']['speed'];
$weatherIcon = $data['weather'][0]['icon'];
$description =$data['weather'][0]['description'];
$weather_when = date('Y-m-d H:i:s');
$day_of_week = date('l', strtotime($weather_when));

$selectData = "SELECT * FROM weather WHERE city='$cityName' AND day_of_week='$day_of_week'";
$result = mysqli_query($conn, $selectData);
if (mysqli_num_rows($result) > 0) {
    $update = "UPDATE weather SET 
    temp=$temperature,
    pressure=$pressure,
    humidity=$humidity,
    weather_description='$description', 
    weather_icon='$weatherIcon',
    speed=$speed,
     weather_when='$weather_when'
    WHERE city='$cityName' AND day_of_week='$day_of_week'";
    if (mysqli_query($conn, $update)) {
        //   echo "Data updated";
    } else {
        // echo "Failed to update data" . mysqli_error($conn);
    }
} else {
    $insertData = "INSERT INTO weather(city,country, temp, pressure, humidity, speed, weather_icon, day_of_week, weather_description, weather_when) 
    VALUES('$cityName','$country',$temperature,$pressure,$humidity,$speed,'$weatherIcon','$day_of_week','$description','$weather_when')";
    if (mysqli_query($conn, $insertData)) {
        //  echo "Data inserted";
    } else {
        // echo "Failed to insert data" . mysqli_error($conn);
    }
}

$selectAllData = "SELECT * FROM weather WHERE city='$cityName'";
$result = mysqli_query($conn, $selectAllData);
if (mysqli_num_rows($result) > 0) {
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    $json_data = json_encode($rows); //Convert associative array to JSON format
    header('Content-Type: application/json');
    echo $json_data;
} else {
    http_response_code(404);
    echo json_encode(['error' => true, 'message' => 'City Not found']);
    header('Content-Type: application/json');
}
?>
