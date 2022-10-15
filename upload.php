<?php

    if(isset($_POST['submit']) && $_FILES['fileToUpload']){
        
        $college = $_POST['college'];
        $course = $_POST['course'];
        $subject = $_POST['subject'];
        $semester = $_POST['semester'];
        $path = $_FILES['fileToUpload']['tmp_name'];
        $name = $_FILES['fileToUpload']['name'];

        $url = 'localhost:4000/upload';
        $curl = curl_init($url);

        $data = array('path' => $path, 'name' => $name, 'college' => $college, 'course' => $course, 'subject' => $subject, 'semester' => $semester);
        $payload = json_encode(array("file" => $data));

        curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($curl);
        curl_close($curl);

        echo $result;

    }
    else echo "fail";
?>