var anchoJuego=800;
var altoJuego=400;


var juego = new Phaser.Game(anchoJuego,altoJuego,Phaser.CANVAS,'bloque_juego');

juego.state.add('Menu' , Menu);
juego.state.add('Juego' , Juego);
juego.state.add('Game_Over' , Game_Over);

juego.state.start('Menu');