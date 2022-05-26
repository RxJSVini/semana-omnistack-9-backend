const Booking = require('../models/Booking');
module.exports = {
    async store(req, res){
        const { booking_id } = req.params;
        const booking = await Booking.findByIdAndUpdate(booking_id, {approved:false})

        return res.json(booking)
    }
}