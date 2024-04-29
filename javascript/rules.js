
//import {sum} from "./matematica.js"

const display_input = document.getElementById('input');
const display_result = document.getElementById('div-result');

const btn_delete = document.getElementById('delete');
const btn_clear = document.getElementById('clear');
const btn_cancel_entry = document.getElementById('cancel-entry');
const btn_equal = document.getElementById('equal');
const btn_change_sign = document.getElementById('change-sign');
const btn_clear_historic = document.getElementById('btn-clear-historic');

const btn_addition = document.getElementById('addition');
const btn_subtraction = document.getElementById('subtraction');
const btn_multiplication = document.getElementById('multiplication');
const btn_division = document.getElementById('division');
const btn_square_root = document.getElementById('square-root');
const btn_potentiation = document.getElementById('potentiation');
const btn_reciprocal = document.getElementById('reciprocal');
const btn_comma = document.getElementById('comma');

const historic_result = []; //guarda o resultado final da operacao
const historic = []; // guarda o passa a passo da operacao
const array_input = [];

const calc = {
    first_number: '',
    second_number: '',
    operator: '',
};



// Operações Matemáticas
function sum(x, y) { return parseInt(x) + parseInt(y) }
function sub(x, y) { return parseInt(x) - parseInt(y) }
function mult(x, y) { return parseInt(x) * parseInt(y) }
function div(x, y) { return (parseInt(x) / parseInt(y)).toFixed(2) }




function insert_number(num) {
    if(num === '0') {
        if(display_input.value.split('').some(item => item === ',')){
            array_input.push(num)
            display_input.value = array_input.join('')
        } else {
            if(display_input.value.split('')[0] === '0'){
                display_input.value = '0';
            } else {
                array_input.push(num);
                display_input.value = array_input.join('');
            }
        }
    } else {
        if(display_input.value.split('').some(item => item === ',')){
            array_input.push(num)
            display_input.value = array_input.join('') 
        } else{
            if(display_input.value.split('')[0] === '0'){
                display_input.value = '';
                array_input.push(num);
                display_input.value = array_input.join('') 
            }
            else {
                array_input.push(num)
                display_input.value = array_input.join('')
            }
        }
    }   
};

function horizontal_rule(){

    let hrElement = document.createElement('hr');
    hrElement.style.height = '1px';
    hrElement.style.background = '#84c754'; // Define a cor do hr
    hrElement.style.border = 'none'
    hrElement.style.margin = '10px 0'; // Define a margem do hr

    return hrElement
}

function reset(){
    calc.first_number = ''
    calc.second_number = ''
    calc.operator = ''
}


btn_delete.addEventListener('click', () => {
    if(display_input.value !== '0'){
        if(array_input[array_input.length-2] === ','){
            array_input.pop()
            display_input.value = ',' + array_input.slice(0, array_input.length - 1).join('')
        } else {
            if(display_input.value.split('').length === 1){
                array_input.pop()
                display_input.value = '0'
            }else {
                array_input.pop()
                display_input.value = array_input.join('')   
            }
        }
    } else {
        display_input.value = '0'
    }
});

btn_clear.addEventListener('click', () => {
    
    if(display_result.innerHTML.trim() === '') {
        array_input.length = 0 // apaga os valores do array_input
        display_input.value = '0'
    } else {
        if(historic[historic.length-1].split('').some(item => item === '=')){
            array_input.length = 0
            display_input.value = '0'
            reset()            
        } else {
            display_input.value = '0'
            historic.pop()
            array_input.length = 0
            reset()
            if(display_result.childElementCount === 1){
                display_result.removeChild(display_result.lastChild)
            } else {
                display_result.removeChild(display_result.lastChild) // repeticao proposital!
                display_result.removeChild(display_result.lastChild) // repeticao proposital!
            }
        }
    } 
});

btn_cancel_entry.addEventListener('click', () => {
    array_input.length = 0
    display_input.value = '0'
});

btn_change_sign.addEventListener('click', () => {

    if(display_input.value === '0') {
        display_input.value = '0';
    } else {
        if(display_input.value.split('').some(item => item === '-')) {
            display_input.value = `${display_input.value.replace('-', '')}`;
            
            if(calc.first_number === '' || calc.operator === '') {
                array_input.shift();
                calc.first_number = parseInt(`${array_input.join('')}`);
            } else {
                array_input.shift();
                calc.second_number = parseInt(`${array_input.join('')}`)     
            }
        
        } else {
            display_input.value = `${array_input.join('')}-`;
            if(calc.first_number === '' || calc.operator === '') {
                array_input.unshift('-')
                calc.first_number = parseInt(`${array_input.join('')}`);
            } else {
                array_input.unshift('-')
                calc.second_number = parseInt(`${array_input.join('')}`)     
            }
        }
    }
});

btn_clear_historic.addEventListener('click', () => {
    display_result.innerHTML = '';
});

btn_reciprocal.addEventListener('click', () => {
    let number = display_input.value
    if(num === '0'){
        if(display_result.innerHTML.trim() === ''){
            display_result.innerHTML = "Erro! Divisão por zero!"
        } else {
            display_result.appendChild(horizontal_rule());
            display_result.innerHTML += 
                `<p>Erro! Divisão por zero!</p>`;
            display_input.value = '0';
        }
    } else {
        if(display_result.innerHTML.trim() === ''){
            display_result.innerHTML = `<p>1/${num} = ${1/num}</p>`; 
            display_input.value = '0';
        } else {
            display_result.appendChild(horizontal_rule());
            display_result.innerHTML += 
                `<p>1/${num} = ${1/num}</p>`; 
            display_input.value = '0';
        }
    }
});

btn_comma.addEventListener('click', () => {
    if(display_input.value.split('').some(item => item === ',')){
        display_input.value = array_input.join('') 
    } else {
        display_input.value = ',' + array_input.join('')
        array_input.push(',')
    }
});

btn_equal.addEventListener('click', () => {
    if(calc.operator !== ''){
        switch(calc.operator) {
            case '+':

                if(calc.second_number === '') {
                    calc.second_number = display_input.value;
                }
                
                historic[historic.length-1] = `${calc.first_number} + `

                if(calc.second_number > 0) {
                    historic[historic.length-1] += `${calc.second_number} = 
                        <span>${sum(calc.first_number, calc.second_number)}</span>`
                } else {
                    historic[historic.length-1] += `(${calc.second_number}) = 
                        <span>${sum(calc.first_number, calc.second_number)}</span>`
                }
                

                historic_result.push(sum(calc.first_number, calc.second_number))
                display_result.lastChild.innerHTML = `${historic[historic.length-1]}`
                display_input.value = '0'
                array_input.length = 0
                reset()
                break
            
            case '-':
                calc.second_number = display_input.value
                
                historic[historic.length-1] = 
                `${calc.first_number} - ${calc.second_number} = 
                    <span>${sub(calc.first_number, calc.second_number)}</span>`

                historic_result.push(sub(calc.first_number, calc.second_number))
                display_result.lastChild.innerHTML = `${historic[historic.length-1]}`
                display_input.value = '0'
                array_input.length = 0
                reset()
                break
            
            case '*':
                calc.second_number = display_input.value

                historic[historic.length-1] = 
                `${calc.first_number} * ${calc.second_number} = 
                    <span>${mult(calc.first_number, calc.second_number)}</span>`

                historic_result.push(mult(calc.first_number, calc.second_number))
                display_result.lastChild.innerHTML = `${historic[historic.length-1]}`
                display_input.value = '0'
                array_input.length = 0
                reset()
                break

            case '÷':
                calc.second_number = display_input.value

                historic[historic.length-1] = 
                `${calc.first_number} ÷ ${calc.second_number} = 
                    <span>${div(calc.first_number, calc.second_number)}</span>`

                historic_result.push(div(calc.first_number, calc.second_number))
                display_result.lastChild.innerHTML = `${historic[historic.length-1]}`
                display_input.value = '0'
                array_input.length = 0
                reset()
                break
        }
    }
});

btn_addition.addEventListener('click', () => {

    if(calc.operator === ''){ //inicio da operacao
        
        if(calc.first_number === ''){
            calc.first_number = array_input.join('')
        }
        
        calc.operator = '+';
        historic.push(calc.first_number + " + ");
        
        if(display_result.innerHTML.trim() === ''){
            display_result.innerHTML = 
                `<p>${historic[historic.length-1]}</p>`;
            display_input.value = '0';
        } else {
            display_result.appendChild(horizontal_rule());
            display_result.innerHTML += 
                `<p>${historic[historic.length-1]}</p>`;

            display_input.value = '0';

        }
        array_input.length = 0
        
    } else { //meio da operacao ou continuacao da soma
        display_input.value = '0';
        calc.second_number = array_input.join('')

        historic[historic.length-1] = `${calc.first_number} + `
        if(calc.second_number > 0){
            historic[historic.length-1] += `${calc.second_number} = 
                <span>${sum(calc.first_number, calc.second_number)}</span>` 
        } else {
            historic[historic.length-1] += `(${calc.second_number} = 
                <span>${sum(calc.first_number, calc.second_number)}</span>` 
        }
        
        historic_result.push(sum(calc.first_number, calc.second_number))
        display_result.lastChild.innerHTML = `${historic[historic.length-1]}`
        // final da operacao
        display_input.value = historic_result[historic_result.length-1]
        calc.operator = ''
        calc.second_number = ''
        array_input.length = 0
        //final da operação e início da próxima...
        calc.first_number = historic_result[historic_result.length-1];
    }

});

btn_subtraction.addEventListener('click', () => {
    
    if(calc.operator === ''){ //inicio da operacao
        if(calc.first_number === ''){
            calc.first_number = array_input.join('')
        }
        calc.operator = '-'
        historic.push(calc.first_number + " - ");
        
        if(display_result.innerHTML.trim() === ''){
            display_result.innerHTML = 
                `<p>${historic[historic.length-1]}</p>`
            display_input.value = '0'
        } else {
            display_result.appendChild(horizontal_rule())
            display_result.innerHTML += 
                `<p>${historic[historic.length-1]}</p>`
            display_input.value = '0'

        }
        array_input.length = 0
        
    } else { //meio da operacao
        calc.second_number = array_input.join('')

        historic[historic.length-1] = `${calc.first_number} + `
        if(calc.second_number > 0){
            historic[historic.length-1] += `${calc.second_number} = 
                <span>${sub(calc.first_number, calc.second_number)}</span>` 
        } else {
            historic[historic.length-1] += `(${calc.second_number}) = 
                <span>${sub(calc.first_number, calc.second_number)}</span>` 
        }

        historic_result.push(sub(calc.first_number, calc.second_number))
        display_result.lastChild.innerHTML = `${historic[historic.length-1]}`
        // final da operacao
      
        if(parseInt(historic_result[historic_result.length-1]) <  0){
            let resultado = `${historic_result[historic_result.length-1]}`
            display_input.value = `${resultado.replace('-', '')}-`
        }
        calc.operator = '';
        calc.second_number = '';
        //final da operação e início da próxima...
        calc.first_number = historic_result[historic_result.length-1];

    }
});

btn_multiplication.addEventListener('click', () => {
    if(calc.operator === ''){ //inicio da operacao
        if(calc.first_number === ''){
            calc.first_number = array_input.join('')
        }
        calc.operator = '*'
        historic.push(calc.first_number + " * ")
        if(display_result.innerHTML.trim() === ''){
            display_result.innerHTML = 
            `<p>${historic[historic.length-1]}</p>`
            display_input.value = '0'
        } else {
            display_result.appendChild(horizontal_rule())
            display_result.innerHTML += 
                `<p>${historic[historic.length-1]}</p>`
            display_input.value = '0'

        }
        array_input.length = 0
        
    } else { //meio da operacao
        calc.second_number = array_input.join('')
        
        historic[historic.length-1] = `${calc.first_number} + `
        if(calc.second_number > 0){
            historic[historic.length-1] += `${calc.second_number} = 
                <span>${mult(calc.first_number, calc.second_number)}</span>` 
        } else {
            historic[historic.length-1] += `(${calc.second_number}) = 
                <span>${mult(calc.first_number, calc.second_number)}</span>` 
        }
        
        historic_result.push(mult(calc.first_number, calc.second_number))
        display_result.lastChild.innerHTML = `${historic[historic.length-1]}`
        // final da operacao
        if(parseInt(historic_result[historic_result.length-1]) <  0){
            let resultado = `${historic_result[historic_result.length-1]}`
            display_input.value = `${resultado.replace('-', '')}-`
        }
        calc.operator = '';
        calc.second_number = '';
        //final da operação e início da próxima...
        calc.first_number = historic_result[historic_result.length-1];

    }
});


btn_division.addEventListener('click', () => {

    if(calc.operator === ''){ //inicio da operacao
        if(calc.first_number === ''){
            calc.first_number = array_input.join('')
        }
        calc.operator = '÷'
        historic.push(calc.first_number + " ÷ ")
        if(display_result.innerHTML.trim() === ''){
            display_result.innerHTML = 
                `<p>${historic[historic.length-1]}</p>`
            display_input.value = '0'
        } else {

            display_result.appendChild(horizontal_rule())
            display_result.innerHTML += 
                `<p>${historic[historic.length-1]}</p>`
            display_input.value = '0'

        }

        array_input.length = 0
        
    } else { //meio da operacao
        calc.second_number = array_input.join('')
        
        historic[historic.length-1] = `${calc.first_number} + `
        if(calc.second_number > 0){
            historic[historic.length-1] += `${calc.second_number} = 
                <span>${div(calc.first_number, calc.second_number)}</span>` 
        } else {
            historic[historic.length-1] += `(${calc.second_number}) = 
                <span>${div(calc.first_number, calc.second_number)}</spane>` 
        }
        
        historic_result.push(div(calc.first_number, calc.second_number))
        display_result.lastChild.innerHTML = `${historic[historic.length-1]}`
        // final da operacao
        display_input.value = '0';
        calc.operator = '';
        calc.second_number = '';
        //final da operação e início da próxima...
        calc.first_number = historic_result[historic_result.length-1];

    }
});

btn_square_root.addEventListener('click', () => {
    let num = parseInt(display_input.value);
    if(num < 0) {
        display_result.appendChild(horizontal_rule());
        display_result.innerHTML += 
            `<p>Entrada Inválida!</p>`;
        display_input.value = '0';
    } else {
        if(display_result.innerHTML.trim() === '') {
            
            display_result.innerHTML += 
                `<p>√${num} = ${Math.sqrt(num).toFixed(2)}</p>`;
            display_input.value = '0';
        } else {
            display_result.appendChild(horizontal_rule());
            display_result.innerHTML += 
                `<p>√${num} = ${Math.sqrt(num).toFixed(2)}</p>`;
            display_input.value = '0';
        }
        array_input.length = 0
    }
});

btn_potentiation.addEventListener('click', () => {
    let num = display_input.value;
    if(num === '0'){
        if(display_result.innerHTML.trim() === ''){
            display_result.innerHTML = `<p>${num}² = ${Math.pow(num, 2)}</p>`;
        } else {
            display_result.appendChild(horizontal_rule());
            display_result.innerHTML += `<p>${num}² = ${Math.pow(num, 2)}</p>`;
        }
    } else {
        if(display_result.innerHTML.trim() === ''){
            display_result.innerHTML = `<p>${num}² = ${Math.pow(num, 2)}</p>`;
            display_input.value = '0';
        } else {
            display_result.appendChild(horizontal_rule());
            display_result.innerHTML += `<p>${num}² = ${Math.pow(num, 2)}</p>`;
            display_input.value = '0';
        }
        array_input.length = 0
    }
})