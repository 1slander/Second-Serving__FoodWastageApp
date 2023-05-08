// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("FullStack_Project JS imported successfully!");
});

const modal = document.querySelector(`#modal`);
const openModal = document.querySelector(`.open-button`);
const closeModal = document.querySelector(`.close-button`);

// Open modal
openModal.addEventListener(`click`, () => {
  modal.showModal();
});

// Close modal
closeModal.addEventListener(`click`, () => {
  modal.close();
});
