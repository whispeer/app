"use strict";

var sortedSet = function (sortFunction) {
    var arr = [];

    arr.clear = function () {
        arr.length = 0;
    };

    arr.push = function () {
        Array.prototype.push.apply(this, arguments);
        this.resort();
    };

    arr.remove = function (element) {
        var index = Array.prototype.indexOf.call(this, element);

        if (index > -1) {
            Array.prototype.splice.call(this, index, 1);
        }
    };

    arr.join = function (elements) {
        Array.prototype.push.apply(this, elements);
        this.resort();
    };

    arr.resort = function () {
        this.sort(sortFunction);
    };

    arr.last = function () {
        return arr[arr.length - 1];
    };

    return arr;
};

module.exports = sortedSet;
