const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){

        const { booking_id } = req.params;
        console.log(booking_id)
        const booking = await Booking.findByIdAndUpdate(booking_id, {approved:true}).populate("spot")

        const bookingUserSocket = req.connectedUsers[booking.user];

        if(bookingUserSocket){
            req.io.emit("booking_response", booking)
        }




        return res.json(booking)
    }
}