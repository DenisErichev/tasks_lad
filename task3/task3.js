const readlineSync = require('readline-sync'); 
//функция для проверки на совпадающие цифры в числе
const checkMatchingNumbers=(value)=>{   
    const uniqueNumberArray = [...new Set(value)]
    const isHaveMatchedNumbers = uniqueNumberArray.length === value.length  &&  value

    return isHaveMatchedNumbers
}

function getRandomValue() {
    let randomValue = `${(Math.trunc(Math.random() * (999999 - 100) + 100))}`;

    //проверка на несовпадающие цифры в числе
    if(!checkMatchingNumbers(randomValue)){  
        // если встречается хотя-бы одна повторяющаяся цифра в числе,находим новое число
        return getRandomValue()      
    }
    
    return randomValue
}

const getUserValue=()=>{
    let input = readlineSync.question("Угадайте число: ");
    //проверка на ввод числа
    if(isNaN(input)){   
        console.log('Вы ввели не числовое значение.')

        return getUserValue()
    }
    // проверка на то что оно (от 3 до 6 цифр)
    else if(input<100 || input>999999){ 
        console.log('Вы ввели число не от (3 до 6 цифр).')

        return getUserValue()
    }
    else if(!checkMatchingNumbers(input)){
        console.log('В числе не должно быть совпадающих цифр.')

        return getUserValue()
    }

    return input
}

const getComplexityLevel =()=>{
    const complexity={
        easy: 10,
        middle: 5,
        hard: 3 
    }
    const complexityInput = readlineSync.question('Введите уровень сложности(easy, middle, hard): 1-easy(10 попыток), 2-middle(5 попыток), 3-hard(3 попытки)');
    const currentLevel = complexity[complexityInput]
    console.log(currentLevel)

    if(currentLevel){
        return currentLevel
    }
    else{
        console.log('Вы ввели некорректное значение, попробуйте еще.')

        return complexityLevel()
    }
}

const bullsAndCowsGameStart=()=>{
// счетчик количества попыток
let attempts=0
const complexityLevel = getComplexityLevel()
const randomValue=getRandomValue();
    let inputValue=''
    while(attempts !== complexityLevel && randomValue !== inputValue){
        //количество совпавших цифр на своих местах
        let countСoincidence=0; 
        //количество совпавших цифр не на своих местах         
        let countMismatch=0      
        //массив для совпавших цифр на своих местах       
        let numbersСoincidence=[] 
        //массив для несовпавших цифр не на своих местах      
        let numbersMismatch=[]          
        inputValue = getUserValue()
        // проходим по каждой цифре загаданного числа
        for(let i=0;i<inputValue.length;i++){ 
            //цифры в числе совпадающие не на своих местах
            if(randomValue.includes(inputValue[i]) && randomValue[i] !== inputValue[i]){
                countMismatch++
                numbersMismatch.push(inputValue[i])
            }
            //цифры в числе совпадающие на своих местах
            if(randomValue[i] === inputValue[i]){
                countСoincidence++
                numbersСoincidence.push(inputValue[i])
            }
        }
        console.log(`\nЗагаданное число: ${randomValue} ваше предположение: ${inputValue}`)
        console.log(`Cовпавших цифр не на своих местах - ${countMismatch} (${numbersMismatch.join(' и ')}), цифр на своих местах - ${countСoincidence} (${numbersСoincidence.join(' и ')})`)
        if(randomValue === inputValue){
            console.log('Вы угадали загаданную цифру!')
        }else if(attempts === complexityLevel){                 
            console.log('Количество попыток вышло!')
        }
        attempts++;
    }

}
bullsAndCowsGameStart()