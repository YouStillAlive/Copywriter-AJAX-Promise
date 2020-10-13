"use strict";
let User = {
    id: "",
    name: "",
    username: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    posts: { title: [], body: [] }
};
let Authors = [];
let index;

$(document).ready(function () {
    $.get("https://jsonplaceholder.typicode.com/users", function (data) {
        for (let i = 0; i < data.length; i++) {
            User.id = data[i].id;
            User.name = data[i].name;
            User.username = data[i].username;
            User.address = data[i].address.city + ", " + data[i].address.street;
            User.email = data[i].email;
            User.phone = data[i].phone;
            User.website = data[i].website;
            Authors.push(JSON.parse(JSON.stringify(User)));
        }
    }).then(
        function success() {
            createStructure();
            $("tr #author").click((event) => {
                if (index === undefined || Authors[index].name !== event.target.innerText) {
                    setIndex(event.target.innerText);
                    showInfo();
                    $("button").click(function () {
                        showPosts();
                    });
                }
            });
        },
        function fail() {
            $("main").append("<h1>Fatal error!</h1>");
        });
});

function createStructure() {
    $("main").append(function () {
        let structure = "<table><tr>";
        for (let i = 0; i < Authors.length; i++) {
            if (i % 5 === 0 && i !== 0) {
                structure += "</tr><tr>";
            }
            structure += "<td id=\"author\">" + Authors[i].name + "</td>";
        }
        structure += "</tr></table>";
        return structure;
    });
}

function showInfo() {
    $("#info,h2,div").remove();
    $("#postInfo, .posts").remove();

    let structure = "<h2>User info:</h2><table id=\"info\">";
    structure += "<tr><td>Name:</td>" + "<td>" + Authors[index].name + "</td></tr>";
    structure += "<tr><td>Username:</td>" + "<td>" + Authors[index].username + "</td></tr>";
    structure += "<tr><td>Address:</td>" + "<td>" + Authors[index].address + "</td></tr>";
    structure += "<tr><td>Email:</td>" + "<td>" + Authors[index].email + "</td></tr>";
    structure += "<tr><td>Phone:</td>" + "<td>" + Authors[index].phone + "</td></tr>";
    structure += "<tr><td>Website:</td>" + "<td>" + Authors[index].website + "</td></tr>";
    structure += "</table>";
    $("main").append(structure + "<div><button>Show posts</button></div>");
}

function showPosts() {
    Authors[index].posts.body = [];
    Authors[index].posts.title = [];
    $.get("https://jsonplaceholder.typicode.com/posts?userId=" + Authors[index].id, function (data) {
        for (let i = 0; i < data.length; i++) {
            Authors[index].posts.title.push(data[i].title);
            Authors[index].posts.body.push(data[i].body);
        }
    }).done(function () {
        $("#postInfo, .posts").remove();
        let structure = "<div class=\"posts\"><h2 id=\"postInfo\">User's posts:</h2><table><tr>";
        for (let i = 0; i < Authors[index].posts.body.length; i++) {
            structure += "<td><h3>" + Authors[index].posts.title[i] + "</h3>" + "<p>" + Authors[index].posts.body[i] + "</p>" + "</td>";
            if (i % 2 === 1)
                structure += "</tr><tr>";
        }
        structure += "</tr></table></div>";
        $("main").append(structure);
    });
}

function setIndex(user) {
    for (var i = 0; i < Authors.length; i++)
        if (Authors[i].name === user)
            break;
    index = i;
} 