let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;
const checkText=(item)=>{
    switch(item){
        case('ПОНЕДЕЛЬНИК'):{
            item = 'MONDAY'
            break;
        }
        case('ВТОРНИК'):{
            item = 'TUESDAY'
            break;
        }
        case('СРЕДА'):{
            item = 'WEDNESDAY'
            break;
        }
        case('ЧЕТВЕРГ'):{
            item = 'THURSDAY'
            break;
        }
        case('ПЯТНИЦА'):{
            item = 'FRIDAY'
            break;
        }
        case('СУББОТА'):{
            item = 'SATURDAY'
            break;
        }
        case('ВОСКРЕСЕНЬЕ'):{
            item = 'SUNDAY'
            break;
        }
        default: return item
    }
    return item
}
let newStr = str.split('\n').map(item => {
    return item.split(' ').map(item => checkText(item)).join(' ')
               .split(' ').map(item => {
                    return item.split('-').map(item => checkText(item)).join('-')
                               .split(',').map(item => checkText(item)).join(',')
               }).join(' ')
}).join('\n')
console.log(newStr)
