(function(){
    "use strict";
    let arrTrap = [],
    arrEmpty = [],
    x=0 , trapCount = 0, index = 0, clicks =0, clickFlag = true,
    nearForTrap=[],
    nearForEmpty=[],
    newNear=[],
    numberedDivs=[];


    function reArrange(x){
        if(x<20){
            if(x==1){
                nearForEmpty=[x,x+1,x+19,x+20];
            }
            else if(x==19){
                nearForEmpty=[x,x-1,x+18,x+19];
            }
            else{
                nearForEmpty=[x,x+1,x-1,x+19,x+20,x+18];
            }
        }
        else if(x>171){
            if(x==172){
                nearForEmpty=[x,x+1,x-19,x-18];
            }
            else if(x==190){
                nearForEmpty=[x,x-1,x-19,x-20];
            }
            else{
                nearForEmpty=[x,x+1,x-1,x-19,x-20,x-18];
            }
        }
        else if(x%19==1){
            nearForEmpty=[x,x+1,x+19,x+20,x-19,x-18];
        }
        else if(x%19==0){
            nearForEmpty=[x,x-1,x-19,x-20,x+19,x+18];
        }
        else{
            nearForEmpty=[x,x+1,x-1,x+18,x-18,x+19,x-19,x+20,x-20];
        }
    }


    for (let i = 0; i < 190; i++) {
        $("#container").append("<div class = 'cell'></div>");
    }

    

    console.log(arrEmpty.length);
    console.log(arrEmpty.sort(function(a, b){return a - b}));
    
    $(".cell").mousedown(function(event){
        switch (event.which) {
            case 1:
                if(clicks===0){
                    clicks++;
                    arrEmpty.push($(this).index()+1);
                    while (arrTrap.length < 50) {
                        let randTrap = Math.floor(Math.random()*190 +1);
                
                        if(!arrTrap.includes(randTrap)){
                            arrTrap.push(randTrap);
                        }
                    }
                
                    while (arrEmpty.length < 2) {
                        let randEmpty = Math.floor(Math.random()*190 +1);
                    
                        if(!arrTrap.includes(randEmpty) && !arrEmpty.includes(randEmpty)){
                            arrEmpty.push(randEmpty);
                        }
                    }
                    
                    for (let i = 1; i <= 190; i++) {
                        if(!arrTrap.includes(i) && !arrEmpty.includes(i)){
                            if(i<20){
                                if(i==1){
                                    nearForTrap=[i+1,i+19,i+20];
                                }
                                else if(i==19){
                                    nearForTrap=[i-1,i+19,i+18];
                                }
                                else{
                                    nearForTrap=[i+1,i+19,i+20,i+18,i-1];
                                }
                            }
                            else if(i>171){
                                if(i==172){
                                    nearForTrap=[i+1,i-19,i-18];
                                }
                                else if(i==190){
                                    nearForTrap=[i-1,i-19,i-20];
                                }
                                else{
                                    nearForTrap=[i+1,i-19,i-20,i-1,i-18];
                                }
                            }
                            else if(i%19==1){
                                nearForTrap=[i+1,i+19,i+20,i-19,i-18];
                            }
                            else if(i%19==0){
                                nearForTrap=[i-1,i-19,i-20,i+19,i+18];
                            }
                            else{
                                nearForTrap=[i+1,i-1,i+18,i-18,i+19,i-19,i+20,i-20];
                            }
                            
                            for (let k = 0; k < nearForTrap.length; k++) {
                                if(arrTrap.includes(nearForTrap[k])){
                                    trapCount++;
                                }
                            }
                            if(trapCount===0 && !arrEmpty.includes(i)){
                                arrEmpty.push(i);
                            }
                            else{
                                $(`.cell:nth-child(${i})`).append(`<span>${trapCount}</span>`);
                            }
                            trapCount = 0;
                        }
                    }
                }
                if(arrTrap.includes($(this).index()+1)){
                    for (let i = 0; i < 50; i++) {
                        $(`.cell:nth-child(${arrTrap[i]})`).attr('class', 'trap');
                    }
                }
                else if(arrEmpty.includes($(this).index()+1)){
                    x=$(this).index()+1;
                    reArrange(x);
        
                    //try the near cells for the clicked cell, if empty add it to an array, next iterations do the same thing for every element in that array until every connected empty cell is uncovered
                    let flag = true;
                    while (flag) {
                        for (let i = 0; i < nearForEmpty.length; i++) {
                            if (arrEmpty.includes(nearForEmpty[i])) {
                                newNear.push(nearForEmpty[i]);
                                arrEmpty.splice(arrEmpty.indexOf(nearForEmpty[i]),1);
                            }
                            if($(`.cell:nth-child(${nearForEmpty[i]})`).children().length > 0){
                                numberedDivs.push(nearForEmpty[i]);
                            }
                        }
                        index++;
                        x=newNear[index];
                        reArrange(x);
                        if(index===newNear.length){
                            break;
                        }
                    }
                    console.log(newNear);
        
        
                    for (let i = 0; i < newNear.length; i++) {
                        if (!arrTrap.includes(newNear[i])) {
                            $(`.cell:nth-child(${newNear[i]})`).attr('class', 'empty');
                        }
                    }
                    for (let i = 0; i < numberedDivs.length; i++) {
                        if (!arrTrap.includes(numberedDivs[i])) {
                            $(`.cell:nth-child(${numberedDivs[i]})`).attr('class', 'empty');
                        }
                    }
                }
                else{
                    jQuery($(`.cell:nth-child(${$(this).index()+1})`)).css('background-color', 'white');
                    jQuery($(`.cell:nth-child(${$(this).index()+1}) span`)).css('opacity', '1');
                }
                break;
            case 2:
                if(clickFlag===true){
                    jQuery($(`.cell:nth-child(${$(this).index()+1})`)).css('background-color', 'blue');
                }
                else{
                    if(($(this).index()+1)%2===1){
                        jQuery($(`.cell:nth-child(${$(this).index()+1})`)).css('background-color', 'rgb(7, 177, 32)');
                    }
                    else if(($(this).index()+1)%2===0){
                        jQuery($(`.cell:nth-child(${$(this).index()+1})`)).css('background-color', 'rgb(137, 198, 146)');
                    }
                }
                clickFlag = !clickFlag;
                break;
            default:
                alert('You have a strange Mouse!');
        }
        
    });
    

    // console.log(arrEmpty.sort(function(a, b){return a - b}));
    // console.log(arrTrap.sort(function(a, b){return a - b}));
})();