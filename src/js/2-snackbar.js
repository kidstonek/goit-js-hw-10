import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';


const myForm = document.querySelector('.form');
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const myChoice = document.querySelector('fieldset input[type="radio"]:checked');
    const myTimer = myForm.elements.delay.value;
    const chice = myChoice.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (myChoice.value === 'fulfilled') {
                resolve(myTimer);
            } else {
                reject(myTimer);
            }
        }, myTimer)
    })
    promise.then(result => messageGood(result)).catch(error => messageWar(error));

    myForm.reset();
})



function messageGood(tiMe) {
    iziToast.success({
        message: `✅ Fulfilled promise in ${tiMe}ms`,
        position: 'topCenter',
        icon: '',
    })
}

function messageWar(tiMe) {
    iziToast.warning({
        message: `❌ Rejected promise in ${tiMe}ms`,
        position: 'topCenter',
        icon: '',
    })
}