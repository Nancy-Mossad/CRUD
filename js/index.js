// var siteNamevalue = document.getElementById('sitename').value;
// var siteUrlValue = document.getElementById('siteurl').value;

var sitedetails;

var tableContent = [];

if (localStorage.getItem('nn') != null) {
    tableContent = JSON.parse(localStorage.getItem('nn'));
    tableDisplay()
}

//---------------------------add concept--------------------
function submitFunc() {

    if (validationInputs(  document.getElementById('sitename'), 'nameAlert' )== true &&   validationInputs(  document.getElementById('siteurl'), 'urlAlert' )== true  ) {
        sitedetails = {
            siteName: document.getElementById('sitename').value,
            siteUrl: document.getElementById('siteurl').value
        }
        tableContent.push(sitedetails);

        localStorage.setItem('nn', JSON.stringify(tableContent));
        tableDisplay()
        clearInputs()
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "you must enter valid inputs!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}
//---------------------------clear function--------------------
function clearInputs() {
    document.getElementById('sitename').value = null;
    document.getElementById('siteurl').value = null;

    document.getElementById('sitename').classList.remove('is-valid');
    document.getElementById('siteurl').classList.remove('is-valid');
}
//---------------------------display concept--------------------
function tableDisplay() {
    content = '';
    for (var index = 0; index < tableContent.length; index++) {
        content += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${tableContent[index].siteName}</td>
                    <td><button onclick='btnVisit(${index})' class="btn py-2 px-3 text-white" style="background-color: #9EB23B;">Visit</button></td>
                    <td><button onclick='btnDelete(${index})' class="btn py-2 px-3 text-white btn-danger" >Delete</button></td>
                </tr>`
    }
    document.getElementById('tablecontentlocation').innerHTML = content;
}
//---------------------------btn visit logic--------------------

function btnVisit(index) {
    window.open(tableContent[index].siteUrl, "_blank");
}
//---------------------------btn delete logic--------------------

function btnDelete(tIndex) {

    tableContent.splice(tIndex, 1)
    tableDisplay()
    localStorage.setItem("nn", JSON.stringify(tableContent))


}
//---------------------------Validation--------------------
function validationInputs(element, msdId) {
    var text = element.value;
    var regex = {
        sitename: /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        siteurl: /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/

    }
    var msg = document.getElementById(msdId);

    if (regex[element.id].test(text)) {

        element.classList.remove("is-invalid");
        element.classList.add("is-valid");

        msg.classList.add('d-none');
        return true


    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");

        msg.classList.remove('d-none');
        return false
    }
}
