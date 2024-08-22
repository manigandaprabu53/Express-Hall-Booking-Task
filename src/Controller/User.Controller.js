import findIndexById from '../Utils/findIndexById.js'

const rooms = [];
const customers = [];

const createRoom = (req, res)=>{
    try {
        
        req.body.id = rooms.length ? rooms[rooms.length-1].id+1 : 1;
        req.body.bookings = [];
        rooms.push(req.body)
        res.status(201).send({
            message: "Room Created Successfully",
            Rooms: rooms
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internel Server error",
            error
        })
    }
}

const roomBooking = (req, res)=>{
    try {
        console.log(req.body);
        const {customerName, date, startTime, endTime, roomId} = req.body;
        const room = rooms.find((e)=>e.id === roomId)
        
        if(!room){
            res.status(404).send({
                message: 'Room Not Found'
            })
        }

        const isBooked = room.bookings.some((e)=>e.date === date && ((startTime >= e.startTime && startTime <= e.endTime) && (endTime >= e.startTime && endTime <= e.endTime)));
        if(isBooked){
            res.status(400).send({
                message: 'Room Is Already Booked'
            })
        }

            req.body.bookingId = customers.length ? customers[customers.length-1].bookingId+1 : 1;
            
            console.log("After")
            console.log(req.body)
            customers.push(req.body);
            room.bookings.push(req.body)

            res.status(200).send({
                message: 'Room Created Successfully',
                Rooms_Booked: customers
            })
        
        

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internel Server error",
            error
        })
    }
}

const roomDetails = (req, res)=>{
    const history = rooms.map((e)=>({
        roomName: `Room ${e.id}`,
        bookedStatus: e.bookings.length > 0,
        bookings: e.bookings
    }))

    res.status(200).send({
        message: "Rooms with Booked Data",
        data: history
    })
}

const customerDetails = (req, res)=>{
    let custDetails = customers.map((e)=>({
        customerName: e.customerName,
        roomName: `Room ${e.roomId}`,
        date: e.date,
        startTime: e.startTime,
        endTime: e.endTime
    }))

    res.status(200).send({
        message: "Customer Details Fetched Successfully",
        Customer_Details: custDetails
    })
}

const customerHistory = (req, res)=>{
    const {customerName} = req.params;
    console.log(customerName)
    let bookingDetails = customers.filter((e)=>(e.customerName === customerName));
    let finalResult = bookingDetails.map((e)=>({
        customerName: e.customerName,
        roomName: `Room ${e.roomId}`,
        date: e.date,
        startTime: e.startTime,
        endTime: e.endTime,
        bookingId: e.bookingId,
        bookingStatus: "Booked"
    }))
    console.log(finalResult)
    res.status(200).send({
        message: "Customer History Fetched Successfully",
        Customer_History: finalResult
    })
}

export default {createRoom, roomBooking, roomDetails, customerDetails, customerHistory}
