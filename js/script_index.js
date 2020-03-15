let timeout;
let stage = 0;
let startTime, stopTime, time;
let bool = false;
let average=0, attempts = [], sum=0;

const prepare = () => {
	$('#button').off('mousedown', prepare);

	bool = false;
	stage = 0;
	stage++;
	if(stage != 1) return;

	$('#button').remove();
	$('h1').html('Reaction Time Test');
	$('h2').html('When the red box turns green, click as quickly as you can. Click to start');
	$('section').attr('id', 'sekcja');
	$('section').on('click',  start);
}

const start = () => {
	$('section').off('click',  start);
	stage++;
	if(stage != 2) return;

	$('section').removeAttr('class');
	$('section').addClass('container-fluid bg-danger text-white');
	$('#icon').html("<i class='icon-dot-3'></i> ");
	$('#icon').css('width', '180px');
	$('#icon').css('padding-top', '50px');
	$('h1').html('Wait for green');
	$('h2').html('');



	let losowa = Math.random()*4+1;
	timeout = setTimeout(changeToGreen, losowa*1000);

	$('section').on('mousedown', toEarly);
}

const changeToGreen = () => {
	$('section').off('mousedown', toEarly);
	startTime = new Date();

	$('section').removeAttr('class');
	$('section').addClass('container-fluid bg-success text-white');
	$('h1').html('Click!');
	$('h2').html('');
	$('section').on('mousedown', finish);
}

const finish = () => {
	$('section').off('mousedown', finish);
	finishTime = new Date();
	time = finishTime - startTime;
	attempts.unshift(parseInt(time));
	sum+=attempts[0];
	average=sum/attempts.length;

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
}


const toEarly = () => {
	$('section').off('mousedown', toEarly);
	stage++;
	clearTimeout(timeout);
	if(stage != 3) return;
	
	$('section').removeAttr('class');
	$('section').addClass('container-fluid bg-danger text-white');
	$('#icon').html('<i class="icon-attention-circled"></i>');
	$('h1').html('Too soon!');
	$('h2').html('');

	let btn = document.createElement("button");
	btn.innerHTML = "Click to try again";
	btn.setAttribute('id', 'button');
	btn.setAttribute('onClick', 'prepare();');
	document.querySelector("h2").after(btn);
}

$('#button').on('mousedown', prepare);