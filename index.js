

// TODO write the JavaScript that makes this application functional. 


// Get references to HTML elements
const appSection = document.getElementById('app');
const promptSection = document.getElementById('prompt-section');
const resultSection = document.getElementById('result-section');
const calcBtn = document.getElementById('calc-btn');
const returnBtn = document.getElementById('return-btn');

const imgContainer = document.getElementById('img-container'); 
const hour = document.getElementById('hour-dropdown');
const minute = document.getElementById('minute-dropdown');
const ampmDropdown = document.getElementById('ampm-dropdown');

const bedtimeHoursDiv = document.getElementById('bedtime-hours-div');

// Define sleep cycle duration and time to fall asleep in minutes
const sleepCycleDuration = 90;
const timeToFallAsleep = 14;
const minInHour = 60; 

calcBtn.addEventListener('click', calcBedTimes);

returnBtn.addEventListener('click', function () {
  
  // Show the prompt section and hide the result section
  promptSection.classList.remove('hidden');
  imgContainer.classList.remove('hidden');
  resultSection.classList.add('hidden');
});

// Calculate bedtime
function calcBedTimes() {
  // Get selected values from dropdowns
  const hourVal = parseInt(hour.value);
  const minuteVal = parseInt(minute.value);
  const ampm = ampmDropdown.value;

  // Convert the selected time to minutes since midnight
  let selectedTimeInMinutes = hourVal * minInHour + minuteVal;

  // Handle the case when wake-up time is 12 AM (midnight)
  if (ampm === 'AM' && hourVal === 12) {
    selectedTimeInMinutes = 0 + minuteVal; // Set it to 0 minutes (midnight)
  }

  // Adjust for PM times
  if (ampm === 'PM' && hourVal !== 12) {
    selectedTimeInMinutes += 12 * minInHour;
  }

  // Subtract the time it takes to fall asleep
  selectedTimeInMinutes -= timeToFallAsleep;


  // Calculate bedtime options
  bedtimeHoursDiv.innerHTML = '';
  
  for (let i = 6; i >= 1; i--) {
    let minAfterCycle = selectedTimeInMinutes - i * sleepCycleDuration;

    // Adjust for AM/PM shift
    if (minAfterCycle < 0) {
      minAfterCycle += 24 * 60; // Wrap around to the previous day
    }

    const bedtimeHour = Math.floor(minAfterCycle / minInHour) % 12 || 12;
    const bedtimeMinute = minAfterCycle % minInHour;
    let ampm; 
  
    // 12 * 60 = minutes before afternoon 
    if (minAfterCycle < 720) { 

      ampm = 'AM';
    } else { 

      ampm = 'PM'; 
    }
    const formattedBedtime = bedtimeHour + ':' + bedtimeMinute.toString().padStart(2, '0') + ' ' + ampm;

    const cycleDiv = document.createElement('div');
    cycleDiv.classList.add('cycle');
    cycleDiv.setAttribute("id", `cycle-${i}`);
    cycleDiv.textContent = formattedBedtime;
    bedtimeHoursDiv.appendChild(cycleDiv);
  }

  // Show the result section and hide the prompt/image section
  promptSection.classList.add("hidden");
  imgContainer.classList.add("hidden"); 
  resultSection.classList.remove("hidden");
}



  







