$("[type = submit]").click(function () {
  let person = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  if (person.email.length < 3 || person.password.length < 8)
    return alert("Email or Password cannot be empty");
  $.post("/users/login", person)
    .done(function (data) {
      console.log(data);
      if (data.msg == "authorized") {
        window.location.href = data.url;
      } else if (data.msg == "unauthorized") {
        $("#emai").val("");
        $("#password").val("");
        alert("Wrong email or password");
      }
    })
    .fail(function () {
      alert("Something went wrong!");
    });
});
