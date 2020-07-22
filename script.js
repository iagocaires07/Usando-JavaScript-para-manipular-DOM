let listaAtividades = JSON.parse(localStorage.getItem('list_atividade')) || [];

let inputName = document.querySelector('#nome');
let inputData = document.querySelector('#data');
let inputHoraInicio = document.querySelector('#horaInicio');
let inputHoraFim = document.querySelector('#horaFim');



function addAtividade(){
    let dados = [inputName.value, inputData.value, inputHoraInicio.value, inputHoraFim.value];

    listaAtividades.push(dados);
    saveToStorage();
}

function renderAtividade(){
    for(dado of listaAtividades){
        let sectionElement = document.querySelector('section');
 
        let divElelment = document.createElement('div');
        divElelment.setAttribute('id', 'listaDeAtividades');
        let formElement = document.createElement('form');
        let ulElement = document.createElement('ul');
        let liElement = document.createElement('li');
        let textElement = document.createTextNode(`Atividade: ${dado[0]} | Data: ${dado[1]}
        | Inicio: ${dado[2]} | Fim: ${dado[3]}`);
    
        liElement.appendChild(textElement);
        ulElement.appendChild(liElement);
        formElement.appendChild(ulElement);
        divElelment.appendChild(formElement);
        sectionElement.appendChild(divElelment);
    }
}

function saveToStorage(){
    localStorage.setItem('list_atividade', JSON.stringify(listaAtividades));
}