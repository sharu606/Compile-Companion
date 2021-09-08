function addaprogram(programno, Labname) {
  database.collection("programs").add({
      Program_no: programno,
      Program_Title: "",
      Lab: Labname,
      Date: "",
      Language: "",
      Os_used: "",
      Program_Code: "",
      Program_Description: "",
      Program_Input: "",
      Program_Output: "",
      Software_used: "",
      Time: "",
      Youtube_link: "",
      Tags: [],
    } 
  )
}

document.getElementById("add_block").onclick=function () {
  addaprogram(program_no, labname);
  const saveDate = dt.toUTCString();
  docDetail
  .set({
    currentStatus: "Available",
    Details:{
      Uid: "GmVhvMcjUjxGDvVNhkfdryVBCgDGF",
      action: "Added",
      dateandtime: saveDate
    },
    name: uiddd,
    progname: "",
    labcode: labcode,
  })
  .then(function () {
    console.log("status saved!");
  })
  .catch(function (error) {
    console.log("got an error:", error);
  });
};

function refresh_data(id) {
  database.collection("programs").doc(id).update(
    { Program_Title: "",
      Date: "",
      Language: "",
      Os_used: "",
      Program_Code: "",
      Program_Description: "",
      Program_Input: "",
      Program_Output: "",
      Program_Title: "", 
      Software_used: "",
      Time: "",
      Youtube_link: "",
      Tags: [],
    }
  )
  document.getElementById('id80').style.display='none';
}

function displayProgram(program_title, program_no, id, Labname) {

  let programs = `
  <div class="cols">
  <div class="program_block">
  <div class="row no-gutters">
    <div class="col-9">
      Program #${program_no}:
      <span>${program_title}</span>
    </div>
    <div class="col-3">
      <i class="material-icons md2" onclick="programUploadPage('${id}')"></i>
      <div class="to_edit">
        <span class="material-icons md6" data-target="#trash_modal0" data-toggle="modal0" onclick="document.getElementById('id80').style.display='block'"></span>
        <div id="id80" class="modal0">
          <form class="modal-content0" action="/action_page.php">
            <div class="container0">
              <span class="pop0">Are you sure ?</span>
              <div class="clearfix0">
                <button type="button" onclick="document.getElementById('id80').style.display='none'" class="cancelbtn">Cancel</button><br>
                <button type="button" onclick="refresh_data('${id}')" class="deletebtn">Yes, reset</button>
              </div>
            </div>
          </form>
        </div>
        <span class="material-icons md5" data-target="#trash_modal" data-toggle="modal" onclick="document.getElementById('id08').style.display='block'"></span>
        <div id="id08" class="modal">
          <form class="modal-content" action="/action_page.php">
            <div class="container">
              <span class="pop1">Are you sure ?</span>
              <div class="clearfix">
                <button type="button" onclick="document.getElementById('id08').style.display='none'" class="cancelbtn">Cancel</button><br>
                <button type="button" onclick="delete_program('${id}')" class="deletebtn">Yes, delete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>`

  document.querySelector('.program_list_inside').innerHTML += programs;

}

function delete_program(id) {
  document.getElementById('id08').style.display='none';
  database.collection("programs").doc(id).delete();
}

function sortOnKeys(dict) {

  var sorted = [];
  
  Object.keys(dict).forEach(key => {
      sorted[sorted.length] = key;
  });

  var sortedValues = [];
  for(var i = 0; i < sorted.length; i++) {
      sortedValues.push(dict[sorted[i]]);
  }

  return sortedValues;
}

var labname = "";
var program_no = 0;

function retrieve_programs(Labname) {
  var program_list = {};
  labname = Labname;
  var i = 1;
  database.collection("programs").where("Lab", "==", Labname).get().then((querySnapshot) => {
    document.querySelector('.program_list_inside').innerHTML = '';
    querySnapshot.forEach((doc) => {
      program_no = i++;
      displayProgram(doc.data().Program_Title, program_no, doc.id, Labname);
      program_list[doc.data().Program_no] =  doc.data().Program_Title;
    });
  });

  var sortedValues = sortOnKeys(program_list);

}

var labcode = ""

function displaySem(doc) {

  let semesters = `
  <div class="panel panel-default" >
  <div class="panel-heading">
    <div class="panel-title" data-toggle="collapse" data-target="#collapse${doc.data().Semester}" onclick="lab_page()">
      <div class="row no-gutters">
        <div class="col-9">
          <span class="sem_font">${doc.data().Semester}</span>
        </div>
        <div class="col-2">
        </div>
      </div>
    </div>
  </div>
  <div id="collapse${doc.data().Semester}" data-parent="#semesters" class="panel-collapse collapse">
    <div class="panel-body">`;

    doc.data().Labs.forEach(lab => {
    semesters +=
      `<div>
      <button class="labCode" onclick="program_list('${lab.Labname}', '${lab.Labcode}')">${lab.Labcode}</button>
    </div>`
    })

    semesters += `</div>
                </div>
              </div>`

document.querySelector('.sem_list').innerHTML += semesters;

}

var database = firebase.firestore();

database.collection("semesters").orderBy("Semester").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    displaySem(doc);
  });
});

function program_list(Labname, labcode_) {
  labcode = labcode_
  $('.labCode').on('click', function(){
    $('.labCode').removeClass('selected');
    $(this).addClass('selected');
  });
  document.getElementById("sem_page").style.display="none";
  document.getElementById("lab_page").style.display="none";
  document.getElementById("lab_programs").style.display="block";

  document.getElementById("lab_name").innerHTML = Labname;
  document.querySelector('.program_list_inside').innerHTML = '';
  retrieve_programs(Labname);

}

var uid;
var uiddd;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    getUser(user.uid);
    uiddd = user.uid;
    getHistory(user.uid);
    
  } else {
    // No user is signed in.
    window.location.href = "file:///D:/html_projects/compile-anywhere/landing.html";
  }
});

var modal = document.getElementById('modal2');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  
  if (event.target == modal) {
    
    modal.style.display = "none";
    
  }
}

function lab_page() {
    document.getElementById("sem_page").style.display="none";
    document.getElementById("lab_programs").style.display="none";
    document.getElementById("lab_page").style.display="block";
    $('.panel-default').on('click', function(){
      $('.panel-default').removeClass('select1');
      $(this).addClass('select1');
    }); 
}

function edit_mode() {
  var plus = document.getElementsByClassName("material-icons md2");

  for(element of plus) {
    element.style.display="none";
  }
  var edits = document.getElementsByClassName("to_edit");

  for(element of edits) {
    element.style.display="block";
  }
  document.getElementById("edit").style.display="none";
  document.getElementById("after_edit").style.display="inline-block";
}

function save() {
  savetoedit();
  location.reload();
}

function cancel() {
  savetoedit();
}

function savetoedit() {
  var plus = document.getElementsByClassName("material-icons md2");

  for(element of plus) {
    element.style.display="block";
  }
  var edits = document.getElementsByClassName("to_edit");

  for(element of edits) {
    element.style.display="none";
  }
  document.getElementById("edit").style.display="inline-block";
  document.getElementById("after_edit").style.display="none";
}

function open_it(){
  document.getElementById('modal1').style.display='none';
  document.getElementById('modal2').style.display='block';
}

function logout() 
{
    firebase.auth().signOut();
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

var check = function () {
  if (document.getElementById("confirmPassword").value.length == 0) {
    document.getElementById("indicator").style.color = "#0183d2";
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

function programUploadPage(id){
  window.location.href = "file:///D:/html_projects/compile-anywhere/program_upload.html";
  window.localStorage.setItem('id', id);
  window.localStorage.setItem('uid', uid);
}

var firestore = firebase.firestore();

const getUser = (uiddd) => {
  firestore
    .collection("faculty-user")
    .where("uid", "==", uiddd)
    .get()
    .then((result) => {
      if (result.docs.length == 1) {
        const name = result.docs[0].data().userName;
        const Email = result.docs[0].data().Email;
        document.querySelector("#name1").innerText = name;
        document.querySelector("#name2").innerText = Email;
      }
    });
};

const getHistory = (uiddd) => {
  let tableData = [];
  firestore
    .collection("lastedited")
    .where("name", "==", uiddd)
    .get()
    .then((result) => {
      result.docs.forEach((element) => {
        console.log("============== ", element.data());
        tableData.push({
          labcode: element.data().labcode,
          progname: element.data().progname,
          action: element.data().Details.action,
          date: element.data().Details.dateandtime,
        });
      });
      bindDataToDataTable(tableData);
    });
};

const bindIcon = (data) => {
  if (data === "deleted") {
    return "<i class='material-icons trash'>delete</i>";
  } else if (data === "edited") {
    return "<i class='material-icons home'>description</i>";
  } else if (data === "Added") {
    return "<i class='material-icons shop'>note_add</i>";
  }
};

const bindDataToDataTable = (data) => {
  if (data.length === 0) {
    $("#productTable").append("<tbody></tbody>");
  }

  data.forEach((element) => {
    // historyTable
    $("#historyTable tbody").append(
      "<tr>" +
        "<td>" +
        element.labcode +
        "</td>" +
        "<td>" +
        element.progname +
        "</td>" +
        "<td>" +
        bindIcon(element.action) +
        "</td>" +
        "<td>" +
        element.date +
        "</td>" +
        "</tr>"
    );
  });
};

var modal = document.getElementById("modal2");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var dt = new Date();

const docDetail = firestore.collection("lastedited").doc();