<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    
        date_default_timezone_set('Asia/Kuala_Lumpur');//set timezone to Malaysia timezone
        //echo date('H:i:s');
        if(date('H:i:s') == "00:00:00"){ //update at 12:00am
            file_put_contents("data/cases_state.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv"));
            file_put_contents("data/deaths_state.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/deaths_state.csv"));
            file_put_contents("data/hospital.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/hospital.csv"));
            file_put_contents("data/vax_state.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/vaccination/vax_state.csv"));
            file_put_contents("data/vax_malaysia.csv",file_get_contents("https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/vaccination/vax_malaysia.csv"));
        } 
        
        // $filename = basename($case_state_url);
        // if (file_put_contents($filename,file_get_contents($case_state_url))){
        //     echo 'File downloaded';
        //     $zip = new ZipArchive;
  
        //     // Zip File Name
        //     if ($zip->open('main.zip') === TRUE) {
        //         echo getcwd();
        //         // Unzip Path
        //         $zip->extractTo(getcwd(),"main/");
        //         $zip->close();
        //         echo 'Unzipped Process Successful!';
        //     } else {
        //         echo 'Unzipped Process failed';
        //     }
        // }else{
        //     echo 'failed';
        // }

?>
</body>

</html>