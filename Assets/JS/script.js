$(document).ready(function () {
  const now = dayjs();
  const nowFormat = now.format("dddd, MMMM D");

  // Append current date to HTML
  $("p").children("span").text(nowFormat);

  // Save button event listener
  function clickHandler(event) {
    let timeBlock = event.target.closest(".time-block");

    if (timeBlock) {
      let hourId = timeBlock.id;
      console.log(`${hourId}-schedule saved`);

      // Save user input to local storage
      let text = timeBlock.querySelector("textarea").value;
      localStorage.setItem(`${hourId}-schedule`, text);
      console.log(`${hourId}-schedule updated in localstorage`);
    }
  }

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", clickHandler);
  });

  // Apply past / present / future classes to each time-block
  const hours = $(".time-block");

  for (let i = 0; i < hours.length; i++) {
    let hoursEl = hours.eq(i);

    checkTime(hoursEl);
  }

  function checkTime(hoursEl) {
    let hoursElId = hoursEl.attr("id");
    let hoursStrings = hoursElId.split("-");
    let timeTest = hoursStrings[1];

    if (now.isBefore(dayjs().hour(timeTest).valueOf(), "hour")) {
      hoursEl.addClass("future");
    } else if (now.isSame(dayjs().hour(timeTest).valueOf(), "hour")) {
      hoursEl.addClass("present");
    } else if (now.isAfter(dayjs().hour(timeTest).valueOf(), "hour")) {
      hoursEl.addClass("future");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
});
