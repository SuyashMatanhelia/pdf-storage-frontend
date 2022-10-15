<?php 
    
    $search = $_POST['search'];

    $url = 'http://localhost:4000/retrieve?category=';
    $curl = curl_init($url.$search);
    $response = curl_exec($curl);
    curl_close($curl);

    $result = json_decode($response, true);
    echo $result;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search</title>
</head>
<body>
    <h1>Here are the papers you are looking for ;)</h1>
    <br><br>
    <table>
        
    </table>
</body>
</html>