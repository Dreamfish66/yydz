var configKeyboard = { prevent_repeat: true };
var eventKeyboard = new window.keypress.Listener(this, configKeyboard);
//the fowllowing is some function to gop up down and left
function goUP(x, y, speed) {
    y += speed;
}
function goDOWN(x, y, speed) {
    y -= speed;
}
function goLEFT(x, y, speed) {
    x -= speed;
}
//the above defien the action of the key
//the state 1 is commmon, 1 is samall, 2 is jump
var user_state = 0;
function pulseTAB() {
    if (user_state == 0) {
        console.log('jump');
        user_state = 2;
        setInterval(jump_helper(), 5)
    }
    else {
        console.log("invalid operation");
    }
}

function jump_helper() {
    if (user_state == 2 || user_state == 7) {
        if (usr_y <= 300 && usr_y > usr_Ty) {
            goUP(usr_x, usr_y, 10);
            if (usr_y == usr_ty) {
                user_state = 7;
            }
        }
        else {
            goDOWN(usr_x, usr_y, 10);
            if (usr_y == 300) {
                user_state = 0;
            }
        }
    }
}

function pulseS() {
    if (user_state == 0) {
        console.log('become samell');
        user_state = 1;
    }
}

eventKeyboard.simple_combo(' ', pulseTAB);
eventKeyboard.simple_combo('s', pulseS);

document.addEventListener('keyup', function (key) {
    if (key == 83) {
        user_state = 0;
        console.log('become bigger');
    }
})
//the following define the basic of the chracter
//the box for tawhe character ois 50*100
//All the X y in the following are refer to the center of the box
var usr_x = 700;
var usr_y = 300;
//the box after the man press s is that 50*50
var usr_sx = 700;
var usr_sy = 325;
var usr_Tx = 700;
var usr_Ty = 240;
//the initial position of the LY and the box is 50*20
var LY_x = 1825;
var LY_y = 275;
//the initial position of teh XB and the box is 100*50
var XB_x = 1850;
var XB_y = 325;
var ene_y = [];
var ene_x = [];
var ene_num = 0;
var ene_Type = [];
//the follwoing is that for the canvas
var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
//the following is the inport for the chracter adn the enemy
var background_g = new Image();
background_g.src = "../static/BG.jpg";
var character = new Image();
character.src = "../static/DYY.jpg";
var enemy_XB = new Image();
enemy_XB.src = "../static/XB.jpg";
var enemy_LY = new Image();
enemy_LY.src = "../static/LY.jpg";
var consumer_RK5 = new Image();
consumer_RK5.src = "../static/RK5.jpg";
//the following is the formation of the enenmy
function random_generater() {
    randomType = Math.floor(Math.random() * 1);
    switch (randomType) {
        //the case to generate a XB
        case 0:
            ene_y.push(XB_y);
            ene_x.push(XB_x);
            ene_Type.push(0);
            ene_num++;
        case 1:
            ene_y.push(XB_y);
            ene_x.push(XB_x);
            ene_Type.push(1);
            ene_num++;
    }
}
//the follwoing is the function ofr the movement of the character
var b_x = 0;
var b_y = 0;
function one_step() {
    ctx.clearRect(0, 0, 1600, 500);
    //this paret is for the movement of the background
    ctx.drawImage(background_g, b_x, b_y, 6400, 500);
    goLEFT(b_x, b_y, 10);
    if (b_x <= -4800) {
        b_x = 0;
    }
    //the follwoing is the the moving and drawing ofr the enemy
    for (temp = 0; temp < ene_num; temp++) {
        if (ene_Type[temp] == 0) {
            ctx.drawImage(enemy_XB, ene_x[temp], ene_y[temp], 100, 50);
            goLEFT(ene_x[temp], ene_y[temp], 10);
        }
        if (ene_Type[temp] == 1) {
            ctx.drawImage(enemy_LY, ene_x[temp], ene_y[temp], 50, 20);
            goLEFT(ene_x[temp], ene_y[temp], 10);
        }
    }
    //the following is the graph for the chracter
    if (user_state == 1) {
        ctx.drawImage(character, usr_sx, usr_sy, 50, 50);
    }
    else {
        ctx.drawImage(character, usr_x, usr_y, 50, 100);
    }
    detecter();
}
//the following is the function for detect the click and the function to remove the enemy outof bound
function remove() {
    for (temp = 0; temp < ene_num; temp++) {
        if (ene_Type[temp] == 0) {
            if (ene_x[temp] <= 0) {
                ene_Type.splice(temp, 1);
                ene_x.splice(temp, 1);
                ene_y.splice(temp, 1);
            }
        }
    }
}

function detecter() {
    //the following is the judging box for the chjaracter
    left_x = 675;
    right_x = 725;
    up_y = usr_y - 50;
    down_y = usr_y + 50;
    up_sy = 300;
    down_sy = 350;
    for (i = 0; i < ene_num; i++) {
        if (ene_Type[i] == 0) {
            l_x = ene_x[i] - 50;
            r_x = ene_x[i] + 50;
            u_y = ene_y[i] - 25;
            d_x = ene_y[i] + 25;
            if (user_state == 0 && l_x < right_x && r_x >= left_x && down_y >= u_y) {
                alert("click with XB");
            }
            else if (user_state == 1 && l_x < right_x && r_x >= left_x) {
                alert("click with XB");
            }

        }
        if (ene_Type[i] == 1) {
            l_x = ene_x[i] - 25;
            r_x = ene_x[i] + 25;
            u_y = ene_y[i] - 10;
            d_x = ene_y[i] + 10;
            if (l_x < right_x && r_x >= left_x) {
                if (user_state != 1) {
                    alert("click with LY");
                }
            }
        }
    }

}
//the following function is the initializer
function initialize() {
    setInterval(one_step, 5);
}
