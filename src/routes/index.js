const { Router} = require('express');
const multer = require("multer");
const SessionController = require("../controllers/ServiceController");
const StorageSpotController = require("../controllers/ServiceSpotController");
const uploadConfig = require("../config/multer");
const DashboardController = require('../controllers/DashboardController');
const BookingController = require("../controllers/BookingController");
const ApprovalController = require('../controllers/ApprovalController');
const RejecionController = require('../controllers/RejectionController');

const upload = multer(uploadConfig);
const routes = Router();

routes.get("/", (req, res) =>{
    return res.json({
        ok:true
    })
});

routes.post("/session", SessionController.index);
routes.get("/users", SessionController.show);
routes.post("/spot", upload.single("thumbnail"), StorageSpotController.store);
routes.get("/spot",StorageSpotController.index);
routes.get("/dashboard", DashboardController.show);
routes.post("/spot/:spot_id/bookings", BookingController.store);
routes.get("/bookings", BookingController.show);
routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejecionController.store)

module.exports = { routes };