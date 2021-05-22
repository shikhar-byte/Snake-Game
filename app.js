const canvas = document.getElementById('canvas');

const pen = canvas.getContext('2d');

pen.fillStyle= 'yellow';

const cs =67;
const H=670;
const W=1200;


let food = null;
let score = 0;
let level= 100;

const snake = {
        init_len : 5,
        direction: "right", 
        cells : [],


        createSnake: function(){
            for(let i=0 ; i< this.init_len ; i++){
                this.cells.push({
                    x : i,
                    y: 0
                })
            }
        } ,



        drawSnake : function(){
            for( let cell of this.cells){
                pen.fillRect(cell.x*cs , cell.y*cs , cs-2 , cs-2);
            }
        },


        updateSnake : function(){

            // Getting the coordinates for current head of snake

            const headX = this.cells[this.cells.length-1].x;
            const headY = this.cells[this.cells.length-1].y;


            // Food and snake head is colliding
            if(headX === food.x && headY === food.y){
                food = getRandomFood();
                
                score = score +1 ;
            }

            else {
                // Removing the first cell
            this.cells.shift();
            }

        
            let nextX, nextY;

            if(this.direction === 'up'){
                nextX = headX;
                nextY = headY - 1;


                if(nextY * cs < 0 ){
                    clearInterval(id);
                    
                    pen.font =' 35px sans-serif';
                    pen.fillText('Game Over', 50, 100);
                }



            }

            else if(this.direction === 'down'){
                nextX = headX;
                nextY = headY + 1;


                if(nextY * cs >=  H ){
                    clearInterval(id);
                    
                    pen.font =' 35px sans-serif';
                    pen.fillText('Game Over', 50, 100);
                }


            }

            else if(this.direction === 'left'){
                nextX = headX - 1;
                nextY = headY;

                if(nextX * cs < 0 ){
                    clearInterval(id);
                    
                    pen.font =' 35px sans-serif';
                    pen.fillText('Game Over', 50, 100);
                }

            }


            else {

                nextX = headX + 1 ;
                nextY = headY ;

                if(nextX * cs >= W){
                    clearInterval(id);

                    pen.font =' 35px sans-serif';
                    pen.fillText('Game Over', 50, 100);
                }

            }

            // Adding the new cell at headX + 1
            this.cells.push({
                x : nextX ,
                y : nextY
            });


                }

}


// Initial Game Condition

function init(){

    food = getRandomFood();

    snake.createSnake();

    pen.fillText(` Score ${score}`, 50,50);

    function keypressed(e){
        
        if(e.key === 'ArrowDown'){
            snake.direction = 'down';
        }

        else if(e.key === 'ArrowUp'){
            snake.direction = 'up';
        }

        else if (e.key === 'ArrowLeft'){
            snake.direction = 'left';
        }

        else {
            snake.direction = 'right';
        }

    }

    document.addEventListener('keydown', keypressed);
}

// Draw

function draw(){
    pen.clearRect(0 ,0 , W, H);
    pen.fillStyle = ' lightgreen ';
    pen.font =' 40px sans-serif';
    pen.fillText(` Score ${score}`, 50,50);
    pen.fillStyle = 'blue'
    pen.fillRect(food.x * cs, food.y * cs, cs ,cs);
    pen.fillStyle = 'yellow'
    snake.drawSnake();
}

// Update 
function update(){

    snake.updateSnake();

}

// GameLoop

function gameLoop(){
    draw();
    update();
    
}

function getRandomFood(){

    const foodX = Math.floor(Math.random()* (W-cs) / cs);
    const foodY = Math.floor(Math.random() * (H-cs) / cs);

    const food ={
        x : foodX,
        y : foodY
    }
    
    return food;    
}

init();



let id = setInterval(gameLoop, level);