const game=()=>{
	//scores
	let pScore=0;
	let cScore=0;
	//function to load game
	const loadGame=()=>{
		setTimeout(()=>{
			document.querySelector('.preloader').style.opacity='0';
			document.querySelector('.wrapper').style.transform=`translateX(-100%)`;
			document.querySelector('.wrapper').style.transition='transform 1s ease';
		},4000);
	}
	//function to start game
	const startGame=()=>{
		const startBtn=document.querySelector('.intro button');
		const themeMusic=document.querySelectorAll('audio')[3];
		startBtn.addEventListener('click',()=>{
			const game=document.querySelector('.game');
			const intro=document.querySelector('.intro');
			//fade in the game
			game.classList.add('fade-in');
			//fade out the introduction
			intro.classList.add('fade-out');
			setTimeout(()=>{
				themeMusic.play();
				themeMusic.loop=true;
				themeMusic.playbackRate=1.2;
			},950);
		});
	}
	//function to control audio
	const audioControl=()=>{
		const control=document.querySelector('.volume');
		const audios=document.querySelectorAll('audio');
		let clicked=false;
		control.addEventListener('click',function(){
			if(!clicked){
				this.querySelector('span').className='fa fa-volume-mute';
				audios.forEach(function(audio){
					audio.muted=true;
				});
				clicked=true;
			}
			else{
				this.querySelector('span').className='fa fa-volume-up';
				audios.forEach(function(audio){
					audio.muted=false;
					audio.currentTime=0;
				});
				clicked=false;
			}
		});
	}
	//computer chooses an option
	const cChoose=()=>{
		const options=['rock','paper','scissors'];
		let cOption=options[Math.floor(Math.random()*3)];
		//update computer hand image
		document.querySelector('.computer-hand').src='images/'+cOption+'.png';
		return cOption;
	}
	//update score
	const updateScore=()=>{
		const pScoreDisp=document.querySelector('.you p');
		const cScoreDisp=document.querySelector('.computer p');
		pScoreDisp.textContent=pScore;
		cScoreDisp.textContent=cScore;
	}
	//coumputer wins
	const computerWins=()=>{
		const winner=document.querySelector('.match h2');
		const wrongSound=document.querySelectorAll('audio')[1];	wrongSound.volume=0.2;
		cScore++;
		updateScore();
		winner.style.color='red';
		winner.textContent='Computer scored!';
		wrongSound.currentTime=0;
		wrongSound.play();
	}
	//player wins
	const playerWins=()=>{
		const winner=document.querySelector('.match h2');
		const correctSound=document.querySelectorAll('audio')[0];
		pScore++;
		updateScore();
		winner.style.color='green';
		winner.textContent='You scored!';
		correctSound.currentTime=0;
		correctSound.play();
	}
	//tie
	const tie=()=>{
		const winner=document.querySelector('.match h2');
		const tieSound=document.querySelectorAll('audio')[2];
		winner.style.color='#d5d5d5';
		winner.textContent="It's a tie!";
		tieSound.currentTime=0;
		tieSound.play();
	}
	//function to compare two hands and choose a winner
	const compareHands=(pChoice,cChoice)=>{
		if(pChoice===cChoice)
		{
			tie();
			return;
		}
		if(pChoice==='rock')
		{
			if(cChoice==='paper')
			{
				computerWins();
				return;
			}
			else
			{
				playerWins();
				return;
			}
		}
		if(pChoice==='paper')
		{
			if(cChoice==='scissors')
			{
				computerWins();
				return;
			}
			else
			{
				playerWins();
				return;
			}
		}
		if(pChoice==='scissors')
		{
			if(cChoice==='rock')
			{
				computerWins();
				return;
			}
			else
			{
				playerWins();
				return;
			}
		}
	}
	//run game
	const run=()=>{
		//player chooses an option
		const options=document.querySelectorAll('.options button');
		options.forEach(function(option){
			option.addEventListener('click',function(){
				//make all buttons unclickable
				options.forEach(function(option){
					option.style.pointerEvents='none';
				});
				this.style.pointerEvents='none';
				let pChoice=this.textContent;	//player choice
				const playerHand=document.querySelector('.player-hand');
				const computerHand=document.querySelector('.computer-hand');
				//each time we play we start from rock
				playerHand.src='images/rock.png';
				computerHand.src='images/rock.png';
				//animate the hands
				playerHand.style.animation='shake-player 0.3s ease forwards 3';
				computerHand.style.animation='shake-computer 0.3s ease forwards 3';
				//at animation end remove animation from both hands
				playerHand.addEventListener('animationend',function(){
					this.style.animation='';
				});
				computerHand.addEventListener('animationend',function(){
					this.style.animation='';
				}); 
				setTimeout(function(){
				//update player hand image
				document.querySelector('.player-hand').src='images/'+pChoice+'.png';
				//computer chooses eachtime player chooses
				let cChoice=cChoose();	//computer choices
				compareHands(pChoice,cChoice);
				},900);
				//make all button clickable after round ends
				setTimeout(function(){
					options.forEach(function(option){
						option.style.pointerEvents='all';
					});
				},950);
			});
		});
	}


	//call the functions
	loadGame();
	startGame();
	audioControl();
	run();
}
//----------------------------------------------------------------------------------------------------
window.addEventListener('load',()=>{
	game();
});