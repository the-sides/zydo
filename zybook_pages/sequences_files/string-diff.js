define('zycommon-web/assets/web-workers/string-diff', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = stringDiff;
    var MAX_DIFF_LENGTH = 20000;

    /**
       Returns a levenshtein table for the two passed in strings as a 2d array.
       @method generateLevenshteinTable
       @param {String} alpha First string.
       @param {String} beta  Second String.
       @param {Boolean} ignoreCase Whether or not capitalization should be ignored.
       @return {Array} 2D array representing edit distance.
    */
    var generateLevenshteinTable = function generateLevenshteinTable(alpha, beta, ignoreCase) {
        var alphaString = ignoreCase ? alpha.toLowerCase() : alpha;
        var betaString = ignoreCase ? beta.toLowerCase() : beta;

        if (alphaString.length === 0) {
            return betaString.length;
        }
        if (betaString.length === 0) {
            return alphaString.length;
        }

        var matrix = [];

        // Increment along the first column of each row.
        for (var i = 0; i <= betaString.length; i++) {
            // eslint-disable-line id-length
            matrix[i] = [i];
        }

        // Increment each column in the first row.
        for (var j = 0; j <= alphaString.length; j++) {
            // eslint-disable-line id-length
            matrix[0][j] = j;
        }

        var SUBSTITUTION_COST = 1;
        var INSERTION_COST = 1;
        var DELETION_COST = 1;

        // Fill in the rest of the matrix.
        for (var _i = 1; _i <= betaString.length; _i++) {
            // eslint-disable-line id-length
            for (var _j = 1; _j <= alphaString.length; _j++) {
                // eslint-disable-line id-length
                if (betaString.charAt(_i - 1) === alphaString.charAt(_j - 1)) {
                    matrix[_i][_j] = matrix[_i - 1][_j - 1];
                } else {
                    matrix[_i][_j] = Math.min(matrix[_i - 1][_j - 1] + SUBSTITUTION_COST, Math.min(matrix[_i][_j - 1] + INSERTION_COST, matrix[_i - 1][_j] + DELETION_COST));
                }
            }
        }

        return matrix;
    };

    /**
       Given the two strings |a| and |b|, returns the indices in each string
       that should be highlighted in a render of their levenshtein distance.
       @method stringDiff
       @param {String} alpha First string.
       @param {String} beta Second String.
       @param {Boolean} ignoreCase Whether or not capitalization should be ignored.
       @param {Boolean} ignoreWhiteSpace Whether or not white space should be ignored.
       @return {Object}
    */
    function stringDiff(alpha, beta, ignoreCase, ignoreWhiteSpace) {
        // eslint-disable-line complexity

        if (!alpha || !beta) {
            return {
                expectedAnswerIndicies: [],
                userAnswerIndicies: []
            };
        }

        // Cap the size of the strings to diff, since generating a Levenshtein table on large
        // strings is very expensive.
        var stringA = alpha.slice(0, MAX_DIFF_LENGTH);
        var stringB = beta.slice(0, MAX_DIFF_LENGTH);

        // Create offset mapping for no space to space versions of a and b strings.
        var aNoSpaceToSpaceMapping = new Array(stringA.length);
        var bNoSpaceToSpaceMapping = new Array(stringB.length);

        // Remove whitespace from strings a and b before Levenshtein; then adjust output indices for spaces.
        if (ignoreWhiteSpace) {
            for (var aSpaceCount = 0, _i2 = 0; _i2 < stringA.length; _i2++) {
                // eslint-disable-line id-length
                if (stringA.charAt(_i2).match(/\s+/)) {
                    aSpaceCount++;

                    for (var x = aSpaceCount - 1; x > 0; x--) {
                        // eslint-disable-line id-length
                        aNoSpaceToSpaceMapping[_i2 - x] = aSpaceCount;
                    }
                }
                aNoSpaceToSpaceMapping[_i2] = aSpaceCount;
            }

            for (var bSpaceCount = 0, _j2 = 0; _j2 < stringB.length; _j2++) {
                // eslint-disable-line id-length
                if (stringB.charAt(_j2).match(/\s+/)) {
                    bSpaceCount++;

                    for (var y = bSpaceCount - 1; y > 0; y--) {
                        // eslint-disable-line id-length
                        bNoSpaceToSpaceMapping[_j2 - y] = bSpaceCount;
                    }
                }
                bNoSpaceToSpaceMapping[_j2] = bSpaceCount;
            }

            // Remove whitespace from a and b; before computing Levenshtein.
            stringA = stringA.replace(/\s+/g, '');
            stringB = stringB.replace(/\s+/g, '');
        }

        var levenshteinTable = generateLevenshteinTable(stringA, stringB, ignoreCase);

        var aIndices = [];
        var bIndices = [];

        // Walk backwards through the levenshtein table and generate the highlighted indices for each string.
        var i = stringB.length; // eslint-disable-line id-length
        var j = stringA.length; // eslint-disable-line id-length

        while (i > 0 && j > 0) {

            // Calculate if the cheapest path goes diagonally, up, or left from the
            // current position.
            var currentCost = levenshteinTable[i][j];
            var diagonalCostDiff = currentCost - levenshteinTable[i - 1][j - 1];
            var upCostDiff = currentCost - levenshteinTable[i - 1][j];
            var leftCostDiff = currentCost - levenshteinTable[i][j - 1];
            var largestDiff = Math.max(diagonalCostDiff, Math.max(upCostDiff, leftCostDiff));

            if (largestDiff === diagonalCostDiff) {

                // The cheapest path goes diagonally. If there was a cost increase, this
                // was a substitution, so highlight this index. Otherwise, the characters
                // were the same.
                i--;
                j--;

                if (largestDiff !== 0) {
                    aIndices.push(j);
                    bIndices.push(i);
                }
            } else if (largestDiff === upCostDiff) {

                // The cheapest path goes up, so highlight this index in the b string.
                i--;

                bIndices.push(i);
            } else {

                // The cheapest path goes left, so highlight this index in the a string.
                j--;

                aIndices.push(j);
            }
        }

        // The a string was shorter than the b string, so highlight the
        // remaining characters of the b string.
        while (i > 0) {
            i--;
            bIndices.push(i);
        }

        // The b string was shorter than the a string, so highlight the
        // remaining characters of the a string.
        while (j > 0) {
            j--;
            aIndices.push(j);
        }

        // If we ignored whitespaces, we must adjust output indices for whitespaces.
        if (ignoreWhiteSpace) {

            // Adjust indices from offset mapping for a and b indices.
            aIndices = aIndices.map(function (index) {
                return index + aNoSpaceToSpaceMapping[index];
            });
            bIndices = bIndices.map(function (index) {
                return index + bNoSpaceToSpaceMapping[index];
            });
        }

        return {
            expectedAnswerIndicies: aIndices,
            userAnswerIndicies: bIndices
        };
    }

    // Function to be invoked if web worker version of stringDiff is needed.
    self.onmessage = function (event) {
        // eslint-disable-line no-undef
        if (typeof DedicatedWorkerGlobalScope !== 'undefined' && self instanceof DedicatedWorkerGlobalScope) {
            var _stringDiff = stringDiff(event.data[0], event.data[1], event.data[2], event.data[3]),
                expectedAnswerIndicies = _stringDiff.expectedAnswerIndicies,
                userAnswerIndicies = _stringDiff.userAnswerIndicies;

            // eslint-disable-line no-magic-numbers

            self.postMessage({ // eslint-disable-line no-undef
                expectedAnswerIndicies: expectedAnswerIndicies,
                userAnswerIndicies: userAnswerIndicies
            });
            self.close(); // eslint-disable-line no-undef
        }
    };
});