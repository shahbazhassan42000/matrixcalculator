document.addEventListener("DOMContentLoaded", function () {

    const dimension = document.getElementsByName("dimension")[0];
    const btn=document.getElementById("submit");
    btn.addEventListener("click", function (event) {
        if(dimension.value!==""){
            event.preventDefault();
            diagDifference()
        }
    });
    function diagDifference() {
        //TODO
    }


});