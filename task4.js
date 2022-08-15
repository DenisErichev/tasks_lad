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

const choicePlayerMove=(obj,copyObj)=>{   //функция выбора хода игроком      
    for(let i=0;i<obj.moves.length;i++){    // проходим по всем ходам
        if(obj.moves[i].cooldown === copyObj.moves[i].cooldown){    //если cooldown первоначального объекта и копии равны то
            console.log(`${i})`+ obj.moves[i].name)     // выводим характеристики доступного хода
            for(let key in copyObj.moves[i]){
                console.log(` ${key}: ${copyObj.moves[i][key]}`)  // выводим характеристики доступного хода
            }
            console.log('\n')
        }
    }
    let moveIndex = readlineSync.question("!!!!!Введите номер хода: ");        //ввод хода
    return +moveIndex       //возвращаем номер хода в виде числа
    
}
const generateRandomIndexMove=()=>{
    return Math.trunc(Math.random() * 3)
}
const addCooldownEveryRound=(obj,copyobj)=>{ //функция которая увеличивает cooldown ходов на каждом ходе(если требуется)
    for(let i=0; i<obj.length; i++){       //проходим по превоначальному объекту            
        if(obj[i].cooldown !== copyobj[i].cooldown && copyobj[i].cooldown < obj[i].cooldown){ //если cooldown первонач. объекта и копии не равны, а также cooldown копии меньше первонач. 
            copyobj[i].cooldown +=1 // увеличиваем cooldown копии
        }
    }   
}
const showCharacteristics = (obj,index) =>{     //Функция вывода текущих характеристик
    console.log(`      ~~~${obj.name} maxHealth: ${obj.maxHealth}~~~`)
    console.log(`~~~Нанесенный physicalDmg противнику: ${obj.moves[index].physicalDmg}`)
    console.log(`~~~Нанесенный magicDmg противнику: ${obj.moves[index].magicDmg}`)
    console.log(`~~~${obj.name} текущий magicArmorPercents: ${obj.moves[index].magicArmorPercents}`)
    console.log(`~~~${obj.name} текущий physicArmorPercents: ${obj.moves[index].physicArmorPercents}\n`)
}
const regenerationСharacteristics=(obj,copyObj)=>{  //функция которая восстанавливает физическую и магическую броню
    for(let i=0;i<obj.length;i++){
        if(obj[i].physicArmorPercents !== copyObj[i].physicArmorPercents){
            copyObj[i].physicArmorPercents = obj[i].physicArmorPercents
        }
        else if(obj[i].magicArmorPercents !== copyObj[i].magicArmorPercents){
            copyObj[i].magicArmorPercents = obj[i].magicArmorPercents
        }
    }
}
const inputMaxHealth=()=>{      //выбор сложности(начальное здоровье Евстафия)
    let input=readlineSync.question("Введите maxHealth: ")
    if(!isNaN(input)){
        return input
    }
    else{
        return inputMaxHealth()
    }
}
let computer  = {...monster}    // создаем копию первоначального объекта - monster
computer.moves = monster.moves.map(item => ({...item}))     //копируем каждое свойство, каждого хода
let user = {...player}              // создаем копию первоначального объекта - player
user.moves = player.moves.map(item => ({...item}))  //копируем каждое свойство, каждого хода
user.maxHealth = inputMaxHealth()   //выбор сложности
user.name = 'Евстафий'
let countMove=0     //счетчик текущего хода
while(true){
    countMove++ 
    console.log("Текущий ход:",countMove)
    let computerMove = []       // массив, в который будем заносить кортеж- копия хода и номер хода в объекте
    let flag = true
    addCooldownEveryRound(monster.moves, computer.moves)  //увеличиваем cooldown каждого хода
    addCooldownEveryRound(player.moves, user.moves)       //увеличиваем cooldown каждого хода

    //Блок генерации хода монстра
    while(flag){   
        let indexMove = generateRandomIndexMove()  //случайный ход монстра
        for(let i=0;i<monster.moves.length; i++){  // проходим по массиву ходов монстра
            if(monster.moves[indexMove].cooldown === 0){   //если cooldown хода, первонач. объекта равен 0, и случайный индекс совпал 
                computerMove = [{...computer.moves[indexMove]}, indexMove]  //записываем кортеж из - копии хода и случайного индекса 
                flag = false
                break  
            }
            else if(i === indexMove && computer.moves[i].cooldown === monster.moves[indexMove].cooldown){  //если индекс текущего хода и случаного равны, а также cooldown копии равен первонач.
                computer.moves[i].cooldown = -1     // 'обнуляем' cooldown копии: делаем -1, т.к. увеличение cooldown использованных ходов происходит сразу на каждом следующем ходе,
                                                    // если поставим не -1, а 0, то ход будет доступен раньше
                computerMove = [{...computer.moves[indexMove]}, indexMove] //записываем кортеж из - копии хода и случайного индекса 
                flag = false    //если получили ход, выходим из цикла while
                break           //если получили ход, выходим из цикла for
            }
        }
    }
    flag = true
    console.log(`Ходит ${computer.name}: ${computerMove[0].name}`)
    monster.moves.map((item, index)=>{
        if(index === computerMove[1]){
            for(let key in item){
                console.log(` ${key}:`,item[key])
            }
        }
    })
    console.log('\n')
    //

    //Блок генерации хода игрока
    let userMove = []
    while(flag){
        let userIndexMove=choicePlayerMove(player,user)
        for(let i=0; i<player.moves.length;i++){        // проходим по массиву ходов игрока
            if(player.moves[userIndexMove].cooldown === 0){         //если cooldown хода, первонач. объекта равен 0, и случайный индекс совпал 
                userMove = [{...user.moves[userIndexMove]}, userIndexMove]  //кортеж из: хода и индекса
                flag = false    //если получили ход, выходим из цикла while
                break           //если получили ход, выходим из цикла for
            }
            else if(i === userIndexMove && user.moves[i].cooldown === player.moves[userIndexMove].cooldown){    //если индекс текущего хода и случаного равны, а также cooldown копии равен первонач.
                userMove = [{...user.moves[userIndexMove]}, userIndexMove]  //кортеж из: хода и индекса
                user.moves[userIndexMove].cooldown = -1      // 'обнуляем' cooldown копии
                flag = false    //если получили ход, меняем flag для выхода из цикла while
                break           //если получили ход, выходим из цикла for
            }
        }
        if(userMove.length === 0){ //уведомление пользователся если он ввел индекс 'замороженного' хода
            console.log(`\n!!!!!Данный ход пока заморожен.!!!!!\n`)
        }
    }
    console.log(`\n${user.name} ход: ${userMove[0].name}\n`)
    //

    //Блок для изменения характеристик, копии - объекта игрока
    if((userMove[0].physicArmorPercents -= computerMove[0].physicalDmg) < 0){   //если физическая броня игрока меньше или равна 0, при нанесении урона от монстра 
        user.maxHealth -= computerMove[0].physicalDmg       //вычитаем из копии maxHealt физический урон монстра
        user.moves[userMove[1]].physicArmorPercents = 0    //обнуляем физическую броню у хода,индекс которого пришел в кортеже, т.к. урон монстра больше 
    }else{
        user.moves[userMove[1]].physicArmorPercents -= computerMove[0].physicalDmg  //если физическая броня игрока >0, при нанесении урона от монстра, вычитаем урон
    }
    if((userMove[0].magicArmorPercents -= computerMove[0].magicDmg) < 0){   //если магическая броня игрока меньше или равна 0, при нанесении урона от монстра 
        user.maxHealth -= computerMove[0].magicDmg  //вычитаем из копии maxHealt магический урон монстра
        user.moves[userMove[1]].magicArmorPercents = 0  //обнуляем магическую броню у хода,индекс которого пришел в кортеже, т.к. урон монстра больше 
    }else{
        user.moves[userMove[1]].magicArmorPercents -= computerMove[0].magicDmg  //если магическая броня игрока >0, при нанесении урона от монстра, вычитаем урон
    }
    //

    //Блок для изменения характеристик, копии - объекта монстра
    if((computerMove[0].physicArmorPercents -= userMove[0].physicalDmg) < 0){
        computer.maxHealth -= userMove[0].physicalDmg
        computer.moves[computerMove[1]].physicArmorPercents = 0
    }else{
        computer.moves[computerMove[1]].physicArmorPercents -= userMove[0].physicalDmg
    }
    if((computerMove[0].magicArmorPercents -= userMove[0].magicDmg) < 0){
        computer.maxHealth -= userMove[0].magicDmg
        computer.moves[computerMove[1]].magicArmorPercents = 0
    }else{
        computer.moves[computerMove[1]].magicArmorPercents -= userMove[0].magicDmg
    }
    //

    showCharacteristics(computer,computerMove[1])  //вывод текущих значений(нанесение урона,maxHealth...), передаем копию объекта и индекс хода из кортежа
    showCharacteristics(user,userMove[1])          //вывод текущих значений(нанесение урона,maxHealth...) передаем копию объекта и индекс хода из кортежа
    
    //Блок проверки на выигрышь/проигрышь/ничью
    if(user.maxHealth <= 0){        
        console.log(`\nПобедил: ${computer.name}.`)
        console.log(`${user.name} Health: ${user.maxHealth}`)
        break
    }
    else if(computer.maxHealth <= 0){
        console.log(`\nПобедил: ${user.name}.`)
        console.log(`${computer.name} health: ${computer.maxHealth}`)
        break
    }
    else if(computer.maxHealth <= 0 && user.maxHealth <= 0){
        console.log('Ничья!')
        break
    }
    else{
        regenerationСharacteristics(monster.moves, computer.moves) //восстановление брони
        regenerationСharacteristics(player.moves, user.moves)   //восстановление брони
        continue    
    }
    //
}
