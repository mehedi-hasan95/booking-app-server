const router = require("express").Router();
const hotel = require("../models/Hotel");

router.post("/", async (req, res) => {
    const addHotel = new hotel(req.body);
    try {
        const newHotel = await addHotel.save();
        res.status(200).json(newHotel);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updateHotel = await hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateHotel);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await hotel.findOneAndDelete(req.params.id);
        res.status(200).json("Delete the Hotel");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const getHotel = await hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const getAllHotel = await hotel.find(req.params.id);
        res.status(200).json(getAllHotel);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/cityHotel", async (req, res) => {
    const cities = req.query.cities.split(",");
    try {
        const cityList = await Promise.all(
            cities.map((city) => {
                return hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(cityList);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/hotelType", async (req, res) => {
    try {
        const hotelCount = await hotel.countDocuments({ type: "hotel" });
        const motelCount = await hotel.countDocuments({ type: "motel" });
        const resortCount = await hotel.countDocuments({ type: "resort" });
        const apartmentCount = await hotel.countDocuments({
            type: "apartment",
        });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "motel", count: motelCount },
            { type: "resort", count: resortCount },
            { type: "apartment", count: apartmentCount },
        ]);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
