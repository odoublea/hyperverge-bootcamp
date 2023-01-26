document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// SAVE/UPDATE ISSUE
function saveIssue(e) {
    let issueId = chance.guid();
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSummary = document.getElementById('issueSummaryInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueStatus = 'Open';
    let issue = {
        id: issueId,
        description: issueDesc,
        summary: issueSummary,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };
    console.log(issue);
    console.log(issueDesc);
    console.log(issueSeverity);
    console.log(issueAssignedTo);
    
    if (localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

// CLOSE ISSUE
function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues[i].status = "Closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

// DELETE ISSUE
function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}


function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';
    
    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let summary = issues[i].summary;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        issuesList.innerHTML += '<div class= "well p-3 bg-gray-400">' + '<h6>Issue ID: ' + id + '</h6>'+ '<p><span class="badge bg-info rounded shadow-sm p-2">'
                                + status + '</span></p>'+ '<h5>' + desc + '</h5>'  + '<p>' + summary + '</p>' + '<p><i class="bi bi-clock-fill"></i> '
                                + severity + ' '+ '<button type="button" class="btn btn-success ms-2">' + '<i class="bi bi-person-fill me-2"></i>' +
                                 assignedTo + '</button>' + '</p>'+ '<hr class="mt-1 mb-1"/>' +
                                '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                '<a href="#" class="btn btn-danger ms-2" onclick="deleteIssue(\''+id+'\')">Delete</a>'+ '</div>' + '<hr class="mt-1 mb-1 border-2"/>';
    }
}


// BOOTSTRAP

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()