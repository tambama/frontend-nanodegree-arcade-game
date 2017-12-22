// Track Player Score.
var score = 0;

function updateScore(){
    $('#score').html(score);    
}

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x, y, s){
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = s;
    }

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    update(dt){
        if (this.x < 515) {
            // multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            this.x += this.speed * dt;
        }
        else {
            this.x = -100;
        }
    
        // reset and restart score counter when there is a collision
        if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
            score = 0;
            player.reset();
        }
    }

    // this method draws the enemy on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update(){
        // increment score if player has reached the water
        if(this.y < 20){
            score++
            this.reset();
        }
    }

    // render the player
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // handle player's input
    handleInput(dt){
        switch (dt) {
            case 'left':
                this.x -= (this.x > 0) ? 50 : 0; 
                break;
            case 'right':
                this.x += (this.x < 400) ? 50 : 0;
                break;
            case 'up':
                this.y -= (this.y > 3) ? 50 : 0;
                break;
            case 'down':
                this.y += (this.x < 400) ? 50 : 0;
                break;
            default:
                alert('wrong key!');
        }
    }

    // reset on collision or on reaching the water
    reset(){
        updateScore();
        depopulateEnemies();
        populateEnemies();
        this.x = 200;
        this.y = 320;
    }
}

//generate random start position for enemies
function getRandom(num, colRow){
    return Math.floor((Math.random() * num) + 1) * colRow;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

function populateEnemies(){
    for (var i=0; i < 5; i++) {
        var speed = 100 + Math.floor(Math.random() * 300);
        var enemy = new Enemy(-(getRandom(5, 103)), getRandom(3, 83), speed);
        allEnemies.push(enemy);
    }
}

// empty the enemies array
function depopulateEnemies(){
    allEnemies = [];
}

// Place the player object in a variable called player
var player = new Player(200,320);
populateEnemies();
updateScore();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
