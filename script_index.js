let timeout;
let stage = 0;
let startTime, stopTime, time;
let warunek = false;
let average=0, attempts = [], sum=0;

$('#button').on('mousedown', prepare);

function prepare(){
	$('#button').off('mousedown', prepare);

	warunek = false;
	stage = 0;
	stage++;
	if(stage != 1) return;
	
	//document.getElementById("button").remove();
	//document.querySelector("h1").innerHTML = "Reaction Time Test";
	//document.querySelector("h2").innerHTML = "When the red box turns green, click as quickly as you can. Click to start";
	//document.querySelector("section").setAttribute('id', 'sekcja');
	//document.querySelector("section").addEventListener('click', start);
	$('#button').remove();
	$('h1').html('Reaction Time Test');
	$('h2').html('When the red box turns green, click as quickly as you can. Click to start');
	$('section').attr('id', 'sekcja');
	$('section').on('click',  start);
}

function start(){
	$('section').off('click',  start);
	stage++;
	if(stage != 2) return;
	//document.getElementById("sekcja").setAttribute('class', 'container-fluid bg-danger text-white');
	//document.getElementById("icon").innerHTML ="<i class='icon-dot-3'></i> ";
	//document.getElementById("icon").style.width='180px';
	//document.getElementById("icon").style.paddingTop='50px';
	//document.querySelector("h1").innerHTML = "Wait for green";
	//document.querySelector("h2").innerHTML = "";
	$('section').removeAttr('class');
	$('section').addClass('container-fluid bg-danger text-white');
	$('#icon').html("<i class='icon-dot-3'></i> ");
	$('#icon').css('width', '180px');
	$('#icon').css('padding-top', '50px');
	$('h1').html('Wait for green');
	$('h2').html('');



	let losowa = Math.random()*4+1;
	timeout = setTimeout(changeToGreen, losowa*1000);

	//document.getElementById('sekcja').addEventListener('mousedown', toEarly);
	$('section').on('mousedown', toEarly);
}

function changeToGreen(){
	$('section').off('mousedown', toEarly);
	startTime = new Date();
	//document.getElementById("sekcja").setAttribute('class', 'container-fluid bg-success text-white');
	//document.querySelector("h1").innerHTML = 'Click!';
	//document.querySelector("h2").innerHTML = "";
	//document.getElementById("sekcja").addEventListener("mousedown", finish);
	$('section').removeAttr('class');
	$('section').addClass('container-fluid bg-success text-white');
	$('h1').html('Click!');
	$('h2').html('');
	$('section').on('mousedown', finish);
}

function finish(){
	$('section').off('mousedown', finish);
	finishTime = new Date();
	time = finishTime - startTime;
	attempts.unshift(parseInt(time));
	sum+=attempts[0];
	average=sum/attempts.length;

	//if(warunek==false){
		//document.querySelector("section").setAttribute('class', 'container-fluid bg-primary text-white');
		$('section').removeAttr('class');
		$('section').addClass('container-fluid bg-primary text-white');
		$('#icon').html("<i class='icon-clock'></i> ");
		$('h1').html(time+' ms');
		$('h2').html('<span>Average | '+Math.round(average)+'</span><span>Tries | '+attempts.length+'</span>');
		$('section').removeAttr('id');

		let btn = document.createElement("button");
		btn.innerHTML = "Click to try again";
		btn.setAttribute('id', 'button');
		btn.setAttribute('onClick', 'prepare();');
		document.querySelector("h2").after(btn);

		//warunek = true;
	//}
}

function toEarly(){
	$('section').off('mousedown', toEarly);
	stage++;
	clearTimeout(timeout);
	if(stage != 3) return;
	//document.getElementById("sekcja").setAttribute('class', 'container-fluid bg-danger text-white');
	//document.getElementById("icon").innerHTML ="<i class='icon-warning'></i> ";
	//document.querySelector("h1").innerHTML = "Too soon!";
	//document.querySelector("h2").innerHTML = "";
	//document.getElementById('sekcja').removeAttribute('id');
	$('section').removeAttr('class');
	$('section').addClass('container-fluid bg-danger text-white');
	$('#icon').html('<i class="icon-warning"></i>');
	$('h1').html('Too soon!');
	$('h2').html('');

	let btn = document.createElement("button");
	btn.innerHTML = "Click to try again";
	btn.setAttribute('id', 'button');
	btn.setAttribute('onClick', 'prepare();');
	document.querySelector("h2").after(btn);
}