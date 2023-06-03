const express = require("express")
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https")
const app = express();
// in order to use static files such as styles.css and the image logo we need to static func of express

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// this loads the signup page
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})


app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/64c0f6b6cd";
    const options = {
        method: "POST",
        auth: "shazia1:223e0975fcf10241e2cbb94cc5e07816-us21"

    }

    const request=https.request(url, options, function (response) {
        if(response.statusCode==200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/fail.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
request.write(jsonData);
request.end();

});

app.post("/fail", function (req, res) {
res.redirect('/')
})

app.listen(process.env.PORT ||3000, function () {
    console.log("server is running ");
})

