/* Shared site interactions. This file is intended to remain bug-free. */
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  if (sidebar && menuToggle) {
    menuToggle.addEventListener("click", () => sidebar.classList.toggle("sidebar-open"));
    document.addEventListener("click", (event) => {
      if (window.innerWidth <= 800 && sidebar.classList.contains("sidebar-open") &&
        !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove("sidebar-open");
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const studentId = document.getElementById("studentId").value.trim();
      const password = document.getElementById("password").value;
      const message = document.getElementById("loginMessage");
      if (!studentId || !password) {
        message.textContent = "Please enter your student ID and password.";
        message.className = "form-message error";
        return;
      }
      message.textContent = "Demo sign-in successful. Opening your dashboard…";
      message.className = "form-message success";
      window.setTimeout(() => { window.location.href = "dashboard.html"; }, 450);
    });
  }

  const togglePassword = document.getElementById("togglePassword");
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const password = document.getElementById("password");
      const showing = password.type === "text";
      password.type = showing ? "password" : "text";
      togglePassword.textContent = showing ? "Show" : "Hide";
      togglePassword.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });
  }

  const forgotPassword = document.getElementById("forgotPassword");
  if (forgotPassword) forgotPassword.addEventListener("click", () => {
    const message = document.getElementById("loginMessage");
    message.textContent = "Please contact your college administration to reset your password.";
    message.className = "form-message";
  });

  const leaveForm = document.getElementById("leaveForm");
  if (leaveForm) {
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    startDate.min = localToday;
    endDate.min = localToday;
    startDate.addEventListener("change", () => { endDate.min = startDate.value || localToday; });
    leaveForm.addEventListener("reset", () => {
      window.setTimeout(() => { document.getElementById("leaveMessage").textContent = ""; }, 0);
    });
    leaveForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.getElementById("leaveMessage");
      if (startDate.value && endDate.value && endDate.value < startDate.value) {
        message.textContent = "End date must be on or after the start date.";
        message.className = "form-message error";
        endDate.focus();
        return;
      }
      const file = document.getElementById("document").files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        message.textContent = "The supporting document must be 5 MB or smaller.";
        message.className = "form-message error";
        return;
      }
      message.textContent = "Your demo application has been submitted successfully.";
      message.className = "form-message success";
      leaveForm.querySelector('button[type="submit"]').disabled = true;
      window.setTimeout(() => { leaveForm.querySelector('button[type="submit"]').disabled = false; }, 1600);
    });
  }

  const historySearch = document.getElementById("historySearch");
  const statusFilter = document.getElementById("statusFilter");
  const historyTable = document.getElementById("historyTable");
  if (historyTable && historySearch && statusFilter) {
    const filterHistory = () => {
      const query = historySearch.value.trim().toLowerCase();
      const status = statusFilter.value;
      let visibleCount = 0;
      historyTable.querySelectorAll("tbody tr").forEach((row) => {
        const matchesQuery = row.textContent.toLowerCase().includes(query);
        const matchesStatus = status === "all" || row.dataset.status === status;
        const visible = matchesQuery && matchesStatus;
        row.hidden = !visible;
        if (visible) visibleCount++;
      });
      document.getElementById("noResults").hidden = visibleCount !== 0;
    };
    historySearch.addEventListener("input", filterHistory);
    statusFilter.addEventListener("change", filterHistory);
  }

  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    const editButton = document.getElementById("editProfile");
    const actions = document.getElementById("profileActions");
    const inputs = profileForm.querySelectorAll("input");
    const originalValues = new Map(Array.from(inputs, input => [input, input.value]));
    editButton.addEventListener("click", () => {
      inputs.forEach(input => { input.readOnly = false; });
      actions.hidden = false;
      editButton.hidden = true;
      inputs[0].focus();
    });
    document.getElementById("cancelEdit").addEventListener("click", () => {
      inputs.forEach(input => { input.value = originalValues.get(input); input.readOnly = true; });
      actions.hidden = true;
      editButton.hidden = false;
      document.getElementById("profileMessage").textContent = "";
    });
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      inputs.forEach(input => { input.readOnly = true; originalValues.set(input, input.value); });
      actions.hidden = true;
      editButton.hidden = false;
      document.getElementById("profileMessage").textContent = "Profile changes saved for this demo.";
      document.getElementById("profileMessage").className = "form-message success";
    });
  }

  const noticeSearch = document.getElementById("noticeSearch");
  const noticeGrid = document.getElementById("noticeGrid");
  if (noticeSearch && noticeGrid) {
    const filterNotices = () => {
      const query = noticeSearch.value.trim().toLowerCase();
      let visibleCount = 0;
      noticeGrid.querySelectorAll(".notice-card").forEach(card => {
        const visible = card.textContent.toLowerCase().includes(query);
        card.hidden = !visible;
        if (visible) visibleCount++;
      });
      document.getElementById("noticeNoResults").hidden = visibleCount !== 0;
    };
    noticeSearch.addEventListener("input", filterNotices);
  }

  const noticeDialog = document.getElementById("noticeDialog");
  if (noticeDialog) {
    document.querySelectorAll("[data-read-more]").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".notice-card");
        const title = card ? card.querySelector("h3").textContent : "Mid-semester attendance reminder";
        const description = card ? card.querySelector("p:not(.notice-date)").textContent :
          "Please review your attendance record before submitting a leave application. Approved leave may still require supporting documentation under your department's policy.";
        document.querySelector("#noticeDialog h2").textContent = title;
        document.getElementById("dialogNoticeText").textContent = description;
        noticeDialog.showModal();
      });
    });
    const closeDialog = () => noticeDialog.close();
    document.getElementById("closeNotice").addEventListener("click", closeDialog);
    document.getElementById("dialogOk").addEventListener("click", closeDialog);
    noticeDialog.addEventListener("click", event => {
      if (event.target === noticeDialog) noticeDialog.close();
    });
  }
});
