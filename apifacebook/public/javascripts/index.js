$(document).ready(function(){
    $('select').formSelect();
    $('#itemPage').on('change',function(){
        if(this.value){localStorage.setItem("limit", this.value)}
        window.location = '/page?item='+this.value;
    });
});