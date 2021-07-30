<?php

    header('Access-Control-Allow-Origin: *');//CORS is a bitch...

    $order_id = htmlspecialchars($_GET["order_id"]);

    $url = 'https://api.playground.klarna.com/checkout/v3/orders/' . $order_id;

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    curl_setopt($ch, CURLOPT_HTTPGET, true);

    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Basic UEsxNDIyNV85NjJmODJmODY4NDI6czRZMDM2UktBRWhvREozWQ=='
    ));

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }

    curl_close ($ch);

    $response = json_decode($result, true);
    echo json_encode($response);

?>