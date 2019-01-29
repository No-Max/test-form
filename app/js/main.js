function initFormT3 () {
    var inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"]'),
        nextBtns = document.querySelectorAll('.t3-form__btn'),
        tabs = document.querySelectorAll('.t3-form');

    for(var i = 0; i < inputFields.length; i++){
        inputFields[i].oninput = function () {
            if(this.value){
                this.classList.add('t3-form__input_input')
            }else{
                this.classList.remove('t3-form__input_input')    
            }
        }
        inputFields[i].onfocus = function () {
            if(!this.value){
                this.classList.add('t3-form__input_focus')
            }        
        }
        inputFields[i].onblur = function () {
            this.classList.remove('t3-form__input_focus', 't3-form__input_input')
        }
    }
    for(var i = 0; i < nextBtns.length; i++){
        nextBtns[i].onclick = function (e) {
            e.preventDefault();
            buttonHandler();
        }
    }

    function buttonHandler(){
        var elements = activeForm.elements;
        for(var i = 0; i < elements.length; i++){
            var isRequired = elements.classList.contains('required');
            var isEmail =  elements.classList.contains('email');
            var isPhone =  elements.classList.contains('phone');
            var maxVal =  elements.dataset.max;
            var minVal =  elements.dataset.min;
            var isCode =  elements.classList.contains('code');
            var isPass =  elements.classList.contains('password');
            var isPass =  elements.classList.contains('repeat-password');
        }

    }

    function swichTab(tab){
        for(var i = 0; i < tabs.length; i++){
            tabs[i].classList.remove('t3-form_active');    
        }
        tab.classList.add('t3-form_active');
    }
}

initFormT3();
