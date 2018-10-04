define("ProgressionUtilities", ["exports"], function(exports) {
var module = {};
'use strict';

/* exported Element */

/**
    An {Element} models the state of a visual element. {Element} is an abstract class.
    @class Element
*/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {

    /**
        @constructor
        @param {Object} elementJSON JSON that models an element.
        @param {String} elementJSON.id Unique to each element.
        @param {Boolean} elementJSON.isInEditMode Whether the element is currently in edit mode.
        @param {Boolean} elementJSON.isSelected Whether this element is currently selected.
        @param {String} elementJSON.name The name of this element.
        @param {Object} elementJSON.style CSS style for this element.
        @param {String} elementJSON.type The type of element.
    */
    function Element(elementJSON) {
        _classCallCheck(this, Element);

        if (elementJSON) {
            this.id = elementJSON.id;
            this.isInEditMode = elementJSON.isInEditMode;
            this.isSelected = elementJSON.isSelected;
            this.name = elementJSON.name;
            this.style = elementJSON.style;
            this.type = elementJSON.type;
        }
    }

    /**
        Return a clone of this element. Inheriting objects should override this.
        @method clone
        @return {Element} Copy of this element.
    */


    _createClass(Element, [{
        key: 'clone',
        value: function clone() {
            throw new Error('Cannot clone Element.');
        }

        /**
            Return JSON representing this element.
            @method toJSON
            @return {Object} JSON representing this element.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return {
                id: this.id,
                isInEditMode: this.isInEditMode,
                isSelected: this.isSelected,
                name: this.name,
                style: $.extend(true, {}, this.style),
                type: this.type
            };
        }

        /**
            Merge |variantToMerge| with this element.
            @method mergeElementVariant
            @param {ElementVariant} variantToMerge Variant to merge with this element.
            @return {void}
        */

    }, {
        key: 'mergeElementVariant',
        value: function mergeElementVariant(variantToMerge) {
            for (var property in variantToMerge) {
                // eslint-disable-line guard-for-in
                this._setProperty(property, variantToMerge[property]);
            }
        }

        /**
            Set a |property| of {Element} with |value|. May be overwritten by inheriting classes.
            @method _setProperty
            @private
            @param {String} property The property to be updated.
            @param {Object} value The value to assigned to |property|. Ex: Updated |id|, |isInEditMode|, or |style|.
            @return {void}
        */

    }, {
        key: '_setProperty',
        value: function _setProperty(property, value) {
            if (property === 'style') {
                $.extend(this.style, value);
            } else {
                this[property] = value;
            }
        }

        /**
            Update the element with the executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {// eslint-disable-line no-unused-vars

            // Inheriting elements may define behavior.
        }
    }]);

    return Element;
}();

'use strict';

/* exported ElementCheckbox */
/* global replaceStringVariables */

/**
    An {ElementCheckbox} models a checkbox.
    @class ElementCheckbox
    @extends Element
*/

var ElementCheckbox = function (_Element) {
    _inherits(ElementCheckbox, _Element);

    /**
        @constructor
        @param {Object} elementCheckboxJSON JSON that models the checkbox.
        @param {Boolean} elementCheckboxJSON.correctAnswerIsCheckedString A string defining wether the correct answer for the checkbox is to be checked.
        @param {Array} [elementCheckboxJSON.label=''] The label associated with the checkbox.
    */
    function ElementCheckbox(elementCheckboxJSON) {
        _classCallCheck(this, ElementCheckbox);

        /**
            A string that defines wether the correct answer of the checkbox is to be checked or not.
            'false', '0' or '' means not checked is correct. Anything else is correct.
            @property correctAnswerIsCheckedString
            @type {String}
            @default ''
        */
        var _this = _possibleConstructorReturn(this, (ElementCheckbox.__proto__ || Object.getPrototypeOf(ElementCheckbox)).call(this, elementCheckboxJSON));

        _this.correctAnswerIsCheckedString = elementCheckboxJSON.correctAnswerIsCheckedString || '';

        /**
            Wether the correct answer of the checkbox is to be checked or not. This is calculated based on |correctAnswerIsCheckedString|.
            @property correctAnswerIsChecked
            @type {Boolean}
            @default false
        */
        _this.correctAnswerIsChecked = false;

        /**
            The label assigned to the checkbox.
            @property label
            @type {String}
            @default ''
        */
        _this.label = elementCheckboxJSON.label || '';

        _this.setCorrectAnswerIsChecked();
        return _this;
    }

    /**
        Set whether the correct answer is a checked checkbox.
        @method setCorrectAnswerIsChecked
        @return {void}
    */


    _createClass(ElementCheckbox, [{
        key: 'setCorrectAnswerIsChecked',
        value: function setCorrectAnswerIsChecked() {
            this.correctAnswerIsChecked = ['false', '', '0'].indexOf(this.correctAnswerIsCheckedString) < 0;
        }

        /**
            Return a clone of this checkbox.
            @method clone
            @return {ElementCheckbox} Copy of this element.
        */

    }, {
        key: 'clone',
        value: function clone() {
            return new ElementCheckbox(this.toJSON());
        }

        /**
            Return JSON representing this checkbox.
            @method toJSON
            @return {Object} JSON representing this checkbox.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var elementJSON = Element.prototype.toJSON.call(this);

            elementJSON.correctAnswerIsCheckedString = this.correctAnswerIsCheckedString;
            elementJSON.label = this.label;

            return elementJSON;
        }

        /**
            Update checkbox label with executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {
            this.label = replaceStringVariables(this.label, module);
            this.correctAnswerIsCheckedString = replaceStringVariables(this.correctAnswerIsCheckedString, module);
            this.setCorrectAnswerIsChecked();
        }
    }]);

    return ElementCheckbox;
}(Element);

'use strict';

/* exported ElementController */
/* global escapeStyleValues */

/**
    Control an element displayed to the user, including rendering, updating, and destroying.
    This controller is an abstract class.
    @class ElementController
*/

var ElementController = function () {

    /**
        @constructor
        @param {Element} elementRendered The element being rendered.
        @param {jQuery} $questionArea Reference to the question area DOM.
        @param {Object} templates Dictionary of templates for rendering elements.
        @param {Object} parentResource Dictionary of functions to access resources and submit activity.
        @param {progressionTool} progressionTool Reference to the {progressionTool} instance used for the progression.
    */
    function ElementController(elementRendered, $questionArea, templates, parentResource, progressionTool) {
        _classCallCheck(this, ElementController);

        // During inheriting, do not set properties.
        if (arguments.length !== 0) {
            // eslint-disable-line prefer-rest-params
            this._elementRendered = elementRendered;
            this._$questionArea = $questionArea;
            this._templates = templates;
            this._parentResource = parentResource;
            this._progressionTool = progressionTool;
            this._$element = null;
        }
    }

    /**
        Render the element.
        @method render
        @return {void}
    */


    _createClass(ElementController, [{
        key: 'render',
        value: function render() {
            this._elementRendered.style = escapeStyleValues(this._elementRendered.style);

            // Add support for rotations on IE9 and Safari.
            if ('transform' in this._elementRendered.style) {
                this._elementRendered.style['-ms-transform'] = this._elementRendered.style.transform;
                this._elementRendered.style['-webkit-transform'] = this._elementRendered.style.transform;
            }

            var elementStyleHTML = this._templates.ElementStyle({ // eslint-disable-line new-cap
                style: this._elementRendered.style
            });
            var className = require('ProgressionUtilities').create().getElementClassNameByType(this._elementRendered.type);
            var elementHTML = this._templates[className]({
                element: this._elementRendered,
                style: elementStyleHTML
            });

            this._$questionArea.append(elementHTML);
            this._$element = this._$questionArea.children().last();
        }

        /**
            Destroy the controller by removing associated event listeners and DOM elements.
            @method destroy
            @return {void}
        */

    }, {
        key: 'destroy',
        value: function destroy() {
            if (this._$element) {
                this._$element.remove();
            }
        }
    }]);

    return ElementController;
}();

'use strict';

/* exported ElementDropdown */
/* global ElementDropdownOption, Element */

/**
    An {ElementDropdown} models an interactive dropdown.
    @class ElementDropdown
    @extends Element
*/

var ElementDropdown = function (_Element2) {
    _inherits(ElementDropdown, _Element2);

    /**
        @constructor
        @param {Object} elementDropdownJSON JSON that models a dropdown. See {Elements} for more properties.
        @param {Array} elementDropdownJSON.options Array of JSON that models each option.
        @param {String} [optionOrderingMethod='none'] Method in which to order the options. Valid values: 'none', 'random', and 'sort'
    */
    function ElementDropdown(elementDropdownJSON) {
        _classCallCheck(this, ElementDropdown);

        var _this2 = _possibleConstructorReturn(this, (ElementDropdown.__proto__ || Object.getPrototypeOf(ElementDropdown)).call(this, elementDropdownJSON));

        var options = elementDropdownJSON.options ? elementDropdownJSON.options.slice() : [];

        _this2.options = options.map(function (optionJSON) {
            return new ElementDropdownOption(optionJSON);
        });

        _this2.optionOrderingMethod = elementDropdownJSON.optionOrderingMethod || 'none';
        return _this2;
    }

    /**
        Set |property| with |value|.
        @method _setProperty
        @private
        @param {String} property The property to be added.
        @param {Object} value The value of |property|.
        @return {void}
    */


    _createClass(ElementDropdown, [{
        key: '_setProperty',
        value: function _setProperty(property, value) {

            // Convert options to {ElementDropdownOption}.
            if (property === 'options') {
                this.options = value.map(function (optionJSON) {
                    return new ElementDropdownOption(optionJSON);
                });
            } else {
                Element.prototype._setProperty.call(this, property, value); // eslint-disable-line no-underscore-dangle
            }
        }

        /**
            Return a clone of this element.
            @method clone
            @return {Element} Copy of this element.
        */

    }, {
        key: 'clone',
        value: function clone() {
            return new ElementDropdown(this.toJSON());
        }

        /**
            Return JSON representing this element.
            @method toJSON
            @return {Object} JSON representing this element.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var elementJSON = Element.prototype.toJSON.call(this);

            elementJSON.options = this.options.map(function (option) {
                return option.toJSON();
            });
            elementJSON.optionOrderingMethod = this.optionOrderingMethod;

            return elementJSON;
        }

        /**
            Update each option with executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {
            this.options.forEach(function (option) {
                option.updateWithCode(module);
            });
        }
    }]);

    return ElementDropdown;
}(Element);

'use strict';

/* exported ElementDropdownOption */
/* global replaceStringVariables */

/**
    {ElementDropdownOption} models an option in an {ElementDropdown}.
    @class ElementDropdownOption
*/

var ElementDropdownOption = function () {

    /**
        @constructor
        @param {Object} elementDropdownOptionJSON Model of an option in a dropdown.
        @param {String} [elementDropdownOptionJSON.text=''] The displayed option.
        @param {Boolean} elementDropdownOptionJSON.isCorrectOption Whether this option is the correct answer.
        @param {Boolean} elementDropdownOptionJSON.isDefault Whether this element is the default selection.
        @param {Boolean} elementDropdownOptionJSON.isInvalidOption Whether this option is an invalid option.
        @param {Boolean} elementDropdownOptionJSON.isSelected Whether this option is currently selected.
    */
    function ElementDropdownOption(elementDropdownOptionJSON) {
        _classCallCheck(this, ElementDropdownOption);

        this.isCorrectOption = elementDropdownOptionJSON.isCorrectOption;
        this.isDefault = elementDropdownOptionJSON.isDefault;
        this.isInvalidOption = elementDropdownOptionJSON.isInvalidOption;
        this.isSelected = elementDropdownOptionJSON.isSelected;

        var defaultText = this.isDefault ? 'Select an option' : '';

        this.text = elementDropdownOptionJSON.text || defaultText;
    }

    /**
        Convert {ElementDropdownOption} into a JSON representation.
        @method toJSON
        @return {Object} JSON representation of an {ElementDropdownOption}.
    */


    _createClass(ElementDropdownOption, [{
        key: 'toJSON',
        value: function toJSON() {
            return {
                text: this.text,
                isCorrectOption: this.isCorrectOption,
                isDefault: this.isDefault,
                isInvalidOption: this.isInvalidOption,
                isSelected: this.isSelected
            };
        }

        /**
            Update each option with executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {
            this.text = replaceStringVariables(this.text, module);
        }
    }]);

    return ElementDropdownOption;
}();

'use strict';

/* exported ElementImage */
/* global replaceStringVariables */

/**
    An {ElementImage} models an image.
    @class ElementImage
    @extends Element
*/

var ElementImage = function (_Element3) {
    _inherits(ElementImage, _Element3);

    /**
        @constructor
        @param {Object} elementImageJSON JSON that models the image. See {Element} for more properties.
        @param {String} elementImageJSON.imageID The ID of the image, used for finding the image.
        @param {Object} elementImageJSON.style The rendering styles (e.g., CSS) of the element.
        @param {Boolean} elementImageJSON.controlHeightWidthPerQuestion Whether the height and width are controlled per question, or same for all questions.
    */
    function ElementImage(elementImageJSON) {
        _classCallCheck(this, ElementImage);

        var _this3 = _possibleConstructorReturn(this, (ElementImage.__proto__ || Object.getPrototypeOf(ElementImage)).call(this, elementImageJSON));

        _this3.imageID = elementImageJSON.imageID || '';
        _this3.keepHeightRatio = elementImageJSON.style.height === 'auto';
        _this3.keepWidthRatio = elementImageJSON.style.width === 'auto';
        _this3.controlHeightWidthPerQuestion = elementImageJSON.controlHeightWidthPerQuestion || false;
        return _this3;
    }

    /**
        Return a clone of this element.
        @method clone
        @return {Element} Copy of this element.
    */


    _createClass(ElementImage, [{
        key: 'clone',
        value: function clone() {
            return new ElementImage(this.toJSON());
        }

        /**
            Return JSON representing this element.
            @method toJSON
            @return {Object} JSON representing this element.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var elementJSON = Element.prototype.toJSON.call(this); // eslint-disable-line prefer-reflect

            elementJSON.imageID = this.imageID;
            elementJSON.controlHeightWidthPerQuestion = this.controlHeightWidthPerQuestion;

            return elementJSON;
        }

        /**
            Update image ID with executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {
            this.imageID = replaceStringVariables(this.imageID, module);
        }
    }]);

    return ElementImage;
}(Element);

'use strict';

/* exported ElementShortAnswer */
/* global replaceStringVariables */

/**
    An {ElementShortAnswer} models an interactive short answer.
    @class ElementShortAnswer
    @extends Element
*/

var ElementShortAnswer = function (_Element4) {
    _inherits(ElementShortAnswer, _Element4);

    /**
        @constructor
        @param {Object} elementShortAnswerJSON JSON that models a short answer. See {Elements} for more properties.
        @param {String} [assessmentMethod='stringMatch'] The method to assess correctness. Valid values: 'stringMatch' and 'numericalMatch'
        @param {Object} [assessmentProperties={}] Properties associated with assessing correctness. Ex: tolerancePercentage and toleranceAbsoluteValue for 'numericalMatch'
        @param {Array} [elementShortAnswerJSON.correctAnswers=[]] Array of {String}. The correct answers for the short answer.
        @param {String} [elementShortAnswerJSON.placeholder=''] The placeholder text for the short answer.
    */
    function ElementShortAnswer(elementShortAnswerJSON) {
        _classCallCheck(this, ElementShortAnswer);

        var _this4 = _possibleConstructorReturn(this, (ElementShortAnswer.__proto__ || Object.getPrototypeOf(ElementShortAnswer)).call(this, elementShortAnswerJSON));

        _this4.assessmentMethod = elementShortAnswerJSON.assessmentMethod || 'stringMatch';
        _this4.assessmentProperties = elementShortAnswerJSON.assessmentProperties || {};
        _this4.correctAnswers = elementShortAnswerJSON.correctAnswers ? elementShortAnswerJSON.correctAnswers.slice() : [];
        _this4.placeholder = elementShortAnswerJSON.placeholder || '';
        return _this4;
    }

    /**
        Return a clone of this element.
        @method clone
        @return {Element} Copy of this element.
    */


    _createClass(ElementShortAnswer, [{
        key: 'clone',
        value: function clone() {
            return new ElementShortAnswer(this.toJSON());
        }

        /**
            Return JSON representing this element.
            @method toJSON
            @return {Object} JSON representing this element.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var elementJSON = Element.prototype.toJSON.call(this); // eslint-disable-line prefer-reflect

            elementJSON.assessmentMethod = this.assessmentMethod;
            elementJSON.assessmentProperties = $.extend(true, {}, this.assessmentProperties);
            elementJSON.correctAnswers = this.correctAnswers.slice();
            elementJSON.placeholder = this.placeholder;

            return elementJSON;
        }

        /**
            Update placeholder and each correct answer with executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {
            this.placeholder = replaceStringVariables(this.placeholder, module);
            this.correctAnswers = this.correctAnswers.map(function (correctAnswer) {
                return replaceStringVariables(correctAnswer, module);
            });
        }
    }]);

    return ElementShortAnswer;
}(Element);

'use strict';

/* exported ElementTable */
/* global ElementTableCell, isTwoDimensionalList, getTableDataFromList */

/**
    An {ElementTable} models a table that is displayed to the user.
    @class ElementTable
    @extends Element
*/

var ElementTable = function (_Element5) {
    _inherits(ElementTable, _Element5);

    /**
        @constructor
        @param {Object} elementTableJSON JSON that models the table. See {Element} for more properties.
        @param {Array} elementTableJSON.tableData A two-dimensional array of JSON models of {ElementTableCell} elements.
    */
    function ElementTable(elementTableJSON) {
        _classCallCheck(this, ElementTable);

        var _this5 = _possibleConstructorReturn(this, (ElementTable.__proto__ || Object.getPrototypeOf(ElementTable)).call(this, elementTableJSON));

        var tableData = elementTableJSON.tableData || [[]];

        _this5.tableData = tableData.map(function (row) {
            return row.map(function (cell) {
                return new ElementTableCell(cell);
            });
        });
        _this5.listName = elementTableJSON.listName || '';
        _this5.isFirstRowHeader = elementTableJSON.isFirstRowHeader || false;
        _this5.isFirstColumnHeader = elementTableJSON.isFirstColumnHeader || false;
        return _this5;
    }

    /**
        Set |property| with |value|.
        @method _setProperty
        @private
        @param {String} property The property to be added.
        @param {Object} value The value of |property|.
        @return {void}
    */


    _createClass(ElementTable, [{
        key: '_setProperty',
        value: function _setProperty(property, value) {

            // Convert options to {ElementDropdownOption}.
            if (property === 'tableData') {
                this.tableData = value.map(function (row) {
                    return row.map(function (cell) {
                        return new ElementTableCell(cell);
                    });
                });
            } else {
                Element.prototype._setProperty.call(this, property, value); // eslint-disable-line no-underscore-dangle
            }
        }

        /**
            Return a clone of this element.
            @method clone
            @return {ElementTable} Copy of this element.
        */

    }, {
        key: 'clone',
        value: function clone() {
            return new ElementTable(this.toJSON());
        }

        /**
            Return JSON representing this element.
            @method toJSON
            @return {Object} JSON representing this element.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var elementJSON = Element.prototype.toJSON.call(this);

            elementJSON.tableData = this.tableData.map(function (row) {
                return row.map(function (cell) {
                    return cell.toJSON();
                });
            });
            elementJSON.listName = this.listName;
            elementJSON.isFirstRowHeader = this.isFirstRowHeader;
            elementJSON.isFirstColumnHeader = this.isFirstColumnHeader;

            return elementJSON;
        }

        /**
            Update table with executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {
            var _this6 = this;

            if (this.listName && isTwoDimensionalList(this.listName, module)) {
                var tableDataFromList = getTableDataFromList(this.listName, module);

                this.tableData = tableDataFromList.variables.map(function (row, rowIndex) {
                    return row.map(function (cell, colIndex) {
                        return new ElementTableCell({
                            content: String(cell),
                            isHeader: _this6.isFirstRowHeader && rowIndex === 0 || _this6.isFirstColumnHeader && colIndex === 0
                        });
                    });
                });
            } else {
                this.tableData.forEach(function (row) {
                    return row.forEach(function (cell) {
                        return cell.updateWithCode(module);
                    });
                });
            }
        }
    }]);

    return ElementTable;
}(Element);

'use strict';

/* exported ElementTableCell */
/* global replaceStringVariables */

/**
    An {ElementTableCell} models each cell in an {ElementTable}.
    @class ElementTableCell
*/

var ElementTableCell = function () {

    /**
        @constructor
        @param {Object} elementTableCellJSON JSON that models the cell.
        @param {Array} [elementTableCellJSON.content=''] The content of the cell.
        @param {Boolean} [elementTableCellJSON.isHeader=false] Whether the cell is a header.
    */
    function ElementTableCell(elementTableCellJSON) {
        _classCallCheck(this, ElementTableCell);

        this.content = elementTableCellJSON.content || '';
        this.isHeader = elementTableCellJSON.isHeader || false;
    }

    /**
        Return a clone of this table cell.
        @method clone
        @return {ElementTableCell} Copy of this element.
    */


    _createClass(ElementTableCell, [{
        key: 'clone',
        value: function clone() {
            return new ElementTableCell(this.toJSON());
        }

        /**
            Return JSON representing this table cell.
            @method toJSON
            @return {Object} JSON representing this cell.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return {
                content: this.content,
                isHeader: this.isHeader
            };
        }

        /**
            Update cell content with executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {
            this.content = replaceStringVariables(this.content, module);
        }
    }]);

    return ElementTableCell;
}();

'use strict';

/* exported ElementText */
/* global replaceStringVariables */

/**
    An {ElementText} models text that is displayed to the user.
    @class ElementText
    @extends Element
*/

var ElementText = function (_Element6) {
    _inherits(ElementText, _Element6);

    /**
        @constructor
        @param {Object} elementTextJSON JSON that models that the text. See {Element} for more properties.
        @param {String} elementTextJSON.text The text displayed to the user.
    */
    function ElementText(elementTextJSON) {
        _classCallCheck(this, ElementText);

        var _this7 = _possibleConstructorReturn(this, (ElementText.__proto__ || Object.getPrototypeOf(ElementText)).call(this, elementTextJSON));

        _this7.text = elementTextJSON.text || '';
        return _this7;
    }

    /**
        Return a clone of this element.
        @method clone
        @return {Element} Copy of this element.
    */


    _createClass(ElementText, [{
        key: 'clone',
        value: function clone() {
            return new ElementText(this.toJSON());
        }

        /**
            Return JSON representing this element.
            @method toJSON
            @return {Object} JSON representing this element.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var elementJSON = Element.prototype.toJSON.call(this); // eslint-disable-line prefer-reflect

            elementJSON.text = this.text;

            return elementJSON;
        }

        /**
            Update text with executed code.
            @method updateWithCode
            @param {Sk.module} module Skulpt Python module that has variables.
            @return {void}
        */

    }, {
        key: 'updateWithCode',
        value: function updateWithCode(module) {
            this.text = replaceStringVariables(this.text, module);
        }
    }]);

    return ElementText;
}(Element);

'use strict';

/* exported ElementVariant */
/* global escapeStyleValues */

/**
    An {ElementVariant} is an incomplete {Element}.
    @class ElementVariant
*/

var ElementVariant = function () {

    /**
        @constructor
        @param {Object} elementVariantJSON Properties to store on the element variant.
    */
    function ElementVariant(elementVariantJSON) {
        _classCallCheck(this, ElementVariant);

        for (var property in elementVariantJSON) {
            // eslint-disable-line guard-for-in
            var value = elementVariantJSON[property] || '';

            // Escape style property values.
            if (property === 'style') {
                value = escapeStyleValues(value);
            }

            // Make a copy if property is an array.
            if (Object.prototype.toString.call(value) === '[object Array]') {
                value = value.slice();
            }

            this[property] = value;
        }
    }

    /**
        Return a clone of this element.
        @method clone
        @return {Element} Copy of this element.
    */


    _createClass(ElementVariant, [{
        key: 'clone',
        value: function clone() {
            return this.toJSON();
        }

        /**
            Convert {ElementVariant} into a JSON representation.
            @method toJSON
            @return {Object} JSON representation of a {ElementVariant}.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return $.extend(true, {}, this);
        }
    }]);

    return ElementVariant;
}();

'use strict';

/* exported Level */
/* global ElementVariant, Question */

/**
    A {Level} is a collection of similar difficulty questions.
    The questions may have the same explanation.
    @class Level
*/

var Level = function () {

    /**
        @constructor
        @param {Object} levelJSON JSON that models a questions and explanation object.
        @param {String} levelJSON.explanation Explanation for each question this level.
        @param {Array} levelJSON.elementVariants Variations of elements used for this level.
        @param {String} levelJSON.height Height of questions display area.
        @param {Boolean} levelJSON.isCollapsed Whether the level is collapsed.
        @param {String} levelJSON.name The name of this level.
        @param {Array} levelJSON.questions Array of JSON modeling each question this level.
        @param {String} levelJSON.width Width of questions display area.
        @param {Array} levelJSON.usedElements List of element IDs included this level.
    */
    function Level(levelJSON) {
        _classCallCheck(this, Level);

        var elementVariantsJSON = levelJSON.elementVariants || [];

        this.elementVariants = elementVariantsJSON.map(function (elementVariantJSON) {
            return new ElementVariant(elementVariantJSON);
        });

        var questionsJSON = levelJSON.questions || [];

        this.questions = questionsJSON.map(function (questionJSON) {
            return new Question(questionJSON);
        });
        this.explanation = levelJSON.explanation || '';
        this.height = levelJSON.height;
        this.isCollapsed = levelJSON.isCollapsed || false;
        this.name = levelJSON.name;
        this.usedElements = levelJSON.usedElements.slice();
        this.width = levelJSON.width;
    }

    /**
        Return a clone of this level.
        @method clone
        @return {Level} A clone of this level.
    */


    _createClass(Level, [{
        key: 'clone',
        value: function clone() {
            return new Level(this.toJSON());
        }

        /**
            Convert {Level} into a JSON representation.
            @method toJSON
            @return {Object} JSON representation of a {Level}.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return {
                elementVariants: this.elementVariants.map(function (elementVariant) {
                    return elementVariant.toJSON();
                }),
                questions: this.questions.map(function (question) {
                    return question.toJSON();
                }),
                explanation: this.explanation,
                height: this.height,
                isCollapsed: this.isCollapsed,
                name: this.name,
                usedElements: this.usedElements.slice(),
                width: this.width
            };
        }
    }]);

    return Level;
}();

'use strict';

/* exported Progression */
/* global getElementClassByType, Level */

/**
    {Progression} stores configurations used across all levels and questions.
    @class Progression
*/

var Progression = function () {

    /**
        @constructor
        @param {Object} progressionJSON Configurations used across all levels and questions.
        @param {String} [progressionJSON.code=''] Code to execute and use for variables in {Element}s.
        @param {Array} [progressionJSON.elements=[]] Elements used across all levels and questions.
        @param {String} [progressionJSON.explanation=''] Explanation for each question in each level.
        @param {String} progressionJSON.height Height of the progression.
        @param {Array} [progressionJSON.levels=[]] The levels of the progression.
        @param {String} progressionJSON.width Width of the progression.
    */
    function Progression(progressionJSON) {
        _classCallCheck(this, Progression);

        var elementsJSON = progressionJSON.elements || [];

        this.elements = elementsJSON.map(function (elementJSON) {
            var NewElementClass = getElementClassByType(elementJSON.type);

            return new NewElementClass(elementJSON);
        });

        var levelsJSON = progressionJSON.levels || [];

        this.levels = levelsJSON.map(function (levelJSON) {
            return new Level(levelJSON);
        });
        this.code = progressionJSON.code || '';
        this.explanation = progressionJSON.explanation || '';
        this.height = progressionJSON.height;
        this.width = progressionJSON.width;
    }

    /**
        Convert {Progression} into a JSON representation.
        @method toJSON
        @return {Object} JSON representation of a {Progression}.
    */


    _createClass(Progression, [{
        key: 'toJSON',
        value: function toJSON() {
            return {
                code: this.code,
                elements: this.elements.map(function (element) {
                    return element.toJSON();
                }),
                levels: this.levels.map(function (level) {
                    return level.toJSON();
                }),
                explanation: this.explanation,
                height: this.height,
                width: this.width
            };
        }
    }]);

    return Progression;
}();

'use strict';

/* global getElementClassNameByType, replaceStringVariables, Sk, commonFunctions, numberOfLinesOfCode, downloadImage,
   buildStyleEscapeDictionary, colorEscapeDictionary, getElementClassByType, testProperties, escapeStyleValues,
   Progression, Level, Question, PropertyAndType, ElementController, ElementVariant,
   ElementTableCell, ElementDropdownOption */

/**
    Common models, templates, styles, and functions used by ProgressionBuilder and ProgressionPlayer.

    @module ProgressionUtilities
    @return {ProgressionUtilities}
*/
function ProgressionUtilities() {
    buildStyleEscapeDictionary();

    this["ProgressionUtilities"] = this["ProgressionUtilities"] || {};

    this["ProgressionUtilities"]["ElementCheckbox"] = Handlebars.template({ "1": function _(container, depth0, helpers, partials, data) {
            return " selected";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : container.nullContext || {},
                alias2 = container.lambda,
                alias3 = container.escapeExpression;

            return "<div class='element" + ((stack1 = helpers["if"].call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.isSelected : stack1, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + " zb-checkbox checkbox-element label-present orange' " + ((stack1 = (helper = (helper = helpers.style || (depth0 != null ? depth0.style : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(alias1, { "name": "style", "hash": {}, "data": data }) : helper)) != null ? stack1 : "") + ">\n    <input id=\"progression-checkbox-" + alias3(alias2((stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.id : stack1, depth0)) + "\" class=\"progression-checkbox\" type=\"checkbox\" value=\"false\" aria-label=\"" + alias3(alias2((stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.label : stack1, depth0)) + "\">\n    <label aria-hidden=\"true\">" + alias3(alias2((stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.label : stack1, depth0)) + "</label>\n</div>\n";
        }, "useData": true });

    this["ProgressionUtilities"]["ElementDropdown"] = Handlebars.template({ "1": function _(container, depth0, helpers, partials, data) {
            return " selected";
        }, "3": function _(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : container.nullContext || {},
                alias2 = helpers.helperMissing,
                alias3 = "function",
                alias4 = container.escapeExpression;

            return "            <option value='" + alias4((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2, (typeof helper === 'undefined' ? 'undefined' : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "text", "hash": {}, "data": data }) : helper)) + "'" + ((stack1 = helpers["if"].call(alias1, depth0 != null ? depth0.isSelected : depth0, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + ((stack1 = helpers["if"].call(alias1, depth0 != null ? depth0.isInvalidOption : depth0, { "name": "if", "hash": {}, "fn": container.program(4, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + ">" + alias4((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2, (typeof helper === 'undefined' ? 'undefined' : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "text", "hash": {}, "data": data }) : helper)) + "</option>\n";
        }, "4": function _(container, depth0, helpers, partials, data) {
            return " disabled";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : container.nullContext || {};

            return "<div class='element" + ((stack1 = helpers["if"].call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.isSelected : stack1, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + " dropdown' " + ((stack1 = (helper = (helper = helpers.style || (depth0 != null ? depth0.style : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(alias1, { "name": "style", "hash": {}, "data": data }) : helper)) != null ? stack1 : "") + ">\n    <select>\n" + ((stack1 = helpers.each.call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.options : stack1, { "name": "each", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "    </select>\n</div>";
        }, "useData": true });

    this["ProgressionUtilities"]["ElementImage"] = Handlebars.template({ "1": function _(container, depth0, helpers, partials, data) {
            return " selected";
        }, "3": function _(container, depth0, helpers, partials, data) {
            return "keep-height-ratio ";
        }, "5": function _(container, depth0, helpers, partials, data) {
            return "keep-width-ratio";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : container.nullContext || {};

            return "<div class='element" + ((stack1 = helpers["if"].call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.isSelected : stack1, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "' " + ((stack1 = (helper = (helper = helpers.style || (depth0 != null ? depth0.style : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(alias1, { "name": "style", "hash": {}, "data": data }) : helper)) != null ? stack1 : "") + ">\n    <img alt='Image loading...'\n         class=\"" + ((stack1 = helpers["if"].call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.keepHeightRatio : stack1, { "name": "if", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + ((stack1 = helpers["if"].call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.keepWidthRatio : stack1, { "name": "if", "hash": {}, "fn": container.program(5, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "\"/>\n</div>\n";
        }, "useData": true });

    this["ProgressionUtilities"]["ElementShortAnswer"] = Handlebars.template({ "1": function _(container, depth0, helpers, partials, data) {
            return " selected";
        }, "3": function _(container, depth0, helpers, partials, data) {
            return "number";
        }, "5": function _(container, depth0, helpers, partials, data) {
            return "text";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : container.nullContext || {},
                alias2 = helpers.helperMissing;

            return "<div class='element" + ((stack1 = helpers["if"].call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.isSelected : stack1, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + " short-answer' " + ((stack1 = (helper = (helper = helpers.style || (depth0 != null ? depth0.style : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, { "name": "style", "hash": {}, "data": data }) : helper)) != null ? stack1 : "") + ">\n    <input type='" + ((stack1 = (helpers.ifCond || depth0 && depth0.ifCond || alias2).call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.assessmentMethod : stack1, "===", "numericalMatch", { "name": "ifCond", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.program(5, data, 0), "data": data })) != null ? stack1 : "") + "' placeholder='" + container.escapeExpression(container.lambda((stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.placeholder : stack1, depth0)) + "'>\n</div>";
        }, "useData": true });

    this["ProgressionUtilities"]["ElementStyle"] = Handlebars.template({ "1": function _(container, depth0, helpers, partials, data) {
            var helper,
                alias1 = container.escapeExpression;

            return alias1((helper = (helper = helpers.key || data && data.key) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, { "name": "key", "hash": {}, "data": data }) : helper)) + ": " + alias1(container.lambda(depth0, depth0)) + ";";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1;

            return "style='" + ((stack1 = helpers.each.call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? depth0.style : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "'";
        }, "useData": true });

    this["ProgressionUtilities"]["ElementTable"] = Handlebars.template({ "1": function _(container, depth0, helpers, partials, data) {
            return " selected";
        }, "3": function _(container, depth0, helpers, partials, data) {
            var stack1;

            return "            <tr>\n" + ((stack1 = helpers.each.call(depth0 != null ? depth0 : container.nullContext || {}, depth0, { "name": "each", "hash": {}, "fn": container.program(4, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "            </tr>\n";
        }, "4": function _(container, depth0, helpers, partials, data) {
            var stack1;

            return (stack1 = helpers["if"].call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? depth0.isHeader : depth0, { "name": "if", "hash": {}, "fn": container.program(5, data, 0), "inverse": container.program(7, data, 0), "data": data })) != null ? stack1 : "";
        }, "5": function _(container, depth0, helpers, partials, data) {
            return "                        <th>" + container.escapeExpression(container.lambda(depth0 != null ? depth0.content : depth0, depth0)) + "</th>\n";
        }, "7": function _(container, depth0, helpers, partials, data) {
            return "                        <td>" + container.escapeExpression(container.lambda(depth0 != null ? depth0.content : depth0, depth0)) + "</td>\n";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : container.nullContext || {};

            return "<div class='element" + ((stack1 = helpers["if"].call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.isSelected : stack1, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + " table table-element' " + ((stack1 = (helper = (helper = helpers.style || (depth0 != null ? depth0.style : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(alias1, { "name": "style", "hash": {}, "data": data }) : helper)) != null ? stack1 : "") + ">\n    <table>\n" + ((stack1 = helpers.each.call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.tableData : stack1, { "name": "each", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "    </table>\n</div>\n";
        }, "useData": true });

    this["ProgressionUtilities"]["ElementText"] = Handlebars.template({ "1": function _(container, depth0, helpers, partials, data) {
            return " selected";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : container.nullContext || {};

            return "<div class='element" + ((stack1 = helpers["if"].call(alias1, (stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.isSelected : stack1, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + " text-element' " + ((stack1 = (helper = (helper = helpers.style || (depth0 != null ? depth0.style : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(alias1, { "name": "style", "hash": {}, "data": data }) : helper)) != null ? stack1 : "") + ">" + container.escapeExpression(container.lambda((stack1 = depth0 != null ? depth0.element : depth0) != null ? stack1.text : stack1, depth0)) + "</div>";
        }, "useData": true });

    this["ProgressionUtilities"]["QuestionArea"] = Handlebars.template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<link href='https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i' rel='stylesheet'>\n<div class='question-area'></div>";
        }, "useData": true });
    this.templates = this[this._name];
    this.colorEscapeDictionary = colorEscapeDictionary;
    require('utilities').addIfConditionalHandlebars();
}

/**
    Dictionary of templates for this module.
    @property templates
    @type Object
*/
ProgressionUtilities.prototype.templates = {};

/**
    The name of the module.
    @property _name
    @type String
*/
ProgressionUtilities.prototype._name = 'ProgressionUtilities';

/**
    CSS styles defined for this tool.
    @property css
    @type String
*/
ProgressionUtilities.prototype.css = '<style>.zyante-bold{font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight:300}.zyante-section-bold{font-family:Helvetica;font-weight:300}div.question-area{position:relative}div.question-area .element{font-family:Roboto,sans-serif;position:absolute}div.question-area .element img{height:100%;width:100%}div.question-area .element .keep-height-ratio{height:auto}div.question-area .element .keep-width-ratio{width:auto}div.question-area .element input{width:100%}div.question-area .element input.progression-checkbox{margin-top:-2px;vertical-align:middle;width:auto}div.question-area .element table{background:#f5f5f5;border:2px solid #bdbdbd;border-collapse:collapse;height:100%;line-height:1;margin:0 auto;width:100%}div.question-area .element table th{background-color:#e0e0e0;border:1px solid #bdbdbd;font-weight:300;padding:5px}div.question-area .element table td{border:1px solid #bdbdbd;padding:8px}div.question-area .element.text-element{line-height:1.4;white-space:pre-wrap}div.question-area div.dropdown,div.question-area div.short-answer{padding:5px}div.question-area div.dropdown select,div.question-area div.short-answer select{font-weight:300}div.question-area div.short-answer input[type=text],div.question-area div.short-answer input[type=number]{box-sizing:content-box;padding:1px}</style>';

/**
    Map color name to color's hex value. Color name is key (ex: zyante-black); key's value is
    color's hex values.
    @property colorEscapeDictionary
    @type Object
*/
ProgressionUtilities.prototype.colorEscapeDictionary = {};

/**
    Return a new {Progression}.
    @method createProgression
    @return {Progression} The new progression object.
*/
ProgressionUtilities.prototype.createProgression = function () {
    var progression = Object.create(Progression.prototype);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    Progression.apply(progression, args);
    return progression;
};

/**
    Return a new {Level}.
    @method createLevel
    @return {Level} The new level object.
*/
ProgressionUtilities.prototype.createLevel = function () {
    var level = Object.create(Level.prototype);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    Level.apply(level, args);
    return level;
};

/**
    Return a new {Question}.
    @method createQuestion
    @return {Question} The new question object.
*/
ProgressionUtilities.prototype.createQuestion = function () {
    var question = Object.create(Question.prototype);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    Question.apply(question, args);
    return question;
};

/**
    Return a new {ElementVariant}.
    @method createElementVariant
    @return {ElementVariant} The new progression question element object.
*/
ProgressionUtilities.prototype.createElementVariant = function () {
    var elementVariant = Object.create(ElementVariant.prototype);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    ElementVariant.apply(elementVariant, args);
    return elementVariant;
};

/**
    Return a new {Element} based on given |type|.
    @method createElementByType
    @param {Object} properties The properties to add to the new element.
    @param {String} properties.type The type of element to create.
    @return {Element} The new element.
*/
ProgressionUtilities.prototype.createElementByProperties = function (properties) {
    var ElementClass = getElementClassByType(properties.type);

    return new ElementClass(properties);
};

/**
    Return the class name for the given type of element.
    @method getElementClassNameByType
    @param {String} type The type of element.
    @return {String} The class name of the type of element.
*/
ProgressionUtilities.prototype.getElementClassNameByType = function (type) {
    return getElementClassNameByType(type);
};

/**
    Return the most specific defined |property| value: question > level > progression.

    @method getMostSpecificProperty
    @param {String} property The property to find the most specific value for.
    @param {Progression} progression The progression object.
    @param {Level} level The current level in the progression.
    @param {Question} question The current question in the progression.
    @return {String} The most specific defined |property| value.
*/
ProgressionUtilities.prototype.getMostSpecificProperty = function (property, progression, level, question) {
    var value = null;

    if (question && question[property]) {
        value = question[property];
    } else if (level && level[property]) {
        value = level[property];
    } else if (progression && progression[property]) {
        value = progression[property];
    }

    return value;
};

/**
    Get the most specific style value for an element.
    @method getMostSpecificStyleValueOfElement
    @param {String} styleName The style name to find.
    @param {Element} element The element on which to find the most specific style.
    @param {Level} level The current level in the progression.
    @param {Question} question The current question in the progression.
    @return {String} The most specific defined style value of the element. Returns null if no style defined.
*/
ProgressionUtilities.prototype.getMostSpecificStyleValueOfElement = function (styleName, element, level, question) {
    var value = null;
    var questionVariant = question && question.elementVariants.find(function (variant) {
        return variant.id === element.id;
    });
    var levelVariant = level && level.elementVariants.find(function (variant) {
        return variant.id === element.id;
    });

    if (questionVariant && questionVariant.style && questionVariant.style[styleName]) {
        value = questionVariant.style[styleName];
    } else if (levelVariant && levelVariant.style && levelVariant.style[styleName]) {
        value = levelVariant.style[styleName];
    } else if (element && element.style && element.style[styleName]) {
        value = element.style[styleName];
    }

    return value;
};

/**
    Return a new instance of {ElementController}.
    @method inheritElementController
    @return {ElementController} The new instance.
*/
ProgressionUtilities.prototype.inheritElementController = function () {
    return new ElementController();
};

/**
    Return a new {ElementController}.
    @method createElementController
    @return {ElementController} The new element controller object.
*/
ProgressionUtilities.prototype.createElementController = function () {
    var elementController = Object.create(ElementController.prototype);

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
    }

    ElementController.apply(elementController, args);
    return elementController;
};

/**
    Return a new {ElementDropdownOption}.
    @method createElementDropdownOption
    @return {ElementDropdownOption} The new dropdown option object.
*/
ProgressionUtilities.prototype.createElementDropdownOption = function () {
    var elementDropdownOption = Object.create(ElementDropdownOption.prototype);

    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
    }

    ElementDropdownOption.apply(elementDropdownOption, args);
    return elementDropdownOption;
};

/**
    Return a new {ElementTableCell}.
    @method createElementTableCell
    @return {ElementTableCell} The cell object.
*/
ProgressionUtilities.prototype.createElementTableCell = function () {
    var elementTableCell = Object.create(ElementTableCell.prototype);

    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
    }

    ElementTableCell.apply(elementTableCell, args);
    return elementTableCell;
};

/**
    Return a new {PropertyAndType}.
    @method createPropertyAndType
    @return {PropertyAndType} The new dropdown option object.
*/
ProgressionUtilities.prototype.createPropertyAndType = function () {
    var elementPropertyAndType = Object.create(PropertyAndType.prototype);

    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
    }

    PropertyAndType.apply(elementPropertyAndType, args);
    return elementPropertyAndType;
};

/**
    Attempt to download an image from zybooks.com, then from Google Drive.
    @method downloadImage
    @param {Object} parentResource The parent resource of the module.
    @param {String} imageID The image ID to download.
    @param {Object} $image jQuery object for where to load the image.
    @param {String} errorMessage The message to display if download fails.
    @return {void}
*/
ProgressionUtilities.prototype.downloadImage = function (parentResource, imageID, $image, errorMessage) {
    var imageSources = this.imageURLs(parentResource, imageID);

    downloadImage($image, imageSources, errorMessage);
};

/**
    Make a list of URLs to try to download given an imageID. First from Amazon, then from Google Drive.
    @method imageURLs
    @param {Object} parentResource The parent resource of the module.
    @param {String} imageID The image ID to download.
    @return {void}
*/
ProgressionUtilities.prototype.imageURLs = function (parentResource, imageID) {
    var getResource = parentResource.getStaticResource || parentResource.getDependencyURL;
    var zyServerURL = getResource.call(parentResource, 'gdrive_images/' + imageID); // eslint-disable-line prefer-reflect
    var googleDriveURL = 'https://drive.google.com/uc?export=download&id=' + imageID;

    return [zyServerURL, googleDriveURL];
};

/**
    Processes the explanation generating <img> tags where needed. Returns an HTML string.
    @method processExplanation
    @param {String} parentResource Reference to the parent of this module.
    @param {String} textExplanation The raw explanation for this question.
    @return {String}
*/
ProgressionUtilities.prototype.processExplanation = function (parentResource, textExplanation) {
    var imageRegEx = /\[image\s*(\d*)\s*(\d*)]\(((\w|\-)+)\)/;
    var remainingExplanation = textExplanation;
    var lastImageEndIndex = 0;
    var explanationParts = [];

    /* Search for images in the explanation and place them.
     * While there's an image notation in the explanation, go over the explanation until the notation is found: [image](image-id)
     * Once it finds that an image goes there, builds a <p> tag with the text before the image and an <img> tag with the image.
     * Repeat starting from the end of the last image's notation.
     * Ex: If |remainingExplanation| = "Explanation: [image](image-id) explained":
     *   The regEx finds an image notation present in the explanation, so enter while.
     *   Find the index of "[image](image-id)" and extract the "image-id" using imageRegEx.exec.
     *   Get the string before "[image](image-id)", that is "Explanation: ", and place it in a <p> tag via the conserveNewlines() function.
     *   Create an <img> whose ID is the image ID.
     *   Update |remainingExplanation| to the value after "[image](image-id)", in this example that is " explained".
     *   The regEx does not match any image notation, so exit the while and add the end of the explanation in a new <p> tag: " explained".
     */
    while (imageRegEx.test(remainingExplanation)) {

        // Find image matches and grab: width and height if set, image id, and text before the image.
        var regExMatch = imageRegEx.exec(remainingExplanation);
        var imageNotation = regExMatch[0];
        var imageWidth = regExMatch[1] ? parseInt(regExMatch[1], 10) : 0;
        var imageHeight = regExMatch[2] ? parseInt(regExMatch[2], 10) : 0;
        var imageIDToLoad = regExMatch[3];
        var textBeforeImage = remainingExplanation.slice(0, regExMatch.index);

        // Conserve newlines. Creates a <p> tag for each line. Pushes to |explanationParts|.
        explanationParts.push.apply(explanationParts, _toConsumableArray(this.conserveNewlines(textBeforeImage)));

        // Create <img> tag, the ID is the ID of the image to load, push img to |explanationParts|.
        var $imgElement = $('<img>', {
            class: 'explanation-image',
            'image-id': imageIDToLoad,
            src: this.imageURLs(parentResource, imageIDToLoad)[0]
        });

        if (imageWidth !== 0) {
            $imgElement.width(imageWidth);
        }
        if (imageHeight !== 0) {
            $imgElement.height(imageHeight);
        }

        explanationParts.push($imgElement);

        // Update values for next iteration.
        lastImageEndIndex = regExMatch.index + imageNotation.length;
        remainingExplanation = remainingExplanation.slice(lastImageEndIndex);
    }

    // Add remaining explanation.
    if (remainingExplanation.length > 0) {
        explanationParts.push.apply(explanationParts, _toConsumableArray(this.conserveNewlines(remainingExplanation)));
    }

    // Only first tag goes inline, so it's in the same line as the tick or 'X' that says the activity is correct or wrong.
    if (explanationParts.length > 0) {
        explanationParts[0].css({ display: 'inline' });
    }

    // Build the resulting explanation as an HTML string.
    var finalExplanation = '';

    explanationParts.forEach(function ($element) {
        finalExplanation += $element[0].outerHTML;
    });
    return finalExplanation;
};

/**
    Post process the explanation. Sets the HTML in the explanation area and loads the images.
    @method postProcessExplanation
    @param {Object} parameters An object containing parameters.
    @param {String} parameters.id The unique id given to this module.
    @param {String} parameters.parentResource Reference to the parent of this module.
    @return {void}
*/
ProgressionUtilities.prototype.postProcessExplanation = function (parameters) {
    var id = parameters.id;
    var $explanationArea = $('#' + id + ' .zyante-progression-explanation');
    var progressionUtilities = require('ProgressionUtilities').create();

    $explanationArea.html($explanationArea.text());
    $explanationArea.find('.explanation-image').each(function (index, element) {
        var $element = $(element);
        var imageID = $element.attr('image-id');

        progressionUtilities.downloadImage(parameters.parentResource, imageID, $(element), '[Error: Image did not load. Try refreshing.]');
    });
};

/**
    Creates a <p> tag for each line in the passed string.
    @method conserveNewlines
    @param {String} str The string in which to conserve the newlines.
    @return {Array} of jQuery objects
*/
ProgressionUtilities.prototype.conserveNewlines = function (str) {
    var pTags = [];

    str.split('\n').forEach(function (line) {
        return pTags.push($('<p>', { style: 'color: inherit; margin-bottom: 0px;' }).text(line));
    });

    return pTags;
};

/**
    Escape each property's value in |style|.
    @method escapeStyleValues
    @param {Object} style Each key is a property and each value is that property's value.
    @return {Object} Escaped styles
*/
ProgressionUtilities.prototype.escapeStyleValues = function (style) {
    return escapeStyleValues.call(this, style);
};

/**
    Replace the variables in the given string.
    @method replaceStringVariables
    @param {String} string The string that may have variables to replace.
    @param {Sk.module} module Skulpt Python module that has variables.
    @return {String} The string with variables updated with actual values.
*/
ProgressionUtilities.prototype.replaceStringVariables = function (string, module) {
    return replaceStringVariables(string, module);
};

/**
    Build a new Python module with given code.
    @method makePythonModule
    @param {String} progressionCode The code from the {Progression} to run through the new module.
    @param {String} questionCode The code from the {Question} to run through the new module.
    @return {Sk.module} Skulpt Python module with given code run through.
*/
ProgressionUtilities.prototype.makePythonModule = function (progressionCode, questionCode) {

    // Enable import of Python modules.
    Sk.configure({
        read: function read(filename) {
            if (!Sk.builtinFiles || !Sk.builtinFiles.files[filename]) {
                throw new Error('File not found: \'' + filename + '\'');
            }
            return Sk.builtinFiles.files[filename];
        }
    });

    // Configure execution timeout.
    var maxSecondsOfExecution = 5;

    Sk.configure({ execLimit: maxSecondsOfExecution * 1000 }); // eslint-disable-line no-magic-numbers

    var completeCode = commonFunctions + progressionCode + questionCode;

    return Sk.importMainWithBody('<stdin>', false, completeCode);
};

/**
    Revise the error message's line number by subtracting the number of prefix lines of code.
    @method reviseLineNumberInErrorMessage
    @param {String} errorMessage The error message to revise.
    @param {String} progressionCode The code from the {Progression} to run through the new module.
    @return {String} The revised error message.
*/
ProgressionUtilities.prototype.reviseLineNumberInErrorMessage = function (errorMessage, progressionCode) {
    var commonLinesOfCode = numberOfLinesOfCode(commonFunctions);
    var firstLineOfQuestionCode = commonLinesOfCode + numberOfLinesOfCode(progressionCode) + 1;

    return errorMessage.replace(/\son\sline\s(\d+)/g, function (match, lineNumberString) {
        var lineNumber = parseInt(lineNumberString, 10);
        var revisedLineNumber = lineNumber - commonLinesOfCode;
        var areaOfCodeWithError = 'global';

        // Error in {Question}'s code
        if (lineNumber >= firstLineOfQuestionCode) {
            revisedLineNumber = lineNumber - firstLineOfQuestionCode + 1;
            areaOfCodeWithError = 'question';
        }

        return revisedLineNumber > 0 ? ' on line ' + revisedLineNumber + ' of ' + areaOfCodeWithError + '\'s code' : '';
    });
};

/**
    Test that object has the expected properties and each property has the expected type.
    @method testProperties
    @param {Object} object The object being tested.
    @param {Array} objectPropertiesAndTypes The expected properties and property types.
    @param {String} objectName The name of the object.
    @return {void}
*/
ProgressionUtilities.prototype.testProperties = function (object, objectPropertiesAndTypes, objectName) {
    testProperties.call(this, object, objectPropertiesAndTypes, objectName);
};

var ProgressionUtilitiesExport = {
    create: function create() {
        if (!this._progressionUtilities) {
            this._progressionUtilities = new ProgressionUtilities();
        }
        return this._progressionUtilities;
    },
    dependencies: {
        "tools": ["utilities"],
        "vendorJS": ["skulpt.min.js", "skulpt-stdlib.js"]
    },
    runTests: function runTests() {}
};

module.exports = ProgressionUtilitiesExport;

'use strict';

/* exported Question */
/* global ElementVariant */

/**
    {Question} displays a prompt for the user and a way for the user to answer the prompt, all of which
    are defined in {Elements}.
    @class Question
*/

var Question = function () {

    /**
        @constructor
        @param {Object} questionJSON The JSON defining the question.
        @param {String} code Code to execute and use for variables in {Element}s.
        @param {Array} questionJSON.elementVariants Array of JSON that models each element variation.
        @param {String} questionJSON.explanation Explanation for this question.
        @param {String} questionJSON.height Height of the question's display area.
        @param {Boolean} questionJSON.isSelected Whether this question is currently selected.
        @param {String} questionJSON.name The name of this question.
        @param {Array} questionJSON.usedElements List of element ids for elements used in this question.
        @param {String} questionJSON.width Width of the question's display area.
    */
    function Question(questionJSON) {
        _classCallCheck(this, Question);

        var elementVariantsJSON = questionJSON.elementVariants || [];

        this.code = questionJSON.code;
        this.elementVariants = elementVariantsJSON.map(function (elementVariantJSON) {
            return new ElementVariant(elementVariantJSON);
        });
        this.explanation = questionJSON.explanation || '';
        this.height = questionJSON.height;
        this.isSelected = questionJSON.isSelected;
        this.name = questionJSON.name;
        this.usedElements = questionJSON.usedElements;
        this.width = questionJSON.width;
    }

    /**
        Return a clone of this question.
        @method clone
        @return {Question} A clone of this question.
    */


    _createClass(Question, [{
        key: 'clone',
        value: function clone() {
            return new Question(this.toJSON());
        }

        /**
            Return JSON for this Question.
            @method toJSON
            @return {Object} The JSON representing this object.
        */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return {
                code: this.code,
                elementVariants: this.elementVariants.map(function (variant) {
                    return variant.toJSON();
                }),
                explanation: this.explanation,
                height: this.height,
                isSelected: this.isSelected,
                name: this.name,
                usedElements: this.usedElements.slice(),
                width: this.width
            };
        }
    }]);

    return Question;
}();

'use strict';

/* exported TwoDimensionalList */

var TwoDimensionalList =

/**
    Creates a |TwoDimensionalList| instance from a two-dimensional python variable passed by Skulpt.
    @constructor
    @param {Sk.builtin.list} listVariable The Skulpt version of the python two-dimensional list.
*/
function TwoDimensionalList(listVariable) {
    _classCallCheck(this, TwoDimensionalList);

    this.numRows = listVariable.v.length;
    this.numCols = listVariable.v[0].v.length;
    this.variables = listVariable.v.map(function (row) {
        return row.v.map(function (cell) {
            return cell.v;
        });
    });
};

'use strict';

/* global toType */
/* exported PropertyAndType, testProperties */

/**
    Store a property and property's datatype.
    @class PropertyAndType
    @param {String} property The property's name.
    @param {String} type The data type of the property.
*/
function PropertyAndType(property, type) {
    this.property = property;
    this.type = type;
}

/**
    Test that object has the expected properties and each property has the expected type.
    @method testProperties
    @param {Object} object The object being tested.
    @param {Array} objectPropertiesAndTypes The expected properties and property types.
    @param {String} objectName The name of the object.
    @return {void}
*/
function testProperties(object, objectPropertiesAndTypes, objectName) {
    QUnit.test(objectName + ' Creation', function (assert) {
        objectPropertiesAndTypes.forEach(function (objectPropertyAndType) {
            var property = objectPropertyAndType.property;
            var type = objectPropertyAndType.type;

            assert.ok(property in object, objectName + ' has property ' + property);
            assert.equal(toType(object[property]), type, objectName + ' property ' + property + ' is a ' + type);
        });
    });
}

'use strict';

/* exported commonFunctions, getElementClassByType, replaceStringVariables, numberOfLinesOfCode, buildStyleEscapeDictionary, downloadImage,
            escapeStyleValues, isTwoDimensionalList, getTableDataFromList */
/* global TwoDimensionalList */

// Add commonly used functions.
var commonFunctions = 'import random\nimport math\nimport string\ndef pickFrom(list, exclude=[]):\n    list_minus_exclude = [x for x in list if x not in exclude]\n    return random.choice(list_minus_exclude)\n\ndef pickFromRange(start, end, exclude=[]):\n    if start > end:\n        raise ValueError(\'For pickFromRange(start, end), end should be larger than start\')\n    while (True):\n        number = random.randrange(start, end + 1, 1)\n        if number not in exclude:\n            return number\n\ndef sigFigRound(number_to_round, sig_figs):\n    def is_number(value):\n        \'\'\'Return whether value is a number or a string representing a number\'\'\'\n        if not isinstance(value, (float, str, int, long)):\n            return False\n        try:\n            float(value)\n            return True\n        except ValueError:\n            return False\n\n    error_message = \' parameter of sigFigRound is not a number, but should be\'\n    if not is_number(number_to_round):\n        raise ValueError(\'First\' + error_message)\n    if not is_number(sig_figs):\n        raise ValueError(\'Second\' + error_message)\n\n    # Eliminate sign from converting to sign fig until end of conversion.\n    number_to_round = float(number_to_round)\n    is_negative = number_to_round < 0.0\n    number_to_round = abs(number_to_round)\n\n    # Convert number into scientific notation\n    scientific_notation_number = scientificNotation(number_to_round, sig_figs)\n\n    # Split scientific notation into mantissa and exponent, i.e.: {mantissa}E{exponent}\n    number_split = string.split(scientific_notation_number, \'E\')\n    mantissa = number_split[0]\n    exponent = int(number_split[1])\n\n    # Split mantissa into integers and decimals, i.e.: {integers}.{decimals}\n    mantissa_split = string.split(mantissa, \'.\')\n    integers = mantissa_split[0]\n    decimals = mantissa_split[1] if len(mantissa_split) > 1 else \'\'\n\n    final_rounding = mantissa\n\n    # Handle positive exponent.\n    if exponent > 0:\n        if len(decimals) < exponent:\n            decimals += \'0\' * (exponent - len(decimals))\n        final_rounding = integers + decimals[0:exponent]\n        if len(decimals[exponent:]) > 0:\n            final_rounding += \'.\' + decimals[exponent:]\n        else:\n            # Decide whether to use scientific notation. Ex: 30 with 2 sig figs should be 3.0E+1\n            num_sig_figs = len(final_rounding.rstrip(\'0\'))\n            if num_sig_figs < sig_figs:\n                exponent_amount = len(final_rounding) - 1\n                rounded_number_prefix = final_rounding[0] + \'.\' + final_rounding[1:sig_figs]\n                final_rounding = rounded_number_prefix + \'E+\' + str(exponent_amount)\n    # Handle negative exponent.\n    elif exponent < 0:\n        final_rounding = \'0.\' + \'0\' * (-exponent - 1) + integers + decimals\n\n    if is_negative:\n        final_rounding = \'-\' + final_rounding\n\n    return final_rounding\n\ndef scientificNotation(value, sigFigs):\n    # Given a numerical value and a number of significant figures, return a scientific notation representing those parameters.\n    format = \'%.\' + str(sigFigs - 1) + \'E\'\n    return format % float(value)\n\ndef parens_if_negative(number):\n    \'\'\'Return the number as a string. If the number is negative, then add parens around the number.\'\'\'\n    return str(number) if number >= 0 else \'(%d)\' % number\n\ndef meanOfList(lst):\n    \'\'\'Return the mean of the values in the list\'\'\'\n    return float(sum(lst)) / len(lst)\n\ndef medianOfList(lst):\n    \'\'\'Return the median value in the given list\'\'\'\n    sorted_list = sorted(lst)\n    quotient, remainder = divmod(len(sorted_list), 2)\n    median = sorted_list[quotient]\n\n    # List has even number of elements, so average the center 2 elements.\n    if not remainder:\n        median = meanOfList(sorted_list[quotient - 1:quotient + 1])\n    return median\n\ndef stddevOfList(lst):\n    \'\'\'Return the standard deviation of a sample for a given list\'\'\'\n    meanValue = meanOfList(lst)\n    deviations = map(lambda x: (x - meanValue) ** 2, lst)\n    sumOfDeviations = float(sum(deviations))\n    return math.sqrt(sumOfDeviations / (len(lst) - 1))\n';

/**
    Return the number of lines of code.
    @method numberOfLinesOfCode
    @param {String} code The code from which to count the number of lines.
    @return {Number} The number of lines of code.
*/
function numberOfLinesOfCode(code) {
    return code.split('\n').length - 1;
}

/**
    Return the class name for the given type of element.
    @method getElementClassNameByType
    @param {String} type The type of element.
    @return {String} The class name of the type of element.
*/
function getElementClassNameByType(type) {
    var elementClassName = '';

    switch (type.toLowerCase()) {
        case 'dropdown':
            elementClassName = 'ElementDropdown';
            break;
        case 'image':
            elementClassName = 'ElementImage';
            break;
        case 'shortanswer':
            elementClassName = 'ElementShortAnswer';
            break;
        case 'text':
            elementClassName = 'ElementText';
            break;
        case 'table':
            elementClassName = 'ElementTable';
            break;
        case 'checkbox':
            elementClassName = 'ElementCheckbox';
            break;
        default:
            throw new Error('Unrecognized type: ' + type);
    }

    return elementClassName;
}

/**
    Return the function to create an element of type |type|.
    @method getElementClassByType
    @param {String} type The type of element.
    @return {Function} The element class constructor.
*/
function getElementClassByType(type) {
    var className = getElementClassNameByType(type);

    // Convert |className| to the class constructor of the same name.
    return eval(className); // eslint-disable-line no-eval
}

var colorEscapeDictionary = {};

/**
    Escape each property's value in |style|.
    @method escapeStyleValues
    @param {Object} style Each key is a property and each value is that property's value.
    @return {Object} Escaped styles
*/
function escapeStyleValues(style) {
    var escapedStyles = {};

    for (var property in style) {
        var newValue = style[property];

        for (var unescapedValue in colorEscapeDictionary) {
            if (typeof newValue === 'string') {
                var escapedValue = colorEscapeDictionary[unescapedValue];

                newValue = newValue.replace(unescapedValue, escapedValue);
            }
        }
        escapedStyles[property] = newValue;
    }
    return escapedStyles;
}

/**
    Add color definitions to |colorEscapeDictionary| from utilities zyTool.
    @method buildStyleEscapeDictionary
    @return {void}
*/
function buildStyleEscapeDictionary() {
    var utilities = require('utilities');

    colorEscapeDictionary = {
        'zyante-black': utilities.zyanteGray,
        'zyante-gray': '#9e9e9e',
        'zyante-dark-blue': utilities.zyanteDarkBlue
    };
}

/**
    Try to download an image from the list of URLs.
    @method downloadImage
    @param {Object} $image jQuery object reference to the image DOM.
    @param {Array} imageURLs The URLs to try, starting from index 0.
    @param {String} errorMessage The error message if non of the image URLs load.
    @return {void}
*/
function downloadImage($image, imageURLs, errorMessage) {
    $image.on('error', function () {
        if (imageURLs.length > 0) {
            imageURLs.shift();
            downloadImage($image, imageURLs, errorMessage);
        } else {
            $image.attr('alt', errorMessage);
        }
    }).attr('src', imageURLs[0]);
}

/**
    Replace each variable in |string| with that variable's value in |module|.
    @method replaceStringVariables
    @param {String} string The string that may have variables to replace.
    @param {Sk.module} module Skulpt Python module that has variables.
    @return {String} The string with variables updated with actual values.
*/
function replaceStringVariables(string, module) {

    // Handle single-variable names. Ex: ${catName} or ${xValue}
    var newString = string.replace(/\$\{(\w+)\}/g, function (match, variable) {
        var moduleVariable = module.tp$getattr(variable);

        return moduleVariable ? moduleVariable.v : match;
    });

    // Handle list look-up.
    newString = newString.replace(/\$\{(\w+)((\[\d+\])+)\}/g, function (match, listName, indicesString) {
        var listVariable = module.tp$getattr(listName);
        var returnValue = match;

        if (listVariable) {

            /*
                Convert |indicesString| to an array of integers.
                Ex: indicesString is '[0][1]'.
                substring removes the first [ and last ]. Keeping '0][1'
                split on '][' converts to array: [ '0', '1' ]
                map converts to array of integers: [ 0, 1 ]
            */
            var indices = indicesString.substring(1, indicesString.length - 1).split('][').map(function (index) {
                return parseInt(index, 10);
            });
            var listItemVariable = listVariable;

            // Advance each index.
            indices.forEach(function (index) {
                if (listItemVariable) {
                    listItemVariable = listItemVariable.v[index];
                }
            });

            if (listItemVariable) {
                returnValue = listItemVariable.v;
            }
        }

        return returnValue;
    });

    return newString;
}

/**
    Check if the passed variable in |string| is a two-dimensional list in |module|.
    @method isTwoDimensionalList
    @param {String} listName The string to check if is a two-dimensional list.
    @param {Sk.module} module Skulpt Python module that has variables.
    @return {Boolean} Wether |string| is a two-dimensional list in |module|.
*/
function isTwoDimensionalList(listName, module) {
    var listVariable = module.tp$getattr(listName);

    return listVariable.tp$name === 'list' && listVariable.v[0].tp$name === 'list';
}

/**
    Get the number of rows, columns and each value in the two-dimensional list |listName|.
    @method getTableDataFromList
    @param {String} listName The name of the list to replace.
    @param {Sk.module} module Skulpt Python module that has variables.
    @return {Object} An object containing the number of rows, columns and the content of each cell.
*/
function getTableDataFromList(listName, module) {
    var listVariable = module.tp$getattr(listName);

    return new TwoDimensionalList(listVariable);
}


exports.default = module.exports;
});