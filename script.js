let listTodos = JSON.parse(localStorage.getItem('listTodos')) || [];

function createTodo(){
    let getVerification = document.querySelector('#cadastrarTodo');

    if(getVerification){
        alert('Por favor, adicione um Todo por ver.');
    }else{
        let loadElements = document.querySelector('.container');
        let sectionElement = document.createElement('section');
        let formElement = document.createElement('form');
        formElement.setAttribute('id', 'cadastrarTodo');
        let inputElement = document.createElement("input");
        inputElement.setAttribute('placeholder', 'Title');
        let divButtons = document.createElement('div');
        divButtons.setAttribute('id', 'buttonsTodo');
        let btSalvar = document.createElement('input');
        btSalvar.setAttribute('value', 'Salvar');  
        btSalvar.setAttribute('type', 'button');
        btSalvar.setAttribute('onclick', 'addTodo()');
        let btCancelar = document.createElement('input');
        btCancelar.setAttribute('type', 'button');
        btCancelar.setAttribute('value', 'Cancelar');
        btCancelar.setAttribute('onclick', 'cancelTodo()');

        divButtons.appendChild(btCancelar);
        divButtons.appendChild(btSalvar);

        formElement.appendChild(inputElement);

        sectionElement.appendChild(formElement);
        sectionElement.appendChild(divButtons);

        loadElements.appendChild(sectionElement);
    }
}

function addTodo(){
    let inputValeu = document.querySelector('#cadastrarTodo input');
    
    if(inputValeu.value.length === 0){
        alert('[ERROR] Por favor, preencha os campos antes de salvar um Todo.');
    }else{
    listTodos.push(inputValeu.value);
    inputValeu.value = '';
    saveToStorage();
    renderTodo();
    }
}

function cancelTodo(){
    let containerElement = document.querySelector('.container');

    containerElement.innerHTML = '';
}

function saveToStorage(){
    localStorage.setItem('listTodos', JSON.stringify(listTodos));
}

function renderTodo(){

    if(listTodos.length === 0){
        alert('[ATENÇÂO] Você ainda não possui nenhum Todo salvo.');
    }

    let ulElement = document.createElement('ul');
    let containerElement = document.querySelector('.container');
    let sectionElement = document.createElement('section');
    sectionElement.setAttribute('id', 'exibe-todo');
  
    listTodos.map((dados) =>{
        let liElement = document.createElement('li');
        let textList = document.createTextNode(dados);

        containerElement.innerHTML = '';

        sectionElement.appendChild(ulElement);

        liElement.appendChild(textList);
        ulElement.appendChild(liElement)

        sectionElement.appendChild(ulElement);
        containerElement.appendChild(sectionElement);
    });
}
