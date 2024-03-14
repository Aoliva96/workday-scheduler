$(document).ready(function () {
  const now = dayjs();

  // Append current date to HTML
  $("#currentDay").children("span").text(now.format("dddd, MMMM D"));

  // Clone time blocks from template (9AM to 5PM)
  for (let i = 10; i <= 17; i++) {
    const container = document.getElementById("scheduleContainer");
    const template = document.getElementById("hour-09");
    const clone = template.cloneNode(true);

    // Update cloned time block ids
    clone.id = `hour-${i.toString().padStart(2, "0")}`;

    // Update cloned time block labels
    if (i < 12) {
      clone.querySelector(".hour").textContent = `${i}AM`;
    } else if (i === 12) {
      clone.querySelector(".hour").textContent = `${i}PM`;
    } else {
      const iFormat = i - 12;
      clone.querySelector(".hour").textContent = `${iFormat}PM`;
    }

    container.appendChild(clone);
  }

  // Save button click handler
  function clickHandler(event) {
    let timeBlock = event.target.closest(".time-block");

    if (timeBlock) {
      let hourId = timeBlock.id;

      // Save user input to local storage
      let input = timeBlock.querySelector("textarea").value;
      localStorage.setItem(`${hourId}-schedule`, input);
      console.log(`${hourId}-schedule saved to localStorage`);
    }
  }

  // Save button event listener
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", clickHandler);
  });

  // Function to compare time blocks to current time
  function checkTime(hoursEl) {
    const hoursStr = hoursEl.attr("id").split("-")[1];

    if (now.isBefore(dayjs().hour(hoursStr).valueOf(), "hour")) {
      hoursEl.addClass("future");
    } else if (now.isSame(dayjs().hour(hoursStr).valueOf(), "hour")) {
      hoursEl.addClass("present");
    } else if (now.isAfter(dayjs().hour(hoursStr).valueOf(), "hour")) {
      hoursEl.addClass("past");
    }
  }

  const hours = $(".time-block");

  for (let i = 0; i < hours.length; i++) {
    let hoursEl = hours.eq(i);

    checkTime(hoursEl);
  }

  // Populate time blocks with user input saved in localStorage
  function loadStorage() {
    const textAreas = document.querySelectorAll("textarea");

    textAreas.forEach((textarea) => {
      const parentId = textarea.parentNode.id;
      const inputData = localStorage.getItem(`${parentId}-schedule`);

      if (inputData) {
        textarea.value = inputData;
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
