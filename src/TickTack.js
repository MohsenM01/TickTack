/*
Author : Mohsen musavi
TickTack is a jQuery Time Picker
*/
(function ($) {

    var methods = {
        init: function (options) {

            var defaults = {
                initialTime: '',
                minHour: 8,
                minMinute: 0,
                maxHour: 20,
                maxMinute: 0
            };
            var options = $.extend(defaults, options);
            return this.each(function () {
                var o = options;
                o = methods.initTime($(this), o);
                var currentSelect = 0;
                $(this).attr("cells", "hour");
                $(this).attr("dig", "0");
                $(this).val(o.initialTime);

                $(this).focus(function () {
                    methods.selectCurrent($(this));
                });
                $(this).click(function () {
                    methods.selectCurrent($(this));
                });
                $(this).keydown(function (e) {
                    var cCode = e.keyCode;

                    if (cCode == 8) {
                        var selectCells = element.attr("cells");
                        var selectDig = element.attr("dig");
                        if (selectCells == "hour") {
                            if (selectDig == "0") {
                                $(this).attr("cells", "minute");
                                $(this).attr("dig", "1");
                            }
                            else if (selectDig == "1") {
                                $(this).attr("dig", "0");
                            }
                        }
                        else if (selectCells == "minute") {
                            if (selectDig == "0") {
                                $(this).attr("cells", "hour");
                                $(this).attr("dig", "1");
                            }
                            else if (selectDig == "1") {
                                $(this).attr("dig", "0");
                            }
                        }
                        methods.selectCurrent($(this));
                        if (window.event)
                            event.cancel = true;
                        else
                            e.preventDefault();
                        return false;
                    }
                    else if (cCode == 32) {
                        var selectCells = $(this).attr("cells");
                        var selectDig = $(this).attr("dig");
                        if (selectCells == "hour") {
                            if (selectDig == "0") {
                                $(this).attr("dig", "1");
                            }
                            else if (selectDig == "1") {
                                $(this).attr("cells", "minute");
                                $(this).attr("dig", "0");
                            }
                        }
                        else if (selectCells == "minute") {
                            if (selectDig == "0") {
                                $(this).attr("dig", "1");
                            }
                            else if (selectDig == "1") {
                                $(this).attr("cells", "hour");
                                $(this).attr("dig", "0");
                            }
                        }
                        methods.selectCurrent($(this));
                        if (window.event)
                            event.cancel = true;
                        else
                            e.preventDefault();
                        return false;
                    }
                    else if (cCode == 8 || cCode == 37) {
                        methods.selectBack($(this));
                        if (window.event)
                            event.cancel = true;
                        else
                            e.preventDefault();
                        return false;
                    }
                    else if (cCode == 39) {
                        methods.selectNext($(this));
                        if (window.event)
                            event.cancel = true;
                        else
                            e.preventDefault();
                        return false;
                    }
                    else if (cCode == 38) {
                        methods.addTime($(this), o, 1);
                        if (window.event)
                            event.cancel = true;
                        else
                            e.preventDefault();
                        return false;
                    }
                    else if (cCode == 40) {
                        methods.minusTime($(this), o, 1);
                        if (window.event)
                            event.cancel = true;
                        else
                            e.preventDefault();
                        return false;
                    }

                    if ((cCode > 47 && cCode < 58) || (cCode > 95 && cCode < 106)) {
                        if (cCode > 95 && cCode < 106) {
                            cCode -= 48;
                        }
                    }
                    else {
                        if (window.event)
                            event.cancel = true;
                        else
                            e.preventDefault();
                        return false;
                    }
                    var _number = String.fromCharCode(cCode);
                    methods.changeTime($(this), o, _number);
                    if (window.event)
                        event.cancel = true;
                    else
                        e.preventDefault();
                    return false;
                });
            });

        },
        initTime: function (element,options) {
            if (options.initialTime == "") {
                var _now = new Date();
                options.initialTime = methods.zeroPad(_now.getHours(), 10) + ":" + methods.zeroPad(_now.getMinutes(), 10);
            }
            var maxTime = new Date();
            maxTime.setHours(options.maxHour);
            maxTime.setMinutes(options.maxMinute);
            maxTime.setSeconds(0);

            var minTime = new Date();
            minTime.setHours(options.minHour);
            minTime.setMinutes(options.minMinute);
            minTime.setSeconds(0);


            var initTime = new Date();
            initTime.setHours(options.initialTime.split(":")[0]);
            initTime.setMinutes(options.initialTime.split(":")[1]);
            initTime.setSeconds(0);

            if (minTime > initTime) {
                initTime = minTime;
            }
            if (maxTime < initTime) {
                initTime = maxTime;
            }
            options.initialTime = methods.zeroPad(initTime.getHours(), 10) + ":" + methods.zeroPad(initTime.getMinutes(), 10);
            return options;
        },
        selectRange: function (element, start, end) {
            if (element.setSelectionRange) {
                element.focus();
                element.setSelectionRange(start, end);
            } else if (element.createTextRange) {
                var range = element.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        },
        selectCurrent: function (element) {
            var selectCells = element.attr("cells");
            if (selectCells == "hour") {
                methods.selectRange(element[0], 0, 2);
            }
            else if (selectCells == "minute") {
                methods.selectRange(element[0], 3, 5);
            }

        },
        selectNext: function (element) {

            var selectCells = element.attr("cells");
            element.attr("dig", "0");
            if (selectCells == "hour") {
                element.attr("cells", "minute");
                methods.selectRange(element[0], 3, 5);
            }
            else if (selectCells == "minute") {
                element.attr("cells", "hour");
                methods.selectRange(element[0], 0, 2);
            }

        },
        selectBack: function (element) {
            var selectCells = element.attr("cells");
            element.attr("dig", "0");
            if (selectCells == "hour") {
                element.attr("cells", "minute");
                methods.selectRange(element[0], 3, 5);
            }
            else if (selectCells == "minute") {
                element.attr("cells", "hour");
                methods.selectRange(element[0], 0, 2);
            }
        },
        addTime: function (element, options, unit) {

            var selectCells = element.attr("cells");
            var _hour = parseInt(element.val().substr(0, 2));
            var _minute = parseInt(element.val().substr(3, 5));
            var newTime = new Date();
            newTime.setHours(_hour);
            newTime.setMinutes(_minute);
            newTime.setSeconds(0);

            if (selectCells == "hour") {
                newTime.setHours(newTime.getHours() + unit);
            }
            else if (selectCells == "minute") {
                newTime.setMinutes(newTime.getMinutes() + unit);
            }
            methods.setTime(element, options, newTime);
        },
        minusTime: function (element, options, unit) {

            var selectCells = element.attr("cells");
            var _hour = parseInt(element.val().substr(0, 2));
            var _minute = parseInt(element.val().substr(3, 5));
            var newTime = new Date();
            newTime.setHours(_hour);
            newTime.setMinutes(_minute);
            newTime.setSeconds(0);

            if (selectCells == "hour") {
                newTime.setHours(newTime.getHours() - unit);
            }
            else if (selectCells == "minute") {
                newTime.setMinutes(newTime.getMinutes() - unit);
            }
            methods.setTime(element, options, newTime);
        },
        changeTime: function (element, options, _number) {
            _number = parseInt(_number);
            var selectCells = element.attr("cells");
            var selectDig = element.attr("dig");

            var _hour = parseInt(element.val().substr(0, 2));
            var _minute = parseInt(element.val().substr(3, 5));
            var newTime = new Date();
            newTime.setHours(_hour);
            newTime.setMinutes(_minute);
            newTime.setSeconds(0);

            var maxTime = new Date();
            maxTime.setHours(options.maxHour);
            maxTime.setMinutes(options.maxMinute);
            maxTime.setSeconds(0);

            var minTime = new Date();
            minTime.setHours(options.minHour);
            minTime.setMinutes(options.minMinute);
            minTime.setSeconds(0);

            if (selectCells == "hour") {
                var _1Hour = parseInt(element.val().substr(0, 1));
                var _2Hour = parseInt(element.val().substr(1, 1));
                var newHour = parseInt(element.val().substr(0, 2));
                if (selectDig == "0") {
                    newHour = (_number * 10) + _2Hour;
                    element.attr("dig", "1");
                }
                else if (selectDig == "1") {
                    newHour = (_1Hour * 10) + _number;
                    element.attr("dig", "0");
                    element.attr("cells", "minute");
                }
                if (newHour > 23) {
                    newHour = 23;
                }
                newTime.setHours(newHour);

            }
            else if (selectCells == "minute") {
                var _1Minute = parseInt(element.val().substr(3, 1));
                var _2Minute = parseInt(element.val().substr(4, 1));
                var newMinute = parseInt(element.val().substr(3, 2));
                if (selectDig == "0") {
                    newMinute = (_number * 10) + _2Minute;
                    element.attr("dig", "1");
                }
                else if (selectDig == "1") {
                    newMinute = (_1Minute * 10) + _number;
                    element.attr("dig", "0");
                    element.attr("cells", "hour");
                }
                if (newMinute > 59) {
                    newMinute = 59;
                }
                newTime.setMinutes(newMinute);
            }
            if (newTime > maxTime) {
                if (newTime.getHours() > maxTime.getHours()) {
                    newTime.setHours(maxTime.getHours());
                }
                if (newTime > maxTime) {
                    if (newTime.getMinutes() > maxTime.getMinutes()) {
                        newTime.setMinutes(maxTime.getMinutes());
                    }
                }
            }
            if (newTime < minTime) {
                if (newTime.getHours() < minTime.getHours()) {
                    newTime.setHours(minTime.getHours());
                }
                if (newTime < minTime) {
                    if (newTime.getMinutes() > minTime.getMinutes()) {
                        newTime.setMinutes(minTime.getMinutes());
                    }
                }
            }
            methods.setTime(element, options, newTime);
        },
        setTime: function (element, options, newTime) {
            var maxTime = new Date();
            maxTime.setHours(options.maxHour);
            maxTime.setMinutes(options.maxMinute);
            maxTime.setSeconds(0);

            var minTime = new Date();
            minTime.setHours(options.minHour);
            minTime.setMinutes(options.minMinute);
            minTime.setSeconds(0);

            if ((maxTime >= newTime) && (minTime <= newTime)) {
                var selectCells = element.attr("cells");
                element.val(methods.zeroPad(newTime.getHours(), 10) + ":" + methods.zeroPad(newTime.getMinutes(), 10));
                methods.selectCurrent(element);
            }

        },
        zeroPad: function (_number, base) {
            var len = (String(base).length - String(_number).length) + 1;
            return len > 0 ? new Array(len).join('0') + _number : _number;
        }
    };

    $.fn.TickTack = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }

    };

})(jQuery);