const start = "2024-06-10",
    btnLogin = document.querySelector('[data-modal]'),
    btnCloseModal = document.querySelector('[data-close]'),
    modal = document.querySelector('.modal'),
    modalDialog = document.querySelector('.modalDialog'),
    modalReg = document.querySelector('.modalReg'),
    reg = document.querySelector('.reg'),
    btnLoginModal = document.querySelector('.btnLoginModal');


// LOGIN

btnLogin.addEventListener('click', () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    modalDialog.classList.add('show');
    modalReg.classList.add('hide');
    document.body.style.overflow = 'hidden'
})

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''
}

btnCloseModal.addEventListener('click', closeModal);

modal.addEventListener('click', (e) =>{
    if (e.target===modal){
        closeModal();
    }
})
document.addEventListener('keydown',(e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal()
    }
})

reg.addEventListener('click', (e) => {
    modalDialog.classList.add('hide');
    modalDialog.classList.remove('show');
    modalReg.classList.add('show');
    modalReg.classList.remove('hide');
    
});

const forms = document.querySelectorAll('form');
const message = {
    loading: "Завантажую",
    success: "Ласкаво просимо",
    failure: "Щось пішло не так..."
}

forms.forEach(item => {
    postData(item);
});

function postData(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div')
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);


        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        
        request.setRequestHeader('Content-type', 'application/json')
        const formData = new FormData(form);
        console.log(formData)
        const object = {};
        formData.forEach(function(value,key){
            object[key] = value;
        });
        const json = JSON.stringify(object)
        request.send(json);
        request.addEventListener('load', ()=>{
            if (request.status===200){
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(()=> {
                    statusMessage.remove;
                }, 2000)
            } else {
                console.log(request.response);
                statusMessage.textContent = message.failure;
            }
        })





    })
}

// TIMER
function getTimer(endTimer){
    let days, hours, minutes, secondes;
    const t = Date.parse(endTimer) - Date.parse(new Date());
    if (t<=0) {
        days = 0,
        hours = 0,
        minutes = 0, 
        secondes = 0;
    } else {
        days = Math.floor(t/(1000*60*60*24)),
        hours = Math.floor((t/(1000*60*60))%24),
        minutes = Math.floor((t/(1000*60))%60), 
        secondes = Math.floor(t/1000%60);
    }       

    return {
        "time": t,
        days,
        hours,
        minutes,
        secondes
    };
}
function setZero(num){
    if (num>=0 && num <10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock (selector, endTime){
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        secondes = timer.querySelector('#secondes'),
        timeInterval = setInterval(updateClock,1000);
    updateClock();
    function updateClock (){
        const t = getTimer(endTime);
        days.innerHTML = setZero(t.days);
        hours.innerHTML = setZero(t.hours);
        minutes.innerHTML = setZero(t.minutes);
        secondes.innerHTML = setZero(t.secondes);
    
        if (t.time<=0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', start)

// Cards with nominations

class NominationCard {
    constructor(src, alt, title, description,  parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.description = description;  
        this.parent = document.querySelector(parentSelector)      
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class = "choiceItem">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="choiceItem-subtitle">${this.title}</h3>
                <div class="choiceItem-description">${this.description}</div>
            </div>
        `;
        this.parent.append(element);
    }

};

new NominationCard(
    "./images/rastr.jpg",
    "Растрова графіка",
    "Растрова графіка",
    "Передай реалізм і чарівність життя за допомогою растрової графіки",
    '.choiceContextBlock'
).render();

new NominationCard(
    "./images/vector.jpg",
    "Векторна графіка",
    "Векторна графіка",
    "Намалюй яскраві ілюстрації, схеми та інфорграфіку у векторному редакторі графіки",
    '.choiceContextBlock'
).render();

new NominationCard(
    "./images/3D.jpg",
    "3D",
    "Тривимірна графіка",
    "Створюй чарівні світи з редактором тривимірної графіки",
    '.choiceContextBlock'
).render();



