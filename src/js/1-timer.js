import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const timePicker = document.querySelector("input#datetime-picker");
const buttonState = document.querySelector('button[data-start]');
const myTimer = document.querySelectorAll('.field .value')

const options = {
  enableTime: true,
  time_24hr: true,
    defaultDate: new Date(),
  dateFormat: "Y-m-d H:i",
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate <= Date.now()) {
            iziToast.warning({
            message: 'Please choose a date in the future',
            color: 'red',    
            position: 'topCenter',
    });
            return
        }
        
        buttonState.removeAttribute('disabled');
  },
};

flatpickr(timePicker, options);

document.addEventListener('DOMContentLoaded', () => {
    buttonState.setAttribute('disabled', '');
});


buttonState.addEventListener('click', () => {
    const flickerSelector = document.querySelector('.flatpickr-input');
    buttonState.setAttribute('disabled', '');
    flickerSelector.setAttribute('disabled', '');
    const intervalId = setInterval(() => {
        const finishDate = Date.now()
        const timeDiffirance = userSelectedDate - finishDate;
        let myAnswer = convertMs(timeDiffirance)
        myTimer.forEach((time, index) => {
            switch (index) {
                case 0:
                    time.innerHTML = myAnswer.days.toString().padStart(2, "0");
                    break;
                    case 1:
                        time.innerHTML = myAnswer.hours.toString().padStart(2, "0");
                        break;
                        case 2:
                            time.innerHTML = myAnswer.minutes.toString().padStart(2, "0");
                            break;
                            case 3:
                                time.innerHTML = myAnswer.seconds.toString().padStart(2, "0");
                                break;
                            }
                        })
            if (timeDiffirance <= 1000) {
                clearInterval(intervalId);
                flickerSelector.removeAttribute('disabled');
                return
                }
                        
    }, 1000)
 }
)


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


