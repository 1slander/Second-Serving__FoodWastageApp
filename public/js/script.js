// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("FullStack_Project JS imported successfully!");
});

const modal = document.querySelectorAll(`.modal`);
const openModal = document.querySelectorAll(`.open-button`);
const closeModal = document.querySelectorAll(`.close-button`);

//open Modal
openModal.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    const buttonId = e.target.getAttribute("id");
    const rightModal = [...modal].filter((el) => {
      const modalId = el.getAttribute("id");
      return buttonId === modalId;
    });
    rightModal[0].showModal();
  });
});

// Close modal
closeModal.forEach((button) => {
  button.addEventListener(`click`, () => {
    modal.forEach((el) => el.close());
  });
});
