$(window).on('load', function(){
  $('.start-screen').addClass('activate');
});

var game = {
  player: {},
  opponent: {},
  opponentBin: [],
  wins: 0,
  isStarted: false,
  attackComplete: false,
  fightOver: false,
  winner: false,
  startGame: function(e) {
    if (game.isStarted === true) {
      return;
    }
    else {
      if(e.keyCode === 13) {
        game.launchSelectPlayer();
      }

    }
  },
  launchSelectPlayer: function() {
    game.isStarted = true;
    $('#start').addClass('activate');
  },
  selectPlayer: function(e) {
      if(!game.isStarted || game.player.isSelected === true) {
        return;
      }
      else {
        // element data
        var searchName = $(this).attr('data-character');
        // save found char here
        var selectedChar = {};
        // loop through array for .name prop matching our searchName
        for (var i=0; i < characters.length; i++) {
            //reset hp
            characters[i].hp = 100;
            if (characters[i].name === searchName) {
              //found it!
                game.player = characters[i];
                game.player.isSelected = true;
            }

            else {
              game.opponentBin.push(characters[i]);
            }
        }
        $(this).addClass('selected');
        $('#opponents .selected-player, #opponents ul').empty();
        console.log(game.player);
        console.log(game.opponentBin);
        $('#opponents .selected-player').addClass(game.player.className).append('<span class="sr-only">' + game.player.name + '</span><span class="dude '+ game.player.className + '"></span>');
        for(i=0; i<game.opponentBin.length; i++) {
          $('#opponents ul').append('<li data-character="'+game.opponentBin[i].name+'" class="'+game.opponentBin[i].className+'"><span class="sr-only">' + game.opponentBin[i].name + '</span><span class="dude face-left '+ game.opponentBin[i].className + '"></span>');
        }
        $('#start').removeClass('activate');
        $('#opponents').addClass('activate');

      }
  },
  chooseOpponent: function(e) {
    if(game.player.isSelected === true && $('#opponents').hasClass('activate')) {
      var searchName = $(this).attr('data-character');

      // loop through array for .name prop matching our searchName
      for (i=0; i<game.opponentBin.length; i++) {
        if (game.opponentBin[i].name === searchName) {
            //found it!
              game.opponent = game.opponentBin[i];
              game.opponent.isSelected = true;
          }

          $(this).addClass('selected');
          game.opponentTaunt(game.opponent.readyTaunt);



     }
     console.log(game.opponent);
     console.log(game.opponentBin);
   }
 },
 opponentTaunt: function(taunt) {
   $('.taunt-screen .taunt').text(taunt);
   $('.taunt-screen h2 span').text(game.opponent.name);
   $('.taunt-screen .selected-player').addClass(game.opponent.className).append('<span class="sr-only">' + game.opponent.name + '</span><span class="dude '+ game.opponent.className + '"></span>');
   $('#opponents').removeClass('activate');
   $('.taunt-screen').addClass('activate');
 },
 startFight: function() {
    $('.fight-screen .stage').addClass(game.opponent.stage);
    $('.fight-screen .stage').append('<div class="fighter player ' + game.player.className + '"><span class="sr-only">' + game.player.name + '</span><span class="dude '+ game.player.className + '"><span class="damage"></span></span>');
    $('.fight-screen .stage').append('<div class="fighter opponent ' + game.opponent.className + '"><span class="sr-only">' + game.opponent.name + '</span><span class="dude face-left '+ game.opponent.className + '"><span class="damage"></span></span>');
    $('.fight-screen .player-name').append(game.player.name);
    $('.fight-screen .player-health').append(game.player.hp);
    $('.fight-screen .opponent-name').append(game.opponent.name);
    $('.fight-screen .opponent-health').append(game.opponent.hp);
    $('.taunt-screen').removeClass('activate');
    $('.fight-screen').addClass('activate');
    setTimeout(function(){$('.fight-screen .stage h2').addClass('fight');},1500);
 },
 attack: function() {
   if (game.attackComplete === true) {
     return;
   }
   else {
    //medium attack generates hits between 20-35 on random
    var attack = Math.floor(Math.random() * (35 - 20 + 1)) + 20;
    console.log('attack: ' + attack);
    if (game.opponent.def === 'hi') {
      attack = attack - 15;
    }

    else if (game.opponent.def === 'lo') {
      attack = attack - 5;
    }

    else { //redundant - *remove me*
      attack = attack;
    }

    game.opponent.hp -= attack;
    console.log(game.opponent.hp);
    $('.fight-screen .opponent .damage').html('-'+attack);
    $('.fight-screen .opponent .damage').addClass('blip');
    setTimeout(function(){$('.fight-screen .opponent .damage').removeClass('blip').empty();}, 1000);
    $('.fight-screen .opponent-health').html(game.opponent.hp);
    game.attackComplete = true;

    var gameOver = game.isFightOver();
    if (gameOver === true) {
      //you win and launch the taunt
      console.log('game over is true');
      game.launchTaunt(game.player);
    }
    else {
      console.log('run couter attack');
    //if no winner run counterAttack
        setTimeout(function(){
          game.counterAttack();
        }, 1000);
      }
    }
  },
  isFightOver: function(){
    console.log('opponent: ' + game.opponent.hp); //debug *remove me*
    console.log('player: ' + game.player.hp); //debug *remove me*
    if(game.opponent.hp <= 0) {
      console.log('computer wins');
      game.fightOver = true;
      game.winner = true;
      return true;
    }
    else if (game.player.hp <=0) {
      console.log('you win');
      game.fightOver = true;
      game.winner = false;
      return true;
    }
    else {
      console.log('the battle rages on!');
      game.fightOver = false;
      return false;
    }
  },
  counterAttack: function() {
    if (game.attackComplete === false && game.fightOver === true) {
      return
    }
    else{
      var attack = Math.floor(Math.random() * (35 - 20 + 1)) + 20;
      if(game.player.def === 'hi') {
        attack = attack - 15;
      }

      else if (game.player.def === 'lo') {
        attack = attack - 5;
      }

      else {
        attack = attack;
      }

      game.player.hp -= attack;
      $('.fight-screen .player .damage').html('-'+attack);
      $('.fight-screen .player .damage').addClass('blip');
      setTimeout(function(){$('.fight-screen .player .damage').removeClass('blip').empty();}, 1000);
      $('.fight-screen .player-health').html(game.player.hp);
      //attack over

      var gameOver = game.isFightOver();
      if (gameOver === true) {
        game.launchTaunt(game.opponent);
      }
      else {
        game.attackComplete = false;
      }
    }
  },
  launchTaunt: function(char) {
    console.log('taunting!');
    if(game.winner) {
      $('.fight-screen .stage').append('<h2>You Win!</h2>');
      $('.end-taunt .inner').prepend('<h2>You Win!</h2>');
      setTimeout(function(){$('.fight-screen .stage h2').addClass('fight');},1500);
    }
    else {
      $('.fight-screen .stage').append('<h2>You Lose!</h2>');
      $('.end-taunt .inner').prepend('<h2>You Lose!</h2>');
      setTimeout(function(){$('.fight-screen .stage h2').addClass('fight');},1500);
    }
      setTimeout(function(){$('.fight-screen').removeClass('activate');}, 1000);
      console.log('launch the taunt modal!')
      $('.end-taunt').addClass('activate');
      $('.end-taunt .taunt').text(char.winTaunt);
      $('.end-taunt .selected-player').addClass(char.className).append('<span class="sr-only">' + char.name + '</span><span class="dude '+ char.className + '"></span>');
  },
  resetFight: function() {
      game.isStarted = false;
      $('.player-health, .opponent-health').empty();
      $('.player-name, .opponent-name').empty();
      $('.fight-screen .stage').removeClass(game.opponent.stage);
      game.opponent = {};
      game.player = {};
      game.player.hp = 100;
      game.opponent.hp = 100;
      game.attackComplete = false;
      game.fightOver = false;
      game.winner = false;
      game.player.isSelected = false;
      game.opponentBin = [];
      $('.character-select li').removeClass('selected');
      $('.end-taunt').removeClass('activate');
      $('.end-taunt h2').remove();
      $('.selected-player').removeClass(game.player.className, game.opponent.className);
      //reset the stage
      game.launchSelectPlayer();

    }
}

var characters = [
  {
    name: 'Tex',
    attk: 'med',
    def: 'med',
    className: 'tex',
    isSelected: false,
    stage: 'turf',
    hp: 100,
    readyTaunt: 'Do your best, and the rest is success!',
    winTaunt: 'Friendships are healthy!'
  },
  {
    name: 'Blade',
    attk: 'hi',
    def: 'lo',
    className: 'blade',
    stage: 'bagno',
    hp: 100,
    isSelected: false,
    readyTaunt: 'Get ready to eat a knuckle sandwich!',
    winTaunt: 'I feast on your tears!'
    },
  {
    name: 'Jerry',
    attk: 'lo',
    def: 'hi',
    className: 'jerry',
    stage: 'road',
    hp: 100,
    isSelected: false,
    readyTaunt: 'Snitches get stitches!',
    winTaunt: 'Stay off drugs!'
  },
  {
    name: 'Reggie',
    attk: 'med',
    def: 'med',
    className: 'reggie',
    stage: 'river',
    hp: 100,
    isSelected: false,
    readyTaunt: 'It\'s go time!',
    winTaunt: 'I didn\'t even break a sweat!'
  }
];

window.addEventListener('keydown', game.startGame);
$('#start ul > li').on('click', game.selectPlayer)
$('#opponents ul').on('click', 'li', game.chooseOpponent);
$('.start-fight').on('click', game.startFight);
$('.attack').on('click', game.attack);
$('.restart').on('click', game.resetFight);
