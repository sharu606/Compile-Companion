var msgArr = new Array();
    msgArr[0] = '"Word used by the programmers when they dont want to explain what they did"';
    msgArr[1] = '"Programmer: A Machine that turns coffee into code."';
    msgArr[2] = '"A person who fixed a problem that you dont know you have, in a way you don\'t understand."';
    msgArr[3]='"Code teaches you how to face really big problems"';
    msgArr[4]='"Its harder to read code than to write."';
    msgArr[5]='"Without requirements or design, programming is the art of adding bugs to an empty file."';
    msgArr[6]='"Controlling complexity is the essence of computer programming."';
    msgArr[7]='"While there is code, there\'s Bug."';
    msgArr[8]='"Real programmers count from 0."';
    msgArr[9]='"The word Algorithm was coined to recognise Al Gore\'s contribution to computer science."';
    msgArr[10]='"UNIX is user friendly... it\'s just very particular about who its friends are..."';
  
  window.onload = function () {
    var random_index = Math.floor(Math.random()*msgArr.length);
    document.getElementById("msgDiv").innerHTML = msgArr[random_index].slice(0, );

	} 

firebase.auth().onAuthStateChanged(function(user) {
    if (user) 
    {
      // User is signed in.
      window.location.href = "file:///D:/html_projects/compile-anywhere/home.html";
    } 
    else 
    {
      // No user is signed in.
    }
  });

  var check = function () {
    if (document.getElementById("confirmPassword").value.length == 0) {
      document.getElementById("indicator").style.color = "white";
    }
    else
    { if (
      document.getElementById("newpassword").value ==
      document.getElementById("confirmPassword").value
    ) {
      document.getElementById("indicator").style.color = "rgb(103, 212, 64)";
      
    } else {
      document.getElementById("indicator").style.color = "rgb(228, 52, 52)";
      
    }
  }
  };
  

function login()
{
    const userEmail = document.getElementById("emailid").value;
    const password = document.getElementById("password").value;


    
    firebase.auth().signInWithEmailAndPassword(userEmail, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        document.getElementById("alertbox").style.display="block";
        
        if (errorCode == "auth/invalid-email") {
          errorMessage = "Invalid email";
        }
        else if (errorCode == "auth/wrong-password") {
          errorMessage = "Invalid Password";
        }
        else if (errorCode == "auth/user-not-found") {
          errorMessage = "User not found/Account has been deleted";
        }
        alertbox(errorMessage, "alerting");
        setTimeout(function() { document.getElementById("alertbox").style.display="none"; }, 5000);
      });
      
}

function signup() 
{
    const userEmail = document.getElementById("newemailid").value;
    const password = document.getElementById("newpassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const userName = document.getElementById("username").value;
    var errorMessage;

    errorMessage = validation(userEmail, password, confirmPassword, userName);
    
    if (errorMessage != "") {

      document.getElementById("signup_alertbox").style.display="block";
  
      
      alertbox(errorMessage, "signup_alerting");
      setTimeout(function() { document.getElementById("signup_alertbox").style.display="none"; }, 5000);
    }

    else {
      firebase.auth().createUserWithEmailAndPassword(userEmail, password).then(function(user) { console.log(user);}).catch(function(error) {
        errorMessage = error.message;
        errorCode = error.code;

        document.getElementById("signup_alertbox").style.display="block";
  
        if (errorCode == "auth/email-already-in-use") {
          errorMessage = "The email address is already in use.";
        }

        alertbox(errorMessage, "signup_alerting");
        setTimeout(function() { document.getElementById("signup_alertbox").style.display="none"; }, 5000);

      });
    }

}

function validation(userEmail, password, confirmPassword, userName) {

  var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  if (userEmail.length == 0) {
    return "Enter the Email id";
  }

  else{
    if (userEmail.match(mailformat)) {
      if (userName === "") {
        return "Enter the username";
      }
      else {
        if (password == "") {
          return "Enter the password";
        }
        else {
          if (strongPassword(password)) {
            if (checkPassword(password, confirmPassword)) {
              return "";
            }
            else {
              return "Password and confirm password doesn't match."
            }
          }
          else {
            return "Enter a strong password/Refer the Hints."
          }
          
        }
        
      }
    }
    else {
      return "Invalid Email id";
    }
  }
  return "";
}

function strongPassword(password) {

  var matchedCase = ["[$@$!%*#?&]", "[A-Z]", "[0-9]", "[a-z]"];

  var strong = 0;
  for (var i = 0; i < matchedCase.length; i++) {
    if (new RegExp(matchedCase[i]).test(password)) {
      ++strong;
    }

  }
  if (strong < 4) { 
    return false;
  }
  else {
    return true;
  }
}

function checkPassword(password, confirmPassword) {

  if (password == confirmPassword) {
    return true;
  }
  return false;
}

function login_page() 
{
    document.getElementById("login_arrow").style.visibility = "visible";
    document.getElementById("signup_arrow").style.visibility = "hidden";
    document.getElementById("login_button").className = "selected";
    document.getElementById("signup_button").className = "signup_button";
    document.getElementById("login_page").style.display = "block";
    document.getElementById("signup_page").style.display = "none";
    document.getElementById("landing").style.display = "none";
    document.getElementById("signup_alertbox").style.display="none";  
}

function signup_page() 
{
    document.getElementById("login_arrow").style.visibility = "hidden";
    document.getElementById("signup_arrow").style.visibility = "visible";  
    document.getElementById("login_button").className = "login_button";
    document.getElementById("signup_button").className = "selected";
    document.getElementById("login_page").style.display = "none";
    document.getElementById("signup_page").style.display = "block";
    document.getElementById("landing").style.display = "none";
    document.getElementById("alertbox").style.display="none";
}

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const togglenewPassword = document.querySelector('#togglenewPassword');
const newpassword = document.querySelector('#newpassword');
const confirmPassword = document.querySelector('#confirmPassword');

togglenewPassword.addEventListener('click', function (e) {
    
    const type = newpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    newpassword.setAttribute('type', type);
    const conf_type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', conf_type);
    this.classList.toggle('fa-eye-slash');
});


function forgotpassword() {
  alert("Coming Soon");
}

function alertbox(errorMessage, id) {
  document.getElementById(id).innerHTML = errorMessage;
}