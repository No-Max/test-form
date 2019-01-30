'use strict'
//fields actions
var fields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"]');

for(var i = 0; i < fields.length; i++){
    fields[i].oninput = function () {
        if(this.value){
            this.classList.add('t3-form__input_input')
        }else{
            this.classList.remove('t3-form__input_input')    
        }
    }
    fields[i].onfocus = function () {
        if(!this.value && !this.classList.contains('t3-form__input_date')){
            this.classList.add('t3-form__input_focus')
        }  
        if(this.classList.contains('t3-form__input_date')){                
            this.setAttribute('type', 'date')
        } 
    }
    fields[i].onblur = function () {
        this.classList.remove('t3-form__input_focus', 't3-form__input_input')
        if(!this.value && this.classList.contains('t3-form__input_date')){                
            this.setAttribute('type', 'text')
        }
    }
}

//navigation
var nav = document.getElementById('navigation');
var navBtn = document.getElementById('navBtn');
navBtn.onclick = function () {
    nav.classList.toggle('navigation_active');
}

//form
var nextBtns = document.querySelectorAll('.t3-form__btn');

for(var i = 0; i < nextBtns.length; i++){
    nextBtns[i].onclick = function (e) {
        e.preventDefault();
        formValidate(e.target.form);
    }
}

function formValidate (form) {
    removeErros(form);
    var elements = getActiveFields(form);
    var isValid = true;
    for(var i = 0; i < elements.length; i++){
        if(!fieldValidate(elements[i])){
            isValid = false;       
        }
    }
    if(isValid) swichForm(form);
}

function removeErros(form){
    var errors = document.querySelectorAll('.t3-form__text-error');
    for(var j = 0; j < errors.length; j++){                
        errors[j].parentElement.classList.remove('t3-form__group_error');
        errors[j].remove();
    }
}

function getActiveFields(form){
    var elements = form.elements;
    var activeElements = [];
    for(var i = 0; i < elements.length; i++){
        if(elements[i].classList.contains('validate')){
            activeElements.push(elements[i])
        }
    }
    return activeElements;
}
function fieldValidate (field) {
    var status = true;
    var message = '';
    var validateCases = {
        required: field.classList.contains('required'),
        email: field.classList.contains('email'),
        phone: field.classList.contains('phone'),
        code: field.classList.contains('code'),
        password: field.classList.contains('password'),
        conditions: field.classList.contains('conditions'),
        name: field.classList.contains('name')
    }
    //console.log(field, validateCases);
    for (var key in validateCases) {
        var validateCase = validateCases[key];
        if(validateCase){
            switch(key) {
                case 'required': {
                    if(!field.value){
                        status = false; 
                        message = 'Это поле обязательное для заполнения';
                        addError(field, message);
                    }
                } break; 
                case 'name': {
                    if((field.value.match(/^[a-zа-яё]+$/i) == null) && field.value) {
                        status = false; 
                        message = 'Неверный формат'  ;
                        addError(field, message);   
                    }
                } break;
                case 'conditions': {
                    if(!field.checked){
                        status = false; 
                        message = 'Вы должны согласиться, чтобы продолжить';
                        addError(field, message);
                    }
                } break; 
                case 'phone': {
                    if((field.value.match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/) == null) && field.value) {
                        status = false; 
                        message = 'Неверный формат, пример: "+375293333333"'  ;
                        addError(field, message);   
                    }
                } break;
                case 'email': {
                    if((field.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i) == null) && field.value) {
                        status = false; 
                        message = 'Неверный формат, пример: "example@example.com"';
                        addError(field, message);     
                    }
                } break; 
                case 'password': {
                    var password = document.getElementsByClassName('t3-form__input_password')[0].value;
                    if(field.value !== password) {
                        status = false; 
                        message = 'Вы неверно повторили пароль';
                        addError(field, message);
                    }
                } break;  
                case 'code': {
                    if(field.value !== "007") {
                        status = false; 
                        message = 'Неверный код, попробуйте "007"';
                        addError(field, message);     
                    }
                } break;
            }   
        }
    }
    return status;
}

function addError(field, message){
    var parent = field.parentElement;
    var error = document.createElement('div');    
    parent.classList.add('t3-form__group_error');
    error.innerHTML = message;
    error.classList.add('t3-form__text-error');
    parent.appendChild(error);
}

function swichForm(form){
    var forms = document.querySelectorAll('.t3-form');
    for(var i = 0; i < forms.length; i++){
        if(forms[i] === form){
            if(forms[i] != forms[forms.length-1]){
                forms[i+1].classList.add('t3-form_active');
            }else{
                alert('Конец');
            }
        }
    }
    form.classList.remove('t3-form_active');        
}
