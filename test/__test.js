import TicketService from "../src/pairtest/TicketService";

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
            const result = ticketService.purchaseTickets({infant: 1, child: 10, adult: 10}, 1);
            expect(result).toEqual('Error: Maximum limit of 20 tickets exceeded');
        });
        test('should return error if request is not valid', () => {
            const result = ticketService.purchaseTickets({infant: 1, child: 1}, 1);

        })

    })

})