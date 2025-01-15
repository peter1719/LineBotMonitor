from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# 模擬數據庫
achievements = [
  {
      "id": "ACH001",
      "name": "首次登入",
      "status": "ongoing",
      "type": "regular",
      "period": "2025/01/01-2025/03/01",
      "content": "首次登入獎勵",
      "condition": "完成一項開運動作",
      "points": 100,
      "image": True,
      "createTime": "2024-01-01 10:00:00",
      "description": "用戶首次登入系統可獲得的成就",
      "conditionDetails": "用戶需要完成首次登入操作"
  }
]

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/api/achievements', methods=['GET'])
def get_achievements():
  return jsonify(achievements)

@app.route('/page/<path:page_name>')
def render_page(page_name):
  if page_name == 'achievement-list':
      return render_template('achievement-list.html')
  elif page_name == 'blank':
      return render_template('blank.html')
  return render_template('empty-page.html')

if __name__ == '__main__':
  app.run(debug=True)

