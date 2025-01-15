export function applyFilters(achievements, filters) {
  return achievements.filter(achievement => {
      // 檢查搜尋文字
      if (filters.search && !matchesSearch(achievement, filters.search)) {
          return false;
      }
      
      // 檢查狀態
      if (filters.status && achievement.status !== filters.status) {
          return false;
      }
      
      // 檢查類型
      if (filters.type && achievement.type !== filters.type) {
          return false;
      }
      
      // 檢查達成條件
      if (filters.condition && achievement.condition !== filters.condition) {
          return false;
      }
      
      // 檢查日期
      if (filters.date && !isDateInRange(filters.date, achievement.period)) {
          return false;
      }
      
      return true;
  });
}

function matchesSearch(achievement, searchText) {
  const text = searchText.toLowerCase();
  return achievement.name.toLowerCase().includes(text) ||
         achievement.id.toLowerCase().includes(text);
}

function isDateInRange(date, period) {
  const [startStr, endStr] = period.split('-');
  const checkDate = new Date(date);
  const startDate = new Date(startStr);
  const endDate = new Date(endStr);
  
  return checkDate >= startDate && checkDate <= endDate;
}

