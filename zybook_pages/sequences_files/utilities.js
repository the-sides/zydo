define("utilities", ["exports"], function(exports) {
var module = {};
'use strict';

/* eslint-disable */

/* exported addPolyfillForArrayFill */

/**
    Add a polyfill for Array.prototype.fill. From:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
    @method addPolyfillForArrayFill
    @return {void}
*/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addPolyfillForArrayFill() {
    if (!Array.prototype.fill) {
        Array.prototype.fill = function (value) {

            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            var O = Object(this);

            // Steps 3-5.
            var len = O.length >>> 0;

            // Steps 6-7.
            var start = arguments[1];
            var relativeStart = start >> 0;

            // Step 8.
            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

            // Steps 9-10.
            var end = arguments[2];
            var relativeEnd = end === undefined ? len : end >> 0;

            // Step 11.
            var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
                O[k] = value;
                k++;
            }

            // Step 13.
            return O;
        };
    }
}

'use strict';

/* eslint-disable */

/* exported addPolyfillForArrayIncludes */

/**
    Add a polyfill for Array.prototype.includes. From:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill
    @method addPolyfillForArrayIncludes
    @return {void}
*/
function addPolyfillForArrayIncludes() {
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function value(searchElement, fromIndex) {

                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                // 1. Let O be ? ToObject(this value).
                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If len is 0, return false.
                if (len === 0) {
                    return false;
                }

                // 4. Let n be ? ToInteger(fromIndex).
                //    (If fromIndex is undefined, this step produces the value 0.)
                var n = fromIndex | 0;

                // 5. If n ≥ 0, then
                //  a. Let k be n.
                // 6. Else n < 0,
                //  a. Let k be len + n.
                //  b. If k < 0, let k be 0.
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                function sameValueZero(x, y) {
                    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
                }

                // 7. Repeat, while k < len
                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(searchElement, elementK) is true, return true.
                    if (sameValueZero(o[k], searchElement)) {
                        return true;
                    }
                    // c. Increase k by 1.
                    k++;
                }

                // 8. Return false
                return false;
            }
        });
    }
}

'use strict';

/* exported Carousel */

/**
    A Carousel stores a randomly-ordered |array| and an |index|.
    @class Carousel
*/

var Carousel = function () {

    /**
        Initialize the carousel.
        @constructor
        @param {Array} array The array to carousel.
    */
    function Carousel(array) {
        _classCallCheck(this, Carousel);

        this.array = array;
        this.index = 0;
    }

    /**
        Get the next value from the carousel.
        @method getValue
        @return {Object} The next value.
    */


    _createClass(Carousel, [{
        key: 'getValue',
        value: function getValue() {
            this.index = (this.index + 1) % this.array.length;
            return this.array[this.index];
        }
    }]);

    return Carousel;
}();

'use strict';

/* eslint-disable */

/* exported addPolyfillForMathTrunc */

/**
    Add a polyfill for Math.trunc. From:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
    @method addPolyfillForMathTrunc
    @return {void}
*/
function addPolyfillForMathTrunc() {
    Math.trunc = Math.trunc || function (x) {
        if (isNaN(x)) {
            return NaN;
        }
        if (x > 0) {
            return Math.floor(x);
        }
        return Math.ceil(x);
    };
}

'use strict';

/* exported addPolyfillForNumberIsInteger */

/**
    Add a polyfill for Number.isInteger. From:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
    @method addPolyfillForNumberIsInteger
    @return {void}
*/
function addPolyfillForNumberIsInteger() {
    Number.isInteger = Number.isInteger || function (value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
}

'use strict';

/* exported QuestionCache */

/**
    Make a question that hasn't been made before by storing |_alreadyMadeQuestions|.
    @class QuestionCache
*/

var QuestionCache = function () {

    /**
        Store passed in values.
        @constructor
        @param {Object} questionFactory The question factory to make new questions.
        @param {Function} questionFactory.make The method to create a new question.
        @param {Number} maxQuestionsCached The max number of questions to cache.
    */
    function QuestionCache(questionFactory, maxQuestionsCached) {
        _classCallCheck(this, QuestionCache);

        this._questionFactory = questionFactory;
        this._maxQuestionsCached = maxQuestionsCached;
        this._alreadyMadeQuestions = [];
    }

    /**
        Return a new question for the given level.
        @method makeQuestion
        @param {Number} currentLevelIndex The current level.
        @return {Object} The new question.
    */


    _createClass(QuestionCache, [{
        key: 'makeQuestion',
        value: function makeQuestion(currentLevelIndex) {
            var maxNumberOfTries = 50;
            var numberOfTries = 0;
            var newQuestion = null;
            var newQuestionAsString = null;

            do {
                newQuestion = this._questionFactory.make(currentLevelIndex);
                newQuestionAsString = JSON.stringify(newQuestion);
                numberOfTries++;
            } while (this._cacheHit(newQuestionAsString) && numberOfTries < maxNumberOfTries);

            this._alreadyMadeQuestions.push(newQuestionAsString);

            if (this._alreadyMadeQuestions.length > this._maxQuestionsCached) {

                // Remove oldest question.
                this._alreadyMadeQuestions.shift();
            }

            return newQuestion;
        }

        /**
            Return whether there was a cache hit.
            @method _cacheHit
            @private
            @param {String} newQuestionAsString The new question to add.
            @return {Boolean} Whether a cache hit occurred.
        */

    }, {
        key: '_cacheHit',
        value: function _cacheHit(newQuestionAsString) {
            var cacheLookup = this._alreadyMadeQuestions.find(function (question) {
                return question === newQuestionAsString;
            });

            return Boolean(cacheLookup);
        }
    }]);

    return QuestionCache;
}();

'use strict';

/* eslint-disable */

/* exported addPolyfillForStringIncludes */

/**
    Add a polyfill for String.prototype.incldues. From:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
    @method addPolyfillForStringIncludes
    @return {void}
*/
function addPolyfillForStringIncludes() {
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            'use strict';

            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }
}

'use strict';

/* eslint-disable */

/* exported addPolyfillForStringRepeat */

/**
    Add a polyfill for String.prototype.repeat. From:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat#Polyfill
    @method addPolyfillForStringRepeat
    @return {void}
*/
function addPolyfillForStringRepeat() {
    if (!String.prototype.repeat) {
        String.prototype.repeat = function (count) {
            'use strict';

            if (this == null) {
                throw new TypeError('can\'t convert ' + this + ' to object');
            }
            var str = '' + this;
            count = +count;
            if (count != count) {
                count = 0;
            }
            if (count < 0) {
                throw new RangeError('repeat count must be non-negative');
            }
            if (count == Infinity) {
                throw new RangeError('repeat count must be less than infinity');
            }
            count = Math.floor(count);
            if (str.length == 0 || count == 0) {
                return '';
            }
            // Ensuring count is a 31-bit integer allows us to heavily optimize the
            // main part. But anyway, most current (August 2014) browsers can't handle
            // strings 1 << 28 chars or longer, so:
            if (str.length * count >= 1 << 28) {
                throw new RangeError('repeat count must not overflow maximum string size');
            }
            var rpt = '';
            for (;;) {
                if ((count & 1) == 1) {
                    rpt += str;
                }
                count >>>= 1;
                if (count == 0) {
                    break;
                }
                str += str;
            }
            return rpt;
        };
    }
}

/* exported TestResult */
/* global Ember */
'use strict';

/**
    The result of a comparison test between user's answer and the expected answer.
    @class TestResult
*/

var TestResult = function () {

    /**
        Initialize the result of the tests.
        @constructor
        @param {String} userAnswer The user's answer.
        @param {String} expectedAnswer The expected answer.
        @param {Boolean} isCorrect Whether the user's answer matches the expected answer.
        @param {Object} [moreData={}] More data to store with the test result.
    */
    function TestResult(userAnswer, expectedAnswer, isCorrect) {
        var moreData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, TestResult);

        /**
            The user's answer.
            @property userAnswer
            @type {String}
        */
        this.userAnswer = userAnswer;

        /**
            The expected answer.
            @property expectedAnswer
            @type {String}
        */
        this.expectedAnswer = expectedAnswer;

        /**
            Whether the user's answer matches the expected answer.
            @property isCorrect
            @type {Boolean}
        */
        this.isCorrect = isCorrect;

        /**
            More data to store with the test result.
            @property moreData
            @type {Object}
        */
        this.moreData = moreData;

        /**
            The user answer portion of the HTML diff between the user's answer and expected answer.
            @property userAnswerHTML
            @type {String}
            @default ''
        */
        this.userAnswerHTML = '';

        /**
            The expected answer portion of the HTML diff between the user's answer and expected answer.
            @property expectedAnswerHTML
            @type {String}
            @default ''
        */
        this.expectedAnswerHTML = '';

        /**
            A hint message to show.
            @property hintMessage
            @type {String}
            @default ''
        */
        this.hintMessage = '';

        /**
            Whether to show a special character legend.
            @property showSpecialCharacterLegend
            @type {Boolean}
            @default false
        */
        this.showSpecialCharacterLegend = false;
    }

    /**
        Build the output difference data.
        @method buildOutputDifference
        @param {Object} parentResource A dictionary of functions given by the parent resource.
        @return {Promise} A promise to build the output difference data.
    */


    _createClass(TestResult, [{
        key: 'buildOutputDifference',
        value: function buildOutputDifference(parentResource) {
            var _this = this;

            return new Ember.RSVP.Promise(function (resolve) {
                parentResource.buildStringDifferenceObject(_this.expectedAnswer, _this.userAnswer).then(function (stringDifferenceObject) {
                    _this.userAnswerHTML = stringDifferenceObject.userAnswerHTML;
                    _this.expectedAnswerHTML = stringDifferenceObject.expectedAnswerHTML;
                    _this.hintMessage = stringDifferenceObject.hintMessage;
                    _this.showSpecialCharacterLegend = stringDifferenceObject.isReplacementADifference || stringDifferenceObject.isWhitespaceADifference;
                    resolve();
                });
            });
        }
    }]);

    return TestResult;
}();

'use strict';

/*
    Add |range| helper to HandleBars templates.
    |range| generates a sequence of integers from 0 to |n|-1.

    Example usage:
        {{#range 10}}
            <div id='d{{this}}' />
        {{/range}}

    The above outputs 10 divs having ids d0 - d9:
        <div id='d0' />
        <div id='d1' />
        ...
        <div id='d9' />
*/
Handlebars.registerHelper('range', function (number, block) {
    var html = '';

    for (var index = 0; index < number; ++index) {
        html += block.fn(index);
    }
    return html;
});

/**
    Returns a boolean representing if the string starts with |str|.
    @method startsWith
    @param {String} str Check if |this| starts with |str|.
    @return {Boolean} Whether |this| starts with |str|.
*/
String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
};

/**
    Replace the character at |index| with |character|.
    @methodreplaceAt
    @param {Number} index The index to replace at.
    @param {String} character The character to replace at index.
    @return {String} The new string.
*/
String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + 1);
};

/**
    Replace the first occurrence of |replacee| with |replacer| starting from the end of the string.
    @method rightReplace
    @param {String} replacee The character to replace.
    @param {String} replacer The character to replace with.
    @return {String} The new string with |replacee| replaced with |replacer|
*/
String.prototype.rightReplace = function (replacee, replacer) {
    var newString = this.slice();

    if (newString.length !== 0) {
        while (newString[newString.length - 1] === replacee) {
            var index = newString.length - 1;

            for (; index >= 0; --index) {
                if (newString[index] !== replacee) {
                    break;
                }
            }
            newString = newString.replaceAt(index + 1, replacer);
        }
    }

    return newString;
};

'use strict';

/* global Carousel, QuestionCache, addPolyfillForArrayFill, addPolyfillForArrayIncludes, addPolyfillForStringRepeat,
    addPolyfillForNumberIsInteger, addPolyfillForStringIncludes, addPolyfillForMathTrunc, TestResult */

// Add Polyfill support.
addPolyfillForArrayFill();
addPolyfillForArrayIncludes();
addPolyfillForStringRepeat();
addPolyfillForNumberIsInteger();
addPolyfillForStringIncludes();
addPolyfillForMathTrunc();

/**
    Collection of constant values and functions used by other tools.
    @module Utilities
*/

var Utilities = function () {
    function Utilities() {
        _classCallCheck(this, Utilities);

        // Zyante colors
        this.zyanteGray = '#333333';
        this.zyanteExpiredGray = '#666666';
        this.zyanteLightGray = '#CCCCCC';
        this.zyanteTableGray = '#D8D8D8';
        this.zyanteFeaturedBackgroundColor = '#EFEFEF';
        this.zyanteGreen = '#738033';
        this.zyanteDarkBlue = '#5780A6';
        this.zyanteLightBlue = '#6685A8';
        this.zyanteLighterBlue = '#87ADD2';
        this.zyanteMediumRed = '#BB0404';
        this.zyanteOrange = '#C60';

        // zyAnimator colors that complement Zyante colors.
        this.zyAnimatorBlack = this.zyanteGray;
        this.zyAnimatorGray = '#AFAFAF';
        this.zyAnimatorWhite = '#FFFFFF';
        this.zyAnimatorGreen = '#1EC81E';
        this.zyAnimatorRed = '#DC0404';
        this.zyAnimatorBlue = '#5780DC';
        this.zyAnimatorLightBlue = '#B0D6FB';
        this.zyAnimatorOrange = '#E68142';
        this.zyAnimatorLightOrange = '#F9D8BC';
        this.zyAnimatorYellow = '#FFD364';
        this.zyAnimatorPurple = 'rgb(132, 36, 172)';
        this.zyAnimatorBrown = '#886441';

        // Regularly used math symbols
        this.multiplicationSymbol = '&middot;';
        this.subtractionSymbol = '&#8211;';

        // Regularly used key values
        this.TAB_KEY = 9;
        this.ENTER_KEY = 13;
        this.ARROW_LEFT = 37;
        this.ARROW_UP = 38;
        this.ARROW_RIGHT = 39;
        this.ARROW_DOWN = 40;
        this.DELETE_KEY = 46;
        this.B_KEY = 66;
        this.I_KEY = 73;
        this.U_KEY = 85;
    }

    /**
        Replace the given string's smart quotes with the respective normal quotes.
        @method replaceSmartQuotes
        @param {String} str The string to replace.
        @return {String} The replaced string.
    */


    _createClass(Utilities, [{
        key: 'replaceSmartQuotes',
        value: function replaceSmartQuotes(str) {
            if (!str) {
                return null;
            }

            return str.replace(/[“”]+/g, '"').replace(/[‘’]+/g, "'"); // eslint-disable-line quotes
        }

        /**
           Performs an AJAX request on a zyDE monolith server, attempting multiple hosts
           until one succesfully resolves.
           @method zyDEServer
           @param {String} method The type of HTTP request to use, e.g., GET or POST. Must be capitalized.
           @param {String} target The endpoint URL, e.g., 'run_code'
           @param {Object} params Parameters to supply in the request.
           @param {Function} resolve A callback to run when the AJAX request succeeds.
           @param {Function} reject A callback to run when th eAJAX request fails.
           @param {Integer} [timeout = null] The amount of time before the timeout request fails.
           @param {String} [dataType = null] The type of data supplied in the AJAX request. E.g., 'json'.
           @param {Boolean} [useMarketingServer=false] Whether to use the marketing server.
           @return {RSVP.Promise}
        */

    }, {
        key: 'zyDEServer',
        value: function zyDEServer(method, target, params, resolve, reject) {
            var timeout = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
            var dataType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
            var useMarketingServer = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
            // eslint-disable-line max-params

            // A list of zyde hosts that will be tried in order.
            var primaryServer = {
                host: 'https://zydelith.zybooks.com',
                forwardCookies: false
            };
            var secondaryServer = {
                host: 'https://zyde.zybooks.com',
                forwardCookies: false
            };
            var marketingServer = {
                host: 'https://marketing-zyde.zybooks.com',
                forwardCookies: false
            };
            var options = useMarketingServer ? [marketingServer, secondaryServer] : [primaryServer, secondaryServer];

            // Returns a promise to execute the AJAX request and then call one of the provided
            // resolve or reject requests.
            return new Ember.RSVP.Promise(function () {
                // eslint-disable-line no-undef

                var loadOption = function loadOption() {
                    if (options.length === 0) {

                        // We don't have any more hosts left to try. Surrender.
                        reject();
                    } else {

                        // Try the next host
                        var option = options.shift();

                        $.ajax(option.host + '/' + target, {
                            type: method,
                            data: params,
                            timeout: timeout,
                            dataType: dataType,
                            success: resolve,
                            xhrFields: {
                                withCredentials: option.forwardCookies
                            }
                        }).fail(function () {
                            loadOption();
                        });
                    }
                };

                loadOption();
            });
        }

        /**
            Add the "ifCond" Handlebars helper.
            @method addIfConditionalHandlebars
            @return {void}
        */

    }, {
        key: 'addIfConditionalHandlebars',
        value: function addIfConditionalHandlebars() {

            /**
                Handlebars helper for conditional expressions.
                @method ifCond
                @param {String} value1 The first value in the expression.
                @param {String} operator The operator in the conditional expression.
                @param {String} value2 The second value in the expression.
                @return {String} Appropriate HTML for whether the expression evaluates to true or false.
            */
            Handlebars.registerHelper('ifCond', function (value1, operator, value2, options) {
                var expressionIsTrue = false;

                switch (operator) {
                    case '===':
                        expressionIsTrue = value1 === value2;
                        break;
                    case '||':
                        expressionIsTrue = value1 || value2;
                        break;
                    case '&&':
                        expressionIsTrue = value1 && value2;
                        break;
                    case '>':
                        expressionIsTrue = value1 > value2;
                        break;
                    case '<':
                        expressionIsTrue = value1 < value2;
                        break;
                    case '>=':
                        expressionIsTrue = value1 >= value2;
                        break;
                    case '<=':
                        expressionIsTrue = value1 <= value2;
                        break;
                    default:
                        expressionIsTrue = false;
                        break;
                }

                return expressionIsTrue ? options.fn() : options.inverse();
            });
        }

        /**
            Return a string with all whitespace removed from |string|.
            @method removeWhitespace
            @param {String} string The string to remove the whitespace.
            @return {String} The string without whitespace.
        */

    }, {
        key: 'removeWhitespace',
        value: function removeWhitespace(string) {
            return string.replace(/\s/g, '');
        }

        /**
            Return whether two given arrays are exactly the same.
            @method twoArraysMatch
            @param {Array} array1 The first array.
            @param {Array} array2 The second array.
            @return {Boolean} Whether the arrays are equal.
        */

    }, {
        key: 'twoArraysMatch',
        value: function twoArraysMatch(array1, array2) {
            if (array1.length === array2.length) {
                return array1.every(function (element, index) {
                    return element === array2[index];
                });
            }
            return false;
        }

        /**
            Return an HTML newline.
            @method getNewline
            @return {String} An HTML newline.
        */

    }, {
        key: 'getNewline',
        value: function getNewline() {
            return '<div></div>';
        }

        /**
            Function is used during the initialization of the Ace Editor to setup our our base settings
            we want to see for all instances of the ace editor.
            @method aceBaseSettings
            @param {AceEditor} editor Reference to the editor.
            @param {String} language The language of the code to be displayed.
            @return {void}
        */

    }, {
        key: 'aceBaseSettings',
        value: function aceBaseSettings(editor, language) {
            // eslint-disable-line complexity
            editor.setTheme('ace/theme/dreamweaver');
            editor.setBehavioursEnabled(false);
            editor.setHighlightSelectedWord(false);
            editor.setShowInvisibles(false);
            editor.setShowPrintMargin(false);
            editor.setShowFoldWidgets(false);
            editor.setOption('dragEnabled', false);
            editor.setOption('enableMultiselect', false);
            editor.commands.removeCommand('find');
            editor.commands.removeCommand('showSettingsMenu');
            editor.getSession().setUseSoftTabs(true);

            var aceSyntaxHighlightLanguage = 'ace/mode/text';
            var aceTabSize = 3;

            switch (language) {
                case 'c':
                case 'cpp':
                    aceSyntaxHighlightLanguage = 'ace/mode/c_cpp';
                    break;

                case 'java':
                    aceSyntaxHighlightLanguage = 'ace/mode/java';
                    break;

                case 'matlab':
                    aceSyntaxHighlightLanguage = 'ace/mode/matlab';
                    break;

                case 'python':
                case 'python2':
                case 'python3':
                    aceSyntaxHighlightLanguage = 'ace/mode/python';
                    aceTabSize = 4;
                    break;

                case 'html':
                    aceSyntaxHighlightLanguage = 'ace/mode/html';

                    // Disable syntax checker. HTML syntax checker is rather pedantic.
                    editor.getSession().setUseWorker(false);
                    break;

                case 'javascript':
                case 'js':
                    aceSyntaxHighlightLanguage = 'ace/mode/javascript';
                    break;

                case 'css':
                    aceSyntaxHighlightLanguage = 'ace/mode/css';

                    // Disable syntax checker. The messages are not desired.
                    editor.getSession().setUseWorker(false);
                    break;

                case 'MIPS':
                case 'MIPSzy':
                    aceSyntaxHighlightLanguage = 'ace/mode/assembly_x86';
                    break;

                case 'ARM':
                case 'zyFlowchart':
                    break;

                default:
                    throw new Error('language not specified');
            }

            editor.getSession().setMode(aceSyntaxHighlightLanguage);
            editor.getSession().setTabSize(aceTabSize);

            // Eliminate warning of upcoming ACE editor change.
            editor.$blockScrolling = Infinity;
        }

        /**
            Disables the button both logically and visually.
            @method disableButton
            @param {Object} $button jQuery object for button.
            @return {void}
        */

    }, {
        key: 'disableButton',
        value: function disableButton($button) {
            $button.attr('disabled', true);
            $button.addClass('disabled');
        }

        /**
            Enables the button both logically and visually.
            @method disableButton
            @param {Object} $button jQuery object for button.
            @return {void}
        */

    }, {
        key: 'enableButton',
        value: function enableButton($button) {
            $button.removeAttr('disabled');
            $button.removeClass('disabled');
        }

        /**
            Return a randomly-chosen number in the range from |start| to |end|.
            @method pickNumberInRange
            @param {Number} start The start of the range.
            @param {Number} end The end of the range.
            @param {Array} exclude These numbers are excluded from the range.
            @return {Number} The random number in range.
        */

    }, {
        key: 'pickNumberInRange',
        value: function pickNumberInRange(start, end, exclude) {
            var exclusionList = exclude || [];

            var number = null;

            do {
                number = Math.floor(Math.random() * (end - start + 1)) + start;
            } while (exclusionList.indexOf(number) !== -1);

            return number;
        }

        /**
            Return an array of |amountToPick| randomly-chosen numbers in the range from |start| to |end|.
            @method pickNNumbersInRange
            @param {Number} start The start of the range.
            @param {Number} end The end of the range.
            @param {Number} amountToPick The quantity of numbers to pick.
            @return {Array} Array of {Number}. The chosen numbers.
        */

    }, {
        key: 'pickNNumbersInRange',
        value: function pickNNumbersInRange(start, end, amountToPick) {
            var pickedNumbers = [];

            while (pickedNumbers.length < amountToPick) {
                var newNumber = this.pickNumberInRange(start, end, pickedNumbers);

                pickedNumbers.push(newNumber);
            }
            return pickedNumbers;
        }

        /**
            Return either true or false with equal odds of either.
            @method flipCoin
            @return {Boolean} The result of the coin flip.
        */

    }, {
        key: 'flipCoin',
        value: function flipCoin() {
            return this.pickNumberInRange(0, 1) === 0;
        }

        /**
            Create and return an array of size N.
            @method createArrayOfSizeN
            @param {Number} size The size of the array to create.
            @return {Array} The created array of size N.
        */

    }, {
        key: 'createArrayOfSizeN',
        value: function createArrayOfSizeN(size) {
            return Array(size).fill(0);
        }

        /**
            Shuffle the elements of |array|.
            @method shuffleArray
            @param {Array} array The array to shuffle.
            @return {void}
        */

    }, {
        key: 'shuffleArray',
        value: function shuffleArray(array) {
            var currentIndex = array.length;

            // While there remain elements to shuffle
            while (currentIndex > 0) {

                // Randomly pick a remaining element
                var randomIndex = Math.floor(Math.random() * currentIndex);

                currentIndex--;

                // Swap the randomly selected element with the current index element
                var temporaryValue = array[currentIndex];

                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
        }

        /**
            Converts color from rgb(r, g, b) format into #RRGGBB format
            @method rgbToHex
            @param {String} rgb The color to convert to hex.
            @return {String} The color as a hex value.
        */

    }, {
        key: 'rgbToHex',
        value: function rgbToHex(rgb) {

            /**
                Convert a string color to a two-digit hex value.
                @method convertColorToHex
                @param {String} color The color to convert to hex.
                @return {String} The hex value.
            */
            function convertColorToHex(color) {
                var base10 = 10;
                var base16 = 16;
                var removeFirstTwoCharacters = -2;

                var decimalValue = parseInt(color, base10);
                var hexValue = decimalValue.toString(base16).slice(removeFirstTwoCharacters);

                return decimalValue < base16 ? '0' + hexValue : hexValue;
            }

            var rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            var hexColors = rgbMatch.slice(1, 4).map(function (color) {
                return '' + convertColorToHex(color);
            }); // eslint-disable-line no-magic-numbers
            var hexColor = hexColors.join('');

            return '#' + hexColor;
        }

        /**
            Randomly pick 1 element from the |array|.
            @method pickElementFromArray
            @param {Array} array The array from which to pick.
            @return {Object} The selected element in the array.
        */

    }, {
        key: 'pickElementFromArray',
        value: function pickElementFromArray(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        /**
            Pick |amountToPick| of unique elements from |array|.
            @method pickNElementsFromArray
            @param {Array} array The array to pick from.
            @param {Number} amountToPick The number of elements to pick.
            @return {Array} The chosen elements.
        */

    }, {
        key: 'pickNElementsFromArray',
        value: function pickNElementsFromArray(array, amountToPick) {

            // Copy |array| into |temporaryArray|
            var temporaryArray = jQuery.extend([], array);

            this.shuffleArray(temporaryArray);

            // Choose first |amountToPick| elements from |temporaryArray|
            return temporaryArray.filter(function (element, index) {
                return index < amountToPick;
            });
        }

        /**
            Pick |amountToPick| of unique indices from |array|.
            @method pickNIndicesFromArray
            @param {Array} array The array to pick from.
            @param {Number} amountToPick The number of indices to pick.
            @return {Array} The chosen indices.
        */

    }, {
        key: 'pickNIndicesFromArray',
        value: function pickNIndicesFromArray(array, amountToPick) {
            var arrayOfIndices = array.map(function (element, index) {
                return index;
            });

            return this.pickNElementsFromArray(arrayOfIndices, amountToPick);
        }

        /**
            Escapes HTML in the passed in |text|, making it safe to render. Returns the escaped string.
            @method escapeHTML
            @param {String} text Text with HTML to escape.
            @return {String} The text with escaped HTML.
        */

    }, {
        key: 'escapeHTML',
        value: function escapeHTML(text) {
            return $('<div>').text(text).html();
        }

        /**
            Un-escapes HTML entities in |text| and returns the un-escaped string.
            @method unescapeHTML
            @param {String} text Text with escaped HTML.
            @return {String} Text with unescaped HTML.
        */

    }, {
        key: 'unescapeHTML',
        value: function unescapeHTML(text) {
            return $('<div>').html(text).text();
        }

        /**
            Return a string with proper spacing for a |constantValue|, e.g., -4 -> ' - 4' and 3 -> ' + 3'.
            If the |constantValue| does not |startsEquation|, then -4 -> '-4', 3 -> '3', and 1 -> ''
            @method stringifyConstantValue
            @param {Number} constantValue The constant value to stringify.
            @param {Boolean} [startsEquation=false] Whether the constant is the start of the equation.
            @param {Boolean} [standAloneConstant=false] Whether the constant is a standing alone, without a variable.
            @return {String} The constant value as a string.
        */

    }, {
        key: 'stringifyConstantValue',
        value: function stringifyConstantValue(constantValue) {
            var startsEquation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var standAloneConstant = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var stringifiedConstant = constantValue;

            /*
                If the constant starts the equation but isn't a standalone constant, then handle two special cases. Ex:
                1. y = 1x  -> y = x
                2. y = -1x -> y = -x
            */
            if (startsEquation && !standAloneConstant) {
                if (stringifiedConstant === 1) {
                    stringifiedConstant = '';
                } else if (stringifiedConstant === -1) {
                    stringifiedConstant = '-';
                }
            }

            // If the constant does not start an equation, then add spaces before/after the sign.
            else if (!startsEquation) {
                    var tmpConstantValue = '';

                    // For non-negative values, use +. Otherwise, use the large minus sign &#8211.
                    if (stringifiedConstant >= 0) {
                        tmpConstantValue = ' + ';
                    } else {
                        tmpConstantValue = ' ' + this.subtractionSymbol + ' ';
                        stringifiedConstant *= -1;
                    }

                    // If |stringifiedConstant| is 1 and not |standAloneConstant|, then omit the 1. Otherwise, print the 1.
                    if (stringifiedConstant === 1 && !standAloneConstant) {
                        stringifiedConstant = tmpConstantValue;
                    } else {
                        stringifiedConstant = tmpConstantValue + stringifiedConstant;
                    }
                }

            return stringifiedConstant;
        }

        /**
            Return the checkmark image URL.
            @method getCheckmarkImageURL
            @param {Object} parentResource Stores functions including a function to build a URL.
            @return {String} The URL of the checkmark image.
        */

    }, {
        key: 'getCheckmarkImageURL',
        value: function getCheckmarkImageURL(parentResource) {
            return parentResource.getResourceURL('checkmark.png', 'utilities');
        }

        /**
            Return a new Carousel from the given array.
            @method getCarousel
            @param {Array} array The arrow to make the Carousel from.
            @return {Carousel} New carousel made from the given array.
        */

    }, {
        key: 'getCarousel',
        value: function getCarousel(array) {
            this.shuffleArray(array);
            return new Carousel(array);
        }

        /**
            Capitalize the first character in a string.
            @method initialCapitalize
            @param {String} string The string to initial capitalize.
            @return {String} The string with initial capital.
        */

    }, {
        key: 'initialCapitalize',
        value: function initialCapitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        /**
            Return a new {TestResult} object with parameters passed through.
            @method getTestResult
            @return {TestResult} New object with parameters passed through.
        */

    }, {
        key: 'getTestResult',
        value: function getTestResult() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return new (Function.prototype.bind.apply(TestResult, [null].concat(args)))();
        }

        /**
            Return a new {QuestionCache}.
            @method getQuestionCache
            @param {Object} questionFactory See {QuestionCache}'s constructor.
            @param {Number} maxQuestionsCached See {QuestionCache}'s constructor.
            @return {QuestionCache}
        */

    }, {
        key: 'getQuestionCache',
        value: function getQuestionCache(questionFactory, maxQuestionsCached) {
            return new QuestionCache(questionFactory, maxQuestionsCached);
        }

        /**
            Envelops the passed string with a LaTeX prefix and postfix.
            @method envelopLatex
            @private
            @param {String} latex The latex formatted string.
            @return {String} The same |latex| string enveloped with the prefix and postfix.
        */

    }, {
        key: 'envelopLatex',
        value: function envelopLatex(latex) {
            return '\\( ' + latex + ' \\)';
        }

        /**
            Return a {String} that represents a LaTeX fraction with the passed numerator and denominator values.
            @method makeLatexFraction
            @param {Number} numeratorValue The value of the numerator.
            @param {Number} denominatorValue The value of the denominator.
            @param {Object} [size={ small: false, large: false }] Specifies the LaTeX font size of the fraction.
            @param {Boolean} [size.small=false] Make the fraction font smaller.
            @param {Boolean} [size.large=false] Make the fraction font larger.
            @return {String} LaTeX with fraction that includes a numerator and denominator.
        */

    }, {
        key: 'makeLatexFraction',
        value: function makeLatexFraction(numeratorValue, denominatorValue) {
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { small: false, large: false };

            var fraction = '\\frac{' + numeratorValue + '}{' + denominatorValue + '}';
            var useSizePrefix = size.small || size.large;

            if (useSizePrefix) {
                var sizePrefix = size.small ? 'small' : 'large';

                fraction = '\\' + sizePrefix + '{' + fraction + '}';
            }

            return fraction;
        }

        /**
            Manages the diff highlighting while the API is being developed.
            @method manageDiffHighlighting
            @param {Object} parentResource A dictionary of functions given by the parent resource.
            @param {String} expectedAnswer The expected answer for the level.
            @param {String} userAnswer The user given answer to the level.
            @return {Object} An object containing the highlighting HTML and whether the only difference are whitespaces or not.
        */

    }, {
        key: 'manageDiffHighlighting',
        value: function manageDiffHighlighting(parentResource, expectedAnswer, userAnswer) {
            var diff = parentResource.stringDifference(expectedAnswer, userAnswer);
            var highlightedExpectedOutput = parentResource.makeStringDiffHTML(expectedAnswer, diff.expectedAnswerIndicies).string;
            var highlightedActualOutput = parentResource.makeStringDiffHTML(userAnswer, diff.userAnswerIndicies).string;

            // Add tab class to tab diffs.
            var replaceTabRegExp = /(<span class="string-diff-highlight)(">\t<\/span>)/g;

            highlightedExpectedOutput = highlightedExpectedOutput.replace(replaceTabRegExp, '$1 tab$2');
            highlightedActualOutput = highlightedActualOutput.replace(replaceTabRegExp, '$1 tab$2');

            var expectedAnswerDifferences = diff.expectedAnswerIndicies.map(function (indexOfDiff) {
                return expectedAnswer[indexOfDiff];
            });
            var differences = expectedAnswerDifferences.concat(diff.userAnswerIndicies.map(function (indexOfDiff) {
                return userAnswer[indexOfDiff];
            }));
            var doesOnlyWhitespaceDiffer = differences.length > 0 && differences.every(function (difference) {
                return (/^\s*$/.test(difference)
                );
            });
            var wasNewlineExpectedButMissing = expectedAnswerDifferences.some(function (difference) {
                return (/^\n$/.test(difference)
                );
            });

            return { doesOnlyWhitespaceDiffer: doesOnlyWhitespaceDiffer,
                expectedOutputDiffIndices: diff.expectedAnswerIndicies,
                highlightedExpectedOutput: highlightedExpectedOutput,
                highlightedActualOutput: highlightedActualOutput,
                wasNewlineExpectedButMissing: wasNewlineExpectedButMissing };
        }

        /**
            Return a randomly-generated combination of parameters. The parameters may be a nested combination of dictionaries and lists.
            For each list, randomly pick 1 element in the list.
            @method getParameterCombination
            @param {Object} parameters A list of possible parameters to randomize the level.
            @return {Object} The randomly-generated combination of parameters.
        */

    }, {
        key: 'getParameterCombination',
        value: function getParameterCombination(parameters) {
            var _this2 = this;

            var dataType = typeof parameters === 'undefined' ? 'undefined' : _typeof(parameters);

            if (parameters === null) {
                dataType = 'undefined';
            } else if ($.isArray(parameters)) {
                dataType = 'array';
            }

            switch (dataType) {

                // Base case: Found a parameter without a value. Set the value to empty string, so nothing is printed when this parameter is used.
                case 'undefined':
                    return '';

                // Base case: Parameter is a string. Return the escaped string.
                case 'string':
                    return this.unescapeHTML(parameters);

                // Base case: Return a number or boolean.
                case 'number':
                case 'boolean':
                    return parameters;

                // Recursive case: |parameter| is an array, so pick one element then recursively pick a parameter from that element.
                case 'array':
                    {
                        var parameter = this.pickElementFromArray(parameters);

                        return this.getParameterCombination(parameter);
                    }

                // Recursive case: |parameters| is a dictionary. Recursively call each key.
                case 'object':
                    {
                        var parameterCombination = {};

                        Object.keys(parameters).forEach(function (key) {
                            parameterCombination[key] = _this2.getParameterCombination(parameters[key]);
                        });

                        return parameterCombination;
                    }

                default:
                    throw new Error('Found unexpected data type: ' + dataType);
            }
        }
    }]);

    return Utilities;
}();

module.exports = new Utilities();


exports.default = module.exports;
});