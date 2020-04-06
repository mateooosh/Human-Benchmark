`le` $div = $(`#proba1`);`$d`v.remove();`le` h1 = $(`h1`);`le` h2 = $(`h2`);

let random, level = 0;

const start = () =>{
	$btn.off(`click`);
	$btn.off(`click`);

	$(`#icon`).hide();
	random = Math.floor(Math.random()*10);
	
	$(`h1`).css(`padding-top`, `100px`);
	$(`h1`).css(`font-weight`, `400`);
	$(`h1`).css(`margin-top`, `0`);
	$(`h1`).html(random);
	$(`h2`).html(``);
	$btn.remove();

	$(`h1`).after($div);
	time();
}

const start2 = () =>{
	$btn.off(`click`);
	for(let i=0; i<=level; i++)
		random += Math.floor(Math.random()*10).toString();
	$(`#proba2`).css(`width`, `150px`);
	$div.show();
	$(`h1`).css(`padding-top`, `100px`);
	$(`h1`).css(`font-weight`, `400`);
	$(`h1`).css(`margin-top`, `0`);
	$(`h1`).html(random);
	$(`h2`).html(``);
	$btn.remove();

	$(`h1`).after($div);
	time();
}

const time = () => {
	$(`#proba2`).css(`width`, `-=1px`);
	let timeout = setTimeout(`time()`, 15);
	if($(`#proba2`).css(`width`)==`0px`){
		clearTimeout(timeout);
		change();
	}
}

const change = () => {
	$(`h1`).html(`What was the number?`);
	$(`h1`).css(`font-size`, `40px`);
	$div.hide();
	$(`#word`).show();	
	$(`#word`).after($btn);
	$btn.show();
	$btn.css(`margin-top`, `30px`)
	$btn.html(`Submit`);
	$btn.on(`click`, check);
}

const check = () => {
	$btn.off(`click`);

	if(random==document.getElementById(`word`).value){
		$btn.hide();
		$(`#word`).hide();
		level++;
		$(`h1`).html(`Level `+level);
		$(`h1`).css(`font-size`, `66px`);
		$btn.html(`Next`);
		$btn.show();
		$btn.on(`click`, start2);
		document.getElementById(`word`).value = ``;
		random = ``;
	}

	else{
		$(`#word`).hide();
		$(`h1`).html(`Wrong!`);
		$(`h1`).css(`font-size`, `66px`);
		$(`h2`).html(`Level `+level);
		$btn.html(`Retry`);
		$(`section`).attr(`class`, `container-fluid bg-danger text-white`);
		$btn.on(`click`, reset);
	}	
}

const reset = () => {
	$btn.off(`click`);
	$btn.html(`Get Started`);
	$(`h1`).html(`Number Memory`);
	$(`h2`).html(`he average person can remember 7 numbers at once. Can you do more?`);
	$(`section`).attr(`class`, `container-fluid bg-primary text-white`);
	$btn.on(`click`, start2);
	level = 0;
	random = '';
}

let $btn = $(`#button`);
$btn.on(`click`, start);