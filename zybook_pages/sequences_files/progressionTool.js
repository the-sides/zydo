define("progressionTool", ["exports"], function(exports) {
var module = {};
'use strict';

/* global Spinner, Ember */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Handlebars.registerHelper('rangeOneIndexed', function (number, block) {

    // Register the "range" helper for use in HandleBars templates.
    // "range" works like range() in python, generating a sequence
    // of integers from 0 to argument n-1.
    //   Example Usage:
    //   	{{range 10}}
    //   		<div id="d{{this}}" />
    //   	{{/range}}
    //
    //	The above outputs 10 divs having ids d0 - d9:
    //		<div id="d0" />
    //		<div id="d1" />
    //		...
    //		<div id="d9" />

    var accumulate = '';

    for (var index = 0; index < number; ++index) {
        accumulate += block.fn(index + 1);
    }
    return accumulate;
});

/**
    A progression tool template that stores standard behavior.
    @module ProgressionTool
    @return {void}
*/
function ProgressionTool() {
    this.feedbackMessage = '';
    this.explanationMessage = '';
    this.userAnswer = '';
    this.expectedAnswer = '';

    var timeInterval = null;

    /**
        Whether the progression has been started.
        @property _hasStartedProgression
        @private
        @type Boolean
        @default false
    */
    this._hasStartedProgression = false;

    /**
        Whether the user has been shown the jump message.
        @property _shownJumpMessage
        @private
        @type Boolean
        @default false
    */
    this._shownJumpMessage = false;

    this.init = function (id, parentResource, options) {
        var _this = this;

        this.name = 'progressionTool';
        this.id = id;
        this.parentResource = parentResource;

        this.numToWin = options.numToWin;
        this.toolSpecificStartButtonBehavior = options.start;
        this.toolSpecificResetButtonBehavior = options.reset;
        this.toolSpecificNextButtonBehavior = options.next;
        this.toolSpecificCheckWhetherAnswerIsCorrect = options.isCorrect;
        this.useTimer = 'useTimer' in options ? options.useTimer : false;
        this.useMultipleParts = 'useMultipleParts' in options ? options.useMultipleParts : false;

        var css = '<style>.zyante-bold{font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight:300}.zyante-section-bold{font-family:Helvetica;font-weight:300}.progressionTool{min-width:425px}.progressionTool div.zyante-progression-reset-confirm-container{left:50%;text-align:center;position:absolute;z-index:10000}.progressionTool div.zyante-progression-reset-confirm-container div.zyante-progression-reset-confirm-container-center{left:-50%;position:relative}.progressionTool div.zyante-progression-reset-confirm-container div.zyante-progression-reset-confirm-container-center div.zyante-progression-reset-confirm-label{font-size:18px;margin-bottom:15px}.progressionTool div.zyante-progression-reset-confirm-container div.zyante-progression-reset-confirm-container-center button.zyante-progression-confirm-reset-button{margin-left:25px}.progressionTool div.zyante-progression-modal-cover{height:100%;width:100%;z-index:9999}.progressionTool div.zyante-progression-modal-cover.active-cover{opacity:.1}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-start-reset-buttons-container{height:45px;margin-bottom:10px}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-start-reset-buttons-container button.zyante-progression-reset-button{background-color:#fff;color:#5780a6}.progressionTool div.zyante-progression-modal-cover button.zyante-progression-next-button,.progressionTool div.zyante-progression-modal-cover button.zyante-progression-try-again{margin-left:30px}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-status-bar{align-items:stretch;background-color:#eee;border:1px solid #5780a6;display:flex;height:30px;margin:10px 0}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-status-bar div{align-items:center;color:#999;display:flex;font-size:10px;justify-content:center;width:100%}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-status-bar div.filled{background-color:#87add2;color:#eee}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-status-bar div.highlighted{border:0;font-weight:700;font-size:15px;outline:3px solid #576E91;z-index:1}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-status-bar div.highlighted:not(.filled){color:gray}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-status-bar div:not(:last-child){border-right:1px dashed #5780a6}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-status-bar div:not(:last-child).highlighted{border:0}.progressionTool div.zyante-progression-modal-cover span.zyante-progression-x-mark{color:#bb0404;font-size:18px;font-style:normal}.progressionTool div.zyante-progression-modal-cover span.zyante-progression-is-done{display:inline;font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-size:20px;font-weight:700;margin-left:15px;vertical-align:middle}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-explanation-area{font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;line-height:23px;margin-bottom:15px;margin-top:15px}.progressionTool div.zyante-progression-modal-cover p.zyante-progression-time-output{display:none;font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;height:20px;margin:0;padding:0}.progressionTool div.zyante-progression-modal-cover div.zyante-progression-spinner{display:inline-block;height:40px;margin-left:30px;position:relative;vertical-align:top;width:20px}.progressionTool.progression-started div.zyante-progression-status-bar div{cursor:pointer}</style>';

        this.utilities = require('utilities');
        this.$tool = $('#' + this.id);
        this.$tool.addClass('progressionTool');

        if (parentResource.needsAccessible && parentResource.needsAccessible() && options.accessibleViewForLevel) {

            // Generate indices from 0..(this.numToWin - 1)
            var levelIndices = this.utilities.createArrayOfSizeN(this.numToWin).map(function (_, index) {
                return index;
            }); // eslint-disable-line id-length
            var promises = levelIndices.map(function (levelIndex) {
                return options.accessibleViewForLevel(levelIndex);
            });

            // When all the levels are generated, build the accessible HTML.
            Ember.RSVP.all(promises).then(function (questionHTMLs) {
                var questionHTMLWithLevels = questionHTMLs.map(function (questionHTML, index) {
                    return '<p>Level ' + (index + 1) + '</p>' + questionHTML;
                });
                var accessibleHTML = questionHTMLWithLevels.join('');

                _this.$tool.html(css + accessibleHTML);
            }, function (errorMessage) {
                _this.$tool.html('<p>Error: ' + errorMessage + '</p>');
                require('zyWebErrorManager').postError(errorMessage);
            });
        } else {
            this.checkmarkImageURL = this.utilities.getCheckmarkImageURL(parentResource);

            var html = this[this.name].progressionTool({
                toolSpecificHTML: options.html,
                toolSpecificCSS: options.css,
                numberOfSegments: this.numToWin
            });

            this.$tool.html(css + html);

            this.currentQuestionNumber = 0;

            this.$resetConfirmContainer = this.$tool.find('.zyante-progression-reset-confirm-container');
            this.$cancelResetButton = this.$tool.find('.zyante-progression-cancel-reset-button');
            this.$confirmResetButton = this.$tool.find('.zyante-progression-confirm-reset-button');
            this.$modalCover = this.$tool.find('.zyante-progression-modal-cover');
            this.$startButton = this.$tool.find('.zyante-progression-start-button');
            this.$resetButton = this.$tool.find('.zyante-progression-reset-button');
            this.$questionArea = this.$tool.find('.zyante-progression-tool-specific-outlet');
            this.$nextButton = this.$tool.find('.zyante-progression-next-button');
            this.$tryAgainButton = this.$tool.find('.zyante-progression-try-again');
            this.$checkButton = this.$tool.find('.zyante-progression-check-button');
            this.$progressionBarSegments = this.$tool.find('.zyante-progression-status-bar div');
            this.$isDone = this.$tool.find('.zyante-progression-is-done');
            this.$xMark = this.$tool.find('.zyante-progression-x-mark');
            this.$checkmark = this.$tool.find('.zyante-progression-checkmark');
            this.$explanation = this.$tool.find('.zyante-progression-explanation');
            this.$explanationArea = this.$tool.find('.zyante-progression-explanation-area');
            this.$timeOutput = this.$tool.find('.zyante-progression-time-output');
            this.spinnerDiv = this.$tool.find('.zyante-progression-spinner')[0];

            if (this.useTimer) {
                this.$timeOutput.show();
            }

            this.$resetButton.hide();
            this.$resetConfirmContainer.hide();
            this.utilities.disableButton(this.$nextButton);
            this.utilities.disableButton(this.$tryAgainButton);
            this.$tryAgainButton.hide();
            this.utilities.disableButton(this.$checkButton);
            this.$isDone.hide();
            this.$xMark.hide();
            this.$checkmark.hide();
            this.$checkmark.attr('src', this.checkmarkImageURL);
            this._highlightCurrentLevel();

            this.$startButton.click(function () {
                _this.startButtonClick();
                return false;
            });
            this.$resetButton.click(function () {
                _this.resetButtonClick();
            });
            this.$nextButton.click(function () {
                _this.nextButtonClick();
                return false;
            });
            this.$tryAgainButton.click(function () {
                _this.tryAgainButtonClick();
                return false;
            });
            this.$checkButton.click(function () {
                _this.checkButtonClick();
            });
            this.$cancelResetButton.click(function () {
                _this.cancelResetButtonClick();
            });
            this.$confirmResetButton.click(function () {
                _this.reset();
            });

            // If multiple parts are used, then support user jumping between levels.
            if (this.useMultipleParts) {
                this._shownJumpMessage = parentResource.getLocalStore('shownJumpMessage');

                this.$progressionBarSegments.click(function (event) {
                    if (_this._hasStartedProgression) {
                        var index = _this.$progressionBarSegments.index(event.target);
                        var clickedLevel = index + 1;
                        var completedLevels = _this.$progressionBarSegments.map(function (_index, segment) {
                            return $(segment).hasClass('filled');
                        });
                        var tooFarForStudentIndex = index - 1;
                        var tooFarForStudent = tooFarForStudentIndex >= 0 && !completedLevels[tooFarForStudentIndex];
                        var isStudent = parentResource.isStudent();
                        var title = 'Level jump';

                        // Students can only jump to a completed level, or the last completed level plus 1.
                        if (isStudent && tooFarForStudent) {

                            parentResource.alert(title, 'Must first complete all earlier levels.');
                        }

                        // If non-student has seen message, then just jump.
                        else if (!isStudent && _this._shownJumpMessage) {
                                _this._jumpToLevel(_this.currentQuestionNumber, index);
                            } else {

                                // Build confirm button of modal
                                var confirmButtonLabel = isStudent ? 'Yes, jump.' : 'Ok, got it.';
                                var confirmButton = {
                                    keepOpen: false,
                                    label: confirmButtonLabel,
                                    decoration: 'button-blue',
                                    callback: function callback() {
                                        _this._jumpToLevel(_this.currentQuestionNumber, index);
                                    }
                                };

                                // Display jump modal.
                                if (isStudent) {
                                    var studentJumpMessage = 'Jump to level ' + clickedLevel + '?';

                                    _this.parentResource.showModal(title, studentJumpMessage, confirmButton, {
                                        keepOpen: false,
                                        label: 'No, don\'t jump.',
                                        decoration: 'button-red'
                                    });
                                }

                                // Show instructor jump message only once.
                                else if (!_this._shownJumpMessage) {
                                        var instructorJumpMessage = 'Students can only jump to completed levels, or next uncompleted level.' + ' Instructors are allowed to jump to any level.';

                                        _this.parentResource.showModal(title, instructorJumpMessage, confirmButton);
                                    }

                                // Record that jump message has been shown.
                                _this._shownJumpMessage = true;
                                _this.parentResource.setLocalStore('shownJumpMessage', _this._shownJumpMessage);
                            }
                    }
                });
            }

            this._fillCompletedLevels();
        }
    };

    /**
        Jump from one level to another.
        @method _jumpToLevel
        @private
        @param {Number} fromLevel The level from which we're jumping.
        @param {Number} toLevel The level to which we're jumping.
        @return {void}
    */
    this._jumpToLevel = function (fromLevel, toLevel) {

        // Record the user jumped levels.
        this.parentResource.postEvent({
            part: this.currentQuestionNumber,
            complete: false,
            metadata: {
                jumpedLevel: true,
                jumpedFromLevelIndex: fromLevel,
                jumpedToLevelIndex: toLevel
            }
        });

        this.currentQuestionNumber = toLevel;
        this._loadNextQuestion();
    };

    /**
        Fill in the already completed levels.
        @method _fillCompletedLevels
        @private
        @return {void}
    */
    this._fillCompletedLevels = function () {
        var _this2 = this;

        var activityCompletionResponse = this.parentResource.activityCompletion();

        if (activityCompletionResponse instanceof Ember.RSVP.Promise) {
            activityCompletionResponse.then(function (activityData) {
                _this2._processActivityCompletionObject(activityData);
            });
        } else {
            this._processActivityCompletionObject(activityCompletionResponse);
        }
    };

    /**
        Process the activity completion object returned by zyWeb.
        @method _processActivityCompletionObject
        @private
        @param {Array} activityData Array of {Object}. The activity completion object returned by zyWeb.
        @return {void}
    */
    this._processActivityCompletionObject = function (activityData) {
        var _this3 = this;

        var activityCompletion = activityData.partsCompletionStatus.map(function (status) {
            return status.complete === 1;
        });

        // Get the level indices of completed levels, then remove incomplete levels.
        var indicesOfCompletedLevels = activityCompletion.map(function (completed, index) {
            var completedIndex = null;

            // Map index of completed activity.
            if (completed) {
                completedIndex = index;
            }

            return completedIndex;
        }).filter(function (completedIndex) {
            return completedIndex !== null;
        });

        var indicesOfLevelsToFill = [];

        // For multiple-part progressions, fill each level separately.
        if (this.useMultipleParts) {
            indicesOfLevelsToFill = indicesOfCompletedLevels;
        }

        // For single-part progressions, fill all if complete. Otherwise, fill none.
        else if (indicesOfCompletedLevels[0] === 0) {
                indicesOfLevelsToFill = this.$progressionBarSegments.map(function (index) {
                    return index;
                }).toArray();
            }

        // Fill completed levels.
        indicesOfLevelsToFill.forEach(function (levelIndex) {
            _this3.$progressionBarSegments.eq(levelIndex).addClass('filled');
        });
    };

    /**
        Behavior for when the start button is clicked.
        @method startButtonClick
        @private
        @return {void}
    */
    this.startButtonClick = function () {
        this._hasStartedProgression = true;

        if (this.useMultipleParts) {
            this.$tool.addClass('progression-started');
        }

        this.$startButton.hide();
        this.$resetButton.show();
        this.utilities.enableButton(this.$checkButton);
        this.startTimer();

        this.toolSpecificStartButtonBehavior();
    };

    /**
        Hide the reset modal.
        @method hideResetConfirmModal
        @private
        @return {void}
    */
    this.hideResetConfirmModal = function () {
        this.$modalCover.removeClass('active-cover');
        this.$resetConfirmContainer.hide();
        this.$tool.unbind('mousedown');
    };

    /**
        Hide the modal without setting.
        @method cancelResetButtonClick
        @private
        @return {void}
    */
    this.cancelResetButtonClick = function () {
        this.hideResetConfirmModal();
        this.$resetButton.show();
    };

    /**
        Display reset modal.
        @method displayResetConfirmModal
        @private
        @return {void}
    */
    this.displayResetConfirmModal = function () {
        this.$modalCover.addClass('active-cover');
        this.$startButton.hide();
        this.$resetButton.hide();
        this.$resetConfirmContainer.show();
        this.$cancelResetButton.focus();

        var self = this;

        this.$tool.mousedown(function (event) {

            // Cancel reset unless confirm reset is clicked
            if (!$(event.target).hasClass('zyante-progression-confirm-reset-button')) {
                self.cancelResetButtonClick();
            }
        });
    };

    /**
        Handle reset button click.
        @method resetButtonClick
        @private
        @return {void}
    */
    this.resetButtonClick = function () {

        // User has answered 1+ questions
        if (this.currentQuestionNumber > 0) {
            this.displayResetConfirmModal();
        } else {
            this.reset();
        }
    };

    /**
        Highlight the current level.
        @method _highlightCurrentLevel
        @private
        @return {void}
    */
    this._highlightCurrentLevel = function () {
        this.$progressionBarSegments.removeClass('highlighted').eq(this.currentQuestionNumber).addClass('highlighted');
    };

    /**
        Load the next question.
        @method _loadNextQuestion
        @private
        @return {void}
    */
    this._loadNextQuestion = function () {
        var _this4 = this;

        this.utilities.disableButton(this.$nextButton);
        this.utilities.disableButton(this.$tryAgainButton);
        this.utilities.enableButton(this.$checkButton);
        this.$isDone.hide();
        this.$xMark.hide();
        this.$checkmark.hide();
        this.resumeTimer();
        this._highlightCurrentLevel();

        this.toolSpecificNextButtonBehavior(this.currentQuestionNumber);

        var explanationHadContent = Boolean(this.$explanation.text(''));

        if (explanationHadContent) {

            // Set explanation area height to height of content.
            this.$explanationArea.css('height', this.$explanationArea.height());

            // Remove content.
            this.$explanation.text('');

            // Animate height back to 'auto' from original explanation height.
            this.$explanationArea.animate({ height: 0 }, {
                complete: function complete() {
                    _this4.$explanationArea.css('height', 'auto');
                }
            });
        }

        this.parentResource.scrollToTop();
    };

    /**
        Handle next button click by hiding explanation and showing next question.
        @method nextButtonClick
        @private
        @return {void}
    */
    this.nextButtonClick = function () {
        if (!this.$nextButton.hasClass('disabled')) {
            this._loadNextQuestion();
        }
    };

    /**
        Handle try again button click by hiding explanation and showing the question again.
        @method tryAgainButtonClick
        @private
        @return {void}
    */
    this.tryAgainButtonClick = function () {
        if (!this.$tryAgainButton.hasClass('disabled')) {
            this._loadNextQuestion();
        }
    };

    /**
        Submit event of user activity.
        @method postUserAnswerAndExpectedAnswer
        @private
        @param {Boolean} isCorrect Whether the user's answer was correct.
        @param {Object} metadata Metadata on user activity to be recorded.
        @return {void}
    */
    this.postUserAnswerAndExpectedAnswer = function (isCorrect, metadata) {
        var metadataToRecord = $.extend(metadata, {
            expectedAnswer: this.expectedAnswer
        });
        var event = {
            answer: this.userAnswer,
            metadata: metadataToRecord
        };

        // If the progression tool has multiple parts, then submit the |this.currentQuestionNumber| and whether |isCorrect|
        if (this.useMultipleParts) {

            // |currentQuestionNumber| is 0-indexed.
            event.part = this.currentQuestionNumber;
            event.complete = isCorrect;
        }

        // If not multiple parts, then |part| is always 0 and |completed| is true if the last question was answered correctly
        else {
                var onLastQuestion = this.currentQuestionNumber + 1 === this.numToWin;

                event.complete = isCorrect && onLastQuestion;
                event.part = 0;
            }

        this.parentResource.postEvent(event);
    };

    /**
        Start the spinner.
        @method startSpinner
        @private
        @return {void}
    */
    this.startSpinner = function () {
        var opts = {
            lines: 13,
            length: 5,
            width: 3,
            radius: 7,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: '#CC6600',
            speed: 1,
            trail: 60,
            shadow: false,
            hwaccel: false,
            className: 'spinner',
            zIndex: 2e9,
            top: '50%',
            left: '50%'
        };

        this.spinner = new Spinner(opts).spin(this.spinnerDiv);
    };

    /**
        Stop the spinner.
        @method stopSpinner
        @private
        @return {void}
    */
    this.stopSpinner = function () {
        if (this.spinner) {
            this.spinner.stop();
            this.spinner = null;
        }
    };

    /**
        Handle the isCorrect function return value |toolCorrectness|.
        @method handleCorrectnessValue
        @private
        @param {Object} toolCorrectness Includes properties used to react to a user's response.
        Supports {Boolean} for whether the user's answer is correct.
        @param {String} toolCorrectness.explanationMessage An explanation message.
        @param {String} toolCorrectness.userAnswer The user's answer.
        @param {String} toolCorrectness.expectedAnswer The expected answer.
        @param {Boolean} toolCorrectness.isCorrect Whether the user's answer is correct.
        @param {Boolean} [toolCorrectness.latexChanged=false] Whether LaTex is in the explanation.
        @param {Function} [toolCorrectness.callbackFunction=null] A possible callback function after explanation is shown.
        @param {Object} [toolCorrectness.callbackParameters={}] An object containing parameters for the callback function.
        @param {Boolean} [toolCorrectness.showTryAgain=false] Whether to show Try Again instead of Next button.
        @return {void}
    */
    this.handleCorrectnessValue = function (toolCorrectness) {
        var isCorrect = false;
        var latexChanged = false;
        var callbackFunction = null;
        var explanationAsText = false;
        var metadata = {};
        var showTryAgain = false;
        var callbackParameters = {};

        if (toolCorrectness instanceof Object) {
            this.explanationMessage = toolCorrectness.explanationMessage;
            this.userAnswer = toolCorrectness.userAnswer;
            this.expectedAnswer = toolCorrectness.expectedAnswer;
            isCorrect = toolCorrectness.isCorrect;

            if ('latexChanged' in toolCorrectness) {
                latexChanged = toolCorrectness.latexChanged;
            }

            if ('callbackFunction' in toolCorrectness) {
                callbackFunction = toolCorrectness.callbackFunction;
            }

            if ('callbackParameters' in toolCorrectness) {
                callbackParameters = toolCorrectness.callbackParameters;
            }

            if ('explanationAsText' in toolCorrectness) {
                explanationAsText = toolCorrectness.explanationAsText;
            }

            if ('metadata' in toolCorrectness) {
                metadata = toolCorrectness.metadata;
            }

            if ('showTryAgain' in toolCorrectness) {
                showTryAgain = toolCorrectness.showTryAgain;
            }
        }

        // Deprecated usage of the progressionTool, though most tools still use this interface.
        else {
                isCorrect = toolCorrectness;
            }

        this.postUserAnswerAndExpectedAnswer(isCorrect, metadata);

        if (isCorrect) {
            this.$progressionBarSegments.eq(this.currentQuestionNumber).addClass('filled');
            this.currentQuestionNumber++;
            this.$checkmark.show();
        } else {
            this.$xMark.show();
        }

        this.outputThenScrollToExplanation(this.explanationMessage, explanationAsText);

        if (latexChanged) {
            this.parentResource.latexChanged();
        }

        if (this.currentQuestionNumber === this.numToWin) {
            this.$isDone.show();
        } else {
            var $buttonToShow = showTryAgain ? this.$tryAgainButton : this.$nextButton;
            var $buttonToHide = showTryAgain ? this.$nextButton : this.$tryAgainButton;

            $buttonToHide.hide();
            $buttonToShow.show();
            this.utilities.enableButton($buttonToShow);
            $buttonToShow.focus();
        }

        if (callbackFunction) {
            callbackFunction(callbackParameters);
        }
    };

    /**
        Output the explanation, then scroll to the explanation area.
        @method outputThenScrollToExplanation
        @private
        @param {String} explanationMessage The explanation message to output.
        @param {Boolean} explanationAsText Whether to set the explanation as text or HTML.
        @return {void}
    */
    this.outputThenScrollToExplanation = function (explanationMessage) {
        var explanationAsText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (explanationAsText) {
            this.$explanation.text(explanationMessage);
        } else {
            this.$explanation.html(explanationMessage);
        }
        this.$explanationArea.hide().fadeIn();
        this.parentResource.scrollToBottom();
    };

    /**
        Handel check button being clicked by asking tool to assess correctness.
        @method checkButtonClick
        @private
        @return {void}
    */
    this.checkButtonClick = function () {
        if (!this.$checkButton.hasClass('disabled')) {
            this.utilities.disableButton(this.$checkButton);
            this.pauseTimer();

            var toolReturnValue = this.toolSpecificCheckWhetherAnswerIsCorrect(this.currentQuestionNumber);

            // If tool returns a promise, then start the spinner.
            if (toolReturnValue instanceof Ember.RSVP.Promise) {
                this.startSpinner();

                var self = this;

                toolReturnValue.then(function (isCorrectReturnValue) {
                    self.stopSpinner();
                    self.handleCorrectnessValue(isCorrectReturnValue);
                }, function (errorMessage) {
                    self.stopSpinner();

                    // Enable Check button so the user can attempt the Next button again.
                    self.utilities.enableButton(self.$checkButton);
                    self.resumeTimer();

                    // Give tool specific error message showing in explanation area.
                    self.outputThenScrollToExplanation(errorMessage);
                });
            } else {
                this.handleCorrectnessValue(toolReturnValue);
            }
        }
    };

    /**
        Hook for zyWeb to reset this tool.
        @method reset
        @return {void}
    */
    this.reset = function () {
        this.hideResetConfirmModal();
        this.$startButton.show();
        this.$resetButton.hide();
        this.utilities.disableButton(this.$nextButton);
        this.utilities.disableButton(this.$tryAgainButton);
        this.utilities.disableButton(this.$checkButton);
        this.removeTimer();
        this.currentQuestionNumber = 0;
        this._highlightCurrentLevel();
        this.$isDone.hide();
        this.$xMark.hide();
        this.$checkmark.hide();
        this.$explanation.text('');
        this._hasStartedProgression = false;
        this.$tool.removeClass('progression-started');

        this.toolSpecificResetButtonBehavior();
    };

    /**
        Force a check button click.
        @method check
        @return {void}
    */
    this.check = function () {
        this.checkButtonClick();
    };

    /**
        Start the timer.
        @method startTimer
        @private
        @return {void}
    */
    this.startTimer = function () {
        this.$timeOutput.text('Time: 0');
        this.resumeTimer();
    };

    /**
        Pause the timer then remove the time.
        @method removeTimer
        @private
        @return {void}
    */
    this.removeTimer = function () {
        this.pauseTimer();
        this.$timeOutput.text('');
    };

    /**
        Pause the timer.
        @method pauseTimer
        @private
        @return {void}
    */
    this.pauseTimer = function () {
        window.clearInterval(timeInterval);
        timeInterval = null;
    };

    /**
        Resume the timer.
        @method resumeTimer
        @private
        @return {void}
    */
    this.resumeTimer = function () {
        if (!Boolean(timeInterval)) {
            var self = this;
            var oneSecond = 1000;

            timeInterval = window.setInterval(function () {
                self.incTimer();
            }, oneSecond);
        }
    };

    /**
        Increment the displayed time.
        @method incTimer
        @private
        @return {void}
    */
    this.incTimer = function () {
        var time = parseInt(this.$timeOutput.text().split(' ')[1], 10);

        this.$timeOutput.text('Time: ' + String(time + 1));
    };

    this["progressionTool"] = this["progressionTool"] || {};

    this["progressionTool"]["progressionTool"] = Handlebars.template({ "1": function _(container, depth0, helpers, partials, data) {
            return "            <div>" + container.escapeExpression(container.lambda(depth0, depth0)) + "</div>\n";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : container.nullContext || {},
                alias2 = helpers.helperMissing,
                alias3 = "function";

            return ((stack1 = (helper = (helper = helpers.toolSpecificCSS || (depth0 != null ? depth0.toolSpecificCSS : depth0)) != null ? helper : alias2, (typeof helper === 'undefined' ? 'undefined' : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "toolSpecificCSS", "hash": {}, "data": data }) : helper)) != null ? stack1 : "") + "\n\n<div class='zyante-progression-reset-confirm-container'>\n    <div class='zyante-progression-reset-confirm-container-center'>\n        <div class='zyante-progression-reset-confirm-label'>Reset this activity?</div>\n        <button class='zyante-progression-cancel-reset-button button'>Cancel</button>\n        <button class='zyante-progression-confirm-reset-button button'>Confirm</button>\n    </div>\n</div>\n\n<div class='zyante-progression-modal-cover'>\n    <div class='zyante-progression-start-reset-buttons-container'>\n        <button class='zyante-progression-start-button button'>Start</button>\n        <button class='zyante-progression-reset-button button'>Reset</button>\n    </div>\n\n    <div class='zyante-progression-tool-specific-outlet'>\n        " + ((stack1 = (helper = (helper = helpers.toolSpecificHTML || (depth0 != null ? depth0.toolSpecificHTML : depth0)) != null ? helper : alias2, (typeof helper === 'undefined' ? 'undefined' : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "toolSpecificHTML", "hash": {}, "data": data }) : helper)) != null ? stack1 : "") + "\n    </div>\n\n    <div class='zyante-progression-status-bar'>\n" + ((stack1 = (helpers.rangeOneIndexed || depth0 && depth0.rangeOneIndexed || alias2).call(alias1, depth0 != null ? depth0.numberOfSegments : depth0, { "name": "rangeOneIndexed", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "    </div>\n\n    <button class='zyante-progression-check-button button'>Check</button>\n    <button class='zyante-progression-next-button button'>Next</button>\n    <button class='zyante-progression-try-again button'>Try again</button>\n    <div class='zyante-progression-spinner'></div>\n    <span class='zyante-progression-is-done correct'>Done</span>\n    <div class='zyante-progression-explanation-area'>\n        <span class='zyante-progression-x-mark'>&#x2716;</span>\n        <img class='zyante-progression-checkmark'>\n        <span class='zyante-progression-explanation'></span>\n    </div>\n    <p class='zyante-progression-time-output'></p>\n</div>\n";
        }, "useData": true });
}

var progressionToolExport = {
    create: function create() {
        return new ProgressionTool();
    },
    dependencies: {
        "vendorJS": ["spin.min.js"],
        "tools": ["utilities"]
    },
    runTests: function runTests() {}
};

module.exports = progressionToolExport;


exports.default = module.exports;
});