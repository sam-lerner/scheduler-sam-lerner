// What are we doing here?

// When I click into a timeblock, I can enter an event (text entry)
// Already done!
// When I click the save button for that timeblock, the text for the event is saved into localstorage
// Storing vars
var saveBtn = $('.saveBtn');
var eventText = $('.description');

// Time sync
var currentDay;
var currentTime;
var timeList = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var timeText = $(".description");

function setLocalStorage(elementToAdd) {
  var currentStorage = getLocalStorage();
  // currentStorage.push(elementToAdd);
  console.log(currentStorage)
  localStorage.setItem('event', JSON.stringify(currentStorage));
}

// Work on localStorage!
function getLocalStorage() {

  // JSON.parse(localStorage.getItem('event'[0])) || [];
  // for (let i = 0; i < timeList.length; i++) {
    //   timeText.each(function (i, a) {
    //     $(a).val(localStorage.getItem('text'[i]))
    //   });
    //   console.log("GetLocal" + timeText);
    // }
    $('timeText').each(function(i) {
      eventText= (localStorage.getItem[i].value);
      console.log("get " + eventText);
    })
  }
// }

// Events persist on refresh


// First, get time from DayJS
function currentDayJs() {
  var currentDay = dayjs().format('dddd MMM D, YYYY');
  var currentHour = dayjs().format('hh:mm a');
  $('#currentDay').text(currentDay);
  console.log(currentDay, currentHour);
}

// When I view the timeblocks for the day, each timeblock is color coded to indicate whether it is in the past, present, or future
function setColor() {
  console.log("Setting color");
  // First, ref current time.
  timeText.each(function (i) {
    currentTime = parseInt(dayjs().format('H'));
    // Get number from ID field
    blockTime = $(this).attr('id').split('-')[1];
    // Next, compare each block to current time.
    console.log(i, currentTime);
    console.log(i, blockTime)
    // If it's later:
    if (currentTime < blockTime) {
      $(this).removeClass('past present');
      $(this).addClass('future');
      // If it's the same hour:
    } else if (currentTime == blockTime) {
      $(this).removeClass('past future');
      $(this).addClass('present');
      // If it's earlier:
    } else if (currentTime > blockTime) {
      $(this).removeClass('present future');
      $(this).addClass('past');
      // If it didn't work:
    } else {
      console.log('You have become unstuck in time.');
    }
    // getLocalStorage();
  })
}

// function renderBlocks() {
//   for (let i = 0; i < timeList.length; i++) {

//   }
// }
// Page load functions
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  currentDayJs();
  setColor();


  // Make sure time stays up to date
  setInterval(currentDayJs, 60000);
  console.log(currentDayJs)
});

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//

saveBtn.each(function (i) {


  $(this).click(function (event) {
    // event.preventDefault();
    console.log("here", timeText[i].getAttribute('id').split('-')[1])
    console.log("clicked")
    console.log(eventText.value);
    var addedEvent = {
      text: eventText[i].value,
      time: timeText[i].getAttribute('id').split('-')[1]
    };
    setLocalStorage(addedEvent)
    console.log('Saved');
  })
})

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page


  // blockTimeViaCustomDataAttribute