// let title = document.querySelector('h1');
// title.innerHTML = 'Jogo do Numero Secreto';

// let paragraph = document.querySelector('p');
// paragraph.innerHTML = 'escolha um número entre 1 e 100';
let secretNumber;
let userGuess;
let goingAttemps;
let maxValue = 10;
let maxAttemps = 10;
let listHistoryNumbers = [];

newGame();

function printTextMessage(tag, text){
    let campo = document.querySelector(tag);
    campo.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.1});
}

function randomNumberGenarator(){
    let number = parseInt(Math.random()*maxValue+1);

    if(listHistoryNumbers.length == maxValue/2){
        listHistoryNumbers = [];
    }

    if(listHistoryNumbers.includes(number)){
        return randomNumberGenarator();
    }else{
        listHistoryNumbers.push(number);
        //console.log(listHistoryNumbers);
        return number;
    }
}

function getInput(tag){
    let input = document.querySelector(tag).value;
    return input;
}

function verificarChute(){
    userGuess = getInput('input');
    goingAttemps ++;
    maxAttemps --;
    
    if(userGuess == secretNumber){
        printTextMessage('h1', 'Parabêns, você acertou');
        let wordTentativa = goingAttemps == 1 ? 'Tentativa nescessaria' : 'Tentativas nescessarias';
        printTextMessage('p', `O número secreto é ${secretNumber}. ${goingAttemps} ${wordTentativa}`);
        buttonUpdate('reiniciar', 'chute');
    }else{
        if(userGuess > secretNumber){
            printTextMessage('p', `O número secreto é menor que ${userGuess}; Tentativas restantes: ${maxAttemps}`);
        } else if(userGuess < secretNumber){
            printTextMessage('p', `O número secreto é maior que ${userGuess}; Tentativas restantes: ${maxAttemps}` );
        }
    }
    if(maxAttemps == 0){
        printTextMessage('h1', 'Fim de Jogo');
        printTextMessage('p', 'Suas tentativas Acabaram');
        buttonUpdate('reiniciar', 'chute');

    }
    clearTextContainer();
}

function newGame(){
    secretNumber = randomNumberGenarator();
    goingAttemps = 0;
    maxAttemps = 10;

    printTextMessage('h1', 'Jogo do Número Secreto');
    printTextMessage('p', `escolha um número entre 1 e ${maxValue}; Você tem ${maxAttemps} tentativas`);
    clearTextContainer();
    buttonUpdate('chute', 'reiniciar');
}

function clearTextContainer(){
    let container = document.querySelector('input');
    container.value = '';
}

function buttonUpdate(btnToEnable, btnToDisable){
    document.getElementById(btnToEnable).removeAttribute('disabled');
    document.getElementById(btnToDisable).setAttribute('disabled', true);
}

function gameOverMessage(){

}