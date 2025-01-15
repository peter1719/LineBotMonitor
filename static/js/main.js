window.navigateAndHighlight = function(url, pageId) {
  // 更新 iframe 的 src
  const contentFrame = document.getElementById('contentFrame');
  if (contentFrame) {
      contentFrame.src = url;
  }

  // 移除所有 nav-link 的 active class
  document.querySelectorAll('.nav-link').forEach(navLink => {
      navLink.classList.remove('active');
  });

  // 為目標鏈接添加 active class
  const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (targetLink) {
      targetLink.classList.add('active');
  }
};

window.initializeSidebar = function() {
  console.log('Initializing sidebar...');
  // Handle navigation menu expansion/collapse
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          console.log('Nav link clicked:', this.textContent.trim());
          e.preventDefault();
          
          // Toggle expand/collapse state
          this.classList.toggle('expanded');
          this.classList.toggle('collapsed');
          
          // Update indicator
          const indicator = this.querySelector('.nav-indicator');
          if (indicator) {
              if (this.classList.contains('expanded')) {
                  indicator.textContent = 'V';
              } else {
                  indicator.textContent = '<';
              }
          }
          
          // Toggle submenu display if present
          const subMenu = this.nextElementSibling;
          if (subMenu && subMenu.classList.contains('sub-menu')) {
              if (this.classList.contains('expanded')) {
                  subMenu.style.display = 'block';
              } else {
                  subMenu.style.display = 'none';
              }
          }

          // Close other open menus at the same level
          const parentUl = this.closest('ul');
          const siblingLinks = parentUl.querySelectorAll(':scope > li > .nav-link');
          siblingLinks.forEach(siblingLink => {
              if (siblingLink !== this && siblingLink.classList.contains('expanded')) {
                  siblingLink.classList.remove('expanded');
                  siblingLink.classList.add('collapsed');
                  const siblingIndicator = siblingLink.querySelector('.nav-indicator');
                  if (siblingIndicator) {
                      siblingIndicator.textContent = '<';
                  }
                  const siblingSubMenu = siblingLink.nextElementSibling;
                  if (siblingSubMenu && siblingSubMenu.classList.contains('sub-menu')) {
                      siblingSubMenu.style.display = 'none';
                  }
              }
          });
      });
  });

  // Initialize expanded state
  document.querySelectorAll('.nav-link.expanded').forEach(link => {
      const subMenu = link.nextElementSibling;
      if (subMenu && subMenu.classList.contains('sub-menu')) {
          subMenu.style.display = 'block';
      }
  });

  // 添加頁面切換功能
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const page = this.getAttribute('data-page');
          window.navigateAndHighlight(`/page/${page}`, page);
      });
  });

  // 根據當前頁面 URL 設置初始 active 狀態
  const currentPage = window.location.pathname.split('/').pop();
  const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
  if (activeLink) {
      activeLink.classList.add('active');
  }

  // 初始化側邊欄切換功能
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  
  if (menuToggle && sidebar && mainContent) {
      menuToggle.addEventListener('click', function() {
          sidebar.classList.toggle('collapsed');
          mainContent.classList.toggle('expanded');
      });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded in main.js. Current path:', window.location.pathname);
  if (window.location.pathname === '/') {
      console.log('Calling initializeSidebar');
      initializeSidebar();
  }
  // Initialize achievement list if on the achievement list page
  if (window.location.pathname.includes('achievement-list')) {
      initializeAchievementList();
  }
});

import { loadAchievements} from './achievementService.js'; 
import { applyFilters} from './filterService.js'; 
import { renderAchievements, createFilterTag} from './uiService.js'; 

function initializeAchievementList() {
  console.log('Initializing achievement list');
  // Initialize main content functionality
  let achievements = [];
  
  // Get DOM elements
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const typeFilter = document.getElementById('typeFilter');
  const conditionFilter = document.getElementById('conditionFilter');
  const dateFilter = document.getElementById('dateFilter');
  const achievementList = document.getElementById('achievementList');
  const selectAll = document.getElementById('selectAll');
  const activeFilters = document.getElementById('activeFilters');

  // Load achievement data
  async function initializeAchievements() {
      achievements = await loadAchievements();
      if (achievementList) {
          renderAchievements(achievementList, achievements);
      }
  }

  // Search functionality
  if (searchInput) {
      searchInput.addEventListener('input', function() {
          const searchText = this.value.toLowerCase();
          const filteredAchievements = achievements.filter(achievement => 
              achievement.name.toLowerCase().includes(searchText) ||
              achievement.id.toLowerCase().includes(searchText)
          );
          renderAchievements(achievementList, filteredAchievements);
      });
  }

  // Filter functionality
  function handleFiltersChanged() {
      const filters = {
          status: statusFilter ? statusFilter.value : '',
          type: typeFilter ? typeFilter.value : '',
          condition: conditionFilter ? conditionFilter.value : '',
          date: dateFilter ? dateFilter.value : ''
      };
      const filteredAchievements = applyFilters(achievements, filters);
      renderAchievements(achievementList, filteredAchievements);
  }

  // Add filter event listeners
  if (statusFilter) {
      statusFilter.addEventListener('change', function() {
          createFilterTag(activeFilters, 'statusFilter', this.options[this.selectedIndex].text);
          handleFiltersChanged();
      });
  }
  if (typeFilter) {
      typeFilter.addEventListener('change', function() {
          createFilterTag(activeFilters, 'typeFilter', this.options[this.selectedIndex].text);
          handleFiltersChanged();
      });
  }
  if (conditionFilter) {
      conditionFilter.addEventListener('change', function() {
          createFilterTag(activeFilters, 'conditionFilter', this.options[this.selectedIndex].text);
          handleFiltersChanged();
      });
  }
  if (dateFilter) {
      dateFilter.addEventListener('change', function() {
          const dateValue = this.value ? new Date(this.value).toLocaleDateString('zh-TW') : '';
          createFilterTag(activeFilters, 'dateFilter', dateValue);
          handleFiltersChanged();
      });
  }

  document.addEventListener('filtersChanged', handleFiltersChanged);

  // Select all functionality
  if (selectAll) {
      selectAll.addEventListener('change', function() {
          const checkboxes = document.querySelectorAll('.achievement-select');
          checkboxes.forEach(checkbox => checkbox.checked = this.checked);
      });
  }

  // Initialize achievement data
  initializeAchievements();
}

