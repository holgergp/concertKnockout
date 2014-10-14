// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", "underscore.string", "knockoutdnd", "moment", 'moment_de'], function ($, ko, _, knockoutdnd, moment) {

    function LoveConcerts() {

        var self = this;

        self.artist = 'The Saddest Landscape';
        self.venue = 'Turock';
        self.date = moment();
        self.formattedDate = ko.computed(function () {
            "use strict";
            return moment(self.date).format('DD.MM.YYYY');
        });
        self.alertClass = ko.computed(function () {
            return new ConcertDueDateClassProvider().getCssClass(self.date);

        });


        self.loveConcerts = ko.observableArray([
            {
                artist: self.artist,
                venue: self.venue,
                date: self.date,
                formattedDate: self.formattedDate,
                alertClass: self.alertClass
            }

        ])
        ;

        self.removeConcert = function (concert) {

            self.loveConcerts.remove(concert);

        };
        self.drop = function (data, model) {
            model.loveConcerts.push(data);
            maybeConcertsViewModel.removeConcert(data);
            allConcertsViewModel.removeConcert(data);
        };

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
        self.alertClass = ko.computed(function () {
            return new ConcertDueDateClassProvider().getCssClass(self.date);

        });


        self.allConcerts = ko.observableArray([
            {
                artist: self.artist,
                venue: self.venue,
                date: self.date,
                formattedDate: self.formattedDate,
                alertClass: self.alertClass
            }

        ])
        ;
        self.removeConcert = function (concert) {

            self.allConcerts.remove(concert);

        };


        self.drop = function (data, model) {
            model.allConcerts.push(data);
            maybeConcertsViewModel.removeConcert(data);
            loveConcertsViewModel.removeConcert(data);
        };
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
        self.alertClass = ko.computed(function () {
            return new ConcertDueDateClassProvider().getCssClass(self.date);

        });

        self.maybeConcerts = ko.observableArray([
            {
                artist: self.artist,
                venue: self.venue,
                date: self.date,
                formattedDate: self.formattedDate,
                alertClass: self.alertClass
            }

        ])
        ;


        self.removeConcert = function (concert) {

            self.maybeConcerts.remove(concert);

        };

        self.drop = function (data, model) {
            model.maybeConcerts.push(data);
            allConcertsViewModel.removeConcert(data);
            loveConcertsViewModel.removeConcert(data);
        };
    }


    var allConcertsViewModel = new AllConcerts();
    var loveConcertsViewModel = new LoveConcerts();
    var maybeConcertsViewModel = new MaybeConcerts();

    ko.applyBindings(loveConcertsViewModel, $('#loveConcertSection')[0]);
    ko.applyBindings(allConcertsViewModel, $('#allConcertSection')[0]);
    ko.applyBindings(maybeConcertsViewModel, $('#maybeConcertSection')[0]);

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
            self.date = ko.observable(moment(dateString, "DD.MM.YYYY"));
            self.formattedDate = ko.computed(function () {


                return moment(dateString, "DD.MM.YYYY").format('DD.MM.YYYY');
            });
            self.alertClass = ko.computed(function () {
                return new ConcertDueDateClassProvider().getCssClass(self.date());

            });


        }


        self.addConcert = function () {

            if (!_.isBlank(self.artist()) && !_.isBlank(self.venue()) && !_.isBlank(self.dateString())) {

                allConcertsViewModel.allConcerts.push(new NewConcert(self.artist(), self.venue(), self.dateString()));
                self.artist("");
                self.venue("");
                self.dateString(moment().format('DD.MM.YYYY'));

            }
        };
    }


    function ConcertDuedateService() {
        "use strict";

        var self = this;
        self.isConcertOverdue = function (date) {
            return moment(date).diff(moment(), 'days') < 0;
        };

        self.isConcertAboutToHappen = function (date) {
            return moment().add(15, 'days').isAfter(moment(date)) && !self.isConcertOverdue(date);
        };

        self.isConcertDateFine = function (date) {
            return  !self.isConcertAboutToHappen(date) && !self.isConcertOverdue(date);
        };

    }

    function ConcertDueDateClassProvider() {
        "use strict";
        var self = this;
        self.getCssClass = function (date) {
            var concertDueDateService = new ConcertDuedateService();
            if (concertDueDateService.isConcertAboutToHappen(date)) {
                return 'bg-warning';
            }
            else if (concertDueDateService.isConcertOverdue(date)) {
                return 'bg-danger';
            }
            else {
                return 'bg-primary';
            }
        };
    }


    ko.applyBindings(new NewConcertViewModel(), $('#newConcertSection')[0]);


    /**
     * Return as much as you need (for testing purposes)
     */
    return  {loveConcertsViewModel: loveConcertsViewModel};
})
;
