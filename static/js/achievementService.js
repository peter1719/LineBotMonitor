// 成就數據服務
const sampleAchievements = [
  {
      id: "ACH001",
      name: "首次登入",
      status: "ongoing",
      type: "regular",
      period: "2025/01/01-2025/03/01",
      content: "首次登入獎勵",
      condition: "完成一項開運動作",
      points: 100,
      badge: "/static/images/badges/login.png",
      createTime: "2024-01-01 10:00:00"
  },
  {
      id: "ACH002",
      name: "探索達人",
      status: "ongoing",
      type: "special",
      period: "2025/01/01-2025/06/30",
      content: "造訪五個特定地點",
      condition: "造訪特定地點",
      points: 500,
      badge: "/static/images/badges/explorer.png",
      createTime: "2024-01-02 14:30:00"
  },
  {
      id: "ACH003",
      name: "收藏家",
      status: "completed",
      type: "regular",
      period: "2024/12/01-2025/02/28",
      content: "收集十個紀念品",
      condition: "收集指定物品",
      points: 300,
      badge: "/static/images/badges/collector.png",
      createTime: "2024-01-03 09:15:00"
  }
];

export async function loadAchievements() {
  try {
      return sampleAchievements;
  } catch (error) {
      console.error('Error loading achievements:', error);
      return [];
  }
}

