describe('Validate Integer', () => {
    it('validates an integer between 1 and 3', () => {
        cy.visit('https://en.wikipedia.org/wiki/Main_Page'); // Visit the Wikipage

        const input = '1'; // Replace with any desired input -  must be between 1 to 3
        const n = parseInt(input, 10); // Convert input to integer

        // Log the integer to check what value is being validated
        cy.log('Entered integer:', n);

        // Validate the integer is between 1 to 3
        if (!Number.isInteger(n) || n < 1 || n > 3) {
            throw new Error('Invalid integer. Must be between 1 and 3.');
        } else {
            cy.log('Valid integer: ' + n);
            
        }
    });
});

