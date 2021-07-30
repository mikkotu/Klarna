<?php

    header('Access-Control-Allow-Origin: *');//CORS is a bitch...

    $data = array(
        "purchase_country" => "se",
        "purchase_currency" => "sek",
        "shipping_countries" => ["SE", "AT", "DE", "NL", "GB"],
        "locale" => "en-GB",
        "billing_address" => [
          "given_name" => "Testperson-se",
          "family_name" => "Approved",
          "email" => "youremail@email.com",
          "street_address" => "Stårgatan 1",
          "postal_code" => "12345",
          "city" => "Ankeborg",
          "phone" => "+46765260000",
          "country" => "se"
        ],
        "order_amount" => 18500,
        "order_tax_amount" => 3709,
        "order_lines" => [
          [
            "type" => "physical",
            "reference" => "19-402-SWE",
            "name" => "T-Shirt Black",
            "quantity" => 1,
            "quantity_unit" => "pcs",
            "unit_price" => 10000,
            "tax_rate" => 1340,
            "total_amount" => 6000,
            "total_discount_amount" => 4000,
            "total_tax_amount" => 709,
            "image_url" => "http://merchant.com/logo.png"
          ],
          [
            "type" => "physical",
            "reference" => "19-402-SWE",
            "name" => "Red Trousers",
            "quantity" => 1,
            "quantity_unit" => "pcs",
            "unit_price" => 15000,
            "tax_rate" => 2500,
            "total_amount" => 15000,
            "total_discount_amount" => 0,
            "total_tax_amount" => 3000,
            "image_url" => "http://merchant.com/logo.png"
          ],
          [
            "type" => "discount",
            "reference" => "",
            "name" => "10% discount",
            "quantity" => 1,
            "quantity_unit" => "pcs",
            "unit_price" => 0,
            "tax_rate" => 0,
            "total_amount" => -2500,
            "total_discount_amount" => 2500,
            "total_tax_amount" => 0,
            "image_url" => "http://merchant.com/logo.png"
          ]
        ],
        "shipping_options" => [
        [
         "id" => "free_shipping",
         "name" => "free shipping",
         "description" => "Using our free shipping service",
         "price" => 0,
         "tax_amount" => 0,
         "tax_rate" => 0,
         "preselected" => true
        ],
        [
         "id" => "express shipping",
         "name" => "express shipping",
         "description" => "Using our express shipping service",
         "price" => 5000,
         "tax_amount" => 0,
         "tax_rate" => 0,
         "preselected" => true
        ]
        ],
         "options" => [
           "show_subtotal_detail" => true
         ],
        "merchant_urls" => [
          "terms" => "http://merchant.com/tac.php",
          "checkout" => "http://merchant.com/checkout.php?sid={checkout.order.id}",
          "confirmation" => "http://merchant.com/thankyou.php?sid={checkout.order.id}",
          "push" => "https://webhook.site/1e9d1d17-d90f-497a-a542-4ebb18319954?sid={checkout.order.id}"
        ]
    );

    $encoded_data = json_encode($data);

    $ch = curl_init('https://api.playground.klarna.com/checkout/v3/orders');

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $encoded_data);
  
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Basic UEsxNDIyNV85NjJmODJmODY4NDI6czRZMDM2UktBRWhvREozWQ==',
        'Content-Length: ' . strlen($encoded_data))
    );

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    
    curl_close ($ch);

    $response = json_decode($result, true);
    echo json_encode($response);
?> 