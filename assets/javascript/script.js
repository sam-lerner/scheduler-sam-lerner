
// Storing vars
var saveBtn = $('.saveBtn');
var timeText = $(".description");
// Time sync
var currentStorage = [];
var currentDay;
var currentTime;
var timeList = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  // First, get time from DayJS
  function currentDayJs() {
    var currentDay = dayjs().format('dddd MMM D, YYYY');
    var currentHour = dayjs().format('hh:mm a');
    $('#currentDay').text(currentDay);
    console.log(currentDay, currentHour);
  }

  // When I view the timeblocks for the day, each timeblock is color coded to indicate whether it is in the past, present, or future
  function setColor() {
    // console.log("Setting color");
    // First, ref current time.
    timeText.each(function (i) {
      currentTime = parseInt(dayjs().format('H'));
      // Get number from ID field
      blockTime = $(this).attr('id').split('-')[1];
      // Next, compare each block to current time.
      // console.log(i, currentTime);
      // console.log(i, blockTime)
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
      setInterval(setColor, 60000);
    })
  }

  // Page load functions
  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
  // the code isn't run until the browser has finished rendering all the elements
  // in the html.
  $(function () {
    currentDayJs();
    setColor();
    // Make sure time stays up to date
    setInterval(currentDayJs, 60000);
    console.log(currentDayJs);
    timeText.each(function(i) {
      console.log(timeText[i]);
      timeText[i].value= localStorage.getItem(`btn-${$(this).attr('data-hour')}`);
    })
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
      localStorage.setItem($(this).attr('id'),timeText[i].value);
      // console.log('Saved', timeText[i].value);
    })
  })