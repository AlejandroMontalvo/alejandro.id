window.onload = function () {
  // Dark/Light Theme Logic
  // Aqcuire the theme icons as variables
  var sunny = document.getElementsByName("sunny")[0];
  var moon = document.getElementsByName("moon")[0];

  /* Set the theme to the previously saved 
     value for the theme within localstorage, if available  */
  document.documentElement.setAttribute("data-theme", localStorage.theme);

  /* If the current theme is 'light', change the
     change the theme icon  */
  if (localStorage.theme == "light") {
    sunny.style.display = "none";
    moon.style.display = "inline-block";
  }

  document.getElementById("switch").addEventListener("click", function () {
    if (localStorage.theme == "dark") {
      sunny.style.display = "none";
      moon.style.display = "inline-block";
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.theme = "light";
    } else {
      sunny.style.display = "inline-block";
      moon.style.display = "none";
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.theme = "dark";
    }
  });
  //---------------------------------------------------------------------------|

  var mobileLinks = document.getElementById("mobileNav");
  var menuIcon = document.getElementById("mobilenav__icon");

  document.querySelectorAll(".mobileNav__toggle").forEach((element) => {
    element.addEventListener("click", function () {
      if (menuIcon.getAttribute("name") === "close") {
        mobileLinks.style.display = "none";
        menuIcon.setAttribute("name", "menu");
      } else {
        mobileLinks.style.display = "block";
        menuIcon.setAttribute("name", "close");
      }
    });
  });

  document
    .getElementById("mobileNav__logo")
    .addEventListener("click", function () {
      mobileLinks.style.display = "none";
      menuIcon.setAttribute("name", "menu");
    });

  // TypeWriter ---------------------------------------------------------------|
  // List of sentences
  var content = ["create.", "design.", "develop.", "learn."];

  // Current sentence being processed
  var contentIndex = 0;

  // Character number of the current sentence being processed
  var characterIndex = 0;

  // Holds the handle returned from setInterval
  var _INTERVAL_VAL;

  // Element that holds the text
  var textElement = document.querySelector("#dynamicText");

  // Cursor element
  var cursor = document.querySelector("#cursor");

  // Implements typing effect
  function typeText() {
    cursor.style.animation = null;
    // Get substring with 1 characater added
    var text = content[contentIndex].substring(0, characterIndex + 1);
    textElement.innerText = text;
    characterIndex++;

    // If full sentence has been displayed then start to delete the sentence after some time
    if (text === content[contentIndex]) {
      cursor.style.animation = "blink 1s step-end infinite";
      clearInterval(_INTERVAL_VAL);
      setTimeout(function () {
        _INTERVAL_VAL = setInterval(deleteText, 50);
      }, 2000);
    }
  }

  // Implements deleting effect
  function deleteText() {
    cursor.style.animation = null;
    // Get substring with 1 characater deleted
    var text = content[contentIndex].substring(0, characterIndex - 1);
    textElement.innerHTML = text;
    characterIndex--;

    // If sentence has been deleted then start to display the next sentence
    if (text === "") {
      clearInterval(_INTERVAL_VAL);

      // If current sentence was last then display the first one, else move to the next
      if (contentIndex == content.length - 1) contentIndex = 0;
      else contentIndex++;

      characterIndex = 0;

      // Start to display the next sentence after some time
      setTimeout(function () {
        cursor.style.display = "inline-block";
        _INTERVAL_VAL = setInterval(typeText, 100);
      }, 200);
    }
  }

  // Start the typing effect on load
  _INTERVAL_VAL = setInterval(typeText, 100);
};