/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* The test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {

        /* The test ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* The test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });
        /* The test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has at least 1 .entry element within .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

      /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var lastFeed,
            newFeed;

        // Load feeds twice. Save the lastFeed and newFeed and compare them.
        beforeEach(function(done) {
            loadFeed(0, function() {
                lastFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });
        /* The test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('is loaded', function() {
            expect(lastFeed).not.toBe(newFeed);
        });
    });
}());
