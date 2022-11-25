import moment from 'moment-jalaali';

import { noteOnce } from "rc-util/es/warning";
var generateConfig = {
  getNow: function getNow() {
    return moment();
  },
  getFixedDate: function getFixedDate(string) {
    return moment(string, 'jYYYY-jMM-jDD');
  },
  getEndDate: function getEndDate(date) {
    var clone = date.clone();
    return clone.endOf('jMonth');
  },
  getWeekDay: function getWeekDay(date) {
    var clone = date.clone().locale('en_US');
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: function getYear(date) {
    return moment(date).jYear();
  },
  getMonth: function getMonth(date) {
    return moment(date).jMonth();
  },
  getDate: function getDate(date) {
    return moment(date).jDate();
  },
  getHour: function getHour(date) {
    return date.hour();
  },
  getMinute: function getMinute(date) {
    return date.minute();
  },
  getSecond: function getSecond(date) {
    return date.second();
  },
  addYear: function addYear(date, diff) {
    var clone = date.clone();
    return clone.add(diff, 'jYear');
  },
  addMonth: function addMonth(date, diff) {
    var clone = date.clone();
    return clone.add(diff, 'jMonth');
  },
  addDate: function addDate(date, diff) {
    var clone = date.clone();
    return clone.add(diff, 'day');
  },
  setYear: function setYear(date, year) {
    var clone = date.clone();
    return clone.jYear(year);
  },
  setMonth: function setMonth(date, month) {
    var clone = date.clone();
    return clone.jMonth(month);
  },
  setDate: function setDate(date, num) {
    var clone = date.clone();
    return clone.jDate(num);
  },
  setHour: function setHour(date, hour) {
    var clone = date.clone();
    return clone.hour(hour);
  },
  setMinute: function setMinute(date, minute) {
    var clone = date.clone();
    return clone.minute(minute);
  },
  setSecond: function setSecond(date, second) {
    var clone = date.clone();
    return clone.second(second);
  },
  isAfter: function isAfter(date1, date2) {
    return date1.isAfter(date2);
  },
  isValidate: function isValidate(date) {
    return date.isValid();
  },
  locale: {
    getWeekFirstDay: function getWeekFirstDay(locale) {
      var date = moment().locale(locale);
      return date.localeData().firstDayOfWeek();
    },
    getWeekFirstDate: function getWeekFirstDate(locale, date) {
      var clone = date.clone();
      var result = clone.locale(locale);
      return result.weekday(0);
    },
    getWeek: function getWeek(locale, date) {
      var clone = date.clone();
      var result = clone.locale(locale);
      return result.week();
    },
    getShortWeekDays: function getShortWeekDays(locale) {
      var date = moment().locale(locale);
      return date.localeData().weekdaysMin();
    },

    format: function format(locale, date, _format) {
      if (_format === "YYYY") _format = "jYYYY"
      if (_format === "YYYY-MM-DD") _format = "jYYYY/jMM/jDD"
      if (_format === "YYYY-MM-DD HH:mm:ss") _format = "jYYYY/jMM/jDD  HH:mm:ss"
      if (_format === "YYYY-MM-DD HH:mm") _format = "jYYYY/jMM/jDD  HH:mm"
      var clone = date.clone();
      var result = clone.locale(locale);
      return result.format(_format);
    },
    parse: function parse(locale, text, formats) {
      var fallbackFormatList = [];
      for (var i = 0; i < formats.length; i += 1) {
        var format = formats[i];
        var formatText = text;
        if (format.includes('wo') || format.includes('Wo')) {
          format = format.replace(/wo/g, 'w').replace(/Wo/g, 'W');
          var matchFormat = format.match(/[-YyMmDdHhSsWwGg]+/g);
          var matchText = formatText.match(/[-\d]+/g);

          if (matchFormat && matchText) {
            format = matchFormat.join('');
            formatText = matchText.join('');
          } else {
            fallbackFormatList.push(format.replace(/o/g, ''));
          }
        }
        var date = moment(formatText, format, locale, true);
        if (date.isValid()) {
          return date;
        }
      } 
      for (var _i = 0; _i < fallbackFormatList.length; _i += 1) {
        var _date = moment(text, fallbackFormatList[_i], locale, false);
        if (_date.isValid()) {
          noteOnce(false, 'Not match any format strictly and fallback to fuzzy match. Please help to fire a issue about this.');
          return _date;
        }
      }
      return null;
    }
  }
};
export default generateConfig;
