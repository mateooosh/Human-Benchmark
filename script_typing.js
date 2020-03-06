let temp = document.getElementById('word');
temp.addEventListener('keyup', check);

let words = ['robak', 'politechnika', 'warzywniak', 'spożywczy', 'butelka', 'telefon', 'kopalnia', 'młotek', 'mieszkanie', 'wzgórze', 'autobus'];

let corrected = [];

let i=0;
let correct=words[i], next = words[i+1];
let finished = false;
let correctAnswers = 0;

let start, stop;

let yes = new Audio("audio/correct.mp3");
var no = new Audio("audio/incorrect.mp3");

$('#correct').html(correct);
$('#next').html(next);

function change(){
	$('#type').css('display', 'block');
	$('#type2').css('display', 'none');
}

function stopTime(){
	stopTime = new Date();
	$('h4').html("<span>Time | "+((stopTime-startTime)/1000)+"</span><span>Correct | "+correctAnswers+"/"+words.length+"</span>");
	//$('h2').html("Correct | "+correctAnswers+"/"+words.length);
}

function check(){
	if (i==0)
		startTime = new Date();
	if(i!=words.length){
		if(correct==temp.value){
			yes.play();
			correctAnswers++;
			temp.value = "";
			i++;
			correct=words[i];
			next = words[i+1];
			corrected.push(1);

			$('#correct').html(correct);
			$('#next').html(next);
			if(i==words.length){
				$('#next').html("-");
				$('#correct').html("-");
				stopTime();
				let button = $("<button>").attr("id", "button").text("Show answers").css("margin-top", "30px");
   				 $("h4").after(button);
   				 //document.getElementById('button').addEventListener('click', showAnswers);
   				 $('#button').on('click', showAnswers);
			}
			if(i==words.length-1){
				$('#next').html("-");
			}

		}

		else if(correct!=temp.value&&temp.value.length>=correct.length){
			no.play();
			temp.value = "";
			i++;
			last = words[i-1];
			correct=words[i];
			next = words[i+1];
			corrected.push(0);
			$("#correct").html(correct);
			$("#next").html(next);
			if(i==words.length){
				$('#next').html("-");
				$('#correct').html("-");
				stopTime();
				let button = $("<button>").attr("id", "button").text("Show answers").css("margin-top", "30px");
   				$("h4").after(button);
	   			//document.getElementById('button').addEventListener('click', showAnswers);
	   			$('#button').on('click', showAnswers);
			}
			

			if(i==words.length-1){
				$('#next').html("-");
			}
		}
	}
}

function showAnswers(){

	let div = document.createElement("div");
	div.setAttribute('id', 'div'+i); 
	for(let i=1; i<=words.length; i++){
		let div = document.createElement("div");
		div.setAttribute('id', 'div'+i);
		div.setAttribute('class', 'wynik');
		if(corrected[i-1]==1){
			div.style.color="green";
		}
		else
			div.style.color="red";

		div.innerHTML = "<span style='color:black;'>"+i+".</span> "+words[i-1];
		$('footer').before(div);

	}
}

