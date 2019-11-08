class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;
        this.rooms = {
            single: Math.round(+this.capacity / 2),
            double: Math.round(+this.capacity * 0.3),
            maisonette: Math.round(+this.capacity * 0.2),
        };
    }

    get roomsPricing() { // когато имаме в условието Returns an object, containing the following properties: , значи ни трябва get
        return {
            single: 50,
            double: 90,
            maisonette: 135,
        }
    }

    get servicesPricing() {
        return {
            food: 10,
            drink: 15,
            housekeeping: 25,
        };
    }

    isAvailableRoom(roomType) {
        return this.rooms[roomType] > 0;
    }

    decreaseRoom(room) {
        this.rooms[room] -= 1;
    }

    increaseRoom(room) {
        this.rooms[room] += 1;
    }

    rentARoom(clientName, roomType, nights) {
        if (this.isAvailableRoom(roomType)) {

            let clientBooking = {
                clientName,
                roomType,
                nights: +nights,
                roomNumber: this.currentBookingNumber
            }
            this.bookings.push(clientBooking);
            this.currentBookingNumber += 1;
            this.decreaseRoom(roomType);
            return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber - 1}.`
        } else {
            let output = `No ${roomType} rooms available!`;
            for (const room in this.rooms) {
                if (this.rooms.hasOwnProperty(room)) {
                    if (this.isAvailableRoom(room)) {
                        output += ` Available ${room} rooms: ${this.rooms[room]}.`;
                    }
                }
            }

            return output;
        }
    }
    roomService = (currentBookingNumber, serviceType) => {
        let booking = this.bookings.find(b => b.roomNumber === currentBookingNumber);
        if (!booking) {
            return `The booking ${currentBookingNumber} is invalid.`
        }
        if (!this.servicesPricing.hasOwnProperty(serviceType)) {
            return `We do not offer ${serviceType} service.`;
        }
        if (!(booking.hasOwnProperty('services'))) {
            booking['services'] = [];
        }
        booking.services.push(serviceType);
        return `Mr./Mrs. ${booking.clientName}, Your order for ${serviceType} service has been successful.`;
    }
    checkOut = (currentBookingNumber) => {
        const index = this.bookings.findIndex(function (i) {
            return i.roomNumber === currentBookingNumber;
        });
        if (index === -1) {
            return `The booking ${currentBookingNumber} is invalid.`
        }
        let booking = this.bookings.splice(+index, 1)[0];

        this.increaseRoom(booking.roomType);

        let totalMoney = this.roomsPricing[booking.roomType] * booking.nights;

        if (!booking.hasOwnProperty('services')) {
            return `We hope you enjoyed your time here, Mr./Mrs. ${booking.clientName}. The total amount of money you have to pay is ${totalMoney} BGN.`
        }

        let totalServiceMoney = booking.services.reduce((a, service) => a + this.servicesPricing[service], 0)
        return `We hope you enjoyed your time here, Mr./Mrs. ${booking.clientName}. The total amount of money you have to pay is ${totalMoney + totalServiceMoney} BGN. You have used additional room services, costing ${totalServiceMoney} BGN.`
    }

    report = () => {
        if (this.bookings.length === 0) {
            return `${this.name.toUpperCase()} DATABASE:\n--------------------\nThere are currently no bookings.`;
        } else {
            let output = `${this.name.toUpperCase()} DATABASE:\n--------------------\n`;
            let bookingsArray = [];
            for (const booking of this.bookings) {
                bookingsArray.push(`bookingNumber - ${booking.roomNumber}\nclientName - ${booking.clientName}\nroomType - ${booking.roomType}\nnights - ${booking.nights}${booking.hasOwnProperty('services') ? '\nservices: ' + booking.services.join(', ') : ''}`);
            }
            output += bookingsArray.join('\n----------\n');
            return output.trim();
        }
    }
}

let hotel = new Hotel('HotUni', 10);

hotel.rentARoom('Peter', 'single', 4);
hotel.rentARoom('Robert', 'double', 4);
hotel.rentARoom('Geroge', 'maisonette', 6);

hotel.roomService(3, 'housekeeping');
hotel.roomService(3, 'drink');
hotel.roomService(2, 'room');

console.log(hotel.report());