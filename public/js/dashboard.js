let phoneRegex = /^[0-9]{10}$/;
let emaiRegex = /\S+@\S+\.\S+/;
//   FadeIn
$("#add-reminder").click(function () {
  $(".reminder-form-wrapper").fadeIn(200, function () {});
});
// FadeOut
$("#cancel-reminder").click(function () {
  $(".reminder-form-wrapper").fadeOut(200, function () {});
});

// TEST
let reminderO = {
  receiver: $("#form-name").val("Harsh"),
  phone: $("#form-phone").val("7977170346"),
  medicine: $("#form-medicine").val("Crocin,Cipla"),
  address: $("#form-address").val("some address......"),
  interval: $("#form-interval").val("10"),
  mode: $(".select").val("SMS"),
  email: $("#form-email").val("raiharsh88@gmail.com"),
  status: $(".switch > [type= 'checkbox']").prop("checked"),
};

// TEST

$("#save-reminder").click(function () {
  $(".common-input").focus();

  let reminderObject = {
    receiver: $("#form-name").val(),
    phone: $("#form-phone").val(),
    medicine: $("#form-medicine").val(),
    address: $("#form-address").val(),
    interval: $("#form-interval").val(),
    mode: $(".select").val(),
    email: $("#form-email").val(),
    status: $(".switch > [type= 'checkbox']").prop("checked"),
  };

  setTimeout(function () {
    $(".reminder-form-wrapper").fadeOut(200, function () {});
  }, 500);

  //   if (
  //     (reminderObject.mode == "SMS" || reminderObject.mode == "WhatsApp") &&
  //     !phoneRegex.test(reminderObject.phone)
  //   ) {
  //     console.log("Not a valid phone no");

  //     return $("#form-phone").css({ borderColor: "red" });
  //   }
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
