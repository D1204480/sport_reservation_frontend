<template>
  <div class="user-profile">
    <div class="profile-card">
      <h2>會員資料</h2>

      <!-- Loading 狀態 -->
      <div v-if="loading" class="loading">
        載入中...
      </div>

      <!-- 錯誤訊息 -->
      <div v-if="error" class="alert error">
        {{ error }}
      </div>

      <!-- 成功訊息 -->
      <div v-if="success" class="alert success">
        {{ success }}
      </div>

      <!-- 表單 -->
      <form @submit.prevent="handleSubmit" v-if="!loading" class="form">
        <!-- 會員ID -->
        <div class="form-group">
          <label>會員 ID</label>
          <input type="text" v-model="user.id" disabled class="input disabled">
        </div>

        <!-- 姓名 -->
        <div class="form-group">
          <label>姓名</label>
          <input type="text" v-model="user.username" required class="input">
        </div>

        <!-- 密碼 -->
        <div class="form-group">
          <label>密碼</label>
          <input type="password" v-model="user.password" placeholder="輸入新密碼" class="input">
        </div>

        <!-- 電話 -->
        <div class="form-group">
          <label>電話</label>
          <input type="tel" v-model="user.phone" class="input">
        </div>

        <!-- Email -->
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="user.email" required class="input">
        </div>

        <!-- 性別 -->
        <div class="form-group">
          <label>性別</label>
          <select v-model="user.gender" class="input">
            <option value="">選擇性別</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
          </select>
        </div>

        <!-- 生日 -->
        <div class="form-group">
          <label>生日</label>
          <input type="date" v-model="user.birth" class="input">
        </div>

        <!-- 按鈕區 -->
        <div class="button-group">
          <button type="submit" class="button primary">儲存變更</button>
          <button type="button" @click="handleDelete" class="button danger">
            刪除帳號
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// 創建 axios 實例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default {
  name: 'UserInfo',
  data() {
    return {
      user: {
        id: '',
        username: '',
        password: '',
        phone: '',
        email: '',
        gender: '',
        birth: ''
      },
      loading: true,
      error: '',
      success: ''
    }
  },

  async created() {
    await this.fetchUserData()
  },

  methods: {
    formatDate(dateString) {
      if (!dateString) return ''

      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '' // 如果日期無效則返回空字串

      // 格式化為 YYYY-MM-DD
      return date.toISOString().split('T')[0]
    },

    async fetchUserData() {
      try {
        this.loading = true
        this.error = ''

        // 從 localStorage 獲取用戶 ID
        const userData = JSON.parse(localStorage.getItem('user'))
        if (!userData || !userData.userId) {
          throw new Error('未找到用戶信息')
        }

        const response = await axiosInstance.get(`/api/user/${userData.userId}`)
        const { data } = response

        // 更新用戶資料
        this.user = {
          id: data.userId,
          username: data.username,
          phone: data.phone,
          email: data.email,
          gender: data.gender,
          birth: this.formatDate(data.birth)
        }
        // 不載入密碼欄位
        this.user.password = ''
      } catch (err) {
        this.error = err.response?.data?.message || err.message || '載入用戶資料失敗'
      } finally {
        this.loading = false
      }
    },

    async handleSubmit() {
      try {
        this.loading = true
        this.error = ''
        this.success = ''

        const userData = JSON.parse(localStorage.getItem('user'))
        if (!userData || !userData.userId) {
          throw new Error('未找到用戶信息')
        }

        // 準備更新的數據
        const updateData = {
          username: this.user.username,
          phone: this.user.phone,
          email: this.user.email,
          gender: this.user.gender,
          birth: this.user.birth
        }

        // 如果有輸入新密碼，則加入密碼欄位
        if (this.user.password) {
          updateData.password = this.user.password
        }

        await axiosInstance.put(`/api/user/${userData.userId}`, updateData)
        this.success = '資料更新成功'

        // 清空密碼欄位
        this.user.password = ''
      } catch (err) {
        this.error = err.response?.data?.message || err.message || '更新用戶資料失敗'
      } finally {
        this.loading = false
      }
    },

    async handleDelete() {
      if (!confirm('確定要刪除帳號嗎？此操作無法復原。')) {
        return
      }

      try {
        this.loading = true
        this.error = ''

        const userData = JSON.parse(localStorage.getItem('user'))
        if (!userData || !userData.userId) {
          throw new Error('未找到用戶信息')
        }

        await axiosInstance.delete(`/api/user/${userData.userId}`)

        // 清除本地存儲的用戶信息
        localStorage.removeItem('user')

        // 導向登入頁面
        this.$router.push('/login')
      } catch (err) {
        this.error = err.response?.data?.message || err.message || '刪除帳號失敗'
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

h2 {
  margin: 0 0 24px 0;
  color: #333;
  font-size: 24px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.alert {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.error {
  background-color: #fde8e8;
  color: #c81e1e;
  border: 1px solid #fecaca;
}

.success {
  background-color: #e8f5e9;
  color: #1b5e20;
  border: 1px solid #c8e6c9;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.input.disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.button-group {
  display: flex;
  gap: 15px;
  padding: 20px;
  justify-content: center;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button.primary {
  background-color: #3498db;
  color: white;
}

.button.primary:hover {
  background-color: #357abd;
}

.button.danger {
  background-color: #dc3545;
  color: white;
}

.button.danger:hover {
  background-color: #c82333;
}

@media (max-width: 600px) {
  .user-profile {
    padding: 10px;
  }

  .profile-card {
    padding: 16px;
  }

  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .button {
    width: 100%;
  }
}
</style>