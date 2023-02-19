const router = require("express").Router();
const User = require("../models/Users");

router.post("/", async (req, res) => {
    const addUser = new User(req.body);
    try {
        const newUser = await addUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
