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
  timer = 0;

  TimerCounter = setInterval(() => {this.timer += 1}, 500);

  leaveStatus() {
    if (this.feed < -1 || this.wash < -1 || this.happiness < -1 || this.health < -5 || this.socialization < -1 || this.money < -1 ){
      gameOver ();
      Tamag = undefined;
      clearInterval(this.counter);
      clearInterval(this.TimerCounter);
      clearInterval(this.UpdateCounter);
      this.feed = '0';
      this.wash = '0';
      this.happiness = '0';
      this.health = '0';
      this.socialization = '0';
      this.money = '0';
      this.updateStats();
      document.getElementById('gameOverTime_js').innerText = `${this.timer} seconds`;
    }
  }

  static getRandNum (min, max) {
    Math.round(min + Math.random() * 100 - max);
  }

  initStats () {

    (this.level === 'hard' || this.level === 'pro') ? this.maxPoints = 70 : this.maxPoints = 100;

    this.UpdateCounter = setInterval(() => {
      let random_int = Tamagotchi.getRandNum(1,7);
      (random_int === 1) ? this.feed += Tamagotchi.getRandNum(10,50) :
      (random_int === 2) ? this.wash += Tamagotchi.getRandNum(10,50) :
      (random_int === 3) ? this.happiness += Tamagotchi.getRandNum(10,50) :
      (random_int === 4) ? this.health += Tamagotchi.getRandNum(10,50) :
      (random_int === 5) ? this.socialization += Tamagotchi.getRandNum(10,50) :
        this.money += Tamagotchi.getRandNum(10,50) ;
      this.maxMore();
      this.updateStats();
    }, 50000);

    this.feed = Tamagotchi.getRandNum(50,this.maxPoints);
    this.wash = Tamagotchi.getRandNum(50,this.maxPoints);
    this.happiness = Tamagotchi.getRandNum(50,this.maxPoints);
    this.health = Tamagotchi.getRandNum(50,this.maxPoints);
    this.socialization = Tamagotchi.getRandNum(50,this.maxPoints);
    this.money = Tamagotchi.getRandNum(50,this.maxPoints);

    this.updateStats();

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
        }, 5000);
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
        }, 5000);
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
        }, 5000);
        break;
    }
  }

  updateStats(){
    document.getElementsByClassName('game-start__meter--food').innerHTML = `${this.feed}`;
    document.getElementById('feedMeter').value = `${this.feed}`;
    document.getElementById('game-start__meter--wash').innerHTML = `${this.wash}`;
    document.getElementById('washMeter').value = `${this.wash}`;
    document.getElementById('game-start__meter--run').innerHTML = `${this.happiness}`;
    document.getElementById('runMeter').value = `${this.happiness}`;
    document.getElementById('game-start__meter--health').innerHTML = `${this.health}`;
    document.getElementById('healthMeter').value = `${this.health}`;
    document.getElementById('game-start__meter--social').innerHTML = `${this.socialization}`;
    document.getElementById('socialMeter').value = `${this.socialization}`;
    document.getElementById('game-start__meter--money').innerHTML = `${this.money}`;
    document.getElementById('moneyMeter').value = `${this.money}`;
  }

  feedin() {
    this.feed += 30;
    this.wash -= 20;
    this.updateStats();
    this.leaveStatus();
  }

  washes() {
    this.wash += 40;
    this.happiness -= 20;
    this.updateStats();
    this.leaveStatus();
  }

  runs() {
    this.happiness += 15;
    this.feed -= 10;
    this.updateStats();
    this.leaveStatus();
  }

  medicine() {
    this.health += 30;
    this.money -= 20;
    this.updateStats();
    this.leaveStatus();
  }

  bar() {
    this.socialization += 40;
    this.feed += 10;
    this.money -= 20;
    this.health -= 10;
    this.updateStats();
    this.leaveStatus();
  }

  work() {
    this.money += 50;
    this.feed -= 10;
    this.health -= 10;
    this.socialization -= 20;
    this.updateStats();
    this.leaveStatus();
  }

  shop() {
    this.feed += 20;
    this.money -= 20;
    this.updateStats();
    this.leaveStatus();
  }

  business() {
    this.money += 100;
    this.happiness += 100;
    this.health -= 100;
    this.socialization -= 20;
    this.updateStats();
    this.leaveStatus();
  }

  killer() {
    this.feed -= 10;
    this.wash -= 10;
    this.happiness -= 1000;
    this.health -= 1000;
    this.socialization -= 1000;
    this.money -= 1000;
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

function gameOver () {
  document.getElementById('gameStart_js').style.display = 'none';
  document.getElementById('gameOver_js').style.display = 'block';
  document.getElementById('scream_js').play();
}
