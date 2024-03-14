$(function () {
  const now = dayjs();

  // Append current date to HTML
  $("#currentDay span").text(now.format("dddd, MMMM D"));

  // Clone time blocks from template (9AM to 5PM)
  for (let i = 10; i <= 17; i++) {
    const clone = $("#hour-09").clone(true);

    // Update cloned time block ids
    clone.attr("id", `hour-${i.toString().padStart(2, "0")}`);

    // Update cloned time block labels
    if (i < 12) {
      $(".hour", clone).text(`${i}AM`);
    } else if (i === 12) {
      $(".hour", clone).text(`${i}PM`);
    } else {
      const iFormat = i - 12;
      $(".hour", clone).text(`${iFormat}PM`);
    }

    $("#scheduleContainer").append(clone);
  }

  // Save button click event handler
  $(document).on("click", ".btn", function (event) {
    let timeBlock = $(event.target).closest(".time-block");

    // Save user input to local storage
    if (timeBlock) {
      let hourId = timeBlock.attr("id");
      let input = timeBlock.find("textarea").val();

      localStorage.setItem(`${hourId}-schedule`, input);
      console.log(`${hourId}-schedule saved to localStorage`);
    }
  });

  // Compare time blocks to current time
  function checkTime(hoursEl) {
    const hoursStr = hoursEl.attr("id").split("-")[1];
    const targetTime = dayjs().hour(hoursStr);

    if (now.isBefore(targetTime, "hour")) {
      hoursEl.addClass("future");
    } else if (now.isSame(targetTime, "hour")) {
      hoursEl.addClass("present");
    } else {
      hoursEl.addClass("past");
    }
  }

  $(".time-block").each(function () {
    let hoursEl = $(this);
    checkTime(hoursEl);
  });

  // Populate time blocks with user input saved in local storage
  $("textarea").each(function () {
    const parentId = $(this).parent().attr("id");
    const inputData = localStorage.getItem(`${parentId}-schedule`);
    if (inputData) {
      $(this).val(inputData);
    } else {
      $(this).attr("placeholder", "Enter your schedule details here");
    }
  });
});
