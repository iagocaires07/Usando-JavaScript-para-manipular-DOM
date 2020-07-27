let listTodos = JSON.parse(localStorage.getItem('listTodos')) || [];

function createTodo(){
    let getVerification = document.querySelector('#cadastrarTodo');

    if(getVerification){
        alert('Por favor, adicione um Todo por ver.');
    }else{

        let loadElements = document.querySelector('.container');

        let sectionElement = document.createElement('section');
        sectionElement.setAttribute('id', 'section-cadastro');

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

function reloadPage(){
    window.location.reload(true);
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
    let containerElements = document.querySelectorAll(`.container section`);
    let containerElement = document.querySelector(`.container`);
   
    if(containerElements.length === 2){
        containerElement.innerHTML = '';
        renderTodo();
    }else{
        containerElement.innerHTML = '';
    }      
}

function saveToStorage(){
    localStorage.setItem('listTodos', JSON.stringify(listTodos));
}

function renderTodo(){

    if(listTodos.length === 0){
        alert('[ATENÇÂO] Você não possui nenhum Todo salvo.');
    }

    let ulElement = document.createElement('ul');
    let containerElement = document.querySelector('.container');
    
    let sectionElement = document.createElement('section');
    sectionElement.setAttribute('id', 'exibe-todo');
  
    listTodos.map((dados) =>{
        
        let liElement = document.createElement('li');

        let textList = document.createTextNode(dados);

        let posicao = listTodos.indexOf(dados);

        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', 'assets/criss-cross.svg');
        imgElement.setAttribute('onclick', 'deleteTodo('+posicao+')');

        let inputCheckBox = document.createElement('input');
        inputCheckBox.setAttribute('type', 'checkbox'); 
        inputCheckBox.setAttribute('onclick', 'feitoTodo('+posicao +')');

        containerElement.innerHTML = '';

        sectionElement.appendChild(ulElement);

        liElement.appendChild(inputCheckBox);
        liElement.appendChild(textList);
        liElement.appendChild(imgElement);

        ulElement.appendChild(liElement);

        sectionElement.appendChild(ulElement);

        containerElement.appendChild(sectionElement);
    });
}

function feitoTodo(posicao){
    let inputChecked = document.querySelectorAll('#exibe-todo li input');
    let inputLi = document.querySelectorAll('#exibe-todo ul li');
    let strikeElement = document.createElement('strike');

    if(inputChecked[posicao].checked || inputChecked.onclick){
        let element = listTodos[posicao];
        strikeElement.innerText = element;

        let inputCheckBox = document.createElement('input');
        inputCheckBox.setAttribute('type', 'checkbox');
        inputCheckBox.setAttribute('checked', 'true');
        inputCheckBox.setAttribute('onclick', 'desfazerTodo('+posicao+')');
        
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', 'assets/criss-cross.svg');
        imgElement.setAttribute('onclick', 'deleteTodo('+posicao+')');

        inputLi[posicao].innerHTML = '';

        inputLi[posicao].appendChild(inputCheckBox);
        inputLi[posicao].appendChild(strikeElement);
        inputLi[posicao].appendChild(imgElement);
    }
}

function desfazerTodo(posicao){

    let inputLi = document.querySelectorAll('#exibe-todo ul li');

    let element = listTodos[posicao];

    let textElement = document.createTextNode(element);
    
    let inputCheckBox = document.createElement('input');
    inputCheckBox.setAttribute('type', 'checkbox');
    inputCheckBox.setAttribute('onclick', 'feitoTodo('+posicao+')');

    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', 'assets/criss-cross.svg');
    imgElement.setAttribute('onclick', 'deleteTodo('+posicao+')');

    inputLi[posicao].innerHTML = '';

    inputLi[posicao].appendChild(inputCheckBox);
    inputLi[posicao].appendChild(textElement);
    inputLi[posicao].appendChild(imgElement);
}

function deleteTodo(posicao){

    let slectElement = document.querySelectorAll('#exibe-todo ul li');
    let removeElement = document.querySelector('#exibe-todo ul');

    listTodos.splice(posicao,1);
    saveToStorage();
    removeElement.removeChild(slectElement[posicao]);

    if(listTodos.length === 0){
        reloadPage();
    }
}