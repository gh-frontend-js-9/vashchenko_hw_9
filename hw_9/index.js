'use strict';

let Tamag;

class Tamagotchi {

  constructor (level) {
    this.level = level;
  }

  feed;
  wash;
  happiness;
  health;
  socialization;
  money;
  counter;
  classCollection;
  timer = 0;
  maxValue = 100;
  hardMaxValue = 70;
  TimerCounter = setInterval(() => {this.timer += 1}, 1000);

  leaveStatus() {
    if (this.feed < -1 || this.wash < -1 || this.happiness < -1 || this.health < -2 || this.socialization < -1 || this.money < -1 ){
      this.gameOver ();
      Tamag = undefined;
      clearInterval(this.counter);
      clearInterval(this.TimerCounter);
      clearInterval(this.UpdateCounter);
      this.feed = 0;
      this.wash = 0;
      this.happiness = 0;
      this.health = 0;
      this.socialization = 0;
      this.money = 0;
      this.updateStats();
      document.getElementById('gameOverTime_js').innerText = `${this.timer} seconds`;
    }
  }

  static getRandNum (min, max) {
    return Number(Math.round(Math.random() * max + min));
  }

  initStats () {
    document.getElementById('gameStart_js').style.display = 'flex';
    window.scrollTo({ top: document.body.scrollHeight, behavior:'smooth'});

    (this.level === 'hard' || this.level === 'pro') ? this.maxPoints = 40 : this.maxPoints = 90;
    this.UpdateCounter = setInterval(() => {
      let random_int = Tamagotchi.getRandNum(1,7);
      (random_int === 1) ? this.feed += Tamagotchi.getRandNum(10,50) :
      (random_int === 2) ? this.wash += Tamagotchi.getRandNum(10,50) :
      (random_int === 3) ? this.happiness += Tamagotchi.getRandNum(10,50) :
      (random_int === 4) ? this.health += Tamagotchi.getRandNum(10,50) :
      (random_int === 5) ? this.socialization += Tamagotchi.getRandNum(10,50) :
        this.money += Tamagotchi.getRandNum(10,50) ;
      this.updateStats();
    }, 10000);

    this.feed = Tamagotchi.getRandNum(20,this.maxPoints);
    this.wash = Tamagotchi.getRandNum(20,this.maxPoints);
    this.happiness = Tamagotchi.getRandNum(20,this.maxPoints);
    this.health = Tamagotchi.getRandNum(20,this.maxPoints);
    this.socialization = Tamagotchi.getRandNum(20,this.maxPoints);
    this.money = Tamagotchi.getRandNum(20,this.maxPoints);

    switch (this.level) {
      case 'easy':
        this.interval = setInterval(() => {
          this.feed -= 3;
          this.wash -= 3;
          this.happiness -= 3;
          this.health -= 3;
          this.socialization -= 3;
          this.money -= 3;
          this.leaveStatus();
          this.updateStats();
        }, 2500);
        break;
      case 'hard':
        this.interval = setInterval(() => {
          this.feed -= 5;
          this.wash -= 5;
          this.happiness -= 5;
          this.health -= 5;
          this.socialization -= 5;
          this.money -= 5;
          this.leaveStatus();
          this.updateStats();
        }, 1500);
        break;
      case 'pro':
        this.interval = setInterval(() => {
          this.feed -= 7;
          this.wash -= 7;
          this.happiness -= 7;
          this.health -= 7;
          this.socialization -= 7;
          this.money -= 7;
          this.leaveStatus();
          this.updateStats();
        }, 500);
        break;
    }

    this.updateStats();
  }

  updateStats(){
    document.getElementsByClassName('game-start__meter--food')[0].innerHTML = this.feed;
    document.getElementById('feedMeter').value = this.feed;
    document.getElementsByClassName('game-start__meter--wash')[0].innerHTML = this.wash;
    document.getElementById('washMeter').value = this.wash;
    document.getElementsByClassName('game-start__meter--run')[0].innerHTML = this.happiness;
    document.getElementById('runMeter').value = this.happiness;
    document.getElementsByClassName('game-start__meter--health')[0].innerHTML = this.health;
    document.getElementById('healthMeter').value = this.health;
    document.getElementsByClassName('game-start__meter--social')[0].innerHTML = this.socialization;
    document.getElementById('socialMeter').value = this.socialization;
    document.getElementsByClassName('game-start__meter--money')[0].innerHTML = this.money;
    document.getElementById('moneyMeter').value = this.money;
  }

  feeder() {
    this.feed < 70 ? this.feed += 30: this.feed = this.maxValue;
    if (this.level === 'hard' || this.level === 'pro') {
      this.feed < 40 ? this.feed += 30 : this.feed = this.hardMaxValue;
    }
    this.wash -= 20;
    this.updateStats();
    this.leaveStatus();
    this.classCollection = document.getElementsByClassName('feed');
    this.displayInfo(this.classCollection);
  }

  washes() {
    this.wash < 60 ? this.wash += 40: this.wash = this.maxValue;
    if (this.level === 'hard' || this.level === 'pro') {
      this.wash < 30 ? this.wash += 40 : this.wash = this.hardMaxValue;
    }
    this.happiness -= 20;
    this.updateStats();
    this.leaveStatus();
    this.classCollection = document.getElementsByClassName('wash');
    this.displayInfo(this.classCollection);
  }

  runs() {
    this.happiness < 85 ? this.happiness += 15: this.happiness = this.maxValue;
    if (this.level === 'hard' || this.level === 'pro') {
      this.happiness < 55 ? this.happiness += 15 : this.happiness = this.hardMaxValue;
    }
    this.feed -= 10;
    this.updateStats();
    this.leaveStatus();
    this.classCollection = document.getElementsByClassName('happiness');
    this.displayInfo(this.classCollection);
  }

  medicine() {
    this.health < 70 ? this.health += 30: this.health = this.maxValue + 1;
    if (this.level === 'hard' || this.level === 'pro') {
      this.health < 40 ? this.health += 30 : this.health = this.hardMaxValue;
    }
    this.money -= 20;
    this.updateStats();
    this.leaveStatus();
    this.classCollection = document.getElementsByClassName('medicine');
    this.displayInfo(this.classCollection);
  }

  bar() {
    this.socialization < 60 ? this.socialization += 40: this.socialization = this.maxValue;
    this.feed <= 90 ? this.feed += 10: this.feed = this.maxValue;
    if (this.level === 'hard' || this.level === 'pro') {
      this.socialization < 30 ? this.socialization += 40 : this.socialization = this.hardMaxValue;
      this.feed < 60 ? this.feed += 10: this.feed = this.hardMaxValue;
    }
    this.money -= 20;
    this.health -= 10;
    this.updateStats();
    this.leaveStatus();
    this.classCollection = document.getElementsByClassName('bar');
    this.displayInfo(this.classCollection);
  }

  work() {
    this.money < 50 ? this.money += 50: this.money = this.maxValue;
    if (this.level === 'hard' || this.level === 'pro') {
      this.money < 20 ? this.money += 50 : this.money = this.hardMaxValue;
    }
    this.feed -= 10;
    this.health -= 10;
    this.socialization -= 20;
    this.updateStats();
    this.leaveStatus();
    this.classCollection = document.getElementsByClassName('work');
    this.displayInfo(this.classCollection);
  }

  shop() {
    this.feed < 80 ? this.feed += 20: this.feed = this.maxValue;
    if (this.level === 'hard' || this.level === 'pro') {
      this.feed < 50 ? this.feed += 20 : this.feed = this.hardMaxValue;
    }
    this.money -= 20;
    this.updateStats();
    this.leaveStatus();
    this.classCollection = document.getElementsByClassName('shop');
    this.displayInfo(this.classCollection);
  }

  business() {
    this.money = 100;
    this.happiness = 100;
    this.health -= 100;
    this.socialization -= 20;
    if (this.level === 'hard') {
      this.money = 70;
      this.happiness = 70;
      this.health -= 70;
    }
    this.updateStats();
    this.leaveStatus();
    this.classCollection = document.getElementsByClassName('business');
    this.displayInfo(this.classCollection);
  }

  killer() {
    this.health -= 1000;
  }

  displayInfo(elem) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].style.display = "inline";
    }
    setTimeout(() => {
      for (let i = 0; i < elem.length; i++) {
        elem[i].style.display = "none";
      }
    },1000);
  }

  gameOver() {
    document.getElementById('gameStart_js').style.display = 'none';
    document.getElementById('gameOver_js').style.display = 'block';
    document.getElementById('scream_js').play();
  }
}

function startGame (level) {
  Tamag = new Tamagotchi(level)
}

function closeWindow() {
    window.close();
  }

function restart () {
  location.reload()
}
