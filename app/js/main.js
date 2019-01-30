function initFormT3 () {
    var inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"]'),
        nextBtns = document.querySelectorAll('.t3-form__btn'),
        forms = document.querySelectorAll('.t3-form');
    
    var nav = document.getElementById('navigation');
    var navBtn = document.getElementById('navBtn');
    
    navBtn.onclick = function () {
        nav.classList.toggle('navigation_active');
    }
    for(var i = 0; i < inputFields.length; i++){
        inputFields[i].oninput = function () {
            if(this.value){
                this.classList.add('t3-form__input_input')
            }else{
                this.classList.remove('t3-form__input_input')    
            }
        }
        inputFields[i].onfocus = function () {
            if(!this.value && !this.classList.contains('t3-form__input_date')){
                this.classList.add('t3-form__input_focus')
            }  
            if(this.classList.contains('t3-form__input_date')){                
                this.setAttribute('type', 'date')
            } 
        }
        inputFields[i].onblur = function () {
            this.classList.remove('t3-form__input_focus', 't3-form__input_input')
            if(!this.value && this.classList.contains('t3-form__input_date')){                
                this.setAttribute('type', 'text')
            }
        }
    }
    for(var i = 0; i < nextBtns.length; i++){
        nextBtns[i].onclick = function (e) {
            e.preventDefault();
            buttonHandler(e.target.form);
        }
    }
    function buttonHandler (form) {
        var elements = form.elements;
        var isValid = true;
        var currentErrors = document.querySelectorAll('.t3-form__text-error');
        for(var j = 0; j < currentErrors.length; j++){                
            currentErrors[j].parentElement.classList.remove('t3-form__group_error');
            currentErrors[j].remove();
        }
        for(var i = 0; i < elements.length; i++){
            //console.log(validate(elements[i])); 
            var valid = validate(elements[i])
            if(!valid.status){
                var parent = elements[i].parentElement;
                isValid = false;
                parent.classList.add('t3-form__group_error')
                //create bug element
                var error = document.createElement('div');
                error.innerHTML = valid.message;
                error.classList.add('t3-form__text-error');
                parent.appendChild(error);
            }       
        }
        if(isValid && form !== forms[forms.length-1]){
            swichForm(form);
        } else if (isValid && form == forms[forms.length-1]){
            console.log("В этом месте происходит сбор и отпрака данных на сервер");
        }
    }
    function validate (field) {
        var status = true;
        var message = '';
        var validateCases = {
            required: field.classList.contains('validate-required'),
            email: field.classList.contains('validate-email'),
            phone: field.classList.contains('validate-phone'),
            code: field.classList.contains('validate-code'),
            password: field.classList.contains('validate-password'),
            conditions: field.classList.contains('validate-conditions')
        }
        //console.log(field, validateCases);
        for (key in validateCases) {
            var validateCase = validateCases[key];
            if(validateCase){
                switch(key) {
                    case 'required': {
                        if(!field.value){
                            status = false; 
                            message = 'Это поле обязательное для заполнения' 
                        }
                    } break; 
                    case 'conditions': {
                        if(!field.checked){
                            status = false; 
                            message = 'Вы должны согласиться, чтобы продолжить' 
                        }
                    } break; 
                    case 'phone': {
                        if((field.value.match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/) == null) && field.value) {
                            status = false; 
                            message = 'Неверный формат, пример: "+375293333333"'      
                        }
                    } break;
                    case 'email': {
                        if((field.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i) == null) && field.value) {
                            status = false; 
                            message = 'Неверный формат, пример: "example@example.com"'      
                        }
                    } break; 
                    case 'password': {
                        var password = document.getElementsByClassName('t3-form__input_password')[0].value;
                        if(field.value !== password) {
                            status = false; 
                            message = 'Вы неверно повторили пароль'      
                        }
                    } break;  
                    case 'code': {
                        if(field.value !== "007") {
                            status = false; 
                            message = 'Неверный код, попробуйте "007"'      
                        }
                    } break;        
                    default:{
                        status = true;
                    } 
                }   
            }
        }
        return {
            status: status, 
            message: message
        }
    }
    function swichForm(form){
        for(var i = 0; i < forms.length; i++){
            if(forms[i] === form){
                forms[i+1].classList.add('t3-form_active');
            }
        }
        form.classList.remove('t3-form_active');        
    }
}

initFormT3();
