var Game_Over= {
	preload: function(){
		juego.stage.backgroundColor= '#fff';
		juego.load.image('boton', 'img/btn.png');
	},
	create: function(){
		var boton = this.add.button(juego.width/2,juego.height/2, 'boton',this.iniciarJuego,this);
		boton.anchor.setTo(0.5);
		var txtIniciar=juego.add.text(juego.width/2,juego.height/2-85,'Juego Terminado',{font:'bold 24px sans-serif' , fill : 'black' , align:'center'});
		var txtTitulo=juego.add.text(juego.width/2,juego.height/2-125,'Flappy Bird',{font:'bold 30px sans-serif' , fill : 'black' , align:'center'});
		txtIniciar.anchor.setTo(0.5);
		txtTitulo.anchor.setTo(0.5);
	},
	iniciarJuego: function(){
		this.state.start('Juego');
	},
	update: function(){

	}
}