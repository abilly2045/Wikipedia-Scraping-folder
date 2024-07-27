describe('Validate Wikipedia Link', () => {
    it('validates a Wikipedia link', () => {
        cy.visit('https://en.wikipedia.org/wiki/Main_Page'); // Visit any Wikipedia page or test page

        const url = 'https://en.wikipedia.org/wiki/Computer_security'; // Replace with desired input

        // Log the URL to check what value is being validated
        cy.log('Entered URL:', url);

        // Define a regex pattern for validating Wikipedia links
        const wikiRegex = /^https:\/\/en\.wikipedia\.org\/wiki\/.+$/;

        // Validate the URL
        if (!url || !wikiRegex.test(url)) {
            throw new Error('Invalid Wikipedia link');
        } else {
            cy.log('Valid Wikipedia link: ' + url);
            
        }
    });
});



