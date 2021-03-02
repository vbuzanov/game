let body = document.body;
body.style.background = 'url("images/0-start.jpg")';
body.style.backgroundRepeat = 'no-repeat';
body.style.backgroundPosition = 'center';
body.style.backgroundSize = 'cover';

const play = document.getElementById('play');
const bang = document.getElementById('bang');

const heroesDiv = document.getElementById('heroes');
const heroes = heroesDiv.children;
console.log(heroes)
const arrW = [];
const arrH = [];
const score = document.getElementById('score');
const time = document.getElementById('time');
let scoreSp = score.firstElementChild;
let timeSp = time.firstElementChild;
let scores = 0;
let timer = 10;
let birdEarn = true;
let intervTimer;
let timeOutTimer;
let bodyW = body.getBoundingClientRect().width;
let bodyH = body.getBoundingClientRect().height;

function readParam(){
    for (let i = 0; i < heroes.length; i++) {
        arrW[i] = heroes[i].getBoundingClientRect().width;
    }
    for (let i = 0; i < heroes.length; i++) {
        arrH[i] = heroes[i].getBoundingClientRect().height;
    }
    for (let i = 0; i < heroes.length; i++) {
        heroes[i].style.display = 'none';
    }
}
readParam();

play.addEventListener('click', (event)=>{
    body.style.background = 'url("images/fon.jpg")';
    body.style.backgroundPosition = 'center';
    body.style.backgroundSize = 'cover';
    play.style.display = 'none';
    score.style.display = 'block';
    time.style.display = 'block';
    scores = 0;
    scoreSp.innerText = scores;
    timer = 10;
    timeSp.innerText = timer;
    bird_10.showBird();
    bird_20.showBird();
    bird_50.showBird();
    pig_minus_100.showBird();
    if(birdEarn){
        bird_10.earnPoint();
        bird_20.earnPoint();
        bird_50.earnPoint();
        pig_minus_100.earnPoint();
        birdEarn = false;
    }
    intervTimer = setInterval(()=>{
        timeSp.innerText = --timer;
    }, 1000)
    timeOutTimer = setTimeout(() => {
        clearInterval(intervTimer);
        body.style.background = 'url("images/lose.jpg")';
        body.style.backgroundPosition = 'center';
        body.style.backgroundSize = 'cover';
        bird_10.hideBird();
        bird_20.hideBird();
        bird_50.hideBird();
        pig_minus_100.hideBird();
    }, 10000);
})

const Hero =function(speed, paramInd, points){
    this._speed = speed;
    this._paramInd = paramInd;
    this._points = points;
    this._elemHero = document.createElement('img');
    this._interval1 = null;
    this._timOut1 = null;
    this._elemBang = null;
}

Hero.prototype = {
    showBird: function(){
        this._interval1 = setInterval(()=>{
            this._elemHero.src = heroes[this._paramInd].src;
            let x = Math.floor(Math.random()*(bodyW-arrW[this._paramInd]));
            let y = Math.floor(Math.random()*(bodyH-arrH[this._paramInd]));
            this._elemHero.style.position = 'absolute';
            this._elemHero.style.left = x + 'px';
            this._elemHero.style.top = y + 'px';
            body.prepend(this._elemHero);
            this._timOut1 = setTimeout(()=>{this._elemHero.remove()}, this._speed-300) 
         },this._speed)
    },
    earnPoint: function(eventType='click'){
        this._elemHero.addEventListener(eventType, ()=>{
            scores += this._points;
            scoreSp.innerText = scores;
            this._elemHero.src = bang.src;
            this._elemBang = this._elemHero.cloneNode();
            body.prepend(this._elemBang);
            setTimeout(()=>this._elemBang.remove(),500);
            
            if(scores >= 100){
                bird_10.hideBird();
                bird_20.hideBird();
                bird_50.hideBird();
                pig_minus_100.hideBird();
                clearInterval(intervTimer);
                clearTimeout(timeOutTimer);
                body.style.background = 'url("images/win.jpg")';
                body.style.backgroundPosition = 'center';
                body.style.backgroundSize = 'cover';
            }
        })
    },
    hideBird: function(){
        clearInterval(this._interval1);
        clearTimeout(this._timOut1)
        this._elemHero.remove();
        if(this._elemBang) this._elemBang.remove();
        play.style.display = 'block';
        score.style.display = 'none';
        time.style.display = 'none';
    }
}

let bird_10 = new Hero(1300, 0, 10)
let bird_20 = new Hero(1100, 1, 20)
let bird_50 = new Hero(800, 2, 50)
let pig_minus_100 = new Hero(1600, 3, -100)


