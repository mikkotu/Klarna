
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

function newInstantShoppingButton(){
    if (window.XMLHttpRequest) {//IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }
    else {//IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    var selectedShipping = this.changeShipping();

    xmlhttp.open("GET","http://localhost/projects/create_instant_shopping_button.php");
    
    xmlhttp.onload = function() {
        var result = JSON.parse(xmlhttp.response);
        console.log(result);
        $('#header-button-id-value').append(result.button_key);
    };
    
    xmlhttp.send();
};



