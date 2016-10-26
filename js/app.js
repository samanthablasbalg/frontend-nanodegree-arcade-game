// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y;
    this.speed = Math.floor((Math.random()*200)+1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    if (this.x + 20 > 505)
    {
        this.x = -20;
        this.speed = Math.floor((Math.random()*200)+1);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 375;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.update = function(dir,value)
{
    if (dir === 'x')
    {
        // board check
        var withinX = (this.x+value >= 0) && (this.x+value <= 400);
        if (withinX)
        {
            this.x = this.x + value;
        };        
    }
    else 
    {
        //board check
        var withinY = (this.y+value >= -50) && (this.y+value <= 375);
        if (withinY)
        {
            this.y = this.y + value;
        };        
    };

    // collision check
    // for (var i = 0, len = allEnemies.length; i<len; i++)
    // {
    //     enemyXMin = allEnemies[i].x-100;
    //     enemyXMax = allEnemies[i].x;
    //     if (this.x > enemyXMin && this.x < enemyXMax)
    //     {
    //         this.x = 200;
    //         this.y = 375;
    //     };
    // };
};

Player.handleInput = function(key) {
    if (key === 'up')
    {
        player.update('y',-85);
    }
    else if (key === 'down')
    {
        player.update('y',85);
    }
    else if (key === 'left')
    {
        player.update('x',-100);
    }
    else
    {
        player.update('x',100);
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [new Enemy(35), new Enemy(120), new Enemy(205)];
var player = new Player;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    Player.handleInput(allowedKeys[e.keyCode]);
});
