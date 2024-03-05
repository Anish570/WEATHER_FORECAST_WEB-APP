<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "weather1";

$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    http_response_code(500); // Internal Server Error
    exit(json_encode(['error' => true, 'message' => 'Failed to connect to database']));
}

$cityName = isset($_GET['cityname']) && !empty($_GET['cityname']) ? $_GET['cityname'] : "nepal";

$apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=72ca5d48b415850897dbcc076e3e7af2&q=';
$city = urlencode($cityName);

// Make the API request
$apiUrl = $apiEndpoint . $city;
$apiData = file_get_contents($apiUrl);

$data = json_decode($apiData, true);

if (!$data || isset($data['cod']) && $data['cod'] === '404') {
    http_response_code(404);
    exit(json_encode(['error' => true, 'message' => 'City Not found']));
}

$city = $data['name'];
$temperature = $data['main']['temp'];
$pressure = $data['main']['pressure'];
$humidity = $data['main']['humidity'];
$weather_description = $data['weather'][0]['description'];
$wind_speed = $data['wind']['speed'];
$country = $data['sys']['country'] ?? "N/A";
$icon = $data['weather'][0]['icon'];
date_default_timezone_set('Asia/Kathmandu');
$currentDate = date("Y-m-d H:i:s");
$currentDayOfWeek = date("l");

$existingData = "SELECT * FROM weatherData WHERE City='$city' AND Day_Of_Week='$currentDayOfWeek'";
$result = mysqli_query($conn, $existingData);

if (mysqli_num_rows($result) > 0) {
    // Data for the same city and day of the week already exists, perform an UPDATE
    $updateData = "UPDATE weatherData SET 
        Temperature=$temperature, 
        Pressure=$pressure, 
        Humidity=$humidity, 
        Weather_Description='$weather_description', 
        Wind_Speed=$wind_speed,
        Date_='$currentDate',
        Icon='$icon'
        WHERE City='$city' AND Day_Of_Week='$currentDayOfWeek'";

    if (!mysqli_query($conn, $updateData)) {
        http_response_code(500);
        exit(json_encode(['error' => true, 'message' => 'Failed to update data']));
    }
} else {
    // Data doesn't exist, perform an INSERT
    $insertData = "INSERT INTO weatherData (City, Temperature, Pressure, Humidity, Weather_Description, Wind_Speed, Date_, Day_Of_Week, Country, Icon)
                   VALUES ('$city', $temperature, $pressure, $humidity, '$weather_description', $wind_speed, '$currentDate', '$currentDayOfWeek', '$country', '$icon')";

    if (!mysqli_query($conn, $insertData)) {
        http_response_code(500);
        exit(json_encode(['error' => true, 'message' => 'Failed to insert data']));
    }
}

$selectAllData = "SELECT * FROM weatherData WHERE city='$city'";
$result = mysqli_query($conn, $selectAllData);
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    $json_data = json_encode($rows); // Convert associative array to JSON format
    header('Content-Type: application/json');
    echo $json_data;
} else {
    http_response_code(404);
    echo json_encode(['error' => true, 'message' => 'City Not found']);
}

mysqli_close($conn);
?>
