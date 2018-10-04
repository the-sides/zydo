define("ProgressionPlayer", ["exports"], function(exports) {
var module = {};
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
    Array of {ProgressionPlayerElementController}.
    @class Controllers
    @extends Array
*/
function Controllers() {}
Controllers.prototype = new Array();
Controllers.prototype.constructor = Controllers;

/**
    Empty the array by destroying each {ElementController}.
    @method empty
    @return {void}
*/
Controllers.prototype.empty = function () {
    this.forEach(function (controller) {
        controller.destroy();
    });
    this.length = 0;
};

/**
    Disable each {ElementController}.
    @method disable
    @return {void}
*/
Controllers.prototype.disable = function () {
    this.forEach(function (controller) {
        controller.disable();
    });
};

/**
    Enable each {ElementController}.
    @method enable
    @return {void}
*/
Controllers.prototype.enable = function () {
    this.forEach(function (controller) {
        controller.enable();
    });
    this.focus();
};

/**
    Focus on the front-most element that supports focusing.
    @method focus
    @return {void}
*/
Controllers.prototype.focus = function () {
    var controllerToFocus = this.find(function (controller) {
        return controller.doesSupportFocus;
    });

    if (controllerToFocus) {
        controllerToFocus.focus();
    }
};

/**
    Return whether the elements are configured for a correct answer.
    @method isCorrect
    @return {Boolean} True if each element is correctly configured.
*/
Controllers.prototype.isCorrect = function () {
    var controllersWithIncorrectAnswers = this.filter(function (controller) {
        return !controller.isCorrect();
    });

    controllersWithIncorrectAnswers.forEach(function (controller) {
        controller.markAsWrongAnswer();
    });

    return controllersWithIncorrectAnswers.length === 0;
};

/**
    Return whether any controller is an invalid answer.
    @method isInvalidAnswer
    @return {Boolean} True if any controller is an invalid answer.
*/
Controllers.prototype.isInvalidAnswer = function () {
    var controllersWithInvalidAnswers = this.filter(function (controller) {
        return controller.isInvalidAnswer();
    });

    controllersWithInvalidAnswers.forEach(function (controller) {
        controller.markAsInvalidAnswer();
    });

    return controllersWithInvalidAnswers.length > 0;
};

/**
    Return the user's answer for each interactive element.
    @method userAnswer
    @return {String} The users answer for each interactive element.
*/
Controllers.prototype.userAnswer = function () {
    return this.map(function (controller) {
        return controller.userAnswer();
    }).join(',');
};

/**
    Return the expected answer for each interactive element.
    @method expectedAnswer
    @return {String} The expected answer for each interactive element.
*/
Controllers.prototype.expectedAnswer = function () {
    return this.map(function (controller) {
        return controller.expectedAnswer();
    }).join(',');
};

/**
    Remove the invalid answer status.
    @method removeInvalidAnswerStatus
    @return {void}
*/
Controllers.prototype.removeInvalidAnswerStatus = function () {
    this.forEach(function (controller) {
        controller.removeInvalidAnswerStatus();
    });
};

'use strict';

/* exported buildElementCheckboxControllerPrototype */
/* global ProgressionPlayerElementController */

/**
    Control a checkbox element.
    @class ElementCheckboxController
    @extends ProgressionPlayerElementController
*/

var ElementCheckboxController =

/**
    Calls the {ProgressionPlayerElementController} constructor and renders this element.
    @constructor
*/
function ElementCheckboxController() {
    var _this = this;

    _classCallCheck(this, ElementCheckboxController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    // If there are arguments, then initialize the controller. Otherwise, the controller is being inherited, so don't initialize.
    if (args.length !== 0) {
        ProgressionPlayerElementController.prototype.constructor.apply(this, args);
        this.render();
        this._$element.find('label').click(function () {
            var $input = _this._$element.find('input');

            $input.prop('checked', !$input.prop('checked'));
        });
    }
};

/**
    Build the ElementCheckboxController prototype.
    @method buildElementCheckboxControllerPrototype
    @return {void}
*/


function buildElementCheckboxControllerPrototype() {
    ElementCheckboxController.prototype = new ProgressionPlayerElementController();
    ElementCheckboxController.prototype.constructor = ElementCheckboxController;

    /**
        Whether the element is assessed for correctness.
        @property isAssessedForCorrectness
        @type {Boolean}
        @default true
    */
    ElementCheckboxController.prototype.isAssessedForCorrectness = true;

    /**
        Whether the element supports being focused upon.
        @property doesSupportFocus
        @type {Boolean}
        @default true
    */
    ElementCheckboxController.prototype.doesSupportFocus = true;

    /**
        Move browser focus to the controller's interactive element.
        @method focus
        @return {void}
    */
    ElementCheckboxController.prototype.focus = function () {
        this._$element.find('input').focus();
    };

    /**
        Render the element and resize checkbox based on label's font size.
        @method render
        @return {void}
    */
    ElementCheckboxController.prototype.render = function () {
        ProgressionPlayerElementController.prototype.render.apply(this);

        // Get label's font size. Calculate checkbox size with a minimum and maximum size.
        var fontSize = parseInt(this._$element.find('label').first().css('font-size'), 10);

        // Add 0.5px of width and height for each px of font size above 10.
        var minSize = 10;
        var size = minSize;

        if (fontSize > minSize) {
            size = minSize + Math.floor((fontSize - minSize) / 2); // eslint-disable-line no-magic-numbers
        }

        // Change width and height of checkbox.
        this._$element.find('input').first().width(size).height(size);
    };

    /**
        Return whether the checkbox is correctly checked or unchecked.
        @method isCorrect
        @return {Boolean} True if it's correctly checked or unchecked.
    */
    ElementCheckboxController.prototype.isCorrect = function () {
        return this._elementRendered.correctAnswerIsChecked === this._$element.find('input').is(':checked');
    };

    /**
        Mark the checkbox as a wrong answer. Include the label.
        @method markAsWrongAnswer
        @return {void}
    */
    ElementCheckboxController.prototype.markAsWrongAnswer = function () {
        this._$element.addClass('wrong-answer');
    };

    /**
        Return whether the user checked or not.
        @method userAnswer
        @return {String} The user's answer as a string.
    */
    ElementCheckboxController.prototype.userAnswer = function () {
        var checked = this._$element.find('input').is(':checked') ? 'checked' : 'unchecked';

        return this._elementRendered.id + ':' + checked;
    };

    /**
        Return the expected checked status.
        @method userAnswer
        @return {String} The expected answer as a string.
    */
    ElementCheckboxController.prototype.expectedAnswer = function () {
        return this._elementRendered.id + ':' + this._elementRendered.correctAnswerIsChecked;
    };

    /**
        Disable the checkbox.
        @method disable
        @return {void}
    */
    ElementCheckboxController.prototype.disable = function () {
        this._$element.find('input').prop('disabled', true);
    };

    /**
        Enable the checkbox.
        @method enable
        @return {void}
    */
    ElementCheckboxController.prototype.enable = function () {
        this._$element.find('input').prop('disabled', false);
    };
}

'use strict';

/* exported buildElementDropdownControllerPrototype */
/* global ProgressionPlayerElementController */

/**
    Control a dropdown element.
    @class ElementDropdownController
    @extends ProgressionPlayerElementController
*/

var ElementDropdownController =

/**
    Calls the {ProgressionPlayerElementController} constructor and renders this element.
    @constructor
*/
function ElementDropdownController() {
    _classCallCheck(this, ElementDropdownController);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    if (args.length !== 0) {
        ProgressionPlayerElementController.prototype.constructor.apply(this, args);

        // Set each option's isSelected to that option's isDefault.
        this._elementRendered.options.forEach(function (option) {
            option.isSelected = option.isDefault;
        });

        // Sort the non-invalid options by the text.
        if (this._elementRendered.optionOrderingMethod === 'sort') {
            var firstOption = this._elementRendered.options.shift();

            this._elementRendered.options.sort(function (aOption, bOption) {
                return aOption.text > bOption.text;
            });
            this._elementRendered.options.unshift(firstOption);
        }

        // Randomly order the non-invalid options.
        else if (this._elementRendered.optionOrderingMethod === 'random') {
                var _firstOption = this._elementRendered.options.shift();

                require('utilities').shuffleArray(this._elementRendered.options);
                this._elementRendered.options.unshift(_firstOption);
            }

        this.render();
    }
};

/**
    Build the ElementDropdownController prototype.
    @method buildElementDropdownControllerPrototype
    @return {void}
*/


function buildElementDropdownControllerPrototype() {
    ElementDropdownController.prototype = new ProgressionPlayerElementController();
    ElementDropdownController.prototype.constructor = ElementDropdownController;

    /**
        Render the element and listen to changes on the dropdown.
        @method render
        @return {void}
    */
    ElementDropdownController.prototype.render = function () {
        var _this2 = this;

        ProgressionPlayerElementController.prototype.render.apply(this);

        this._$element.find('select').change(function () {

            // Set all options' |isSelected| to false.
            _this2._elementRendered.options.forEach(function (option) {
                option.isSelected = false;
            });

            // Set |isSelected| of selected option to true.
            var indexOfSelectedOptions = _this2._$element.find('option:selected').index();

            _this2._elementRendered.options[indexOfSelectedOptions].isSelected = true;
        });
    };

    /**
        Whether the element is assessed for correctness.
        @property isAssessedForCorrectness
        @type {Boolean}
        @default true
    */
    ElementDropdownController.prototype.isAssessedForCorrectness = true;

    /**
        Whether the element supports being focused upon.
        @property doesSupportFocus
        @type {Boolean}
        @default true
    */
    ElementDropdownController.prototype.doesSupportFocus = true;

    /**
        Move browser focus to the controller's interactive element.
        @method focus
        @return {void}
    */
    ElementDropdownController.prototype.focus = function () {
        this._$element.find('select').focus();
    };

    /**
        Return whether the correct option is selected.
        @method isCorrect
        @return {Boolean} True if the correct option is selected.
    */
    ElementDropdownController.prototype.isCorrect = function () {
        return this._elementRendered.options.some(function (option) {
            return option.isSelected && option.isCorrectOption;
        });
    };

    /**
        Return the selected option in the dropdown.
        @method _getSelectedOption
        @return {ElementDropdownOption} The selected option.
    */
    ElementDropdownController.prototype._getSelectedOption = function () {
        // eslint-disable-line no-underscore-dangle
        return this._elementRendered.options.filter(function (option) {
            return option.isSelected;
        })[0];
    };

    /**
        Return whether an invalid option is selected.
        @method isValidAnswer
        @return {Boolean} True if an invalid option is selected.
    */
    ElementDropdownController.prototype.isInvalidAnswer = function () {
        return this._getSelectedOption().isInvalidOption;
    };

    /**
        Return the selected option.
        @method userAnswer
        @return {String} The user's answer as a string.
    */
    ElementDropdownController.prototype.userAnswer = function () {
        return this._elementRendered.id + ':' + this._getSelectedOption().text;
    };

    /**
        Return the correct option.
        @method expectedAnswer
        @return {String} The expected answer as a string.
    */
    ElementDropdownController.prototype.expectedAnswer = function () {
        var expectedOption = this._elementRendered.options.filter(function (option) {
            return option.isCorrectOption;
        })[0];

        return this._elementRendered.id + ':' + expectedOption.text;
    };

    /**
        Disable the dropdown.
        @method disable
        @return {void}
    */
    ElementDropdownController.prototype.disable = function () {
        this._$element.find('select').prop('disabled', true);
    };

    /**
        Enable the dropdown.
        @method enable
        @return {void}
    */
    ElementDropdownController.prototype.enable = function () {
        this._$element.find('select').prop('disabled', false);
    };
}

'use strict';

/* exported buildElementImageControllerPrototype */
/* global ProgressionPlayerElementController */

/**
    Control an image element.
    @class ElementImageController
    @extends ProgressionPlayerElementController
*/
function ElementImageController() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    if (args.length !== 0) {
        ProgressionPlayerElementController.prototype.constructor.apply(this, args);
        this.render();
    }
}

/**
    Build the ElementImageController prototype.
    @method buildElementImageControllerPrototype
    @return {void}
*/
function buildElementImageControllerPrototype() {
    ElementImageController.prototype = new ProgressionPlayerElementController();
    ElementImageController.prototype.constructor = ElementImageController;

    /**
        Render the element and handle loading of image.
        @method render
        @return {void}
    */
    ElementImageController.prototype.render = function () {
        ProgressionPlayerElementController.prototype.render.apply(this);

        require('ProgressionUtilities').create().downloadImage(this._parentResource, this._elementRendered.imageID, this._$element.find('img'), 'Image did not load. Try refreshing.');
    };
}

'use strict';

/* exported ElementShortAnswerController, buildElementShortAnswerControllerPrototype */
/* global ProgressionPlayerElementController */

/**
    Control a short answer element.
    @class ElementShortAnswerController
    @extends ProgressionPlayerElementController
    @constructor
*/
function ElementShortAnswerController() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    if (args.length !== 0) {
        ProgressionPlayerElementController.prototype.constructor.apply(this, args);

        this._utilities = require('utilities');
        this.render();
    }
}

/**
    Build the ElementShortAnswerController prototype.
    @method buildElementShortAnswerControllerPrototype
    @return {void}
*/
function buildElementShortAnswerControllerPrototype() {
    ElementShortAnswerController.prototype = new ProgressionPlayerElementController();
    ElementShortAnswerController.prototype.constructor = ElementShortAnswerController;

    /**
        Render the element and listen for presses of the enter key.
        @method render
        @return {void}
    */
    ElementShortAnswerController.prototype.render = function () {
        var _this3 = this;

        ProgressionPlayerElementController.prototype.render.apply(this);

        this._$element.keypress(function (event) {
            if (event.which === _this3._utilities.ENTER_KEY) {
                _this3._progressionTool.check();
            }
        });
    };

    /**
        Whether the element is assessed for correctness.
        @property isAssessedForCorrectness
        @type {Boolean}
        @default true
    */
    ElementShortAnswerController.prototype.isAssessedForCorrectness = true;

    /**
        Whether the element supports being focused upon.
        @property doesSupportFocus
        @type {Boolean}
        @default true
    */
    ElementShortAnswerController.prototype.doesSupportFocus = true;

    /**
        Move browser focus to the controller's interactive element.
        @method focus
        @return {void}
    */
    ElementShortAnswerController.prototype.focus = function () {
        this._$element.find('input').focus();
    };

    /**
        Return the user's answer.
        @method _getUserAnswer
        @private
        @return {String} The user's answer.
    */
    ElementShortAnswerController.prototype._getUserAnswer = function () {
        return this._$element.find('input').val();
    };

    /**
        Return whether the user's answer is correct.
        @method isCorrect
        @return {Boolean} True if the correct option is selected.
    */
    ElementShortAnswerController.prototype.isCorrect = function () {
        var isCorrect = false;

        switch (this._elementRendered.assessmentMethod) {
            case 'stringMatch':
                isCorrect = this._isCorrectStringMatch();
                break;
            case 'numericalMatch':
                isCorrect = this._isCorrectNumericalMatch();
                break;
            default:
                require('zyWebErrorManager').postError('Short answer element has unknown assessment method.');
                break;
        }

        return isCorrect;
    };

    /**
        Return whether the user's answer is correct according to string match rules.
        @method _isCorrectStringMatch
        @private
        @return {Boolean} Whether the user's answer is correct according to string match rules.
    */
    ElementShortAnswerController.prototype._isCorrectStringMatch = function () {
        var removeWhitespace = this._utilities.removeWhitespace;
        var userAnswer = removeWhitespace(this._getUserAnswer()).toLowerCase();
        var correctAnswers = this._elementRendered.correctAnswers.map(function (correctAnswer) {
            return removeWhitespace(correctAnswer).toLowerCase();
        });

        return correctAnswers.some(function (correctAnswer) {
            return userAnswer === correctAnswer;
        });
    };

    /**
        Return whether the user's answer is correct according to numerical match rules.
        @method _isCorrectNumericalMatch
        @private
        @return {Boolean} Whether the user's answer is correct according to numerical match rules.
    */
    ElementShortAnswerController.prototype._isCorrectNumericalMatch = function () {
        var userAnswer = parseFloat(this._utilities.removeWhitespace(this._getUserAnswer()));
        var percentage = this._elementRendered.assessmentProperties.tolerancePercentage;
        var useTolerancePercentage = percentage || percentage === 0;
        var toleranceFraction = percentage / 100.0; // eslint-disable-line no-magic-numbers
        var absoluteValue = this._elementRendered.assessmentProperties.toleranceAbsoluteValue;

        return this._elementRendered.correctAnswers.some(function (correctAnswerString) {
            var correctAnswerNumber = parseFloat(correctAnswerString);
            var distance = Math.abs(correctAnswerNumber - userAnswer);
            var allowedDistance = useTolerancePercentage ? Math.abs(correctAnswerNumber * toleranceFraction) : absoluteValue;

            return distance <= allowedDistance;
        });
    };

    /**
        Return the user's answer.
        @method userAnswer
        @return {String} The user's answer as a string.
    */
    ElementShortAnswerController.prototype.userAnswer = function () {
        var elementID = this._elementRendered.id;
        var userAnswer = this._getUserAnswer();

        return elementID + ':' + userAnswer;
    };

    /**
        Return the expected answer.
        @method expectedAnswer
        @return {String} The expected answer as a string.
    */
    ElementShortAnswerController.prototype.expectedAnswer = function () {
        var elementID = this._elementRendered.id;
        var expectedAnswer = JSON.stringify(this._elementRendered.correctAnswers);

        return elementID + ':' + expectedAnswer;
    };

    /**
        Return whether an invalid answer was entered.
        @method isInvalidAnswer
        @return {Boolean} True if an invalid answer was entered.
    */
    ElementShortAnswerController.prototype.isInvalidAnswer = function () {
        return this._getUserAnswer() === '';
    };

    /**
        Disable the short answer.
        @method disable
        @return {void}
    */
    ElementShortAnswerController.prototype.disable = function () {
        this._$element.find('input').prop('disabled', true);
    };

    /**
        Enable the short answer.
        @method enable
        @return {void}
    */
    ElementShortAnswerController.prototype.enable = function () {
        this._$element.find('input').prop('disabled', false);
    };
}

'use strict';

/* exported buildElementTableControllerPrototype */
/* global ProgressionPlayerElementController */

/**
    Control a table element.
    @class ElementTableController
    @extends ProgressionPlayerElementController
*/

var ElementTableController =

/**
    Calls the {ProgressionPlayerElementController} constructor and renders this element.
    @constructor
*/
function ElementTableController() {
    _classCallCheck(this, ElementTableController);

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
    }

    // If there are arguments, then initialize the controller. Otherwise, the controller is being inherited, so don't initialize.
    if (args.length !== 0) {
        ProgressionPlayerElementController.prototype.constructor.apply(this, args);
        this.render();
    }
};

/**
    Build the ElementTableController prototype.
    @method buildElementTableControllerPrototype
    @return {void}
*/


function buildElementTableControllerPrototype() {
    ElementTableController.prototype = new ProgressionPlayerElementController();
    ElementTableController.prototype.constructor = ElementTableController;
}

/**
    Control a text element.
    @class ElementTextController
    @extends ProgressionPlayerElementController
*/
function ElementTextController() {
    ProgressionPlayerElementController.prototype.constructor.apply(this, arguments);
    this.render();
}

/**
    Build the ElementTextController prototype.
    @method buildElementTextControllerPrototype
    @return {void}
*/
function buildElementTextControllerPrototype() {
    ElementTextController.prototype = new ProgressionPlayerElementController();
    ElementTextController.prototype.constructor = ElementTextController;
}

'use strict';

/* global buildProgressionPlayerElementControllerPrototype,
    buildElementImageControllerPrototype,
    buildElementTextControllerPrototype,
    buildElementDropdownControllerPrototype,
    buildElementShortAnswerControllerPrototype,
    buildElementTableControllerPrototype,
    buildElementCheckboxControllerPrototype,
    Controllers,
    ProgressionQuestionFactory,
    unescapeHTMLFromJSON */

/**
    Run a progression instance based on specified options.
    @module ProgressionPlayer
    @return {void}
*/
function ProgressionPlayer() {

    /**
        The name of the module.
        @property _name
        @private
        @type String
    */
    this._name = 'ProgressionPlayer';

    /**
        Dictionary of templates for this module.
        @property _templates
        @private
        @type Object
    */
    this._templates = this[this._name];

    /**
        The unique id given to this module.
        @property _id
        @private
        @type String
        @default null
    */
    this._id = null;

    /**
        Whether the progression is in builder mode (being tested in ProgressionBuilder).
        @property _inBuilderMode
        @private
        @type {Boolean}
        @default false
    */
    this._inBuilderMode = false;

    /**
        The controllers for the displayed elements. Each controller maps to one element.
        @property _controllers
        @private
        @type Controllers
    */
    this._controllers = new Controllers();

    /**
        Reference to the question DOM, which is regularly accessed.
        @property _$question
        @private
        @type jQuery
        @default null
    */
    this._$question = null;

    /**
        The question currently being given.
        @property _currentQuestion
        @private
        @type ProgressionQuestion
        @default null
    */
    this._currentQuestion = null;

    /**
        Reference to the parent of this module.
        @property _parentResource
        @private
        @type Object
        @default null
    */
    this._parentResource = null;

    /**
        Cache of questions already given to user.
        @property _questionCache
        @private
        @type QuestionCache
        @default null
    */
    this._questionCache = null;

    /**
        Reference to the {ProgressionTool} module.
        @property _progressionTool
        @private
        @type {ProgressionTool}
        @default null
    */
    this._progressionTool = null;

    /**
        Render and initialize a progression instance.
        @method init
        @param {String} id The unique identifier given to module.
        @param {Object} parentResource Dictionary of functions to access resources and submit activity.
        @param {Object} options Options for a module instance.
        @param {Object} options.progression JSON structure that models the progression.
        @param {Boolean} [options.inBuilderMode=false] Whether this ProgressionPlayer instance was loaded by the ProgressionBuilder.
        @return {void}
    */
    this.init = function (id, parentResource, options) {
        var _this4 = this;

        this._id = id;
        this._parentResource = parentResource;
        this._inBuilderMode = options.inBuilderMode || false;

        var progressionJSON = this._inBuilderMode ? options.progression : unescapeHTMLFromJSON(options.progression);
        var progressionQuestionFactory = new ProgressionQuestionFactory(progressionJSON, this._inBuilderMode);

        this._questionCache = require('utilities').getQuestionCache(progressionQuestionFactory, 5); // eslint-disable-line no-magic-numbers

        // Add ProgressionUtilities templates.
        var progressionUtilities = require('ProgressionUtilities').create();

        this._templates = progressionUtilities.templates;

        var self = this;
        var userEnteredInvalidAnswer = false;

        this._progressionTool = require('progressionTool').create();
        this._progressionTool.init(id, parentResource, {
            html: this._templates.QuestionArea(), // eslint-disable-line new-cap
            css: '<style>.zyante-bold{font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight:300}.zyante-section-bold{font-family:Helvetica;font-weight:300}.ProgressionPlayer div.question-area .wrong-answer-outline,.ProgressionPlayer div.question-area .invalid-answer-outline{outline:2px solid #bb0404}.ProgressionPlayer div.question-area .element{font-family:Roboto,sans-serif;font-weight:300}.ProgressionPlayer div.question-area .element.wrong-answer select,.ProgressionPlayer div.question-area .element.wrong-answer input:not([type=checkbox]){outline:2px solid #bb0404}.ProgressionPlayer div.question-area .element.wrong-answer.checkbox-element{outline:2px solid #bb0404}.ProgressionPlayer div.question-area .element.invalid-answer select,.ProgressionPlayer div.question-area .element.invalid-answer input{outline:2px solid #bb0404}.ProgressionPlayer .zyante-progression-explanation-area p{font-family:Roboto,sans-serif;font-weight:300;margin:0 0 10px}.ProgressionPlayer .white-space-pre{white-space:pre-wrap}</style>' + progressionUtilities.css,
            numToWin: progressionQuestionFactory.numberOfLevels(),
            useMultipleParts: true,
            start: function start() {
                self._controllers.enable();
                userEnteredInvalidAnswer = false;
            },
            reset: function reset() {
                self._generateQuestion(0);
                self._controllers.disable();
            },
            next: function next(currentLevel) {
                if (userEnteredInvalidAnswer) {
                    self._controllers.removeInvalidAnswerStatus();
                    self._controllers.enable();
                } else {
                    self._generateQuestion(currentLevel);
                    self._controllers.focus();
                }
                userEnteredInvalidAnswer = false;
            },
            isCorrect: function isCorrect() {
                _this4._controllers.disable();

                var isCorrect = false;
                var explanation = 'Set an answer for each input. See highlighted.';
                var questionExplanation = _this4._currentQuestion.explanation;

                if (_this4._inBuilderMode) {
                    explanation += '\n' + questionExplanation;
                }
                var numberOfElementsAssessed = _this4._controllers.filter(function (controller) {
                    return controller.isAssessedForCorrectness;
                }).length;

                userEnteredInvalidAnswer = _this4._controllers.isInvalidAnswer();
                if (!userEnteredInvalidAnswer) {
                    isCorrect = _this4._controllers.isCorrect();
                    explanation = questionExplanation;
                    if (!isCorrect && numberOfElementsAssessed > 1) {
                        explanation = 'Each incorrect answer is highlighted.\n' + questionExplanation;
                    }
                }
                explanation = progressionUtilities.processExplanation(_this4._parentResource, explanation);

                return {
                    userAnswer: _this4._controllers.userAnswer(),
                    expectedAnswer: _this4._controllers.expectedAnswer(),
                    isCorrect: isCorrect,
                    explanationMessage: explanation,
                    latexChanged: true,
                    explanationAsText: true,
                    showTryAgain: userEnteredInvalidAnswer,
                    callbackFunction: progressionUtilities.postProcessExplanation,
                    callbackParameters: { id: _this4._id, parentResource: _this4._parentResource }
                };
            }
        });

        $('#' + id + ' .zyante-progression-explanation').addClass('white-space-pre');
        this._$question = $('#' + id + ' .question-area');
        this._generateQuestion(0);
        this._controllers.disable();

        // Auto press "Start" when in builder mode.
        if (this._inBuilderMode) {
            $('.zyante-progression-start-button').trigger('click');
        }
    };

    /**
        Generate and render a {ProgressionQuestion} based on |currentLevel|.
        @method generateQuestion
        @param {Number} currentLevel The current level the user is on, from 0 to n - 1.
        @return {void}
    */
    this._generateQuestion = function (currentLevel) {
        var _this5 = this;

        this._controllers.empty();

        // Randomly choose a question for the |currentLevel|, then clone that question.
        this._currentQuestion = this._questionCache.makeQuestion(currentLevel);

        // Update the question DOM's height and width.
        this._$question.height(this._currentQuestion.height).width(this._currentQuestion.width);

        $('#' + this._id).width(this._currentQuestion.width);

        // Update the explanation's width.
        var $explanation = $('#' + this._id + ' .zyante-progression-explanation-area');

        $explanation.width(this._currentQuestion.width);

        // Build controller for each element. Render in reverse so low-index elements are on top.
        var progressionUtilities = require('ProgressionUtilities').create();

        this._currentQuestion.elements.reverse().forEach(function (element) {
            var elementClassName = progressionUtilities.getElementClassNameByType(element.type);
            var controllerClassName = elementClassName + 'Controller';

            // Convert |className| to the class constructor of the same name.
            var ControllerClass = eval(controllerClassName); // eslint-disable-line no-eval

            _this5._controllers.push(new ControllerClass(element, _this5._$question, _this5._templates, _this5._parentResource, _this5._progressionTool));
        });

        // Set the solution for instructors if the platform supports it.
        if (this._parentResource.setSolution) {
            var explanation = progressionUtilities.processExplanation(this._parentResource, this._currentQuestion.explanation);
            var shouldRenderAsHTML = true;

            this._parentResource.setSolution(explanation, 'text', shouldRenderAsHTML);
        }
        this._parentResource.latexChanged();
    };
}

/**
    Build prototypes that were delayed while waiting for dependencies to be loaded.
    @method buildDelayedPrototypes
    @return {void}
*/
function buildDelayedPrototypes() {
    if (!this.hasBeenBuilt) {
        buildProgressionPlayerElementControllerPrototype();
        buildElementImageControllerPrototype();
        buildElementTextControllerPrototype();
        buildElementDropdownControllerPrototype();
        buildElementShortAnswerControllerPrototype();
        buildElementTableControllerPrototype();
        buildElementCheckboxControllerPrototype();
        this.hasBeenBuilt = true;
    }
}

module.exports = {
    create: function create() {
        buildDelayedPrototypes();
        return new ProgressionPlayer();
    },
    dependencies: {
        "tools": ["utilities", "progressionTool", "ProgressionUtilities"]
    },
    runTests: function runTests() {
        buildDelayedPrototypes();
    }
};

/**
    Control an element displayed to the user, including rendering, updating, and destroying.
    This controller is an abstract class.

    @class ProgressionPlayerElementController
    @extends ElementController
    @constructor
*/
function ProgressionPlayerElementController() {
    require('ProgressionUtilities').create().inheritElementController().constructor.apply(this, arguments);
}

/**
    Build the ProgressionPlayerElementController prototype.
    @method buildProgressionPlayerElementControllerPrototype
    @return {void}
*/
function buildProgressionPlayerElementControllerPrototype() {
    ProgressionPlayerElementController.prototype = require('ProgressionUtilities').create().inheritElementController();
    ProgressionPlayerElementController.prototype.constructor = ProgressionPlayerElementController;

    /**
        Return whether the user's answer for this element is correct.
        Inheriting controllers with an interactive element should override this.
        @method isCorrect
        @return {Boolean} Whether the user's answer is correct for this element. Default is true.
    */
    ProgressionPlayerElementController.prototype.isCorrect = function () {
        return true;
    };

    /**
        Mark the element as a wrong answer.
        @method markAsWrongAnswer
        @return {void}
    */
    ProgressionPlayerElementController.prototype.markAsWrongAnswer = function () {
        this._$element.addClass('wrong-answer');
    };

    /**
        Return whether the elements have an invalid configuration.
        Inheriting controllers with an interactive element should override this.
        @method isInvalidAnswer
        @return {Boolean} True if any element has an invalid configuration. Default is false.
    */
    ProgressionPlayerElementController.prototype.isInvalidAnswer = function () {
        return false;
    };

    /**
        Mark the element as an invalid answer.
        @method markAsInvalidAnswer
        @return {void}
    */
    ProgressionPlayerElementController.prototype.markAsInvalidAnswer = function () {
        this._$element.addClass('invalid-answer');
    };

    /**
        Return the user's answer for the element.
        Inheriting controllers with an interactive element should override this.
        @method userAnswer
        @return {String} The user's answer for this element. Default is empty string.
    */
    ProgressionPlayerElementController.prototype.userAnswer = function () {
        return '';
    };

    /**
        Return the expected answer for the element.
        Inheriting controllers with an interactive element should override this.
        @method expectedAnswer
        @return {String} The expected answer for this element. Default is empty string.
    */
    ProgressionPlayerElementController.prototype.expectedAnswer = function () {
        return '';
    };

    /**
        Remove the invalid answer class from |_$element|.
        @method removeInvalidAnswerStatus
        @return {void}
    */
    ProgressionPlayerElementController.prototype.removeInvalidAnswerStatus = function () {
        this._$element.removeClass('invalid-answer');
    };

    /**
        Disable the controller's interactive elements.
        Inheriting objects that are interactive should override this.
        @method disable
        @return {void}
    */
    ProgressionPlayerElementController.prototype.disable = function () {};

    /**
        Enable the controller's interactive elements.
        Inheriting objects that are interactive should override this.
        @method enable
        @return {void}
    */
    ProgressionPlayerElementController.prototype.enable = function () {};

    /**
        Whether the element supports being focused upon.
        @property doesSupportFocus
        @type {Boolean}
        @default false
    */
    ProgressionPlayerElementController.prototype.doesSupportFocus = false;

    /**
        Move browser focus to the controller's interactive element.
        @method focus
        @return {void}
    */
    ProgressionPlayerElementController.prototype.focus = function () {}; // eslint-disable-line no-empty-function

    /**
        Whether the element is assessed for correctness.
        @property isAssessedForCorrectness
        @type {Boolean}
        @default false
    */
    ProgressionPlayerElementController.prototype.isAssessedForCorrectness = false;
}

'use strict';

/* exported ProgressionQuestion */

/**
    A progression question to be displayed.

    @class ProgressionQuestion

    @constructor
    @param {Array} elements The elements to be displayed for this question
    @param {String} explanation The explanation for this question
    @param {String} height The height of the display area
    @param {String} width The width of the display area
*/
function ProgressionQuestion(elements, explanation, height, width) {
    this.elements = elements;
    this.explanation = explanation;
    this.height = height;
    this.width = width;
}

'use strict';

/**
    The elements to be displayed for a progression question.

    @class ProgressionQuestionElements
    @extends Array

    @constructor
    @param {Elements} elements The elements in the progression.
    @param {Level} level The level of this progression question.
    @param {Question} question The question of this progression question.
*/
function ProgressionQuestionElements(elements, level, question) {
    var _this6 = this;

    // Build list of element ids used in this level and question.
    var elementIDsForThisQuestion = level.usedElements.concat(question.usedElements);

    // Map each element id to respective {Element}.
    var initialElements = elements.filter(function (element) {
        return elementIDsForThisQuestion.includes(element.id);
    });

    initialElements.forEach(function (element) {
        return _this6.push(element.clone());
    });

    this._addElementVariants(level.elementVariants);
    this._addElementVariants(question.elementVariants);
}

ProgressionQuestionElements.prototype = [];
ProgressionQuestionElements.prototype.constructor = ProgressionQuestionElements;

/**
    Add {ElementVariants} to |this|.
    @method _addElementVariants
    @param {Elements} elements More elements to add.
    @return {void}
*/
ProgressionQuestionElements.prototype._addElementVariants = function (elements) {
    var _this7 = this;

    // eslint-disable-line no-underscore-dangle

    // Merge {ElementVariant} elements with existing element with same |id|.
    elements.forEach(function (element) {
        return _this7._getElementWithId(element.id).mergeElementVariant(element);
    });
};

/**
    Get {Element} with |id| in |this|.
    @method _getElementWithId
    @param {String} id Unique id for an {Element}.
    @return {Element} The {Element} with |id|.
*/
ProgressionQuestionElements.prototype._getElementWithId = function (id) {
    // eslint-disable-line no-underscore-dangle
    return this.find(function (element) {
        return element.id === id;
    });
};

'use strict';

/* exported ProgressionQuestionFactory */
/* global ProgressionQuestionElements, ProgressionQuestion */

/**
    Build {ProgressionQuestion} by randomly selecting a question.
    @class ProgressionQuestionFactory
*/

var ProgressionQuestionFactory = function () {

    /**
        @constructor
        @param {Object} progressionJSON JSON representing a progression.
        @param {Boolean} inBuilderMode Whether this ProgressionPlayer instance was loaded by the ProgressionBuilder.
        @return {void}
    */
    function ProgressionQuestionFactory(progressionJSON, inBuilderMode) {
        _classCallCheck(this, ProgressionQuestionFactory);

        this._progression = require('ProgressionUtilities').create().createProgression(progressionJSON);

        var utilities = require('utilities');

        // Convert each {Questions} into a {Carousel} from Utilities.
        this._progression.levels.forEach(function (level) {
            level.questions = utilities.getCarousel(level.questions);
        });

        this._inBuilderMode = inBuilderMode;
    }

    /**
        Make a {ProgressionQuestion} based on the current level.
        @method make
        @param {Number} currentLevel The current level that the user is on.
        @return {ProgressionQuestion} A progression question for displaying
    */


    _createClass(ProgressionQuestionFactory, [{
        key: 'make',
        value: function make(currentLevel) {
            var progression = this._progression;
            var level = progression.levels[currentLevel];
            var question = level.questions.getValue();

            // Build elements for this question, merging variants specific to this level and question.
            var elements = new ProgressionQuestionElements(progression.elements, level, question);

            // Get the most specific height and width.
            var progressionUtilities = require('ProgressionUtilities').create();
            var getMostSpecificProperty = progressionUtilities.getMostSpecificProperty;
            var height = getMostSpecificProperty('height', progression, level, question);
            var width = getMostSpecificProperty('width', progression, level, question);

            // Build the explanation by concatenating progression, level, then question.
            var explanations = [progression.explanation, level.explanation, question.explanation];
            var explanation = explanations.filter(function (expl) {
                return Boolean(expl);
            }).join('\n');

            // Run question code.
            var originalProgressionCode = progression.code ? progression.code : 'pass';
            var progressionCode = originalProgressionCode + '\n';
            var questionCode = question.code ? question.code : 'pass';
            var module = null;

            try {
                module = progressionUtilities.makePythonModule(progressionCode, questionCode);
            } catch (error) {
                var errorMessage = progressionUtilities.reviseLineNumberInErrorMessage(error.toString(), progressionCode);

                if (this._inBuilderMode) {
                    alert(errorMessage); // eslint-disable-line no-alert
                } else {
                    require('zyWebErrorManager').postError(errorMessage);
                }
            }

            // Update explanation and elements with module.
            explanation = progressionUtilities.replaceStringVariables(explanation, module);
            elements.forEach(function (element) {
                element.updateWithCode(module);
            });

            return new ProgressionQuestion(elements, explanation, height, width);
        }

        /**
            Return the number of levels.
            @method numberOfLevels
            @return {Number} The number of levels.
        */

    }, {
        key: 'numberOfLevels',
        value: function numberOfLevels() {
            return this._progression.levels.length;
        }
    }]);

    return ProgressionQuestionFactory;
}();

'use strict';

/* exported unescapeHTMLFromJSON */

/**
    Unescape HTML from given JSON.
    @method unescapeHTMLFromJSON
    @param {Object} object The JSON to unescape HTML from.
    @param {Object} [parent=null] The parent of object.
    @param {Object} [parentKeyToObject=null] The key from the parent to the object. Ex: parent[0] === object, so parentKeyToObject is 0.
    @return {Object} The JSON with unescaped HTML.
*/
function unescapeHTMLFromJSON(object) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var parentKeyToObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    switch (typeof object === 'undefined' ? 'undefined' : _typeof(object)) {

        // Unescape HTML from string properties.
        case 'string':
            if (parent && parentKeyToObject) {
                parent[parentKeyToObject] = $('<div/>').html(object).text();
            }
            break;
        case 'object':
            if (object) {
                Object.keys(object).forEach(function (key) {
                    unescapeHTMLFromJSON(object[key], object, key);
                });
            }
            break;
        default:
            break;
    }

    return object;
}


exports.default = module.exports;
});