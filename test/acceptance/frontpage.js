var page = require('webpage').create();
console.log("Opening");
page.open('http://kassavirtanen.dev.absum.net:8000/dashboard', function(status) {
console.log("Status: " + status);
    if (status === "success") {
        var test = document.getElementById('remember-me').textContent;
        console.log("Element found");

      if (test != 'Muista minut') {
            console.log('FAIL Could not find element by id remember-me');
            phantom.exit(2);
      }
      console.log("Element found");
      phantom.exit(0);
    }
    console.log('FAIL React is not running. Status ' + status);
    phantom.exit(2);
});
