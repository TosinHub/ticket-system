import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway'
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
   
    const ticketTypeRequest = new TicketTypeRequest(...ticketTypeRequests, 20)
    const {INFANT, CHILD, ADULT } = ticketTypeRequest.getTicketType()
    
    
    const totalTicket = INFANT + CHILD + ADULT

    if( totalTicket > ticketTypeRequest.getNoOfTickets() ){
      throw new TypeError('Error: Maximum limit of 20 tickets');
    }

    if(CHILD > 0 || INFANT > 0) {
      if(ADULT === 0 || ADULT === null ){
        throw new TypeError('Error : CHILD and INFANT ticket cannot be purchased without an ADULT ticket');
      }
    }

    const totalPrice = (CHILD * 10) + (ADULT * 20);
    const makePayment = new TicketPaymentService()
    const payment = makePayment.makePayment(accountId, totalPrice)

    //assuming the payment gateway returns a success or failure message
    if(payment.status === 'success'){
      const seatToResearve = CHILD + ADULT;
      const seatReservation = new SeatReservationService()
      const reservation = seatReservation.reserveSeat(accountId, seatToResearve)
      //Assuming the Seat Reservation returns a status of success or failure
      if(reservation.status == 'success'){
        return 'Purchase Successful'
      }else{
        return 'Error: seat reservation failed'
      }
    }else{
      return 'Error: payment failed'
    }

  }
}
