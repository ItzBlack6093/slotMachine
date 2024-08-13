        /*VARIABLES*/
        window.onload=startSFX('lesgogamblonk.mp3');
        var rdn1 = 0
        var rdn2 = 0
        var rdn3 = 0
        var check=false
        var attempt=0
        var balance = 5000
        var turnOf7 = 0
        var turnOfThunder = 0
        var protectLeft = 0
        var turnOfFree = 0
        var deBuffX=1
        var buff7=1
        var moneyAddIfWin=500
        var sfx=null
        var isPlaying=false
        var isMuted=false
        function stopSFX(){
                if(isPlaying == true){
                    sfx.pause();
                }
        }
        function startSFX(filename){
                stopSFX();
                sfx = new Audio('sfx/' + filename);                    
                sfx.play();
                isPlaying = true;
                if(isMuted){
                    stopSFX()
                }
        }
        function calculatedBalance(){
            if (turnOf7>0){
                if(rdn1!=1) { buff7=2 ; turnOf7-- } 
                else { buff7=1; turnOf7-- }
            } else buff7=1
            //multiplier for 7 
            if (turnOfThunder>0){
                if(rdn1!=3) { deBuffX=1.25 ;turnOfThunder--  }
                else { deBuffX=0.25; turnOfThunder-- }   
            } else deBuffX=1 // multiplier for thunder
            if(turnOfFree > 0){
                turnOfFree--
                balance+=50 
            }
            balance+=moneyAddIfWin*deBuffX*buff7-50
        }
        /*function delayButton(notify2) {
            let button = document.querySelector(`button[onclick="${notify2}"]`); //Nội suy chuỗi mẫu
             // Kiểm tra xem nút có tồn tại không
              button.disabled = true;
              setTimeout(() => { button.disabled = false; }, 1000);
          }*/ //    BẢO TRÌ DELAY
        function sellShield(){ 
            if(protectLeft==0) document.getElementById("attempt").innerHTML= "No more shield to sell..."
            else {
                protectLeft--
                balance+=750
            }
            //delayButton(sellShield())
        }
        function testSfx()
        {
            const audio = document.getElementById('les');
            // Kiểm tra xem âm thanh đã được phát chưa trong phiên làm việc hiện tại
            if (sessionStorage.getItem('audioPlayed') !== 'true') {
                audio.play().catch(error => {
            // Xử lý lỗi nếu trình duyệt chặn tự động phát (ví dụ: yêu cầu tương tác người dùng)
            console.error('Lỗi phát âm thanh:', error);
        });

        // Đánh dấu rằng âm thanh đã được phát
        sessionStorage.setItem('audioPlayed', 'true');
}
        }
        function mute(){
            if(isMuted){
                isMuted=false
                document.getElementById('mute').style.background='blue'
                document.getElementById('mute').style.color='white'
                document.getElementById('mute').innerHTML = 'SFX is enabled'
            }
            else{
                isMuted=true
                document.getElementById('mute').style.background='red'
                document.getElementById('mute').style.color='black'
                document.getElementById('mute').innerHTML = 'SFX is disabled'
            }
        }
        function randomNum(){
            if(balance <= 0){
                document.getElementById('balance').innerHTML= "Oops! You have no money left... Refresh this tab if you want to try again. " 
                //setTimeout(window.close,5000) // No more close due to dm chromuim
                return
            } 
            attempt++
            document.getElementById('attempt').innerHTML="You've gambled " + attempt + " time(s)"
            updateDisplayImagies()
                /*DEBUG*/
                /*******/
                if(rdn1===rdn2 && rdn2===rdn3){
                    moneyAddIfWin=500
                    switch(rdn1){
                        case 1: // X / -$1000  or - 1 shield          
                            startSFX('gamblFalse.mp3')
                            updateResult("- $1000")
                            if(protectLeft == 0){
                                moneyAddIfWin=-1000
                            }
                            else{
                                moneyAddIfWin=0
                                protectLeft--
                                updateResult("- $1000 but protected")
                                document.getElementById('shield').innerHTML= "Shield: "+ protectLeft
                            }
                        break;
                        
                        case 2: // $ / +$1000
                            startSFX('gamblWin.mp3')
                            updateResult(" + $1000")
                            moneyAddIfWin=1000
                            
                        break;

                        case 3: // thunder / -75% winning next 5 rolls
                            startSFX('gamblFalse.mp3')//bad thing
                            updateResult(" -75% winning next 5 rolls")
                            turnOfThunder = 5
                        break;

                        case 4: // star / x5 free rolls
                            startSFX('gamblWin.mp3')
                            updateResult("x5 free rolls")
                            turnOfFree = 5
                        break;

                        case 5: // 7 / x2 winning next 7 roll
                            startSFX('gamblWin.mp3')
                            updateResult(" Double winning next 7 turns")
                            turnOf7=7

                        break;

                        case 6: // Triangle / +1 shield
                            startSFX('gamblWin.mp3')
                            updateResult(" +1 shield")
                            if(protectLeft < 3){
                                protectLeft++
                            }
                            
                        break;
                    }
                }
                else {
                    moneyAddIfWin = 0
                    startSFX('gamblFalse.mp3')
                    updateResult(" No Win")
                }
        
        calculatedBalance()
        updateDisplayBalance()
        updateDisplayShield()
        updateDisplayBuffDebuff()
        //delayButton(randomNum())
        //console.log(moneyAddIfWin*deBuffX*buff7-50)//just to ensure the formula working correct
        } 