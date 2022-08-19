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

//глобальная переменная health пользователя
let userHealth=0
//глобальная переменная для заблокированных ходов монстра
let blockedEnemyMoves={}
//глобальная переменная у заблокированных ходов пользователя
let blockedUserMoves={}

//функция ввода сложности(здоровья Евстафия)
const choiceDifficulty=()=>{
    userHealth = readlineSync.question("Введите здоровье Евстафия: "); 
    //проверка на ввод числа
    if(isNaN(userHealth)){
        console.log('Вы ввели не число!')
        return choiceDifficulty()
    }
}

//функция принимающая массив ходов, и возвращающая ход под рандомным индексом
const getEnemyMove=(moves)=>{
   const moveIndex= Math.trunc(Math.random()*moves.length)
   return moves[moveIndex]
}

//функция возвращающая массив достыпных ходов
const getAvailableMoves = (moves, blockedMoves)=>moves.filter(move=>!(Object.keys(blockedMoves).includes(move.name)))

//функция изменяющая cooldown ходов
const changeCooldown=(blockedMoves)=>{
    const changeBlockedMovesObj={}
    Object.entries(blockedMoves).map(([key,value])=>[key,value-1])
                                .filter(([_,value])=>value>=1)
                                .forEach(([key,value])=>changeBlockedMovesObj[key]=value)
    
    return changeBlockedMovesObj
}

//функция для выбора хода пользователем
const getUserMoves=(moves)=>{
    console.log('\nВам доступны ходы:')
    //вывод характеристик хода
    moves.forEach((move,index)=>console.log(`${index+1})`+move.name))
    moveIndex = readlineSync.question("Выберете ход: "); 
    console.log('\n')
    if(isNaN(moveIndex) || moveIndex>moves.length || moveIndex<=0){
        console.log('Ошибка ввода.')
        return getUserMoves(moves)
    }
    return moves[moveIndex-1]
}

//функция вычисления урона нанесенного врагу
const calculateDamage=(attack,block)=>{
    const damage= (attack.physicalDmg-(attack.physicalDmg*block.physicArmorPercents)/100)+
                  (attack.magicDmg-(attack.magicDmg*block.magicArmorPercents)/100)
    return damage
}

//функция показывающая результат битвы
const getGameResult=()=>{
    if(userHealth<=0 && monster.maxHealth<=0){
        console.log('Ничья.')
    }
    else if(userHealth<=0){
        console.log(`Победил ${monster.name}`)
    }
    else if(monster.maxHealth<=0){
        console.log(`Победил ${player.name}`)
    }
    
}

const showСharacteristicsMove=(move,playerName)=>{
    console.log(`Ход ${playerName}:`)
    Object.entries(move).map(([key,value])=>{
        console.log(`${key}: ${value}`)
    })
    console.log('\n')
}
//функция для старта игры
const gameStart=()=>{
    //переменная для подсчета ходов
    let countMove=0
    choiceDifficulty()
    while(userHealth>0 && monster.maxHealth>0){
        countMove+=1
        console.log(`Текущий ход: ${countMove}.`)

        //Ход монстра
        const monsterAvailableMoves=getAvailableMoves(monster.moves, blockedEnemyMoves)
        const monsterCurrentMove=getEnemyMove(monsterAvailableMoves)
        blockedEnemyMoves=changeCooldown(blockedEnemyMoves)
        if(monsterCurrentMove.cooldown !== 0){
            blockedEnemyMoves[monsterCurrentMove.name] = monsterCurrentMove.cooldown
        }
        console.log(`\nХод Лютого: ${monsterCurrentMove.name}`)
        
        //Ход пользователя
        const userAvailableMoves=getAvailableMoves(player.moves, blockedUserMoves)
        const currentUserMove=getUserMoves(userAvailableMoves)
        blockedUserMoves=changeCooldown(blockedUserMoves)
        if(currentUserMove.cooldown!==0){
            blockedUserMoves[currentUserMove.name] = currentUserMove.cooldown
        }

        //Бой
        let damageForUser=calculateDamage(monsterCurrentMove, currentUserMove)
        let damageForMonster=calculateDamage(currentUserMove, monsterCurrentMove)
        showСharacteristicsMove(currentUserMove,player.name)
        showСharacteristicsMove(monsterCurrentMove, monster.name)
        console.log(`Вы нанесли по монстру: ${damageForMonster} урона.`)
        console.log(`Монстер нанес по Евстафию: ${damageForUser} урона.`)
        userHealth = userHealth-damageForUser
        monster.maxHealth = monster.maxHealth-damageForMonster
        console.log(`Евстафий maxHealth: ${userHealth.toFixed(2)}`)
        console.log(`Лютый maxHealth: ${monster.maxHealth.toFixed(2)}\n`)
    }
    getGameResult()
}

gameStart()
