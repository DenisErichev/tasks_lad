var formElement = document.forms['formElement'];
formElement.addEventListener('focus', (evt)=>{
    evt.target.classList.add('focused')
},true)
formElement.addEventListener('blur', (evt)=>{
    evt.target.classList.remove('focused')
},true)
