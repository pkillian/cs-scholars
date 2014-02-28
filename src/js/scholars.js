var Scholars = Scholars || {};

(function(that, $, window, document, undefined) {
    "use strict";

    // false == 60 >= scrollTop > 0
    // true  == scrollTop > 60
    this.scrolled = false;
    this.mousedOver = false;
    this.headerShown = true;
    this.headerHeight = 60;
    this.photoScrollers = {};

    this.bindHeaderMouseOver = function(ev) {
        that.mousedOver = (ev.clientY <= that.headerHeight + 20);

        // If the page is scrolled, the header isn't shown, and the mouse is between 0-80...
        if (that.scrolled && !that.headerShown && that.mousedOver) {

            // Show the header!
            that.toggleHeader(true);

        // If the page is scrolled, the header is shown, and the mouse is between 81-inf...
        } else if (that.scrolled && that.headerShown && !that.mousedOver) {
            
            // Hide the header
            that.toggleHeader(false);
        }
    };

    this.bindHeaderScroll = function(ev) {
        that.scrolled = ($(window).scrollTop() > that.headerHeight);

        if (that.mousedOver) {
            return false;
        }

        // If not scrolled past the header already, and the window scrolls past the header...
        if (that.headerShown && that.scrolled) {
            
            // Hide the header!
            that.toggleHeader(false);

        // If scrolled past the header already, and the window has scrolled above the header...
        } else if (!that.headerShown && !that.scrolled) {
            
            // Show the header!
            that.toggleHeader(true);

        }
    };

    this.toggleHeader = function (toggle) {
        if (toggle) {
            // Show the header
            $('#header').animate({height: that.headerHeight + 'px'}, 'fast', function() {
                $('#header').css('border-bottom-style', 'solid');
            });
        } else {
            // Hide the header
            $('#header').animate({height: '0px'}, 'fast', function() {
                $('#header').css('border-bottom-style', 'none');
            });
        }

        that.headerShown = toggle;
    };

    this.onReady = function() {
        $(window).scroll(that.bindHeaderScroll);
        $(window).mousemove(that.bindHeaderMouseOver);
    };

    this.photoScroller = function(idNum) {

        // Caching of photoScroller objects
        if (!idNum && that.photoScrollers['default']) {
            return that.photoScrollers['default'];
        } else if (that.photoScrollers[idNum]) {
            return that.photoScrollers[idNum];
        }

        // Not returned from cache? Init a new obj...
        var scrollObj = {};

        // If an ID is given, get that specific div
        if (idNum) {
            console.log('#photo-scroller-' + idNum);
            scrollObj.$scrollerContainer = $('#photo-scroller-' + idNum);

        // else, default to the normal ID pattern
        } else {
            scrollObj.$scrollerContainer = $('#photo-scroller');
        }

        // Get the number of total photos and the current photo (default 0)
        scrollObj.numPhotos = scrollObj.$scrollerContainer.children().length;
        scrollObj.currentPhotoNum = 0;

        // Get inner photo+caption div
        scrollObj.$getDiv = function(id) {
            return $(this.$scrollerContainer.children()[id]);
        };

        // Get the current photo+caption div
        scrollObj.$currentDiv = function() {
            return this.$getDiv(this.currentPhotoNum);
        };

        scrollObj.fadeFromTo = function($current, $next, nextNum) {

            var completeFn = function(duration) {
                $next.fadeIn(duration);
                scrollObj.currentPhotoNum = nextNum;
            };

            // Fade the current div out, then call completeFn
            $current.fadeOut('slow', completeFn('slow'));
        };

        // Fade from current photo to the next photo
        scrollObj.fadeToNext = function() {
            var $current = this.$currentDiv();
            var nextNum  = (this.currentPhotoNum + 1) % this.numPhotos;
            var $next    = this.$getDiv(nextNum);

            this.fadeFromTo($current, $next, nextNum);
        };

        // Fade from current photo to the previous photo
        scrollObj.fadeToPrev = function() {
            var $current = this.$currentDiv();
            var nextNum  = this.currentPhotoNum - 1;

            if (nextNum < 0) {
                nextNum = this.numPhotos - 1;
            }

            var $next = this.$getDiv(nextNum);

            this.fadeFromTo($current, $next, nextNum);
        };

        // Sets object into the cache for later retrieval
        that.photoScrollers[idNum] = scrollObj;
        return scrollObj;
    };

}).call(Scholars, Scholars, jQuery, window, document);
