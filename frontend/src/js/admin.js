// Admin page 
import { fetchAPI, showError } from './main.js';
import { openModal, closeModal, getFromData, validateForm } from './ui.js';

class AdminManager {
  constructor() {
    this,init()
    }

  init() {
    this.loadPageData()
    this.setupGlobalFunctions()
  }

  async  loadPageData() {
    const sections = [
      { skeleton: "systemSkeleton", content: "systemContent", endpoint: "/admin/system-stats" },
      { skeleton: "analyticsSkeleton", content: "analyticsContent", endpoint: "/admin/analytics" },
      { skeleton: "adminActivitySkeleton", content: "adminActivityContent", endpoint: "/admin/activity" },
    ]
    for (const section of sections) {
      try { 
        await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 600))

        const skeleton = document.getElementById(section.skeleton)
        const content = document.getElementById(section.content)

        if (skeleton && content) {
          skeleton.style.display = "none"
          content.style.display = "block"
        }
      } catch (error) {
        console.error('Error loading ${section.endpoint}:', error)
      }
    }
  }

  setupGlobalFunctions() {
    window.exportUsers = () => {
      const successDiv = document.createElement("div")
      successDiv.className = "success-alert"
      successDiv.textContent = "User data export initiated. Check your download folder."
      successDiv.setAttribute("role", "alert")

      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.insertBefore(sucessDiv, mainContent.firstChild)

        setTimeout(() => {
          if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv)
          }
        }, 5000)
      }
    }

    window.submitUser = async () => {
      const form = document.getElementById("addUserForm") 
      if (!form) return
      if (!validateForm(form)) {
        showError("Please fill in all required fields.", "main-content" )
        return
      }

      const formData = getFromData(form)

      try {
        const result = await fetchAPI("/admin/add-user", {
          method: "POST",
          body: JSON.stringify(formData),
        })

        closeModal("addUserModal")

        const successDiv = document.createElement("div")
        successDiv.className = "success-alert"
        sucessDiv.textContent = "User added successfully. Welcome email sent."
        successDiv.setAttribute("role", "alert")

        const mainContent = document.getElementById("main-content")
        if (mainContent) {
          mainContent.insertBefore(sucessDiv, mainContent.firstChild)

          setTimeout(() => {
            if (successDiv.parentNode) {
              successDiv.parentNode.removeChild(successDiv)
            }
          }, 5000)
        }

        form.reset()
      } catch (error) {
        showError("Failed to add user. Please try again.", "main-content")
      }
    }

    // Make modal functions globally available
    window.openModal = openModal
    window.closeModal = closeModal
  }
}

// Initialize admin manager
document,addEventListener("DOMContentLoaded", () => {
  new AdminManager()
})







/*
    el('div', { class: 'grid cards' }, []);
    document.getElementById('admin-panels').replaceChildren(panels);

    // Example: recycling points table (read-only for starter)
    const points = await api('/recycle.php');
    const list = el('div', { class:'card' }, [el('h3', {}, 'Recycling Points')]);
    points.forEach(p => list.appendChild(el('p', { class:'muted' }, `${p.name} – ${p.address}`)));
    panels.appendChild(list);

    const tips = await api('/energy.php');
    const tipCard = el('div', { class:'card' }, [el('h3', {}, 'Energy Tips')]);
    tips.forEach(t => tipCard.appendChild(el('p', { class:'muted' }, t.title)));
    panels.appendChild(tipCard);
  }

  load();
  */
