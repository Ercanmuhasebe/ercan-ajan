let count = 0;

const countText = document.querySelector("#count");
const messageText = document.querySelector("#message");
const increaseButton = document.querySelector("#increaseButton");
const resetButton = document.querySelector("#resetButton");

function showCount() {
  countText.textContent = count;
}

increaseButton.addEventListener("click", function () {
  count = count + 5;
  showCount();
  messageText.textContent = `Dugmeye ${count} kez bastiniz.`;
});

resetButton.addEventListener("click", function () {
  count = 0;
  showCount();
  messageText.textContent = "Sayac sifirlandi.";
});
