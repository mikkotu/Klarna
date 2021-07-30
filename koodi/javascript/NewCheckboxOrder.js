
function newCheckboxOrder(){
    if (window.XMLHttpRequest) {//IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }
    else {//IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.open("GET","http://localhost/projects/create_checkbox_order.php",true);
    
    xmlhttp.onload = function() {
        var result = JSON.parse(xmlhttp.response);
        console.log(result);
        $('.header-order-id').append("Order ID: " + result.order_id);
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

