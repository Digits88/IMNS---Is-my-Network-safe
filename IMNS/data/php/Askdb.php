<?php
    $server = "127.0.0.1";
    $user = "root";
    $password = "samurai19!";
    $db = "networkdata";


    /* QUERY STATEMANDS */
    $querySelectdb = "use ".$db;

    $conn = new mysqli($server, $user, $password);

    $conncheck = $conn->query($querySelectdb);

    function GetDatabaseData($querySelectData){
        global $conn;

        $resultQuery = $conn->query($querySelectData);

        if ($resultQuery->num_rows > 0) {
            while($rowOutput = $resultQuery->fetch_assoc()) {
                echo json_encode(array(
                                    'essid'=>$rowOutput["ESSID"],
                                    'manuf'=>$rowOutput["Manuf"],
                                    'encryption'=>$rowOutput["Encryption"],
                                    'GPSBestLAT'=>$rowOutput["GPSBestLAT"],
                                    'GPSBestLon'=>$rowOutput["GPSBestLon"]
                ));
            }
        } else {
            echo "Zero results";
        }
    }

    if(isset($_REQUEST['masha'])){
        $requestData = $_REQUEST['masha'];
        $querySelectData = "select NetType, ESSID, Manuf, Encryption, GPSBestLAT, GPSBestLon from wireless where ESSID = '".$requestData."';";
        GetDatabaseData($querySelectData);
    }

    /*
    if ($conn->close() === True){
        echo '<br />'.'Connection successfully closed';
    }
    */
?>
