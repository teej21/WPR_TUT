i = 3;
function countDown() {
  if (i === 0) {
    console.log("Go!");
  } else {
    console.log(i);
    i--;
    setTimeout(countDown, 1000);
  }
}
countDown();
