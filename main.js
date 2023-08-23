(function(){


    var selectMenu = document.querySelectorAll("select");
    var timer = document.querySelector("#clock-box h1");
    var alarmBtn = document.querySelector(".btn");
    var Alarms = [];
    var alarmList = document.querySelector(".alarms #empty");
    var alarmBox = document.querySelector(".alarms");
    let isDustibinThere = false;


    // Initiaizing dropers

    for (let i = 12; i > 0; i--) {
        i = i < 10 ? `0${i}` : i;
        let option = `<option value="${i}">${i}</option>`;
        let temp = selectMenu[0].firstElementChild;
        temp.insertAdjacentHTML("afterend", option);
    }
    for (let i = 59; i >= 0; i--) {
        i = i < 10 ? `0${i}` : i;
        let option = `<option value="${i}">${i}</option>`;
        let temp = selectMenu[1].firstElementChild;
        temp.insertAdjacentHTML("afterend", option);
    }
    for (let i = 2; i > 0; i--) {
        let ampm = i==1 ? "AM" : "PM";
        let option = `<option value="${ampm}">${ampm}</option>`;
        let temp = selectMenu[2].firstElementChild;
        temp.insertAdjacentHTML("afterend", option);
    }



    // removing alarm elements

    function removeAlarm(a){
        let index = Alarms.indexOf(a);
        if (index > -1) {
        Alarms.splice(index, 1);
        }
    }

        


    function removeAfterComplete(timeUp){
            let deQueueAlarm = document.querySelectorAll(".alarm-object");
                for (let i = 0;i < deQueueAlarm.length; i++){
                    if(timeUp == deQueueAlarm[i].innerHTML){
                        deQueueAlarm[i].remove();
                    }
                }
                if(isDustibinThere === true && Alarms.length == 0){
                    let bin = document.querySelector(".dust-bin");
                    bin.remove();
                    isDustibinThere = false;
                }
        }



    // Seting Alarm



    function setAlarm (){
        let time = selectMenu[0].value + ":"+selectMenu[1].value +" "+selectMenu[2].value;
        if(time.includes("Hours") || time.includes("Minute") || time.includes("AM/PM")){
        return  alert("Select Time");
        }
        if(!Alarms.includes(time)){
            Alarms.push(time);
            let temp = "<div class = 'alarm-object' draggable = 'true' >"+time+"</div>";
            alarmList.insertAdjacentHTML("afterend",temp);

        }
        if(Alarms.length > 0 && !isDustibinThere){
            let temp = "<i class='fa-solid fa-trash'></i>";
            let div = "<div class = 'dust-bin' >"+ temp + " </div>";
            alarmBox.insertAdjacentHTML("afterend",div);
            isDustibinThere = true;
        }   
        
        // Creating delete section


        let temp = document.querySelector(".alarm-object");
        let container = document.querySelector(".dust-bin");
        let body = document.querySelector("body");
        let isDrop = false;
        temp.addEventListener("dragstart",()=>{
            temp.classList.add("dragging");
        })
        temp.addEventListener("dragend",()=>{
            temp.classList.remove("dragging");
        })
        container.addEventListener("dragover",function(e){
            e.preventDefault();   
            e.stopPropagation();
            isDrop = true;             
        })
        body.addEventListener("dragover",()=>{
            isDrop = false;
        })
        
        temp.addEventListener("dragend",()=>{
            if(isDrop){
                removeAlarm(temp.innerHTML);
                removeAfterComplete(temp.innerHTML);
            }

            
        })
    }

    alarmBtn.addEventListener('click',setAlarm);









    // Timer and time intervals

    setInterval(function(){
        let date = new Date();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        
        let day = "AM";
        console.log(hr);
        if(hr >= 12 && min >= 0){
                day = "PM";
                if(hr > 12){
                    hr = hr - 12;
                }
        }  
        if(hr == 0){
            hr = 12;
        }
        if(sec < 10){
            sec = "0" + sec;
        }
        if(min < 10){
            min = "0" + min;
        }
        if(hr < 10){
            hr = "0" + hr;
        }
        timer.innerHTML = hr+":"+min+":"+sec+" "+day;



        // Checking if Alarms time is up or not 

            let timeUp = hr+":"+min+" "+day;
            for(let i of Alarms){
                if(i == timeUp){
                    alert("Alarm Ringing...");   
                    removeAlarm(timeUp);  
                    removeAfterComplete(timeUp);      
                    
                }
            }

    },1000);





})();
