const router = require("express").Router();
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

router.post("/:hotelId", async (req, res) => {
    const hotelId = req.params.hotelId;
    const addRoom = new Room(req.body);
    try {
        const newRoom = await addRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { room: newRoom._id },
            });
        } catch (error) {
            res.status(500).json(error);
        }
        res.status(200).json(newRoom);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateRoom);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id/:hotelId", async (req, res) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findOneAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { room: req.params.id },
            });
        } catch (error) {
            res.status(500).json(error);
        }
        res.status(200).json("Delete the Room");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const getRoom = await Room.findById(req.params.id);
        res.status(200).json(getRoom);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const getAllRoom = await Room.find(req.params.id);
        res.status(200).json(getAllRoom);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
