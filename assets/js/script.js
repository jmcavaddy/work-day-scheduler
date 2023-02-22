// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var saveBtn = $(".saveBtn");
  // When the save button is clicked, run the following function that will save the text from the .description class, the sibling 
  // of the button clicked, to a variable called text. Then, it will save the text to local storage with a key of the
  // parent element's id (which is the hour).
  saveBtn.on("click", function () {
    console.log(this.parentElement.id);
    var text = $(this).siblings(".description").val();
    console.log(text);
    localStorage.setItem(this.parentElement.id, text);
  });

  // This function will get the current hour and compare it to the id of each time block. If the id is less than the current hour,
  // it will add the class of past to the time block. If the id is equal to the current hour, it will add the class of present. 
  // If the id is greater than the current hour, it will add the class of future.
  
  function updateColor() {
    console.log("updateColor")
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      // blockHour grabs the hour by splitting the id at the dash and grabbing the number from the array.
      // The number is then parsed into an integer for comparison to current hour.
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).removeClass("present");
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }
  updateColor();

  // This function will get the text from local storage and set it to the text area with the same id as the key.
  function getLocalStorage() {
    for (var i = 9; i < 18; i++) {
      var text = localStorage.getItem("hour-" + i);
      $("#hour-" + i).children(".description").val(text);
    }
  }
  getLocalStorage();
    
  // Display the current date in the header of the page.
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  });

