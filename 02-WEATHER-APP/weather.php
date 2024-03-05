<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Previous Week Data</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;800&family=Montserrat:wght@200&display=swap'); /* Google Fonts */

        body {
            background-color: #F5F5DC;
            color: #00468B;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items:center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            position: relative;
        }
        #backbtn{
            margin-top: 5px;
            position: absolute;
            right: 5px;
            border: none;
            border-radius: 5px;
            font-size: 23px;
            background-color: green;
            align-items: flex-end;

        }
        h1 {
            margin-top: 0;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            text-align: left;
            padding: 8px;
            background-color: #87CEFA;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        th {
            background-color: #00468B;
            color: white;
        }

        .weather-app {
            background-color:#00468B;
            border: antiquewhite;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 50px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 24px;
            margin-top: -10rem;
        }

        form button[type="submit"] {
            background-color: #00468B;
            border: none;
            color: white;
            padding: 10px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 12px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <button class="weather-app" onclick="location.href='index.html'" >Weather Mastery</button>
        <h1>7 days Weather Data</h1>
        <table id="weather-data-table">
            <tr>
                <th>Day</th>
                <th>City Name</th>
                <th>Temperature (°C)</th>
                <th>Pressure (hPa)</th>
                <th>Wind (km/h)</th>
                <th>Humidity (%)</th>
                <th>Description</th>
            </tr>

            <?php
             include("db_config.php");
            $city = isset($_GET['city']) ? $_GET['city'] : "Allahabad";
            error_reporting(E_ALL);
            ini_set('display_errors', 1);
           
            $sql = "SELECT * FROM weather_data WHERE city='" . $city . "' ORDER BY date DESC LIMIT 7";
            $result = mysqli_query($conn, $sql);

            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>";
                    echo "<td>" . $row['day_of_week'] . "</td>";
                    echo "<td>" . $row['city'] . "</td>";
                    echo "<td>" . $row['temperature'] . " °C</td>"; // Adding °C for temperature
                    echo "<td>" . $row['pressure'] . " hPa</td>"; // Adding hPa for pressure
                    echo "<td>" . $row['wind_speed'] . "</td>"; // Assuming wind speed is in appropriate units already
                    echo "<td>" . $row['humidity'] . "%</td>"; // Adding % for humidity
                    echo "<td>" . $row['description'] . "</td>";
                    echo "</tr>";
                }
            }
            else {
                echo "No weather data found for " . $city;
            }

            mysqli_close($conn);
            ?>
        </table>
        <a href="index.html">
             <button id="backbtn"> Back </button>
         </a>
    </div>
</body>

</body>

</html>