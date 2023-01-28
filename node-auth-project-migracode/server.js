const express = require("express");
const cors = require("cors");
const { application } = require("express");
const user = require("./routes/user");
 const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// initializing express application
const app = express();
const generateJWT = require("./utils/generateJWT");

// parse requests of content-type - application/json
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:4000"
};
app.use(cors(corsOptions));  // enable CORS





// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MigraCode Auth application." });
});
const users = []

app.post("/users/sign-up", async(req, res) => {
    const { email, name, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    
    const encryptedPassword = await bcrypt.hash(password, salt)
    let newUser = {
        id: users.length,
        email: email,
        password: password,
        name: name,
    }
    users.push(newUser);
    const jwtToken = generateJWT(newUser.id);
    console.log(newUser);
    res.send({jwtToken: jwtToken, isAuthenticated: true})
}),
app.post("/users/sign-in", (req, res) =>{
    const {email, password} = req.body
    const foundUser = users.find(user => user.email === email)
    if (foundUser === undefined) {
        return res.status(401).json({error: "invalid credentials"})
    }
    res.send("wip");
});
app.get("/quotes", (req, res) => {
    const barerToken = req.header("authorization")
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    token = token.split(" ")[0]
    console.log(verify.user)
    res.send("quotes")
});

app.use("/user", user);
// set port, listen for requests
PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
