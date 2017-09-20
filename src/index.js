module.exports = function zeros(expression) {
  var r1 = /\d+\!\!/g, r2 = /d+\!/g;

  var doubleFactor = expression.match(r1);
  expression.replace(r1, '');

  var res1 = doubleFactor.length ? doubleFactor.reduce(function (prev, next) {
    return multiply(factorialDouble(parseInt(prev), factorialDouble(parseInt(next))));
  }, 0) : '1';

  var singleFactor = expression.match(r2);

  var res2 = singleFactor.length ? singleFactor.reduce(function (prev, next) {
    return multiply(factorialSingle(parseInt(prev), factorialSingle(parseInt(next))));
  }, 0) : '1';

  var finishRes = multiply('res1', 'res2');

  var zeros = finishRes.match(/0/g);

  return zeros.length;
}

function factorialSingle (num) {
  if (num === '1') { return '1'; }

  return multiply(num, factorialSingle((+num - 1) + ''));
}

function factorialDouble (num) {
  if (num === '1') { return '1'; }
  if (num === '2') { return '2'; }

  return multiply(num, factorialDouble((+num - 2) + ''));
}

function multiply(first, second) {
  var result = '', results = [];

  if (first.length > second.length) {
    var temp = second; second = first; first = temp;
  }

  for (var i = 0, len = first.length; i < len; i++) {
    result = simpleMultiply( second, parseInt(first[len - 1 - i]) ) + repeatZeros(i);

    results.push(result);
  }

  return results.reduce(function (prev, next) {
    return sum(prev, next);
  });
}

function simpleMultiply (num, factor) {
  var result = '', midRes = 0, mem = 0;

  for (var i = 0, len = num.length; i < len; i++) {
    midRes = +num[len - 1 - i] * factor + mem;

    if (midRes > 9) {
      mem = Math.floor(midRes / 10);
      midRes = midRes % 10;
    } else {
      mem = 0;
    }

    result = midRes + result;
  }

  if (mem) { result = mem + result; }

  return result;
}

function sum(num1, num2) {
  var sum = 0, mem = 0, result = '', len1 = num1.length, len2 = num2.length;

  if (len1 > len2) {
    num2 = repeatZeros(len1 - len2) + num2;
  } else if (len2 > len1) {
    num1 = repeatZeros(len2 - len1) + num1;
  }

  for (var i = 0, len = num1.length; i < len; i++) {
    sum = +num1[len - 1 - i] + +num2[len - 1 - i] + mem;

    if (sum > 9) {
      mem = 1; sum = sum - 10;
    } else {
      mem = 0;
    }

    result = sum + result;
  }

  if (mem) { result = mem + result; }

  return result;
}

function repeatZeros (count) {
  return new Array(count + 1).join('0');
}
