i = 3;

a = setInterval(() => {
  if (i === 0) {
    console.log("Go!");
    clearInterval(a);
  } else {
    console.log(i);
  }
  i--;
}, 1000);
console.log(a);
