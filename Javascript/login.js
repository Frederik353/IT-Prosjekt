$(document).ready(function () {
  $("#submit").click(function () {
    var name = $("#name").val();
    var pass = $("#pass").val();
    if (name == "" || pass == "") {
      $("#Required").show();
      $("#error").hide();
    } else if (name == "root" && pass == "toor") {
      window.location.pathname = "../index.html";
    } else {
      $("#error").show();
      $("#Required").hide();
    }
  });
});
