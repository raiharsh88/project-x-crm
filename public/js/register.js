$(document).ready();

$("[type = submit]").click(function () {
  console.log("hello");

  // let x = {
  //   name: $("#name").val("Harsh Rai"),
  //   email: $("#email").val("raiharsh2230@gmail.com"),
  //   phone: $("#number").val("7977170346"),
  //   password: $("#password").val("passcode@95"),
  //   confirmPassword: $("#confirm-password").val("passcode@95"),
  // };
  const regForm = {
    name: $("#name").val(),
    email: $("#email").val(),
    phone: $("#number").val(),
    password: $("#password").val(),
    confirmPassword: $("#confirm-password").val(),
  };

  const emailExp = /\S+@\S+\.\S+/;
  const phoneExp = /^\d{10}$/;

  if (regForm.name.length < 2) return alert("Fill out all the details !");
  if (!emailExp.test(regForm.email)) return alert("Invalid email !");
  if (!phoneExp.test(regForm.phone)) return alert("Invalid Phone Number !");
  if (regForm.password != regForm.confirmPassword) return alert("Password ");

  $.post("/users/register", regForm)
    .done(function (data) {
      alert(data.msg);
      if (data.status == 200) {
        window.location.replace(data.url);
      }
    })
    .fail(function (error) {
      alert("something went wrong!");
    });
});
