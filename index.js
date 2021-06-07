const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];


// Date of release
const release = new Date(Date.UTC(2021, 5, 24, 15));

// Select the required DOM elements
const countdown = document.querySelector('.countdown');
const numTimes = document.querySelectorAll('.number');
const endingTime = document.querySelector('.ending-time');

// Extract the necessary dates
const releaseYear = release.getFullYear();
const releaseMonth = months[release.getMonth()];
const releaseDate = release.getDate();
const releaseDay = weekday[release.getDay()];

const releaseHour = release.getHours() > 12 ? release.getHours() - 12 : release.getHours() === 0 ? 12 : release.getHours();

const releaseMinute = release.getMinutes() < 10 ? '0' + release.getMinutes() : release.getMinutes();

// Displays the release date for the computer's local time
endingTime.textContent = `Windows 11 is released on ${releaseDay}, ${releaseDate} ${releaseMonth} ${releaseYear}, ${releaseHour < 10 ? `0${releaseHour}` : releaseHour}:${releaseMinute} ${release.getHours() < 12 ? 'a.m.' : 'p.m.'}`;

// Future time in miliseconds
const releaseTime = release.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const difference = releaseTime - today;
    
    // Constants
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60000;
    
    // Remaining time
    const days = Math.floor(difference / oneDay);
    const hours = Math.floor( (difference % oneDay) / oneHour);
    const minutes = Math.floor( (difference % oneHour) / oneMinute);
    const seconds = Math.floor( (difference % oneMinute) / 1000);
    
    // Array of values
    const values = [days, hours, minutes, seconds];
    
    // It adds zero
    function addZero(item) {
        if (item < 10) {
            return '0' + item;
        }
        
        return item;
    }
    
    numTimes.forEach((item, index) => {
        item.textContent = addZero(values[index]);
    });
    
    // If the time has already passed
    if (difference < 0) {
        clearInterval(interval);
        countdown.innerHTML = `<h3 class="expired">Windows 11 has already been released.</h3>`;
    }
}

const interval = setInterval(getRemainingTime, 1000);
getRemainingTime();