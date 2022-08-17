const readlineSync = require('readline-sync');
const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0   // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}
const player={
    maxHealth:0,
    name : 'Евстафий',
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

 //функция выбора хода игроком
const choicePlayerMove=(playerMoves,copyPlayerMoves)=>{ 
    // проходим по всем ходам       
    for(let i=0;i<copyPlayerMoves.moves.length;i++){  
        //если cooldown первоначального объекта и копии равны то  
        if(playerMoves.moves[i].cooldown === copyPlayerMoves.moves[i].cooldown){    
            // выводим название доступного хода
            console.log(`${i})`+ copyPlayerMoves.moves[i].name)     
            for(let key in copyPlayerMoves.moves[i]){
                 // выводим характеристики доступного хода
                console.log(` ${key}: ${copyPlayerMoves.moves[i][key]}`) 
            }
            console.log('\n')
        }
    }
     //ввод хода
    let moveIndex = readlineSync.question("!!!!!Введите номер хода: "); 
    //возвращаем номер хода в виде числа     
    return +moveIndex       
}

const generateRandomIndexMove=()=> Math.trunc(Math.random() * 3) 

//функция которая увеличивает cooldown ходов на каждом ходе(если требуется)
const addCooldownEveryRound=(playerMoves,copyPlayerMoves)=>{ 
    //проходим по превоначальному объекту 
    for(let i=0; i<playerMoves.length; i++){   
        //если cooldown первоначального объекта и копии не равны                
        if(playerMoves[i].cooldown !== copyPlayerMoves[i].cooldown ){ 
            // увеличиваем cooldown копии
            copyPlayerMoves[i].cooldown +=1 
        }
    }   
}

//выбор сложности(начальное здоровье Евстафия)
const inputMaxHealth=()=>{      
    let input=readlineSync.question("Введите maxHealth: ")
    //проверка, что значение является числом
    if(!isNaN(input)){

        return input
    }
    else{

        return inputMaxHealth()
    }
}

//функция создания копии объекта
const makeCopyObject=(object)=>{
    let copyObject = {...object}
    //глубокое копирование свойств ходов первоначального объекта
    copyObject.moves = object.moves.map(item => ({...item}))

    return copyObject
}

// const damageGeneration=(copyMonsterMove, copyUserMove, copyPlayerObject)=>{
//     let damageFromMonster = (copyMonsterMove.physicalDmg * copyUserMove.physicArmorPercents)/100 +
//                             (copyMonsterMove.magicDmg * copyUserMove.magicArmorPercents)/100
//     let damageFromUser = (copyUserMove.physicalDmg * copyMonsterMove.physicArmorPercents)/100 +
//                          (copyUserMove.magicDmg *copyMonsterMove.magicArmorPercents)/100

//     if(copyPlayerObject.name === 'Евстафий'){
//         // copyPlayerObject.maxHealth -= damageFromMonster
//         return damageFromUser
//     }
//     else if(copyPlayerObject.name === 'Лютый'){
//         // copyPlayerObject.maxHealth -= damageFromUser
//         return damageFromMonster
//     }
// }


//Функция вывода текущих характеристик
const showCharacteristicsDamage = (playerMoves,damage) =>{     
    console.log(`      ~~~${playerMoves.name} maxHealth: ${playerMoves.maxHealth}~~~`)
    console.log(`~~~Полученный damage от противника: ${damage}`)
}

const damageGeneration=(damageFromObject, objectToDamage, playerObject)=>{
    let damage = (damageFromObject.physicalDmg - (damageFromObject.physicalDmg * objectToDamage.physicArmorPercents)/100)+
                 (damageFromObject.magicDmg - (damageFromObject.magicDmg * objectToDamage.magicArmorPercents)/100)

    return damage
}

const minusHealth = (playerObject, damage)=>{
    playerObject.maxHealth -= damage
    showCharacteristicsDamage(playerObject, damage)
}

let computer = makeCopyObject(monster)
let user = makeCopyObject(player)
user.maxHealth = inputMaxHealth()   //выбор сложности
let countMove=0     //счетчик текущего хода
while(computer.maxHealth > 0 && user.maxHealth > 0){
    countMove++ 
    console.log("Текущий ход:",countMove)
    addCooldownEveryRound(monster.moves, computer.moves)  //увеличиваем cooldown каждого хода
    addCooldownEveryRound(player.moves, user.moves)       //увеличиваем cooldown каждого хода

    //Блок генерации хода монстра
    let currentComputerMove = []       // массив, в который будем заносить кортеж- копия хода и номер хода в объекте
    while(currentComputerMove.length === 0){   
        let indexMove = generateRandomIndexMove()  //случайный ход монстра
        for(let i=0;i<monster.moves.length; i++){  // проходим по массиву ходов монстра
            if(monster.moves[indexMove].cooldown === 0){   //если cooldown хода, первонач. объекта равен 0, и случайный индекс совпал 
                currentComputerMove = [{...computer.moves[indexMove]}, indexMove]  //записываем кортеж из - копии хода и его индекса 
                i=monster.moves.length        //если получили ход, выходим из цикла for
            }

            else if(i === indexMove && computer.moves[i].cooldown === monster.moves[indexMove].cooldown){  //если индекс текущего хода и случаного равны, а также cooldown копии равен первонач.
                computer.moves[i].cooldown = -1     // 'обнуляем' cooldown копии: делаем -1, т.к. увеличение cooldown использованных ходов происходит сразу на каждом следующем ходе,
                                                    // если поставим не -1, а 0, то ход будет доступен раньше
                currentComputerMove = [{...computer.moves[indexMove]}, indexMove] //записываем кортеж из - копии хода и его индекса 
                i=monster.moves.length        //если получили ход, выходим из цикла for
            }
        }
    }
    //Вывод характеристик случайного хода монстра
    console.log(`Ходит ${computer.name}: ${currentComputerMove[0].name}`)
    monster.moves.map((item, index)=>{
        if(index === currentComputerMove[1]){
            for(let key in item){
                console.log(` ${key}:`,item[key])
            }
        }
    })
    console.log('\n')
    //

    //Блок генерации хода игрока
    let currentUserMove = []
    while(currentUserMove.length === 0){
        let userIndexMove=choicePlayerMove(player,user)
        for(let i=0; i<player.moves.length;i++){        // проходим по массиву ходов игрока
            if(player.moves[userIndexMove].cooldown === 0){         //если cooldown хода, первонач. объекта равен 0, и случайный индекс совпал 
                currentUserMove = [{...user.moves[userIndexMove]}, userIndexMove]  //кортеж из: хода и его индекса
                i=player.moves.length                   //если получили ход, выходим из цикла for
            }
            else if(i === userIndexMove && user.moves[i].cooldown === player.moves[userIndexMove].cooldown){    //если индекс текущего хода и случаного равны, а также cooldown копии равен первонач.
                currentUserMove = [{...user.moves[userIndexMove]}, userIndexMove]  //кортеж из: хода и его индекса
                user.moves[userIndexMove].cooldown = -1      // 'обнуляем' cooldown копии
                i=player.moves.length          //если получили ход, выходим из цикла for
            }
        }
        if(currentUserMove.length === 0){ //уведомление пользователся если он ввел индекс 'замороженного' хода
            console.log(`\n!!!!!Данный ход пока заморожен.!!!!!\n`)
        }
    }
    console.log(`\n${user.name} ход: ${currentUserMove[0].name}\n`)


    let damageFromMonster = damageGeneration(currentComputerMove[0], currentUserMove[0],computer)
    let damageFromUser = damageGeneration(currentUserMove[0], currentComputerMove[0], user)
    minusHealth(computer, damageFromUser)
    minusHealth(user, damageFromMonster)

}

//Блок проверки на выигрышь/проигрышь/ничью
if(user.maxHealth <= 0){        
    console.log(`\nПобедил: ${computer.name}.`)
    console.log(`${user.name} Health: ${user.maxHealth}`)
}
else if(computer.maxHealth <= 0){
    console.log(`\nПобедил: ${user.name}.`)
    console.log(`${computer.name} health: ${computer.maxHealth}`)
}
else if(computer.maxHealth <= 0 && user.maxHealth <= 0){
    console.log('Ничья!')
}
//
