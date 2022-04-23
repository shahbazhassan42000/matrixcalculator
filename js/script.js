document.addEventListener("DOMContentLoaded", function () {
    let btn=document.getElementById("setMatrixBtn");
    var table = document.createElement("TABLE");
    const wind=document.getElementById("window");
    const fillBtn=document.getElementById("fillBtn");
    const wrapper=document.getElementById("wrapper");
    const closeBtn=document.getElementById("windowClose");
    const container = document.getElementById("matrixInput");
    const resetBtn=document.getElementsByName("resetBtn")[0];
    const matrixSubmit=document.getElementsByName("matrixSubmit")[0];
    const dimension = document.getElementsByName("dimension")[0];
    let inputs = [];

    /*** Set Matrix button ***/
    btn.onclick=function (event) {
        if(dimension.value!=="" && +dimension.value!==0 &&+dimension.value<=50 ){
            wrapper.setAttribute("style","display:block");
            wind.setAttribute("style","display:block");
            getMatrixInput();
            event.preventDefault();
        }
    };
    function getMatrixInput() {
        table.setAttribute("id", "table");
        let tableBody = document.createElement("TBODY");
        table.appendChild(tableBody);
        let rows = [];
        let cols = [];
        for (let i = 0,k=0; i <= dimension.value; i++) {
            rows[i] = document.createElement("TR");
            tableBody.appendChild(rows[i]);
            for (let j = 0; j <= dimension.value; j++) {
                if (i === 0) {
                    cols[j] = document.createElement("TH");
                    if (j !== 0) {
                        const index = document.createElement("SPAN");
                        index.innerText = j.toString();
                        index.setAttribute("class", "subIndex");
                        const rh = document.createTextNode("A");
                        cols[j].appendChild(rh);
                        cols[j].appendChild(index);
                    }
                    rows[i].appendChild(cols[j]);
                } else {
                    if (j === 0) {
                        cols[j] = document.createElement("TH");
                        cols[j].innerText = i.toString();
                        cols[j].setAttribute("class", "rowNumber");
                    } else {
                        cols[j] = document.createElement("TD");
                        inputs[k] = document.createElement("INPUT");
                        inputs[k].setAttribute("class", "inputCell");
                        inputs[k].setAttribute("autocomplete", "off");
                        inputs[k].setAttribute("size", "4");
                        inputs[k].setAttribute("type", "number");
                        inputs[k].setAttribute("name", "[" + (i - 1).toString() + "][" + (j - 1).toString() + "]");
                        cols[j].appendChild(inputs[k]);
                        k++;
                    }
                    rows[i].appendChild(cols[j]);
                }
            }
        }
        /*** inserting table in DOM ***/
        container.appendChild(table);

        /*** updating the height and width of wrapper and window object***/
        // wind.style.left=((30/100)*wrapper.offsetWidth).toString()+"px";
        // wind.style.top=((20/100)*wrapper.offsetHeight).toString()+"px";
        // wrapper.style.height=( .offsetHeight+100).toString()+"px";
        if(wind.offsetWidth>window.innerWidth)
            wind.style.left ="0";
        else
            wind.style.left = (((50 / 100) * window.innerWidth)-wind.offsetWidth/2 ).toString() + "px";
        if(wind.offsetWidth>window.innerWidth){
            wrapper.style.width=(wind.offsetWidth).toString()+"px";
        }
        if(wind.offsetHeight>window.innerHeight){
            wrapper.style.height=(wind.offsetHeight+(150)).toString()+"px";
        }

    }

    /*** close button of our wind***/
    closeBtn.onclick=function () {
        wind.setAttribute("style","display:none");
        wrapper.setAttribute("style","display:none");
        table.remove();
        table=document.createElement("TABLE");
    };

    /*** reset form data ***/
    resetBtn.onclick=function () {
        for(let cell of inputs)
            cell.setAttribute("value","");
    };

    /*** filling the emptied cells with zero ***/
    fillBtn.onclick = function (event) {
        for(let cell of inputs) {
            if(cell.value===""){
                cell.setAttribute("value",0);
                cell.classList.remove("redBg");
            }
        }
    };

    /*** setting input and style of cell after focus out ***/
    table.addEventListener("focusout",function (event) {
        let cell = event.target;
        if (cell.tagName === "INPUT") {
            if(cell.value!==""){
                cell.setAttribute("value",+(cell.value));
                cell.classList.remove("redBg");
            }
        }
    });

    /*** checking if user left any cell empty ***/
    function checkRequired() {
        let flag=true;
        for(let cell of inputs){
            if(cell.value===""){
                flag=false;
                cell.classList.add("redBg");
            }
        }
        return flag;
    }

    /*** matrix input submit form ***/
    matrixSubmit.onclick=function (event) {
        if(checkRequired()){
            /*** checking if user input a zero matrix ***/
            let count=0;
            for(let cell of inputs){
                count+=(+cell.value);
            }
            if(count===0){
                alert("ERROR!!! Invalid input data, You input a zero matrix.\nPlease check the input again");
            }
            else{ /*** FORM SUBMISSION ***/
                closeBtn.click();
                diagDifference()
            }
        }else{
            alert("ERROR!!! Invalid input data\nPlease check the input again");
        }
        event.preventDefault();
    };

    function diagDifference() {
        let output=document.getElementById("output");
        let ltrd=0;
        let rtld=0;
        let absDiff=0;
        for(let i=0;i<dimension.value;i++){
            for(let j=0;j<dimension.value;j++){
                if(i===j){ /*** left to right diagonals ***/
                    ltrd+=(+inputs[i+j*dimension.value].value);
                }
                if(j===(dimension.value-i-1))  /*** right to left diagonals ***/
                    rtld+=(+inputs[dimension.value*i+(j)].value);
            }
        }
        absDiff=Math.abs(ltrd-rtld);
        document.getElementById("ltrd").innerText=ltrd.toString();
        document.getElementById("rtld").innerText=rtld.toString();
        document.getElementById("absDiff").innerText=absDiff.toString();
        output.setAttribute("style","display:block");
    }

});