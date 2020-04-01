$(document).ready(function() {
  var currentDay = moment().format("MMMM Do, YYYY");
  $("#date").html(currentDay);

  var oneDay = moment()
    .add(1, "days")
    .format("MMMM Do");
  $("#oneday").html(oneDay);

  var twoDay = moment()
    .add(2, "days")
    .format("MMMM Do");
  $("#twoday").html(twoDay);

  var threeDay = moment()
    .add(3, "days")
    .format("MMMM Do");
  $("#threeday").html(threeDay);

  var fourDay = moment()
    .add(4, "days")
    .format("MMMM Do");
  $("#fourday").html(fourDay);

  var fiveDay = moment()
    .add(5, "days")
    .format("MMMM Do");
  $("#fiveday").html(fiveDay);
});
