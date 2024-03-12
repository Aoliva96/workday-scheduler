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
      console.log(`${hourId}-schedule updated in localStorage`);
    }
  }

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", clickHandler);
  });

  // Function to compare time blocks to current time
  function checkTime(hoursEl) {
    let hoursElId = hoursEl.attr("id");
    let hoursStrings = hoursElId.split("-");
    let timeTest = hoursStrings[1];

    // Create 24hr time stamp to pass into dayjs
    function currentTimeStamp() {
      // const currentHour = dayjs().hour();
      const currentMinute = dayjs().minute();
      const currentSecond = dayjs().second();

      let timeStamp = `${timeTest}:${currentMinute}:${currentSecond}`;
      return timeStamp;
    }

    // Convert 24hr time to 12hr time
    const timeConvertAM = (military) =>
      military ? dayjs(`1/1/1 ${military}`).format("h:mm A") : null;

    console.log(timeConvertAM(currentTimeStamp()));

    // Check if time blocks are past, present, or future
    if (now.isBefore(dayjs().hour(timeTest).valueOf(), "hour")) {
      hoursEl.addClass("future");
    } else if (now.isSame(dayjs().hour(timeTest).valueOf(), "hour")) {
      hoursEl.addClass("present");
    } else if (now.isAfter(dayjs().hour(timeTest).valueOf(), "hour")) {
      hoursEl.addClass("past");
    }
  }

  // Loop to call checkTime for each time block
  const hours = $(".time-block");

  for (let i = 0; i < hours.length; i++) {
    let hoursEl = hours.eq(i);

    checkTime(hoursEl);
  }

  // Populate time blocks with user input saved in localStorage
  const textAreas = document.querySelectorAll("textarea");

  function loadStorage() {
    textAreas.forEach((textarea) => {
      const parentId = textarea.parentNode.id;
      const scheduleData = localStorage.getItem(`${parentId}-schedule`);

      if (scheduleData) {
        textarea.value = scheduleData;
      } else {
        textarea.setAttribute(
          "placeholder",
          "Enter your schedule details here"
        );
      }
    });
  }

  loadStorage();
});
