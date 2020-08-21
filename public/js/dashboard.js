let phoneRegex = /^[0-9]{10}$/;
let emaiRegex = /\S+@\S+\.\S+/;

var REMID = null;

//   FadeIn
$("#add-reminder").click(function () {
  $(".reminder-form-wrapper").fadeIn(200, function () {});
});
// FadeOut
$("#cancel-reminder").click(function () {
  let x = {
    receiver: $("#form-name").val(""),
    phone: $("#form-phone").val(""),
    medicine: $("#form-medicine").val(""),
    address: $("#form-address").val(""),
    interval: $("#form-interval").val(""),
    mode: $(".select").val(""),
    email: $("#form-email").val(""),
  };

  $("#save-reminder").removeAttr("xid1");
  $(".reminder-form-wrapper").fadeOut(200, function () {});
});

// TEST
// let reminderO = {
//   receiver: $("#form-name").val("Harsh"),
//   phone: $("#form-phone").val("7977170346"),
//   medicine: $("#form-medicine").val("Crocin,Cipla"),
//   address: $("#form-address").val("some address......"),
//   interval: $("#form-interval").val("10"),
//   mode: $(".select").val("0"),
//   email: $("#form-email").val("raiharsh88@gmail.com"),
//   status: $(".switch > [type= 'checkbox']").prop("checked"),
// };

// TEST

$("#save-reminder").click(function () {
  $(".common-input").focus();

  let reminderObject = {
    receiver: $("#form-name").val(),
    phone: $("#form-phone").val(),
    medicine: $("#form-medicine").val(),
    address: $("#form-address").val(),
    interval: $("#form-interval").val(),
    mode: $(".select").find(":selected").text(),
    email: $("#form-email").val(),
    status: $(".switch > [type= 'checkbox']").prop("checked"),
    remId: $(this).attr("xid1"),
  };

  $.post("/api/save", reminderObject)
    .done((data) => {
      console.log("Data", data);

      let x = {
        receiver: $("#form-name").val(""),
        phone: $("#form-phone").val(""),
        medicine: $("#form-medicine").val(""),
        address: $("#form-address").val(""),
        interval: $("#form-interval").val(""),
        mode: $(".select").val(""),
        email: $("#form-email").val(""),
      };
    })
    .fail((e) => console.log(e));
  window.location.reload();

  $("#save-reminder").removeAttr("xid1");

  setTimeout(function () {
    $(".reminder-form-wrapper").fadeOut(200, function () {});
  }, 500);
});

$("#form-phone").on("input", function () {
  if ($(".select").val() == "WhatsApp" || $(".select").val() == "SMS") {
    if (!phoneRegex.test($("#form-phone").val())) {
      $("#form-phone").css({ borderColor: "red" });
      $("#save-reminder").prop("disabled", true);
    } else {
      $("#form-phone").css({ borderColor: " rgb(47, 47, 47)" });
      $("#save-reminder").prop("disabled", false);
    }
  } else {
    $("#form-phone").css({ borderColor: " rgb(47, 47, 47)" });
    $("#save-reminder").prop("disabled", false);
  }
});

$("#form-interval").on("input", function () {
  if (!Number.isInteger(parseInt($("#form-interval").val()))) {
    $("#form-interval").css({ borderColor: "red" });
    $("#save-reminder").prop("disabled", true);
  } else if ($("#form-interval").val() == 0) {
    $("#form-interval").css({ borderColor: "red" });
    $("#save-reminder").prop("disabled", true);
  } else if ($("#form-interval").val() == "") {
    $("#form-interval").css({ borderColor: "red" });
    $("#save-reminder").prop("disabled", true);
  } else {
    $("#form-interval").css({ borderColor: " rgb(47, 47, 47)" });
    $("#save-reminder").prop("disabled", false);
  }
});

$(".select").on("input", function () {
  if ($(".select").val() === "Email") {
    $("#form-phone").css({ borderColor: " rgb(47, 47, 47)" });

    if (emaiRegex.test($("#form-email").val())) {
      $("#form-email").css({ borderColor: " rgb(47, 47, 47)" });
      $("#save-reminder").prop("disabled", false);
    }
  } else if (
    $(".select").val() === "WhatsApp" ||
    $(".select").val() === "SMS"
  ) {
    $("#form-email").css({ borderColor: " rgb(47, 47, 47)" });

    if (phoneRegex.test($("#form-phone").val())) {
      $("#form-phone").css({ borderColor: " rgb(47, 47, 47)" });

      $("#save-reminder").prop("disabled", false);
    } else {
      $("#form-phone").css({ borderColor: "red" });
    }
  }
});

$("#form-email").on("input", function () {
  if ($(".select").val() == "Email") {
    if (!emaiRegex.test($("#form-email").val())) {
      $("#form-email").css({ borderColor: "red" });
      $("#save-reminder").prop("disabled", true);
    } else {
      $("#form-email").css({ borderColor: "rgb(47,47,47)" });
      $("#save-reminder").prop("disabled", false);
    }
  }
});

$(document).ready(async function () {
  let reminders = null;
  await $.post("/api/openall", {})
    .done((data) => {
      reminders = data.reminders;
    })
    .fail((e) => alert("Something went wrong!"));

  if (reminders) {
    for (let reminder of reminders) {
      let { receiver, medicine, interval, status, mode, remId } = reminder;
      $(".rem-store > .reminder-container > .row > .reminder > .name").text(
        receiver
      );
      $(".rem-store > .reminder-container > .row > .reminder > .medicine").text(
        medicine
      );
      $(".rem-store > .reminder-container > .row > .reminder > .interval").text(
        interval
      );
      $(".rem-store > .reminder-container > .row > .reminder > .mode").text(
        mode
      );

      $(
        "body > div.rem-store.hidden > div > div > div > div.reminder-props.status"
      ).text(status ? "Active" : "Inactive");

      if (!status) {
        $(".rem-store > .reminder-container > .row > .reminder > .status").css({
          color: "red",
          borderColor: "red",
        });
      } else {
        $(".rem-store > .reminder-container > .row > .reminder > .status").css({
          color: "green",
          borderColor: "green",
        });
      }

      $("body > div.rem-store.hidden > div > div > div > div.edit-btn").attr(
        "id",
        remId
      );

      $("body > div.rem-store.hidden > div > div > div > div.edit-btn").attr(
        "id"
      );

      $("#rem-canvas").append($(".rem-store").html());
    }

    //opening a edit modal
  }

  $(".edit-btn").on("click", function (event) {
    $(".select").focus();

    $.post("/api/open1", { remId: $(this).attr("id") })
      .done((data) => {
        if (data.status == 200) {
          data = data.reminder;

          $("#form-name").val(data.receiver);
          $("#form-phone").val(data.phone);
          $("#form-medicine").val(data.medicine);
          $("#form-address").val(data.address);
          $("#form-interval").val(data.interval);
          $("#form-email").val(data.email);
          $("#save-reminder").attr("xid1", data.remId);
          $(".select").val(data.mode);
          $(".select option").each(function () {
            $(this).removeAttr("selected");
          });

          //   Toggle switch
          if (
            data.status == false &&
            $(".switch > [type= 'checkbox']").prop("checked")
          ) {
            $(".state-selector .switch .slider").click();
          } else if (
            data.status == true &&
            !$(".switch > [type= 'checkbox']").prop("checked")
          ) {
            $(".state-selector .switch .slider").click();
          }

          //   Toggle switch

          if (data.mode == "WhatsApp")
            $(".select option[value = 0]").prop("selected", true);

          if (data.mode == "SMS")
            $(".select option[value = 1]").prop("selected", true);
          if (data.mode == "Email")
            $(".select option[value = 2]").prop("selected", true);
          if (data.mode == "Self")
            $(".select option[value = 3]").prop("selected", true);
        } else {
          alert("resource not found");
        }
      })
      .fail((err) => {
        alert("Something went wrong");
        window.location.reload();
      });

    $(".reminder-form-wrapper").fadeIn(200);
  });
  console.log("THIS IS NEXT");
});
