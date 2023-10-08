var timer=60;
var hitrn;
var lives=3;
var id;

function showpopup(){
    document.querySelector("#popup").style.display="flex";
}

function increase_score(){
    var score=0;
    document.querySelector("#pbtm").addEventListener("click",function(dets){
        var clickednumber = Number(dets.target.textContent);
        if(clickednumber===hitrn){
            score+=10;
            document.querySelector("#scoreval").textContent=score;
            addingbubbles();
            gethitvalue();
        }
        else{
            if(lives>1){
                lives--;
                addingbubbles();
                gethitvalue();
            }
            else{
                clearInterval(id);
                showpopup();
            }
        }
    })
}

function addingbubbles(){
    let pbtm = document.querySelector("#pbtm");
    let bsize, gap;
    if (window.innerWidth <= 600) {
        bsize = pbtm.offsetWidth * 0.07; // 7vw 
        gap = pbtm.offsetWidth * 0.02; // 2vw 
    } else {
        bsize = pbtm.offsetWidth * 0.035;
        gap = pbtm.offsetWidth * 0.01;
    }

    // Calculate padding. Assuming 1vw padding is equal to 1% of viewport width.
    const paddingHorizontal = window.innerWidth * 0.01;  // 1vw
    const paddingVertical = window.innerHeight * 0.01;  // 1vw

    const availableWidth = pbtm.offsetWidth - 2 * paddingHorizontal;  // subtracting padding from both sides
    const availableHeight = pbtm.offsetHeight - 2 * paddingVertical;  // subtracting padding from top and bottom

    const bubbleshorizontally = Math.floor((availableWidth)/(bsize+gap));
    const bubblesvertically = Math.floor((availableHeight)/(bsize+gap));
    const totallb = bubbleshorizontally * bubblesvertically;

    let clutter="";

    for(let i=0;i<totallb;i++){
        let rn = Math.floor(Math.random()*10);
        clutter+=`<div class="bubble">${rn}</div>`
    }
    pbtm.innerHTML = clutter;

    

}

function runtimer(){
    id = setInterval(function(){
        if(timer>0){
            timer--;
            document.querySelector("#timerval").textContent=timer;
        }
        else{
            clearInterval(id);
            showpopup();
        }
    },1000);
}

function gethitvalue(){
    let hit=document.querySelector("#hitval");
    hitrn = Math.floor(Math.random()*10);
    hit.textContent = hitrn;
}

function close(){
    document.querySelector("button").addEventListener("click",function(){
        document.querySelector("#popup").style.display = "none";
        window.location.reload();
    })
}
window.addEventListener('resize', addingbubbles);
addingbubbles();
runtimer();
gethitvalue();
close();
increase_score();