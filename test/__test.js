import TicketService from "../src/pairtest/TicketService";
import jest from "jest"

const ticketService = new TicketService();

describe('TicketService', () => {
    beforeEach(() => {
        jest.spyOn(TicketPaymentService, 'makePayment').mockReturnValue({status: 'success'});
        jest.spyOn(SeatReservationService, 'makeReservation').mockReturnValue({status: 'success'});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('purchaseTickets', () => {
        test('should return error if the total number of tickets requested would exceed the maximum number of tickets that can be sold', () => {
            const result = ticketService.purchaseTickets(1, {INFANT: 1, CHILD: 10, ADULT: 10});
            expect(result).toEqual('Error: Maximum limit of 20 tickets exceeded');
        });
        test('should return error if request is not valid', () => {
            const result = ticketService.purchaseTickets({INFANT: 1, CHILD: 1}, 1);
            expect(result).toEqual('Error : CHILD and INFANT ticket cannot be purchased without an ADULT ticket');
        })

    })

})