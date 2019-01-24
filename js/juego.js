var bg;
var tubos;
var flappy;
var salto;
var timer;
var puntos=-1;
var txtPuntos;


var Juego= {
	preload: function(){
	juego.load.image('bg','img/bg1.png');
	juego.load.spritesheet('pajaros','img/pajaros.png',33,33);
	juego.load.image('tubo','img/tubo1.png');
	juego.forceSingleUpdate=true;
	},
	create: function(){
	bg = juego.add.tileSprite(0,0,800,400,'bg');
	juego.physics.startSystem(Phaser.Physics.ARCADE);
	tubos = juego.add.group();
	tubos.enableBody = true;
	tubos.createMultiple(20,'tubo');
	flappy = juego.add.sprite(100,245,'pajaros');
	flappy.frame = 0;
	flappy.anchor.setTo(0,0.5);
	flappy.animations.add('vuelo',[0,1],10,true);
	flappy.animations.add('muere',[2],10,true);
	salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	salto.onDown.add(this.saltar,this)
	juego.physics.arcade.enable(flappy);
	flappy.body.gravity.y = 1200;
	timer = juego.time.events.loop(4000,this.crearColumna, this);
	 txtPuntos=juego.add.text(20,20,'0',{font:'bold 24px sans-serif' , fill : '#fff ' , align:'center'});
	 flappy.alive = true;
	},

	update: function(){				
		if(flappy.inWorld == false)
		{
			// reiniciar enviar a gameover
			this.state.start('Game_Over');
			flappy.alive = false;
		}
		else if(flappy.position.y > 340)
		{
			// reiniciar enviar a gameover
			console.log(flappy.position.y);
			this.state.start('Game_Over');
			flappy.alive = false;

		}
		else
		{
			bg.tilePosition.x -= 3;
		}
		if(flappy.alive == true){
			flappy.animations.play('vuelo');
		}else{
			flappy.animations.play('muere');
			puntos = -1;
		}
		juego.physics.arcade.overlap(flappy,tubos,this.tocoTubo,null,this);
		
		if(flappy.angle < 20)
		{
			flappy.angle +=1;
		}
		//console.log(flappy.position.y);
	},

	saltar: function(){
		if(flappy.alive == true)
		{
			flappy.body.velocity.y= -350;
			juego.add.tween(flappy).to({angle:-20},100).start();

		}

	},
	crearColumna: function(){
		var hueco = Math.floor(Math.random()*5)+1;
		for(var i = 0; i < 8; i++)
		{
			if ( i != hueco && i != hueco+1)
			{
				this.crearUnTubo(700,i*50)
			}
		}
		puntos++;
		txtPuntos.text=puntos;
	},
	crearUnTubo: function(x,y){
		var tubo = tubos.getFirstDead();

		tubo.reset(x,y);
		tubo.body.velocity.x=-400;
		tubo.checkWorldBounds = true;
		tubo.outOfBoundsKill = true;

	},
	tocoTubo: function () {

		if(flappy.alive == false)
			return;
		flappy.alive=false;
		juego.time.events.remove(timer);
		tubos.forEach(function(t) {
			t.body.velocity.x=0;
		},this);
		
	}
}