/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,gameplaying,last;

function init(){ 

    scores =[0,0];
    activePlayer =0;
    roundScore =0;
    gameplaying = true; 
    last = 0; 
    document.getElementById('dice-1').style.display='none';  
    document.getElementById('dice-2').style.display='none'; 
    document.getElementById('score-0').textContent = '0'; 
    document.getElementById('score-1').textContent = '0';  
    document.getElementById('current-0').textContent = '0';  
    document.getElementById('current-1').textContent = '0'; 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').style.display ='block';  

 }

init();
   
    
//select an element jist like selecting in css 
//document.querySelector('#current-' + activePlayer).textContent = dice;//change the text contnet

//document.querySelector('#current-'+ activePlayer).innerHTML ='<em>' +dice +'</em>';//select an element on the html and style it 


 
//this is an annonimus function
document.querySelector('.btn-roll').addEventListener('click',function(){

    document.querySelector('.final-score').style.display ='none'; 
    if(gameplaying){
        //1.Random number
        var dice1 = Math.floor(Math.random() *6) +1;   
        var dice2 = Math.floor(Math.random() *6) +1;   

         
       document.getElementById('dice-1').style.display = 'block';
       document.getElementById('dice-2').style.display = 'block';
 
       document.getElementById('dice-1').src ='dice-'+ dice1 +'.png';   
       document.getElementById('dice-2').src ='dice-'+ dice2 +'.png';   

       if(dice1!== 1 && dice2!==1){
        //ADD score  
        roundScore +=dice1+dice2; 
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } 
        else
            nextPlayer(); 
    }
 /* 
    //3Update the round score only if the rol number is not one
    if(dice === last){
        scores[activePlayer] = 0; 
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();
    }
   */
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gameplaying){
          //1.Add current score to global score
    scores[activePlayer] += roundScore;
       
    //2.Update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores [activePlayer];
    
    //read an input from the user 
    var input =document.querySelector('.final-score').value;
    //undefined , 0 , null , or empty string COERCED to false,anything else is true
    var winningscore;
    if (input)
         winningscore = input;
        else
        winningscore = 20;



    //3.check if player won the game   
    if (scores[activePlayer] >= winningscore){
        document.querySelector('#name-' + activePlayer).textContent ='Winner';
        document.querySelector('#dice-1').style.display = 'none'; 
        document.querySelector('#dice-2').style.display = 'none'; 
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        gameplaying=false; 
    }

        else
            nextPlayer(); //next player
    }
    
  
});
 

function nextPlayer() {
     //next player
     activePlayer === 0? activePlayer = 1 : activePlayer = 0;
     roundScore = 0; 

     document.getElementById ('current-0').textContent = '0'; 
     document.getElementById ('current-1').textContent = '0';
      
     //toggle -> if its ther then remove it,and if its not then add it
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');

     //document.getElementsByClassName('player-0-panel').classlist.remove('active');
     //document.querySelector('player-1-panel').classlist.add('active');

     document.querySelector('dice-1').style.display ='none';  
     document.querySelector('dice-2').style.display ='none'; 

}

document.querySelector('.btn-new').addEventListener('click',init);
 
 

/* var x = document.querySelector('#score-0').textContent;
console.log(x); 
 
/* change the CSS properties 
console.log(document.querySelector('.dice').hasChildNodes()); */