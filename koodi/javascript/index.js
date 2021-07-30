function getOldOrder() {
    var order_id = $(".order-id-input").val();
    console.log(order_id);
    if(order_id){
        window.location.href = 'C:/Projects/HTML/order-page.html?id=' + order_id;
    }
}