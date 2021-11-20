import bcrypt from "bcrypt";

const saltRounds = 12;
const correctPassword = "admin";
const incorrectPassword = "Hunter123";
const correctHash = "$2b$12$beyAXdjja3fypP9dredMBOlE38F4.30J4v2RhWzq696jv47urxFxm";

(async () => {
    const hashedPassword = await bcrypt.hash(correctPassword, saltRounds);
    //console.log(hashedPassword);

    const isPasswordCorrect = await bcrypt.compare(correctPassword, correctHash)
    console.log(isPasswordCorrect)
})()

export default {}