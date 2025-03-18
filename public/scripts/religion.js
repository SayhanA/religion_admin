document.addEventListener("DOMContentLoaded", function () {
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");
  const rowCheckboxes = document.querySelectorAll(".rowCheckbox");

  selectAllCheckbox.addEventListener("change", function () {
    rowCheckboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  rowCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      selectAllCheckbox.checked = [...rowCheckboxes].every((cb) => cb.checked);
    });
  });
});

//modal
document.addEventListener("DOMContentLoaded", function () {
  const updateModal = document.getElementById("updateModal");
  const closeModal = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const submitBtnText = document.getElementById("submitBtnText");
  const updateForm = document.getElementById("updateForm");
  const updateId = document.getElementById("updateId");
  const updateName = document.getElementById("updateName");
  const updateDescription = document.getElementById("updateDescription");
  const isActiveCheckbox = document.getElementById("isActive");

  document.querySelectorAll(".editButton").forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      const userName = this.getAttribute("data-name");
      const userDescription = this.getAttribute("data-description");
      const userStatus = this.getAttribute("data-status") === "true";

      updateId.value = userId;
      updateName.value = userName;
      updateDescription.value = userDescription;
      isActiveCheckbox.checked = userStatus;

      modalTitle.textContent = "Update Religion";
      submitBtnText.textContent = "Update";

      updateModal.classList.remove("hidden");
    });
  });

  document
    .getElementById("addNewReligionButton")
    ?.addEventListener("click", function () {
      updateId.value = "";
      updateName.value = "";
      updateDescription.value = "";
      isActiveCheckbox.checked = false;

      modalTitle.textContent = "Add New Religion";
      submitBtnText.textContent = "Add";

      updateModal.classList.remove("hidden");
    });

  closeModal.addEventListener("click", function () {
    updateModal.classList.add("hidden");
  });

  updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = {
      id: updateId.value,
      name: updateName.value,
      description: updateDescription.value,
      isActive: isActiveCheckbox.checked,
    };
    console.log("Form Data Submitted:", formData);
    this.submit();
  });
});
