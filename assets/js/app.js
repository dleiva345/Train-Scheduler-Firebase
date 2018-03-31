
//Initialize Firebase
var config = {
    apiKey: "AIzaSyDEo_Qo40TKYBMnckgHqwEyrM89iCXb_Qo",
    authDomain: "train-schedule-fdc06.firebaseapp.com",
    databaseURL: "https://train-schedule-fdc06.firebaseio.com",
    projectId: "train-schedule-fdc06",
    storageBucket: "",
    messagingSenderId: "640771746014"
};
  firebase.initializeApp(config);
  var database = firebase.database();

  //Adding Train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //Grab User Input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstTrain = moment($("#start-input").val().trim(),"HH:mm").format("X");
    var trainFreq = $("#freq-input").val().trim();
      
    
    //Local temp objects for holding user data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      start: firstTrain,
      frequency: trainFreq,
      
    };
    //Upload users data to the database
    database.ref().push(newTrain);

    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrain);
    console.log(trainFreq);
    

    alert("Train Added");
    //clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#freq-input").val("");

  });

  //Firebase event for adding trains to the database 
  database.ref().on("child_added", function(childSnapShot, prevChildKey) {
    console.log(childSnapShot.val());

    //store into variable
    var trainName = childSnapShot.val().name;
    var trainDest = childSnapShot.val().dest;
    var firstTrain = childSnapShot.val().start;
    var trainFreq = childSnapShot.val().frequency;
   

    //Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrain);
    console.log(trainFreq);

    //var trainFrequency ="";
    //var firstTime = "";
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    tainFreq + "</td><td>" + "minutes" + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");


  });
    