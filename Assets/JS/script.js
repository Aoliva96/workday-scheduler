$(document).ready(function () {
  const today = dayjs();
  const todayFormat = today.format("dddd, MMMM D");

  // Append current date to HTML
  $("p").children("span").text(todayFormat);

  // Save button event listener
  function clickHandler(event) {
    let timeBlock = event.target.closest(".time-block");

    if (timeBlock) {
      let hourId = timeBlock.id;
      console.log(`${hourId} schedule saved`);

      // Save user input to local storage
      let text = timeBlock.querySelector("textarea").value;
      console.log(text);

      localStorage.setItem(`${hourId}-schedule`, text);
    }
  }

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", clickHandler);
  });

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
  // TODO: Add code to display the current date in the header of the page.
});
