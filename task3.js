const readlineSync = require('readline-sync');
const checkMatchingNumbers=(value)=>{   //проверка на несовпадающие цифры в числе
    let flag = true
    value = value.split('')
    value.forEach((elem,index)=>{   ///проходимся по каждой цифре числа
        let currentIndex = 0    //счетчик текущего индекса
        while(currentIndex !== value.length){       ///пока мы не проверили все цифры числа
            if(elem === value[currentIndex] && index !== currentIndex){    // проверка на совпадающие цифры в числе,
                                                                           // каждую цифру проверяем с последующими
                flag = false   //меняем флаг если есть совпавшая цифра
            }
            currentIndex++
        }
    })
    return !flag? false : value
}

function getRandomValue(min, max) {
    let currValue = (Math.trunc(Math.random() * (max - min) + min)) + '';
    if(!checkMatchingNumbers(currValue)){   //проверка на несовпадающие цифры в числе

        return getRandomValue(min,max)      // если встречается хотя-бы одна повторяющаяся цифра в числе,
                                            //находим новое число
    }
    return currValue
}
const checkInputValue=()=>{
    let input = readlineSync.question("Угадайте число: ");
    if(isNaN(input)){   //проверка на ввод числа
        console.log('Вы ввели не числовое значение.')
        return checkInputValue()
    }
    else if(input<100 || input>999999){ // проверка на то что оно (от 3 до 6 цифр)
        console.log('Вы ввели число не от (3 до 6 цифр).')
        return checkInputValue()
    }
    else if(!checkMatchingNumbers(input)){
        console.log('В числе не должно быть совпадающих цифр.')
        return checkInputValue()
    }
    return input
    
}
let moves=0 // счетчик количества попыток
while(true){
    let randomValue=getRandomValue(100,999999);
    let countСoincidence=0;         //количество совпавших цифр на своих местах
    let countMismatch=0             //количество совпавших цифр не на своих местах 
    let numbersСoincidence=[]       //массив для совпавших цифр на своих местах
    let numbersMismatch=[]          //массив для несовпавших цифр не на своих местах
    let input = checkInputValue()
    for(let i=0;i<randomValue.length;i++){      // проходим по каждой цифре загаданного числа
        if(randomValue[i] === input[i]){        //если цифра загаданного и введенного числа совпала, и их индексы равны
            countСoincidence++                  //увеличиваем счетчик совпавших цифр на своих местах
            numbersСoincidence.push(randomValue[i]) // добавляем в массив для совпавших цифр на своих местах
        }
        for(let j=0;j<input.length;j++){                // проходим по каждой цифре введенного числа, начиная с первой
            if(input[j] === randomValue[i] && i !== j){  //если мы нашли совпавшие цифры, но с разными индексами
                countMismatch++                           //увеличиваем счетчик совпавших цифр не на своих местах
                numbersMismatch.push(randomValue[i])      // добавляем в массив для совпавших цифр не на своих местах
            }
        }
    }
    console.log(`\nЗагаданное число: ${randomValue} ваше предположение: ${input}`)
    console.log(`Cовпавших цифр не на своих местах - ${countMismatch} (${numbersMismatch.join(' и ')}), цифр на своих местах - ${countСoincidence} (${numbersСoincidence.join(' и ')})`)
    if(randomValue === input){
        console.log('Вы угадали загаданную цифру!')
        break
    }else if(moves === 5){                 
        console.log('Количество попыток вышло!')
        break
    }
    moves++;
}

