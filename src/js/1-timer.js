import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate;

const timePicker = document.querySelector("input#datetime-picker");
const buttonState = document.querySelector('button[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
    defaultDate: new Date(),
  dateFormat: "Y-m-d H:i",
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        buttonState.removeAttribute('disabled');
        // console.log(selectedDates[0]);
  },
};

flatpickr(timePicker, options);

document.addEventListener('DOMContentLoaded', () => {
    buttonState.setAttribute('disabled', '');
});


buttonState.addEventListener('click', () => {
    const dataNow = Date.now()
    if (dataNow > userSelectedDate) {
        alert("SHIIIIT");
    }
    // console.log(userSelectedDate - dataNow);
 }
)