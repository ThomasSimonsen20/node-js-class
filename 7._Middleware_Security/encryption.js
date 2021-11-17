import bcrypt from "bcrypt";

const saltRounds = 12;
const correctPassword = "hunter123";
const incorrectPassword = "Hunter123";
const correctHash = "";

(async () => {
    const hashedPassword = await bcrypt.hash(correctPassword, saltRounds);
    console.log(hashedPassword);

    const isPasswordCorrect = await bcrypt.compare(correctPassword, correctHash)
})()

export default {}