
function checkSuspendForRadio(resume){
    if (resume === true){
        var radios = document.getElementsByName("shipping");
        for (var i = 0, r=radios, l=r.length; i < l;  i++){
            r[i].disabled = true;
        }
    } else if (resume === false){
        var radios = document.getElementsByName("shipping");
        for (var i = 0, r=radios, l=r.length; i < l;  i++){
            r[i].disabled = false;
        }
    }
}

function newExternalShippingOrder(){
    if (window.XMLHttpRequest) {//IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }
    else {//IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    var selectedShipping = this.changeShipping();

    xmlhttp.open("GET","http://localhost/projects/create_external_shipping_order.php?shipping=" + selectedShipping, true);
    
    xmlhttp.onload = function() {
        var result = JSON.parse(xmlhttp.response);
        console.log(result);
        $('#header-order-id-value').append(result.order_id);
        var checkoutContainer = document.getElementById('my-checkout-container');
        checkoutContainer.innerHTML = result.html_snippet;
        var scriptsTags = checkoutContainer.getElementsByTagName('script');
        for (var i = 0; i < scriptsTags.length; i++) {
            var parentNode = scriptsTags[i].parentNode;
            var newScriptTag = document.createElement('script');
            newScriptTag.type = 'text/javascript';
            newScriptTag.text = scriptsTags[i].text;
            parentNode.removeChild(scriptsTags[i]);
            parentNode.appendChild(newScriptTag);
        }
    
        window._klarnaCheckout(function (api) {
            api.resume();
        });
    };
    
    xmlhttp.send();
};

function changeShipping(){
    var radios = document.getElementsByName('shipping');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return (radios[i].value);
        }
    }
};

function updateExternalShippingOrder(){
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var selectedShipping = this.changeShipping();
    var order_id = $("#header-order-id-value").text();

    xmlhttp.open("GET","http://localhost/projects/update_external_shipping_order.php?shipping=" + selectedShipping + "&order_id=" + order_id, true);
    
    xmlhttp.send();
    
}


