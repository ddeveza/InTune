import moment from "moment";
import { customAlphabet } from "nanoid";
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 10);

export function prNanoid() {
  return nanoid();
}

export function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

export function dateRange(startDate, endDate) {
  let start = startDate.split("-");
  let end = endDate.split("-");
  let startYear = parseInt(start[0]);
  let endYear = parseInt(end[0]);
  let dates = [];

  for (let i = startYear; i <= endYear; i++) {
    let endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
    let startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      let month = j + 1;
      let displayMonth = month < 10 ? "0" + month : month;
      dates.push(toShortDate([i, displayMonth, "01"].join("-")));
    }
  }
  return dates;
}

export const mW = (min = 1, max = 5) => {
  return {
    minWidth: `${min}em`,
    maxWidth: `${max}em`,
  };
};

export const mH = (min = 1, max = 5) => {
  return {
    minHeight: `${min}em`,
    maxHeight: `${max}em`,
  };
};

export const addDays = (days) => {
  if (!days) return;
  return moment(new Date()).add(days, "d").format("YYYY-MM-DD");
};

export const nextDay = (date) => {
  if (!date) return;
  date = sDate(date);
  return moment(date).add(1, "d").format("DD-MMM-yyyy");
};

export const toDate = (date) => {
  if (!date) return;
  date = new Date(date);
  return moment(date).format("DD-MMM-yyyy");
};

export const toShortDate = (date) => {
  if (!date) return;
  date = new Date(date);
  return moment(date).format("MMM-yyyy");
};

export const toDigitDate = (date) => {
  if (!date) return;
  date = new Date(date);
  return moment(date).format("yyyy-MM-DD");
};

export const toConcatDate = (date) => {
  if (!date) return;
  date = new Date(date);
  return moment(date).format("DDMMyy");
};

export const toSqlDate = (date) => {
  if (!date) return;
  date = new Date(date);
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const sDate = (date) => {
  if (!date) return;
  const newDate = new Date(toDate(date));
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const eDate = (date) => {
  if (!date) return;
  const newDate = new Date(toDate(date));
  newDate.setHours(23, 59, 59, 59);
  return newDate;
};

export const toFullDateTime = (date) => {
  if (!date) return;
  date = new Date(date);
  return moment(date).format("DD-MMM-yyyy hh:mma");
};

export const toIsoDate = (date) => {
  if (!date) return;
  date = new Date(date);
  return moment(date).toISOString();
};

export const sortBurnDown = (items) => {
  return items.sort((a, b) => {
    return a.index > b.index ? 1 : a.index < b.index ? -1 : 0;
  });
};

export const timePast = (lastCheckDate) => {
  if (!lastCheckDate) return;
  const ms = moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(moment(new Date(lastCheckDate), "DD/MM/YYYY HH:mm:ss"));
  const d = moment.duration(ms).asMinutes();
  //const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
  return Math.floor(d);
};

export const daysRemaining = (expiryDate) => {
  if (!expiryDate) return;
  const ms = moment(new Date(expiryDate), "DD/MM/YYYY").diff(moment(new Date(), "DD/MM/YYYY"));
  const d = moment.duration(ms).asDays();
  //const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
  return Math.floor(d);
};

export function toCurrency(input) {
  // If the regex doesn't match, `replace` returns the string unmodified
  return input.toString().replace(
    // Each parentheses group (or 'capture') in this regex becomes an argument
    // to the function; in this case, every argument after 'match'
    /^([-+]?)(0?)(\d+)(.?)(\d+)$/g,
    function (match, sign, zeros, before, decimal, after) {
      // Less obtrusive than adding 'reverse' method on all strings
      var reverseString = function (string) {
        return string.split("").reverse().join("");
      };

      // Insert commas every three characters from the right
      var insertCommas = function (string) {
        // Reverse, because it's easier to do things from the left
        var reversed = reverseString(string);

        // Add commas every three characters
        var reversedWithCommas = reversed.match(/.{1,3}/g).join(",");

        // Reverse again (back to normal)
        return reverseString(reversedWithCommas);
      };

      // If there was no decimal, the last capture grabs the final digit, so
      // we have to put it back together with the 'before' substring
      return sign + (decimal ? insertCommas(before) + decimal + after : insertCommas(before + after));
    }
  );
}

export function throttle(callback, limit) {
  var waiting = false; // Initially, we're not waiting
  return function () {
    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      callback.apply(this, arguments); // Execute users function
      waiting = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false; // And allow future invocations
      }, limit);
    }
  };
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export const compArray = (newArray, origArray, newKey, origKey, returnFullArray = false, returnWhichArrayInBoth = 0) => {
  const nArray = newArray?.map((data) => {
    return data[newKey];
  });
  const oArray = origArray?.map((data) => {
    return data[origKey];
  });
  let forRemoval = oArray.filter((value) => !nArray.includes(value));
  let forAdding = nArray.filter((value) => !oArray.includes(value));
  let inBoth = nArray;
  if (nArray.length > oArray.length) {
    inBoth = oArray.filter((value) => nArray.includes(value));
  } else if (nArray.length < oArray.length) {
    inBoth = nArray.filter((value) => oArray.includes(value));
  }
  if (returnFullArray) {
    forRemoval = origArray.filter((data) => !nArray.includes(data[origKey]));
    forAdding = newArray.filter((data) => !oArray.includes(data[newKey]));
    if (returnWhichArrayInBoth === 1) {
      inBoth = newArray.filter((data) => inBoth.includes(data[newKey]));
    } else if (returnWhichArrayInBoth === 2) {
      inBoth = origArray.filter((data) => inBoth.includes(data[origKey]));
    } else {
      if (nArray.length > oArray.length) {
        inBoth = origArray.filter((data) => inBoth.includes(data[origKey]));
      } else if (nArray.length < oArray.length) {
        inBoth = newArray.filter((data) => inBoth.includes(data[newKey]));
      }
    }
  }
  return { forRemoval: forRemoval, forAdding: forAdding, inBoth: inBoth };
};

export const isEqual = (value, other) => {
  // Get the value type
  let type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  let valueLen = type === "[object Array]" ? value.length : Object.keys(value).length;
  let otherLen = type === "[object Array]" ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  const compare = (item1, item2) => {
    // Get the object type
    let itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };

  // Compare properties
  if (type === "[object Array]") {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
};

export function isColorLight(color) {
  if (!color) return;
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const imgPlaceHolder =
  "data:image/png;base64,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";

//export const baseApiURL = `https://ppmone-api.bworx.org/api/v1`;
//export const baseURL = `https://my.ppm.one/`;

export const baseApiURL = window.location.href.includes("localhost") ? `http://localhost:3003/api/v1` : `https://becloudsafe-api.ppm.one/api/v1`;
export const baseURL = window.location.href.includes("localhost") ? `http://localhost:3000` : "https://orange-forest-0b82bff10.1.azurestaticapps.net";
