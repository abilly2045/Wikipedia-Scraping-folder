describe('Validate Wikipedia Link', () => {
    it('validates a Wikipedia link', () => {
        cy.visit('https://en.wikipedia.org/wiki/Main_Page'); // Visit any Wikipage
        const url = 'https://en.wikipedia.org/wiki/Computer_security'; // Wikipage that would be verify the test

        // Loggin into console the URL to check what value is being validated
        cy.log('Entered URL:', url);

        // Define a regex pattern for validating Wikipedia links
        const wikiRegex = /^https:\/\/en\.wikipedia\.org\/wiki\/.+$/;

        // Validating the URL conform the wiki pattern
        if (!url || !wikiRegex.test(url)) {
            throw new Error('Invalid Wikipedia link');
        } else {
            cy.log('Valid Wikipedia link: ' + url);
            
        }
    });
});



