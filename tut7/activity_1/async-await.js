"use strict";
(function () {
  window.addEventListener("load", init);

  function init() {
    m3().then(m1).then(m2).then(console.log).catch(console.error);
  }

  function m1(value) {
    console.log(3);
    return value + " lemon squeezy!";
  }

  function m2(value) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        console.log(2);
        resolve(value + " I'm gettin the hang of it now");
      }, 2000);
    });
  }

  function m3() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        console.log(1);
        resolve("easy peasy");
      }, 1000);
    });
  }
});

(function () {
  window.onload = init;
  async function init() {
    try {
      const result1 = await m3();
      const result2 = await m2(result1);
      const result3 = await m1(result2);
      console.log(result3);
    } catch {
      console.log("error");
    }
  }

  async function m3() {
    return new Promise((resolve) => {
      setTimeout(function () {
        console.log(1);
        resolve("easy peasy");
      }, 1000);
    });
  }
  async function m2(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(2);
        resolve(value + " I'm gettin the hang of it now");
      });
    });
  }
  async function m1(value) {
    console.log(3);
    return value + " lemon squeezy!";
  }
})();
