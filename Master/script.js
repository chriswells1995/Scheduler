// The document ready function makes sure that all of the HTML file is run before any of the JavaScript is run
$(document).ready(function() { 
  // listen for save button clicks
  // This jquery event listener makes it so when the button with the class "saveBtn" is clicked, the following call back functio will be run 
  $(".saveBtn").on("click", function() {
    // get nearby values
    // The variable "value" is declared, which has the value of the value of any "sibling" (element with the same parent as "this") with the class "description"
    // This applies to the textareas that take up the middle 10/12ths of the screen and are currently blank until filled with data.
    var value = $(this).siblings(".description").val();
    // This declares a "time" variable, which is equal to the ID of the parent of "this," which will be "hour-9," or "hour-10," or "hour-11," etc.
    var time = $(this).parent().attr("id");

    // save in localStorage
    // specifically, save the time variable as the "key," and the value variable (what was enetered) as the "value"  
    localStorage.setItem(time, value);
  });
// The start of a function called "hour updater"
  function hourUpdater() {
    // get current number of hours
    // I believe moment() gets the current "moment" and can be formatted to give you the date, day of the week, or in this case, hours.
    var currentHour = moment().hours();

    // loop over time blocks
    // The .each() method specifies a function to run for eached matched element
    // so this should happen for every element with the "time-block" class
    $(".time-block").each(function() {
      // every "this" element, so in this case, elements with the "time-block" class, have their ID attribute selected. 
      // Those IDs are "hour-9," "hour-10," etc. They are then split across the "-" character, making them srings with two elements: 
      // The word "hour," which is index 0, and a number bewteen 9 and 17, index 1. That index 1 is then selected, and the parseInt function
      // turns it into an intiger So, the blockHour variabe will be an intiger, 9 through 17
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // check if we've moved past this time
      if (blockHour < currentHour) {
        // for each row, if their corresponding hour has already happen, it will be given the "past" class, which has properties defined in our custom CSS
        $(this).addClass("past");
      } 
      // same thing with the "present" class. Also, because it will cycle daily, any "past" classes previously assigned that are no longer relevant 
      // will be removed
      else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } 
      // and same thing with the "future" class. And "present" classes that are no longer relevent will be removed. 
      else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
    // end of the hour updater function
  }
// The hour updater function is called 
  hourUpdater();

  // This is my new event listener. It is a "clear all" button. In case you have to cancel all of your plans because of a virus sweeping the nation,
  // And you don't want to individually delete all 9 rows, you can now just click "Clear All" and everyhitng be removed from the local storage, and the
  // page will be re-loaded so all of your events dissapear. 
  $("#clear").on("click", function(event){

    localStorage.removeItem("hour-9");
    localStorage.removeItem("hour-10");
    localStorage.removeItem("hour-11");
    localStorage.removeItem("hour-12");
    localStorage.removeItem("hour-13");
    localStorage.removeItem("hour-14");
    localStorage.removeItem("hour-15");
    localStorage.removeItem("hour-16");
    localStorage.removeItem("hour-17");
    location.reload()

 })

  // set up interval to check if current time needs to be updated
  // This should run the hour updater function every 15000 milleseconds (or 15 seconds) so that it stays accurate
  var interval = setInterval(hourUpdater, 15000);

  // These pull down any locally stored bits of data by calling the "key" and retrieving the associated value (if any)
  // load any saved data from localStorage
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  // display current day on page
  // again, the moment() function is used, but this time it is formatted to be in the day, month, date format, and dynamically rendered to the 
  // <p> tag with the "currentDay" ID that is seen in the jumbotron header of the html sheet.
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
