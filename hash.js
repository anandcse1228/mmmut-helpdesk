const bcrypt = require("bcrypt");

const password = "APS@Secure47";

bcrypt.hash(password, 10).then(hash => {
    console.log(hash);
});