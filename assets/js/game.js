$(window).on('load', function(){
  $('.start-screen').addClass('activate');
});

var game = {
  player: {},
  opponent: {},
  opponentBin: [],
  wins: 0,
  isStarted: false,
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
    $('.character-select').addClass('activate');
  },
  selectPlayer: function(e) {
      if(!game.isStarted) {
        return;
      }
      else {
        var charName = $(this).attr('data-character');
        console.log(characters.charName);
      }
  }
}

characters: {
  tex: {
        name: 'Tex',
        attk: 'med',
        def: 'med',
        className: 'tex'
      },
  blade: {
    name: 'Blade',
    attk: 'hi',
    def: 'lo',
    className: 'blade'
    },
  jerry: {
    name: 'Jerry',
    attk: 'lo',
    def: 'hi',
    className: 'jerry'
  },
  reggie: {
    name: 'Reggie',
    attk: 'med',
    def: 'med',
    className: 'reggie'
  }
}

window.addEventListener('keydown', game.startGame);
$('.character-select ul > li').on('click', game.selectPlayer);
