const router = require("express").Router();
router.get("/", (req, res) => {
    res.send("Hello Mehedi");
});
module.exports = router;
