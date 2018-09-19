// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;


// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(720, 330, 'gem');
  createItem(000, 230, 'gem');
  createItem(720, 530, 'gem');
  createItem(410, 170, 'gem');
  createItem(720,  90, 'gem');
  createItem(575, 530, 'gem');

    
  createItem(650, 540, 'ghost'); 
  createItem(150, 240, 'ghost');
  createItem(170, 545, 'ghost');
   
  createItem(600, 345, 'zombie');  
  createItem(220, 245, 'zombie');   
    
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(330, 435, 'platform');
  platforms.create(143, 520, 'platform');
  platforms.create(375, 230, 'platform');
  platforms.create(575, 310, 'platform'); 
  platforms.create(0, 430, 'platform2');
    
    
  platforms.create(700, 400, 'platform2');
  platforms.create(600, 400, 'platform2');
  platforms.create(500, 400, 'platform2');
  
  platforms.create(000, 300, 'platform2');
  platforms.create(100, 300, 'platform2');
  platforms.create(200, 300, 'platform2');
      
  platforms.create(700, 150, 'platform2');
  platforms.create(350, 100, 'platform2');
  
    
  platforms.setAll('body.immovable', true);
}



// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(360, 50, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if (item.key === 'gem') {
     currentScore = currentScore + 20;
  }
  else if (item.key === 'ghost'){
        currentScore = currentScore - 10;   
  }
    else if(item.key === 'zombie'){
        
        currentScore = currentScore - 10;
    }
    if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#7851a9';
    game.load.image('gamebackground', 'gamebackground.png');
    game.load.image('platform', 'Leo.png');
    game.load.image('platform2', 'grass.png')
    this.game.load.image('gamebackground','gamebackground.png');
    //Load spritesheets
    game.load.spritesheet('player', 'character.png', 64, 64);
    game.load.spritesheet('gem', 'gems.png', 64, 64);
    game.load.spritesheet('ghost','ghost.png',63,52);
    game.load.spritesheet('zombie','ghoul.png',61,60);
    game.load.spritesheet('badge','badge.png',100,36);
  }

  // initial game set up
  function create() {
    game.add.image(game.world.centerX, game.world.centerY, 'gamebackground').anchor.set(0.5);
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
      
    
  }

  // while the game is running
  function update() {
    text.text = "LIFE FORCE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;
    
    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -300;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "SOUL RETURNED!!!";
    }
  
  }

//reset: function(){
//   this.game.state.start('Game', true, false); 
//    
    
    
    
    
    
//}
  function render() {

  }

    
    
    
};
