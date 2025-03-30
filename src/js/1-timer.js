
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let timerId = null;

const inputEl = document.querySelector("#datetime-picker")
const startBtn = document.querySelector(".btn");
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')

startBtn.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
            const selectedDate = selectedDates[0];
    const now = new Date();
     
         if (selectedDate <= now) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please choose a date in the future',
            position: 'topRight',
        });
        startBtn.disabled = true;
    } else {
        userSelectedDate = selectedDate;
    startBtn.disabled = false;
    }
},
});
 
 startBtn.addEventListener('click', () => {
    if (!userSelectedDate) return;
     startBtn.disabled = true;
     inputEl.disabled = true;
    timerId = setInterval(() => {
        const now = new Date();
        const timeDiff = userSelectedDate - now;

        if (timeDiff <= 0) {
            clearInterval(timerId);
             updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      inputEl.disabled = false;
            return;
        }
        const time = convertMs(timeDiff);
        updateTimerUI(time);
    }, 1000);
 }); 

function updateTimerUI({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
 
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20} 








   
  



