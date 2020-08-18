console.log("common cookie", document.cookie);

$.post("/users/test", { data: "test data" })
  .done(function (data) {
    console.log(data);
  })
  .fail((err) => {
    console.log("Failed HTTP request");
  });
