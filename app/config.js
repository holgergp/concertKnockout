require.config({
    // make bower_components more sensible
    // expose jquery
    paths: {
        "bower_components": "../bower_components",
        "jquery": "../bower_components/jquery/dist/jquery",
        "moment": "../bower_components/moment/moment",
        'moment_de': '../bower_components/moment/locale/de',
        'lodash': '../bower_components/lodash/dist/lodash',
        'underscore.string':'../bower_components/underscore.string/lib/underscore.string',
        'knockoutdnd':'../node_modules/knockout-dragdrop/lib/knockout.dragdrop'
    },
    shim: {
        'lodash': {
            exports: '_'
        },
        'underscore-string': {
            deps: ['lodash']
        }
    },
    map: {
        "*": {
            "knockout": "../bower_components/knockout.js/knockout",
            "ko": "../bower_components/knockout.js/knockout"

        }
    }
});

// Use the debug version of knockout it development only
// When compiling with grunt require js will only look at the first 
// require.config({}) found in this file
require.config({
    map: {
        "*": {
            "knockout": "../bower_components/knockout.js/knockout-2.3.0.debug",
            "ko": "../bower_components/knockout.js/knockout-2.3.0.debug"
        }
    }
});

if (!window.requireTestMode) {
    require(['main'], function () {
    });
}

