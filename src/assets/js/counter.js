<script type="text/javascript">
var counter = 0;

// Display total
$("#counter").text(counter);

// When button is clicked
$("#add").click(function(){
  //Add 10 to counter
  counter = counter + 1;
	// Display total
	$("#counter").text(counter);
});


//Subtract
$("#subtract").click(function(){
  counter = counter - 1;
  $("#counter").text(counter);
});


// Reset
$("#reset").click(function(){
  counter = 0;
  $("#counter").text(counter);
});

</script>