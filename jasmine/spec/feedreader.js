/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against application.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* A test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined and not empty', function() {
            var lenurl = allFeeds.length;
            for (i = 0; i < lenurl; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toEqual('');
            }
        });
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function() {
            var lenname = allFeeds.length;
            for (i = 0; i < lenname; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toEqual('');
            }
        });
    });
    /* A test that ensures the menu element is
     * hidden by default.
     */
    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. 
         */
        it('displays when icon clicked', function() {
            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });
        it('hides when clicked again', function() {
            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('has at least one entry within feed upon loadFeed call', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    describe('New Feed Selection', function() {
        var oldFeed;
        var newFeed;
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function() {
                oldFeed = $('.feed').find('h2').text();
                done();
            });
        });
        beforeEach(function(done) {
            loadFeed(1, function() {
                newFeed = $('.feed').find('h2').text();
                done();
            });
        });
        it('removes the old feed and adds new content', function() {
            expect(oldFeed).not.toEqual(newFeed);
        });
    });
});