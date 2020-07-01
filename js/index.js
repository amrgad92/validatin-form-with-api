let tableBody = document.getElementById("tbl_body");
let http = new XMLHttpRequest();
let name = document.getElementById("name");
let email = document.getElementById("email");
let date = document.getElementById("date");
let phone = document.getElementById("phone");
let marital = document.getElementById("marital");


Display();

function SubmitForm()
{
    var formData = new FormData(form);
    
    // var x = formData.get("email");
    // console.log(x);
    if(name.value == '' || email.value == '' || date.value == '' || phone.value == '' )
    {
        alert("wrong data")
    }

    else{
    APISetter(formData, respons => 
        {
            if (respons.status  === "200" && respons.type === "success" )
                Display();
            else
                alert(respons.msg);
        });
    }
}

function Display()
{

    APIGetter(respons => 
        {
            if(respons.status  === "200" && respons.type === "success" && respons.data.length > 0 )
            {
                var tblBody = "";;
                for (let index = 0; index < respons.data.length; index++) {
                    tblBody += `<tr>
                                        <td>${respons.data[index].full_name}</td>
                                        <td>${respons.data[index].email}</td>
                                        <td>${respons.data[index].gender}</td>
                                        <td>${respons.data[index].birthdate}</td>
                                        <td>${respons.data[index].phone_number}</td>
                                        <td>${respons.data[index].marital_status}</td>
                               </tr>`
                }
                tableBody.innerHTML = tblBody;
                
    }

    });
}

function APIGetter(callback)
{
    http.open("GET" , "http://api.exabyte-eg.com/task/7f6e693682ae5c08a1df0f43/people/get");
    http.send();
    http.addEventListener("readystatechange" , function()
    {
        if(http.readyState == 4 && http.status == 200 && http.response != "")
            callback(JSON.parse(http.response));
    })
}

function APISetter(data , callback)
{
    http.open('POST', 'http://api.exabyte-eg.com/task/7f6e693682ae5c08a1df0f43/people/add');
    http.send(data);
    http.addEventListener("readystatechange" , function()
    {
        if(http.readyState == 4 && http.status == 200)
            callback(JSON.parse(http.response));
    })
}
