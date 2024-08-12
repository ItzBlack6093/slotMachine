function processingImgDisplay(fisrtId,secondId,num){
    switch (num) {
        case 0:
        num="result/tamGiac30px.png"
            break;  
        case 1:
        num="result/cross30px.png"
            break;
        case 2:
        num="result/dolar30px.png"
            break;
        case 3:
        num="result/samSet30px.png"
            break;
        case 4:
        num="result/sao30px.png"
            break;
        case 5:
        num="result/seven30px.png"
            break;
        case 6:
        num="result/tamGiac30px.png"
            break;   
            case 7:
        num="result/cross30px.png"
            break;
        case 2:
    }
    document.getElementById(fisrtId+secondId).src=num
}
function updateDisplayImagies(){ 
    var ngang=""
    var doc=""
    for (var demNgang = 0; demNgang < 3 ; demNgang++) {
        var randomNum=Math.ceil(Math.random()*18/3)
        for (var demDoc = 0; demDoc < 3; demDoc++){
            //xử lý firstID (hàng ngang) 
            if (demNgang===0) {ngang="first";rdn1=randomNum}
            else if (demNgang===1) {ngang="second";rdn2=randomNum}
            else {ngang="third";rdn3=randomNum}
            //xử lý secondId (hàng dọc)       
            if (demDoc===0) {doc="";processingImgDisplay(ngang,doc,randomNum)}
            else if (demDoc===1) {doc="top";processingImgDisplay(ngang,doc,randomNum-1)}
            else {doc="bottom";processingImgDisplay(ngang,doc,randomNum+1)}    
        }
        }
    }
function updateResult(notify){
    document.getElementById('result').innerHTML= "Your result: "+notify
}
function updateDisplayBalance(){
    document.getElementById("balance").innerHTML="Balance: $"+balance
}
function updateDisplayBuffDebuff(){
    if(attempt%10===0){
        balance+=100
        document.getElementById("multiplier").innerHTML= "Multiplier: " + deBuffX*buff7+ "\n . Refund $100 after 10 attempts"
    }
    else document.getElementById('multiplier').innerHTML= "Multiplier: " + deBuffX*buff7
}
function updateDisplayShield(){
    for (let i = 0; i < 3; i++) { 
        if(i<protectLeft) document.getElementById("shield"+i).src="result/shield30px.png"
        else document.getElementById("shield"+i).src="result/nothing30px.png" 
    }
}