class Blob{
    
    constructor(color, size){
        this.x = Math.random() * (canvas.width-size);
        this.y = Math.random() * (canvas.height-size);
        this.color = color;
        this.size = size;
        this.x_inc = Math.random();
        this.y_inc = Math.random();
        this.last_x = 0;
        this.last_y = 0;
    }

    draw(){
        contex.beginPath();
        contex.arc(this.x, this.y, this.size, 0, tau);
        contex.fillStyle = this.color;
        contex.fill();
        contex.stroke();
    }

    move(){
        let x_end = this.size + this.x;
        let y_end = this.size + this.y;
        let x_start = this.x - this.size;
        let y_start = this.y - this.size;

        if (x_start <= 0 || x_end > canvas.width) {
            this.x_inc *= -1;
            if (x_end-canvas.width>2) 
            {
                this.x = canvas.width - this.size;
            }
            else if (x_start<-2){
                this.x = this.size;
            }
            
        }
        if (y_start <= 0|| y_end > canvas.height) {
            this.y_inc *= -1;
            if (y_end - canvas.height > 2) 
            {
                this.y = canvas.height - this.size -2;
            }
            else if (y_start < -2){
                this.y = this.size + 2;
            }
            
        }
        this.x += this.x_inc;
        this.y += this.y_inc;
    }

    check_collision(otherBlob){
        let point1 = Math.pow(this.x-otherBlob.x, 2);
        let point2 = Math.pow(this.y-otherBlob.y, 2);
        let diff = Math.floor(Math.sqrt(point1+point2));
        let radius = this.size + otherBlob.size;

        const smallerBlob = this.size < otherBlob.size ? this : otherBlob;
        const biggerBlob = this.size > otherBlob.size ? this : otherBlob;

        if (diff > radius) return;
        
        if (diff < (radius * .90)){

            smallerBlob.x += (Math.sign(smallerBlob.x_inc) * radius);
            smallerBlob.y += (Math.sign(smallerBlob.y_inc) * radius);
        }

        
        smallerBlob.x_inc += (alpha1*biggerBlob.x_inc); 
        smallerBlob.y_inc += (alpha1*biggerBlob.y_inc);

        biggerBlob.x_inc -= (alpha2*smallerBlob.x_inc);
        biggerBlob.y_inc -= (alpha2*smallerBlob.y_inc);
        
        
        smallerBlob.x_inc = limitSpeed(smallerBlob.x_inc, limit);
        smallerBlob.y_inc = limitSpeed(smallerBlob.y_inc, limit);

        biggerBlob.x_inc = limitSpeed(biggerBlob.x_inc, limit);
        biggerBlob.y_inc = limitSpeed(biggerBlob.y_inc, limit);
    }
}

function limitSpeed(value, limit){
    if (Math.abs(value) < limit){
        return value;
    }
    return Math.sign(value) * limit/2;

}

function random_choice(arr){
    let rand_choice = Math.floor(arr.length * Math.random());
    return arr[rand_choice];
}

const canvas = document.getElementById("blob_playground");
const contex = canvas.getContext("2d");
const no_of_blobs_input = document.getElementById("no_of_blobs");
const collision_input = document.getElementById("collision");
const reset_btn = document.getElementById("reset");

const limit = 2;
const tau = 2 * Math.PI;
const alpha1 = 0.7;
const alpha2 = 0.1;
const colors = new Array("red", "green", "blue", "yellow", "pink", "orange", "cyan", "black", "grey");
const sizes = new Array(10, 15, 20, 25, 30);

let blobs = new Array();
let number_of_blobs = 5;
let collision_on = false;

function check_collision(){
    for (let i=0; i < blobs.length; i++){
        for (let j=i+1; j<blobs.length; j++){
            blobs[i].check_collision(blobs[j]);
        }
    }
}

function setup_blobs(){
    for (let i=0; i<number_of_blobs; i++){
        let current_color = random_choice(colors);
        let current_size = random_choice(sizes);
        blobs.push(
            new Blob(current_color, current_size)
        );
    }
}

function reset(){
    blobs = new Array();
    no_of_blobs_input.value = number_of_blobs;
    setup_blobs();
}


setInterval(
    () => {
        contex.clearRect(0,0, canvas.width, canvas.height);
        if (collision_on) check_collision();
        blobs.forEach(obj => {
            obj.draw();
            obj.move();
        });
    },
    10);

no_of_blobs_input.addEventListener("change", (event)=>{
    if (no_of_blobs_input.value > 10 || no_of_blobs_input.value < 1){
        no_of_blobs_input.value = 5;
    }
    number_of_blobs = no_of_blobs_input.value;
    reset();
});

collision_input.addEventListener("change", (event)=>{
    collision_on = collision_input.checked;
});

reset_btn.addEventListener("click", (event)=>{
    reset();
})

reset();