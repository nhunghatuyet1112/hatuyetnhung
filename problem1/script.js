var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
};

var sum_to_n_c = function (n) {
  let sum = 0;
  while (n > 0) {
    sum += n;
    n--;
  }
  return sum;
};

const result = sum_to_n_a(3);
document.getElementById("result").innerHTML = result;
