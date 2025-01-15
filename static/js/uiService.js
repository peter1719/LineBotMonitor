export function renderAchievements(achievementList, data) {
  if (!achievementList) return;
  
  achievementList.innerHTML = '';
  data.forEach(achievement => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><input type="checkbox" class="achievement-select"></td>
          <td>${achievement.name}<br><small>${achievement.id}</small></td>
          <td>${achievement.status}</td>
          <td>${achievement.type}</td>
          <td>${achievement.period}</td>
          <td>${achievement.content}</td>
          <td>${achievement.condition}</td>
          <td>${achievement.points}</td>
          <td><img src="${achievement.badge}" alt="勳章" class="achievement-badge"></td>
          <td>${achievement.createTime}</td>
      `;
      
      achievementList.appendChild(row);
  });
}

export function createFilterTag(activeFilters, filter, value) {
  if (!activeFilters || !value || value === '') return;

  const existingTag = activeFilters.querySelector(`[data-filter="${filter}"]`);
  if (existingTag) {
      existingTag.remove();
  }

  const tag = document.createElement('span');
  tag.className = 'achievement-filter-tag';
  tag.setAttribute('data-filter', filter);
  tag.innerHTML = `${value} <button class="achievement-remove-filter">&times;</button>`;
  
  const removeButton = tag.querySelector('.achievement-remove-filter');
  removeButton.addEventListener('click', () => {
      tag.remove();
      const filterElement = document.getElementById(filter);
      if (filterElement) {
          filterElement.value = '';
          document.dispatchEvent(new Event('filtersChanged'));
      }
  });

  activeFilters.appendChild(tag);
}

