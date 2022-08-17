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

//глобальная переменная
let userHealth=0
let blockedEnemyMoves={}
let blockedUserMoves={"Магический блок":0}

const choiceDifficulty=()=>{
    userHealth = readlineSync.question("Введите здоровье Евстафия: "); 
    if(isNaN(userHealth)){
        console.log('Вы ввели не число!')
        return choiceDifficulty()
    }
}

const getEnemyMove=(moves)=>{
   const moveIndex= Math.trunc(Math.random()*moves.length)
   return moves[moveIndex]
}
    
const getAvailableMoves = (moves, blockedMoves)=>moves.filter(move=>!Object.keys(blockedMoves).includes(move.name))

const gameStart=()=>{
    choiceDifficulty()
    while(Object.keys(blockedEnemyMoves).length !== 3){
        const monsterAvailableMoves=getAvailableMoves(monster.moves, blockedEnemyMoves)
        const monsterCurrentMove=getEnemyMove(monsterAvailableMoves)
        blockedEnemyMoves[monsterCurrentMove.name] = monsterCurrentMove.cooldown
        console.log(monsterCurrentMove)
    }
}
gameStart()
