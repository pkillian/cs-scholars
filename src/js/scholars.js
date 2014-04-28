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
    this.random = Math.random;

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
        scrollObj.numPhotos = scrollObj.$scrollerContainer.children('.photo-scroller-div').length;
        scrollObj.currentPhotoNum = 0;

        // Get inner photo+caption div
        scrollObj.$getDiv = function(id) {
            return $(scrollObj.$scrollerContainer.children('.photo-scroller-div')[id]);
        };

        // Get the current photo+caption div
        scrollObj.$currentDiv = function() {
            return scrollObj.$getDiv(scrollObj.currentPhotoNum);
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
            var $current = scrollObj.$currentDiv();
            var nextNum  = (scrollObj.currentPhotoNum + 1) % scrollObj.numPhotos;
            var $next    = scrollObj.$getDiv(nextNum);

            scrollObj.fadeFromTo($current, $next, nextNum);
        };

        // Fade from current photo to the previous photo
        scrollObj.fadeToPrev = function() {
            var $current = scrollObj.$currentDiv();
            var nextNum  = scrollObj.currentPhotoNum - 1;

            if (nextNum < 0) {
                nextNum = scrollObj.numPhotos - 1;
            }

            var $next = scrollObj.$getDiv(nextNum);

            scrollObj.fadeFromTo($current, $next, nextNum);
        };

        // Sets object into the cache for later retrieval
        that.photoScrollers[idNum] = scrollObj;

        return scrollObj;
    };

    this.photoQuoteData = [
        {
            "name":     "Mona Lee",
            "grade":    "Freshman",
            "major":    "Computer Science and Cognitive Science",
            "caption":  "It's very possible to feel alone and helpless in such a large class and an ostensibly daunting department, but thankfully I'll never know the feeling because of CS Scholars.",
            "src":      "/img/quote-1.jpg"
        },
        {
            "name":     "Ollie O'Donnell",
            "grade":    "",
            "major":    "",
            "caption":  "The Scholars program has made me feel like I'm at the centre of the CS community at Berkeley, whereas I know others who feel like a drop in the ocean.",
            "src":      "/img/quote-2.jpg"
        },
        {
            "name":     "Karishma Morabia",
            "grade":    "",
            "major":    "",
            "caption":  "CS Scholars provides me with support and learning opportunities that I would not have received otherwise. It helps make me feel like I am not just another person lost in the crowd.",
            "src":      "/img/quote-3.jpg"
        },
        {
            "name":     "Patricia Hernandez",
            "grade":    "",
            "major":    "",
            "caption":  "CS Scholars has given me a support system.",
            "src":      "/img/quote-4.jpg"
        },
        {
            "name":     "Doris Lee",
            "grade":    "",
            "major":    "",
            "caption":  "It was really great having this opportunity to meet other CS students who are interested in discussing similar CS-related topics in seminar.",
            "src":      "/img/quote-5.jpg"
        },
        {
            "name":     "Huirong (Ronnie) Zhu",
            "grade":    "",
            "major":    "",
            "caption":  "It is really to cool to work with so many cool friends who share the same cool interest!",
            "src":      "/img/quote-6.jpg"
        },
        {
            "name":     "Tara Rezvani",
            "grade":    "",
            "major":    "",
            "caption":  "The weekly CS Scholars discussion sections are a great way to get a new perspective on CS as a field in the Berkeley community and the Bay Area as a whole.",
            "src":      "/img/quote-7.jpg"
        },
        {
            "name":     "Meg Holtzinger",
            "grade":    "",
            "major":    "",
            "caption":  "I have made connections on a more personal level with many of my fellow members, which allows me to more effectively discuss ideas, collaborate, study, and grow in the field of CS.",
            "src":      "/img/quote-8.jpg"
        },
        {
            "name":     "Sebastian Shanus",
            "grade":    "",
            "major":    "",
            "caption":  "CS Scholars has been incredibly rewarding in helping me prepare to explore fun programming projects outside of the classroom and develop close friendships with other computer science students.",
            "src":      "/img/quote-9.jpg"
        },
        {
            "name":     "Jessica Yanling Zhuge",
            "grade":    "",
            "major":    "",
            "caption":  "CS Scholars, above all else, has made me realize that despite the situation, there will always be people willing to assist each other through whatever endeavors pursued.",
            "src":      "/img/quote-10.jpg"
        }
    ];


    // Ten second delay on quote swapping
    this.quoteChangeDelay = 10000;

    // Which div to start changing first
    this.quoteNextChange = 0;

    // Don't use certain quotes (picture issues, etc.)
    this.blacklist = [3];

    // Store the indexes of the currently shown quotes
    this.currentQuotes = [];

    this.changeDataAndFadeIn = function($container, data) {
        return function() {
            $container.find('.photo-quote-img').attr('src', data['src']);
            $container.find('.photo-quote-caption').html(data['caption']);
            $container.find('.photo-quote-name').html(data['name']);

            $container.fadeIn();
        };
    };

    this.initQuotes = function() {
        // Push three random quotes to the current quote list
        that.currentQuotes.push(that.nextQuoteNumber());
        that.currentQuotes.push(that.nextQuoteNumber());
        that.currentQuotes.push(that.nextQuoteNumber());

        var $photoQuoteContainers = $('.photo-quote');

        for (var i = 0; i < 3; i++) {
            var $currentContainer = $($photoQuoteContainers.get(i));
            var nextQuoteData = that.photoQuoteData[that.currentQuotes[i]];

            $currentContainer.fadeOut("fast", that.changeDataAndFadeIn($currentContainer, nextQuoteData));
        }
    };

    this.nextQuoteNumber = function() {
        // Pick a random number between 0 and length of quote data
        var randPick = Math.floor(that.random() * that.photoQuoteData.length);
        var index = that.currentQuotes.indexOf(randPick);
        var doNotUse = that.blacklist.indexOf(randPick);

        // If the random pick is found in the current quote list
        //   OR the random pick is blacklisted, increase by 1
        while (index !== -1 || doNotUse !== -1) {
            randPick += 1;

            if (randPick >= that.photoQuoteData.length) {
                randPick = 0;
            }

            index = that.currentQuotes.indexOf(randPick);
            doNotUse = that.blacklist.indexOf(randPick);
        }

        return randPick;
    };

    this.changeOneQuote = function() {
        var $photoQuoteContainers = $('.photo-quote');
        var $quoteContainer = $($photoQuoteContainers.get(that.quoteNextChange));

        var nextQuoteIndex = that.nextQuoteNumber();
        var nextQuoteData = that.photoQuoteData[nextQuoteIndex];

        $quoteContainer.fadeOut("fast", that.changeDataAndFadeIn($quoteContainer, nextQuoteData));
        
        that.currentQuotes[that.quoteNextChange] = nextQuoteIndex;
        that.quoteNextChange = (that.quoteNextChange + 1) % 3;

    };

    this.cycleQuotes = function() {
        that.changeOneQuote();

        setTimeout(that.cycleQuotes, that.quoteChangeDelay);
    };

    this.onReady = function() {
        $(window).scroll(that.bindHeaderScroll);
        $(window).mousemove(that.bindHeaderMouseOver);

        that.initQuotes();

        var photoScroller = Scholars.photoScroller();
        photoScroller.$scrollerContainer.find('.photo-scroller-control-left').click(photoScroller.fadeToPrev);
        photoScroller.$scrollerContainer.find('.photo-scroller-control-right').click(photoScroller.fadeToNext);

        // Loop quote cycling
        setTimeout(that.cycleQuotes, that.quoteChangeDelay);
    };

}).call(Scholars, Scholars, jQuery, window, document);
