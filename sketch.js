let floor;
let gameChar;
let moon;
let cloud1;
let cloud2;
let item;
let tree;
let church;
let canyon;

function setup()
{
	createCanvas(1024, 576);
	//character
	floor = {
	height: 154,
	color: color(37, 52, 45),
	drawFloor: function()
		{
			noStroke();
			fill(this.color);
			rect(0, height - this.height, width, this.height);
		}
	};
	gameChar = {	
		gameChar_x: 512,
		gameChar_y: 362,
		width: 60,
        height: 60,
		grounded: false,
		speedGravity: -5,
		color: color(255, 250, 250),
		color_dark: color(169, 169, 169),
		dead: false,
		drawCharacter: function()
			{//Character - FRONT
				noStroke();
				fill(this.color);
            	rect(this.gameChar_x, this.gameChar_y, this.width, this.height);
			},
		gravity: function()
			{
				if (this.speedGravity > -5)
					this.speedGravity--;
				if (this.gameChar_y + this.height < height - floor.height)
					this.gameChar_y -= this.speedGravity;
				else 
				{
					this.grounded = true;
				}
			},
		jump: function()
			{
				this.speedGravity = 15;
				this.gameChar_y -= this.speedGravity;
				this.grounded = false;
			},
		moveLeft: function() { this.gameChar_x -= 4; },
        moveRight: function() { this.gameChar_x += 4; },
        movement: function() 
        {
            if (!this.dead){
                if (this.grounded && keyIsDown(32))
                    this.jump();
                if (keyIsDown(68))
                    this.moveRight();
					if (gameChar.gameChar_x > 965)
						gameChar.gameChar_x -= 5;
                if (keyIsDown(65))
                    this.moveLeft();
					if (gameChar.gameChar_x < 0)
						gameChar.gameChar_x += 5;
            }
        },
		canyonCheck: function(){
				if (this.grounded && canyon.danger.includes(gameChar.gameChar_x))
					this.dead = true;
		},
		deadAnimation: function()
        {
            if (this.dead)
            {
                if (this.gameChar_y < height)
                    this.gameChar_y -= this.speedGravity;
                else
                {
                    this.gameChar_y = height - floor.height - this.width;
                    this.gameChar_x = 100;
                    this.grounded = true;
                    this.dead = false;
                }
            }
        }
	};
	
	moon = {
		color: color(103, 106, 119),
		drawMoon: function()
		{
			stroke(this.color); //moon
			strokeWeight(300);
			point(150, 100);
		}
	};
	
	gameItem = {
		item_x: 400,
		item_y: 400,
		drawItem: function(){
			stroke(0, 0, 0);
			strokeWeight(7);
			fill(212, 166, 55);
			rect(gameItem.item_x, gameItem.item_y, 25, 22);
			fill(0,0,0);
			triangle(gameItem.item_x - 2, gameItem.item_y, gameItem.item_x + 27, gameItem.item_y, gameItem.item_x + 12, gameItem.item_y - 20);
			strokeWeight(10);
			point(gameItem.item_x + 12, gameItem.item_y - 25);
		}
	};
	
	church = {
		color: color(30, 31, 36),
		drawChurch: function(){
			noStroke();
			fill(this.color);
			rect(400, 330, 300, 92);
			rect(400, 270, 30, 80);
			rect(670, 270, 30, 80);
			triangle(390, 270, 440, 270, 415, 240);
			triangle(660, 270, 710, 270, 685, 240);
			triangle(460, 400, 640, 400, 550, 100);
		}
	};
	
	tree = {
		color: color(24, 22, 21),
		drawTree: function(){
			fill(this.color);
			triangle(830, 423, 870, 423, 850, 100);
			triangle(840, 400, 820, 310, 840, 370);
			triangle(850, 280, 870, 200, 850, 260);
		}
	};
	
	cloud1 = {
		color: color(59, 60, 67),
		x: 50,
		y: 300,
		drawCloud: function(){
			stroke(this.color); //cloud 1
			strokeWeight(100);
			point(this.x - 370, this.y + 110);
			strokeWeight(150);
			point(this.x - 300, this.y + 80);
			strokeWeight(200);
			point(this.x - 200, this.y + 40);
			strokeWeight(250);
			point(this.x - 100, this.y + 20);
			strokeWeight(300);
			point(this.x, this.y);
			strokeWeight(250);
			point(this.x + 100, this.y + 20);
			strokeWeight(200);
			point(this.x + 200, this.y + 40);
			strokeWeight(150);
			point(this.x + 300, this.y + 80);
			strokeWeight(100);
			point(this.x + 370, this.y + 110);
		},
		cloudMove: function(){
			if (this.x < 1504)
				this.x += 0.5;
			else
				this.x = -500;
		}
	};
	
	cloud2 = {
		color: color(59, 60, 67),
		x: 480,
		y: 100,
		drawCloud: function(){
			stroke(this.color);
			strokeWeight(100); //cloud 2
			point(this.x, this.y);
			strokeWeight(150);
			point(this.x + 70, this.y);
			strokeWeight(200);
			point(this.x + 170, this.y);
			strokeWeight(250);
			point(this.x + 270, this.y);
			strokeWeight(250);
			point(this.x + 370, this.y);
			strokeWeight(200);
			point(this.x + 470, this.y);
			strokeWeight(150);
			point(this.x + 570, this.y);
			strokeWeight(100); 
			point(this.x + 650, this.y);
		},
		cloudMove: function(){
			if (this.x < 1024)
				this.x += 1;
			else
				this.x = -1000;
		}
	};
	
	canyon = {
		color_outside: color(27, 32, 28),
		color_inside: color(0, 0, 0, 100),
		x: 100,
		y: 422,
		danger:[],
		numbers: function(){
			for (var i = this.x; i <= this.x + 80; i++){
				this.danger.push(i);
			}
		},
		drawCanyon: function(){
			fill(this.color_outside);
			rect(this.x, this.y, this.x + 50, this.y - 268);
			fill(this.color_inside);
			rect(this.x + 10, this.y, this.x + 30, this.y - 100);
		}
	};
}


function draw()
{
	background(64, 82, 98); 
	//fill the sky blue
	moon.drawMoon();
	cloud1.drawCloud();
	cloud1.cloudMove();
	cloud2.drawCloud();
	cloud2.cloudMove();
	floor.drawFloor();
		//2. a mountain in the distance
	church.drawChurch(); //church
		//3. a tree
	tree.drawTree();
		//4. a canyon 
		//NB. the canyon should go from ground-level to the bottom of the screen
	canyon.drawCanyon();
	canyon.numbers(); //считает опасные x
		//5. a collectable item
		//lantern
	gameItem.drawItem();
	gameChar.drawCharacter();
	gameChar.gravity();
	gameChar.movement();
	gameChar.canyonCheck();
	gameChar.deadAnimation();
}




