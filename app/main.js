// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", "moment"], function ($, ko, moment) {


    function LoveConcerts() {

        var self = this;

        self.artist = 'The Saddest Landscape';
        self.venue = 'Turock';
        self.date = moment();
        self.formattedDate = ko.computed(function () {
            "use strict";
            return moment(self.date).format('DD.MM.YYYY');
        });


        self.loveConcerts = ko.observableArray([
            {
                artist: self.artist,
                venue: self.venue,
                date: self.date,
                formattedDate: self.formattedDate
            }

        ])
        ;


    }

    function AllConcerts() {

        var self = this;

        self.artist = 'Blind Guardian';
        self.venue = 'Philipshalle';
        self.date = moment();
        self.formattedDate = ko.computed(function () {
            "use strict";
            return moment(self.date).format('DD.MM.YYYY');
        });


        self.allConcerts = ko.observableArray([
            {
                artist: self.artist,
                venue: self.venue,
                date: self.date,
                formattedDate: self.formattedDate
            }

        ])
        ;


    }

    function MaybeConcerts() {

        var self = this;

        self.artist = 'Spaceman Spiff';
        self.venue = 'FFT';
        self.date = moment();
        self.formattedDate = ko.computed(function () {
            "use strict";
            return moment(self.date).format('DD.MM.YYYY');
        });


        self.maybeConcerts = ko.observableArray([
            {
                artist: self.artist,
                venue: self.venue,
                date: self.date,
                formattedDate: self.formattedDate
            }

        ])
        ;


    }


    function ViewModel() {

        var self = this;


        self.removeConcert = function (array, concert) {

            var i = array.indexOf(concert);
            if (i !== -1) {
                array.splice(i, 1);
            }

        };

        self.alertClass = function (concert) {
            if (concertDueDateService.isConcertAboutToHappen(concert)) {
                return 'bg-warning';
            }
            else if (concertDueDateService.isConcertOverdue(concert)) {
                return 'bg-danger';
            }
            else {
                return 'bg-primary';
            }

        };

        self.formatDate = function (date) {
            return concertDueDateService.formatDate(date);
        };

        self.status = ko.observable('active');
    }

    var allConcertsViewModel = new AllConcerts();


    ko.applyBindings(new LoveConcerts(), $('#loveConcertSection')[0]);
    ko.applyBindings(allConcertsViewModel, $('#allConcertSection')[0]);
    ko.applyBindings(new MaybeConcerts(), $('#maybeConcertSection')[0]);

    function NewConcertViewModel() {

        var self = this;


        self.artist = ko.observable();
        self.venue = ko.observable();
        self.dateString = ko.observable(moment().format('DD.MM.YYYY'));


        function NewConcert(artist, venue, dateString) {
            "use strict";
            var self = this;
            self.artist = ko.observable(artist);
            self.venue = ko.observable(venue);
            self.date = ko.observable(moment(dateString));
            self.formattedDate = ko.computed(function () {
                "use strict";
                return moment(dateString).format('DD.MM.YYYY');
            });

        }


        self.addConcert = function () {
            allConcertsViewModel.allConcerts.push(new NewConcert(self.artist(), self.venue(), self.dateString()));
            self.artist("");
            self.venue("");
            self.dateString(moment().format('DD.MM.YYYY'));

        };
    }

//ko.applyBindings(new ViewModel(), $('html')[0]);
    ko.applyBindings(new NewConcertViewModel(), $('#newConcertSection')[0]);

    /*
     * read-only date display with momentjs
     * use like this: data-bind="moment: dateVar, format: 'YYYY-MM-DD'"
     * The "format" is optional and will default to "MM/DD/YYYY"
     */
    ko.bindingHandlers.moment = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var val = valueAccessor();

            var formatted = '**INVALID**'; // throw instead?
            var date = moment(ko.utils.unwrapObservable(val));

            var format = allBindingsAccessor().format || 'MM.DD.YYYY';

            if (date && date.isValid()) {
                formatted = date.format(format);
            }

            element.innerText = formatted;
        }
    };
})
;
