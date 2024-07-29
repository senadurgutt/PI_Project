document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const newUserBtn = document.getElementById("newUserBtn");
  const newUserModal = document.getElementById("newUserModal");
  const closeNewUser = document.getElementById("closeNewUser");
  const newUserForm = document.getElementById("newUserForm");

  const editUserModal = document.getElementById("editUserModal");
  const closeEditUser = document.getElementById("closeEditUser");
  const editUserForm = document.getElementById("editUserForm");

  const deleteUserModal = document.getElementById("deleteUserModal");
  const closeDeleteUser = document.getElementById("closeDeleteUser");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  const userList = document.getElementById("userList");
  const search = document.getElementById("search");

  // Functions to open and close modals
  function openModal(modal) {
    modal.style.display = "block";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  // Event listeners for opening modals
  newUserBtn.addEventListener("click", function () {
    openModal(newUserModal);
  });

  closeNewUser.addEventListener("click", function () {
    closeModal(newUserModal);
  });

  closeEditUser.addEventListener("click", function () {
    closeModal(editUserModal);
  });

  closeDeleteUser.addEventListener("click", function () {
    closeModal(deleteUserModal);
  });

  cancelDelete.addEventListener("click", function () {
    closeModal(deleteUserModal);
  });

  // Add user form submit
  newUserForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(newUserForm);
    const user = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      role: formData.get("role"),
    }; // Simulate backend request
    console.log("Adding user:", user);
    closeModal(newUserModal);
    newUserForm.reset();
  });

  // Edit user form submit
  editUserForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(editUserForm);
    const user = {
      id: document.getElementById("editUserId").value,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      role: formData.get("role"),
    };

    // Simulate backend request
    console.log("Editing user:", user);
    closeModal(editUserModal);
    editUserForm.reset();
  });

  // Confirm delete user
  confirmDelete.addEventListener("click", function () {
    const userId = confirmDelete.getAttribute("data-user-id");

    // Simulate backend request
    console.log("Deleting user with id:", userId);
    closeModal(deleteUserModal);
  });

  // Open edit user modal with user data
  function openEditUserModal(user) {
    document.getElementById("editUserId").value = user.id;
    document.getElementById("editFirstName").value = user.firstName;
    document.getElementById("editLastName").value = user.lastName;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editRole").value = user.role;

    openModal(editUserModal);
  }

  // Open delete user modal with user id
  function openDeleteUserModal(userId) {
    confirmDelete.setAttribute("data-user-id", userId);
    openModal(deleteUserModal);
  }

  // Render user list
  function renderUserList(users) {
    userList.innerHTML = "";

    users.forEach((user) => {
      const userRow = document.createElement("div");
      userRow.className = "user-row";
      userRow.innerHTML = `
                <span>${user.firstName} ${user.lastName}</span>
                <span>${user.email}</span>
                <span>${user.role}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

      userRow.querySelector(".edit-btn").addEventListener("click", function () {
        openEditUserModal(user);
      });

      userRow
        .querySelector(".delete-btn")
        .addEventListener("click", function () {
          openDeleteUserModal(user.id);
        });

      userList.appendChild(userRow);
    });
  }

  // Sample users
  const users = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "admin",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: "user",
    },
  ];

  // Initial render
  renderUserList(users);

  // Search users
  search.addEventListener("input", function () {
    const query = search.value.toLowerCase();
    const filteredUsers = users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });

    renderUserList(filteredUsers);
  });
});
