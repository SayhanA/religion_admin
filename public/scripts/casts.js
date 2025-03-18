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

document.addEventListener("DOMContentLoaded", function () {
  const updateModal = document.getElementById("updateModal");
  const closeModal = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const submitBtnText = document.getElementById("submitBtnText");
  const updateForm = document.getElementById("updateForm");
  const updateId = document.getElementById("updateId");
  const updateName = document.getElementById("updateName");
  const updateDescription = document.getElementById("updateDescription");
  const religionSelect = document.getElementById("religionId");

  document.querySelectorAll(".editButton").forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      const userName = this.getAttribute("data-name");
      const userDescription = this.getAttribute("data-description");
      const userReligionId = this.getAttribute("data-religion-id");

      updateId.value = userId;
      updateName.value = userName;
      updateDescription.value = userDescription;
      religionSelect.value = userReligionId;

      modalTitle.textContent = "Update Religion";
      submitBtnText.textContent = "Update";
      updateModal.classList.remove("hidden");
    });
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
      religionId: religionSelect.value,
    };
    console.log("Form Data Submitted:", formData);
    this.submit();
  });
});

//Delete One by Id Modal
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll("#casteDeleteOne");
  const modal = document.getElementById("deleteModal");
  const cancelDelete = document.getElementById("cancelDelete");
  const confirmDelete = document.getElementById("confirmDelete");
  const casteNameElement = document.getElementById("casteName");

  let deleteId = "";

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      deleteId = this.dataset.id;
      const casteName = this.dataset.name;

      casteNameElement.textContent = casteName;
      modal.classList.remove("hidden");
    });
  });

  cancelDelete.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  confirmDelete.addEventListener("click", function () {
    fetch(`/admin/castes/delete?id=${deleteId}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          alert("Failed to delete caste");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    modal.classList.add("hidden");
  });
});

