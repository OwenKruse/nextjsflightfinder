<?php
$url = 'https://api.duffel.com/air/offer_requests'; // URL to your server
$from = $_GET['from'];
$to = $_GET['to'];
// format from to only be the string inside if the ()
$from = substr($from, strpos($from, "(") + 1);
$from = substr($from, 0, strpos($from, ")"));
$to = substr($to, strpos($to, "(") + 1);
$to = substr($to, 0, strpos($to, ")"));
function getData($url, $fp, $to, $from): string


{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        // Get a default flight from duffel API
        'Accept: application/json',
        "Content-Type: application/json",
        "Duffel-Version: v1",
        "Authorization: Bearer duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY",

    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, '{

  "data": {

    "slices": [

      {

        "origin": "' . $from . '",

        "destination": "' . $to . '",


        "departure_date": "2023-03-24",

        "arrival_time": {

        }

      }

    ],

    "passengers": [

      {
          
            "fare_type": "frequent_flyer"
        
      }

    ],

    "max_connections": 0,

    "cabin_class": "economy"

  }

}');

    $data = curl_exec($ch);

    curl_close($ch);

    //write to file
    fwrite($fp, $data);
    return $data;
}

$fp = fopen('/Users/owenkruse/WebstormProjects/nextjsflightfinder/pages/search/test2.json', 'w');
getData($url, $fp, $to, $from);
// Output the from and to variables to the label text field on the page by id
header("Location: http://localhost:63342/nextjsflightfinder/pages/search/index.js");
//http://localhost:63342/nextjsflightfinder/backend/action_page.php?_ijt=nfd70kc689t13pd5qqrd938h24&_ij_reload=RELOAD_ON_SAVE
//http://localhost:63342/nextjsflightfinder/pages/search/index.js
echo "<script>document.getElementById('from').label = '$from';</script>";
echo "test";


