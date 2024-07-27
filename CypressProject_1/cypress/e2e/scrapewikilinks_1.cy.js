describe('Scrape Wikipedia Links', () => {
    it('scrapes unique Wikipedia links for n cycles', () => {
        const startUrl = 'https://en.wikipedia.org/wiki/Computer_security'; // The Wikipage variable use to check it works
        const n = 2; //  The integer variable use between 1 to 3
        const wikiRegex = /^https:\/\/en\.wikipedia\.org\/wiki\/.+$/;
        if (!wikiRegex.test(startUrl)) {
            throw new Error('Invalid Wikipedia link');
        }

        if (!Number.isInteger(n) || n < 1 || n > 3) {
            throw new Error('Invalid integer. Must be between 1 and 3.');
        }

        function scrapeWikiLinks(url) {
            const uniqueLinks = new Set();
            return cy.visit(url).then(() => {
                cy.get('a').each(($el) => {
                    const href = $el.attr('href');
                    if (href && href.startsWith('/wiki/') && !href.includes(':') && uniqueLinks.size < 10) {
                        uniqueLinks.add(`https://en.wikipedia.org${href}`);
                    }
                }).then(() => {
                    return Array.from(uniqueLinks);
                });
            });
        }

        function scrapeWikiPages(startUrl, n) {
            const visitedLinks = new Set();
            const allLinks = new Set([startUrl]);

            const scrapeCycle = (cycle) => {
                if (cycle > n) {
                    const results = {
                        totalLinks: allLinks.size,
                        uniqueLinks: Array.from(allLinks),
                    };

                    // Use cy.task to call the custom task and write results to file
                    cy.task('writeResults', { fileName: 'results.json', data: results }).then(() => {
                        cy.log('Results saved to results.json');
                    });
                    return;
                }

                const newLinks = new Set();

                const processLinks = () => {
                    const promises = Array.from(allLinks).map((url) => {
                        if (!visitedLinks.has(url)) {
                            visitedLinks.add(url);
                            return scrapeWikiLinks(url).then((links) => {
                                links.forEach((link) => {
                                    if (!allLinks.has(link)) {
                                        newLinks.add(link);
                                    }
                                });
                            });
                        }
                        return Cypress.Promise.resolve(); // Resolve immediately if link has already been visited
                    });

                    return Cypress.Promise.all(promises).then(() => {
                        allLinks.add(...newLinks);
                        scrapeCycle(cycle + 1);
                    });
                };

                processLinks();
            };

            scrapeCycle(1);
        }

        scrapeWikiPages(startUrl, n);
    });
});
