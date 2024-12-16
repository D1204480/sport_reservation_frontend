
<template>
   <div class="container">
    <div class="registration-title">
      <h1>會員註冊</h1>
      <a href="#" class="already-registered">已經申辦了？ <i class="icon-user"></i></a>
    </div>

    <form class="registration-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="name">姓名
            <span class="required-mark" title="此欄位為必填">*</span>
            <small v-if="isFieldRequired('username')" class="field-hint">(必填)</small>
          </label>
          <input type="text" id="name" v-model="formData.username" placeholder="輸入您的名字"
            :class="{ 'error': errors.username }" :aria-required="isFieldRequired('username')"
            :required="isFieldRequired('username')" required>
          <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="gender">性別
            <span class="required-mark" title="此欄位為必填">*</span>
            <small v-if="isFieldRequired('gender')" class="field-hint">(必填)</small>
          </label>
          <select id="gender" v-model="formData.gender" :aria-required="isFieldRequired('gender')"
            :required="isFieldRequired('gender')" required>
            <option value="">請選擇性別</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="birthdate">生日
            <span class="required-mark" title="此欄位為必填">*</span>
            <small v-if="isFieldRequired('birth')" class="field-hint">(必填)</small>
          </label>
          <input type="date" id="birthdate" v-model="formData.birth" placeholder="請選擇生日"
            :class="{ 'error': errors.birth }" :aria-required="isFieldRequired('birth')"
            :required="isFieldRequired('birth')" required>
          <span class="error-message" v-if="errors.birth">{{ errors.birth }}</span>
        </div>

        <div class="form-group">
          <label for="phone">聯絡電話
            <span class="required-mark" title="此欄位為必填">*</span>
            <small v-if="isFieldRequired('phone')" class="field-hint">(必填)</small>
          </label>
          <input type="tel" id="phone" v-model="formData.phone" placeholder="聯絡電話" :class="{ 'error': errors.phone }"
            :aria-required="isFieldRequired('phone')" :required="isFieldRequired('phone')" required>
          <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="email">信箱
            <span class="required-mark" title="此欄位為必填">*</span>
            <small v-if="isFieldRequired('email')" class="field-hint">(必填)</small>
          </label>
          <input type="email" id="email" v-model="formData.email" placeholder="請輸入電子郵件信箱"
            :class="{ 'error': errors.email }" :aria-required="isFieldRequired('email')"
            :required="isFieldRequired('email')" required>
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group ">
          <label for="verification-code">信箱驗證
            <span class="required-mark" title="此欄位為必填">*</span>
            <small v-if="isFieldRequired('verificationCode')" class="field-hint">(必填)</small>
          </label>
          <div class="verification">
            <button type="button" class="send-code-btn" @click="sendVerificationCode">發送驗證碼</button>
            <input type="text" id="verification-code" v-model="verificationCode" placeholder="請輸入驗證碼"
              :aria-required="isFieldRequired('password')" :required="isFieldRequired('password')" required>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="password">密碼
            <span class="required-mark" title="此欄位為必填">*</span>
            <small v-if="isFieldRequired('password')" class="field-hint">(必填)</small>
          </label>
          <input type="password" id="password" v-model="formData.password" placeholder="6位密碼，至少一個字母和一個數字"
            :class="{ 'error': errors.password }" :aria-required="isFieldRequired('password')"
            :required="isFieldRequired('password')" required>
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="confirm-password">確認密碼
            <span class="required-mark" title="此欄位為必填">*</span>
            <small v-if="isFieldRequired('confirmPassword')" class="field-hint">(必填)</small>
          </label>
          <input type="password" id="confirm-password" v-model="confirmPassword" placeholder=""
            :aria-required="isFieldRequired('confirmPassword')" :required="isFieldRequired('confirmPassword')" required>
        </div>
      </div>

      <div class="form-row agreement" style="gap: 0px;">
        <input type="checkbox" id="agreement" v-model="agreedToTerms" @click.prevent="showModal" required>
        <label for="agreement" style="margin: 10px;" @click.prevent="showModal"><a
          style="color:#007bff; cursor: pointer;">閱讀網路同意書 </a>本人已確認 <span>並同意</span></label>
      </div>

      <!-- Modal -->
      <div v-if="isModalOpen" class="modal" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>網路同意申請書</h2>
            <button class="close-btn" @click="closeModal">&times;</button>
          </div>

          <div class="modal-body">
            <!-- 在這裡放入你的條款內容 -->
            <p>申請同意書   
              歡迎您使用「運動服務e櫃檯」網路申辦功能，在使用本功能之前，請您務必詳閱下列說明：

              辦理申請案件中，若為CA申辦項目，須先使用您的憑證進行驗證，始可使用「臺中市政府服務e櫃檯」所提供之網路申請服務。
              利用「臺中市政府服務e櫃檯」網路申請服務，如未依受理機關約定，於一定期間內補足申請案件所需證明文件時，申請人同意受理機關得註銷該申請案。
              申請人於辦理案件申請時同意詳填聯絡電話及住址等通訊資訊，以利資料處理和郵寄作業進行，若因申請人未填寫個人通訊資訊或資訊填寫錯誤致受理機關無法正確完成申請案件處理時，該申請案件延遲處理或無法處理之後果由申請人自行承擔。
              申請人用「臺中市政府服務e櫃檯」網路申請內容之傳訊，如經不可抗拒之外力(如斷電、斷線、網路傳輸壅塞等)干擾而導致傳送時間延遲，甚或無法接收、傳送致影響申請人權益時，各受理機關不負任何責任。
              申請人使用本網路申請服務，有下列情形之一者，臺中市政府得終止其使用，並由申請人負相關之法律責任： (1) 有竊取、更改、破壞他人資訊情事者。 (2) 有擅自複製他人資訊轉售、轉載情事者。 (3) 散播電腦病毒者。
              (4) 有盜用他人資訊申請案件者。 (5) 擷取非經所有者正式開放或授權之資源。 (6) 其他有危害通信或違反法令之情事者。
              申請人因本同意書第5點之規定而終止其「臺中市政府服務e櫃檯」辦理申請案件權利時，得提出申訴，如經「臺中市政府服務e櫃檯」系統管理機關調查認為有理由時，得恢復其權利。
              歡迎使用臺中市政府服務e櫃檯，本網站所提供之各項網路服務，部分需要您提供個人資料，為遵守個人資料保護法規定，在您提供個人資料前，依法告知下列事項： (1) 本府獲取您的個人資料種類如下：
              識別類個人資料（例如：中、英文姓名、國民身分證統一編號、識別碼、學生或員工證號、聯絡電話號碼、地址、性別、出生地、電子郵遞地址、帳戶號碼與戶名、其它識別證號或電子識別標章）。
              特徵類（例如：出生年月日、國籍、個人照片、筆跡與紙本文件）、社會情況類（例如：職業、學經歷）。 (2) 本府將依個人資料保護法及相關法令之規定下，依隱私權保護政策，蒐集、處理及合理利用您的個人資料。 (3)
              您可依個人資料保護法第3條規定，就您的個人資料向本府行使之下列權利： 查詢或請求閱覽。 請求製給複製本。 請求補充或更正。 請求停止蒐集、處理及利用。 請求刪除。 (4)
              您因行使上述權利而導致對您的權益產生減損時，本府不負相關賠償責任。另依個人資料保護法第14 條規定，本府得酌收行政作業費用。 (5) 若您未提供正確之個人資料，本府將無法為您提供特定目的之相關業務。 (6)
              若您不同意上述聲明內容，請勿於本網站內提供您的個人資料，另本網站多數服務無須提供您的資料也可進行瀏覽，並不影響您資訊瀏覽的權益，如需服務請洽管理者信箱。 (7)
              臺中市政府數位治理局保有修訂本告知內容之權利，修正時亦同，以上條文參考自中華民國資料保護協會。 (8)
              依石岡公所-民政課之規範，蒐集姓名、身分證字(居留證)號、申請人聯絡電話、申請人E-Mail、申請人行動電話欄位 (9)您的個人資料將於機關辦理案件時利用，並保留至法定保存期限後銷毀。
              (10)您的個人資料僅會於各機關管轄區域、業務範圍內使用。 (11)機關將檢視您的個人資料是否符合申辦條件，必要時會電話聯繫或郵寄公務文件至您的地址。
              按下「同意」鍵後，視同申請人已仔細審閱明白上述各條規定，並完全同意遵守各條款之約定。</p>
          </div>

          <div class="modal-footer">
            <button @click="decline" class="decline-btn">不同意</button>
            <button @click="accept" class="accept-btn">同意</button>
          </div>
        </div>
      </div>

      <button type="submit" class="submit-btn" :disabled="!agreedToTerms"> {{ isSubmitting ? '註冊中...' : '註冊' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',

  data() {
    return {
      formData: {
        username: '',
        password: '',
        email: '',
        phone: '',
        gender: '',
        birth: ''
      },
      confirmPassword: '', // 新增 confirmPassword 屬性
      verificationCode: '',
      agreedToTerms: false, // 添加同意條款的數據屬性
      errors: {},
      isSubmitting: false,
      isModalOpen: false
    }
  },

  methods: {
    // 必填欄位
    isFieldRequired(fieldName) {
      // 可以集中管理必填欄位
      const requiredFields = ['username', 'gender', 'birth', 'email', 'phone', 'password', 'confirmPassword', 'verificationCode'];
      return requiredFields.includes(fieldName);
    },

    showModal() {
      this.isModalOpen = true
    },

    closeModal() {
      this.isModalOpen = false
    },

    accept() {
      this.agreedToTerms = true
      this.closeModal()
    },

    decline() {
      this.agreedToTerms = false
      this.closeModal()
    },

    // 發送信箱驗證碼
    async sendVerificationCode() {
      try {
        const response = await axios.post('http://localhost:8080/api/send-verification-code', {
          email: this.formData.email
        });
        console.log('Verification code sent:', response.data);
      } catch (error) {
        console.error('Failed to send verification code:', error);
      }
    },

    // 比對驗證碼
    async verifyCode() {
      try {
        const response = await axios.post('http://localhost:8080/api/verify-code', {
          email: this.formData.email,
          code: this.verificationCode
        });
        console.log('Verification response:', response.data); // 添加此行來查看回應數據
        return response.data.valid;

      } catch (error) {
        console.error('Failed to verify code:', error);
        return false;
      }
    },

    // 驗證輸入欄位
    validateForm() {
      this.errors = {};
      let isValid = true;

      // 用戶名驗證
      const usernameRegex = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,20}$/;
      if (!this.formData.username) {
        this.errors.username = '請輸入用戶名稱';
        isValid = false;
      } else if (!usernameRegex.test(this.formData.username)) {
        this.errors.username = '用戶名稱只能包含中文、英文、數字和底線，長度2-20字元';
        isValid = false;
      }

      // 密碼強度驗證
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!this.formData.password) {
        this.errors.password = '請輸入密碼';
        isValid = false;
      } else if (!passwordRegex.test(this.formData.password)) {
        this.errors.password = '密碼必須至少6個字符，包含至少一個字母和一個數字';
        isValid = false;
      }

      // 確認密碼驗證
      if (this.formData.password !== this.confirmPassword) {
        this.errors.confirmPassword = '確認密碼與密碼不一致';
        isValid = false;
      }

      // 電子郵件驗證
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!this.formData.email) {
        this.errors.email = '請輸入電子郵件地址';
        isValid = false;
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors.email = '請輸入有效的電子郵件地址';
        isValid = false;
      }

      // 手機號碼驗證
      const phoneRegex = /^09\d{8}$/;
      if (!this.formData.phone) {
        this.errors.phone = '請輸入手機號碼';
        isValid = false;
      } else if (!phoneRegex.test(this.formData.phone)) {
        this.errors.phone = '請輸入有效的台灣手機號碼（格式：09xxxxxxxx）';
        isValid = false;
      }

      // 生日驗證
      if (!this.formData.birth) {
        this.errors.birth = '請選擇出生日期';
        isValid = false;
      } else {
        const birthDate = new Date(this.formData.birth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (birthDate > today) {
          this.errors.birth = '出生日期不能晚於今天';
          isValid = false;
        } else if (age > 120 || (age === 120 && monthDiff > 0)) {
          this.errors.birth = '請輸入有效的出生日期';
          isValid = false;
        } else if (age < 13 || (age === 13 && monthDiff < 0)) {
          this.errors.birth = '需年滿13歲才能註冊';
          isValid = false;
        }
      }

      // 性別驗證
      if (!this.formData.gender) {
        this.errors.gender = '請選擇性別';
        isValid = false;
      }

      // 驗證碼驗證
      if (!this.verificationCode) {
        this.errors.verificationCode = '請輸入驗證碼';
        isValid = false;
      } else if (this.verificationCode.length !== 6) {
        this.errors.verificationCode = '驗證碼必須為6位數';
        isValid = false;
      }

      // 同意條款驗證
      if (!this.agreedToTerms) {
        this.errors.terms = '請同意服務條款和隱私政策';
        isValid = false;
      }

      return isValid;
    },

    async handleSubmit() {
      console.log('handleSubmit called');

      if (!this.validateForm()) {
        console.log('Form validation failed');
        return;
      }

      this.isSubmitting = true;

      try {
        const isCodeValid = await this.verifyCode();
        console.log('Verification code valid:', isCodeValid);

        if (isCodeValid) {
          const response = await axios.post('http://localhost:8080/api/user', this.formData);
          console.log('Register response:', response.data);
          this.$emit('register-success', response.data);

          // 註冊成功後跳轉
          this.$router.replace('/'); // 跳轉到登入頁面
          // 或者使用命名路由
          // this.$router.push({ name: 'login' });

          // 可以加入提示訊息
          // alert('註冊成功！請重新登入。');
          // 或使用其他提示組件，如 Toast

        } else {
          this.errors.verificationCode = '驗證碼不正確';
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors || {};
          console.log('Error response:', error.response.data.errors);
        } else {
          console.error('註冊失敗:', error);
        }
      } finally {
        this.isSubmitting = false;
      }
    }

  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  background-color: rgb(249, 249, 249);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
}

.container {
  background: rgb(249, 249, 249);
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  /* max-width: 800px; */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  text-align: start;
  margin: 0 auto;
}

.registration-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  margin-right: auto;
  /* 將標題置於左側 */
}

.already-registered {
  display: inline-block;
  font-size: 14px;
  color: #019ee7;
  text-decoration: none;
  margin-bottom: 30px;
  margin-left: auto;
  /*把它移到最右側*/
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  margin-right: 10px;
}

.form-group:last-child {
  margin-right: 0;
}

label {
  font-size: 14px;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
input[type="tel"]{
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder {
  color: #bbb;
}

.verification {
  display: flex;
  align-items: center;
  gap: 10px
}

.send-code-btn {
  padding: 8px 12px;
  background-color: #FF7452;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  margin-right: 5px;
}

.agreement {
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

.agreement input[type="checkbox"] {
  margin-right: 5px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #FF7452;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.send-code-btn:hover,
.submit-btn:hover {
  background-color: #FF6242;
}


@media (max-width: 1920px) {
  .max-w-md {
    max-width: 32rem;
  }
}

@media (max-width: 768px) {
  .max-w-md {
    max-width: 24rem;
  }

  .container {
    padding: 30px;
  }

  .form-row {
    /* flex-direction: column; */
    gap: 15px;
  }

  .form-group {
    width: 100%;
  }

  .verification {
    /* flex-direction: column; */
    align-items: stretch;
  }

  .send-code-btn {
    width: 30%;
  }
}

/* 手機響應式設計 */
@media (max-width: 480px) {
  .max-w-md {
    max-width: 20rem;
  }

  .container {
    padding: 20px;
  }

  .form-row {
    flex-direction: column;
    gap: 15px;
  }

  h1 {
    font-size: 20px;
  }

  .registration-title {
    /* flex-direction: column; */
    align-items: flex-start;
  }

  .already-registered {
    align-self: flex-end;
  }

  .verification {
    /* flex-direction: column; */
    align-items: stretch;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="date"],
  input[type="tel"],
  select {
    font-size: 16px;
    /* 改善手機上的可讀性 */
    padding: 12px;
  }

  .agreement {
    flex-direction: row;
    gap: 8px;
  }
}

/* 錯誤提示文字樣式 */
.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* 輸入框錯誤狀態樣式 */
.form-group input.error,
.form-group select.error {
  border-color: #dc3545;
  background-color: #fff;
}

/* 錯誤狀態下輸入框focus時的樣式 */
.form-group input.error:focus,
.form-group select.error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

/* 可選：添加錯誤圖標 */
.form-group {
  position: relative;
}

.form-group input.error {
  padding-right: 2rem;
}

.form-group input.error+.error-icon::after {
  content: "⚠";
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #dc3545;
}

/* 必填＊提醒 */
.form-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.required-legend {
  color: #666;
  font-size: 0.875rem;
}

.required-mark {
  color: #ffc107;
  margin-left: 4px;
  font-size: 1.2em;
  vertical-align: middle;
}

.field-hint {
  color: #6c757d;
  font-size: 0.75em;
  margin-left: 8px;
}

.field-description {
  color: #666;
  font-size: 0.875em;
  margin-top: 4px;
  display: block;
}

.form-label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.form-input:required:invalid:not(:focus):not(:placeholder-shown) {
  border-color: #dc3545;
}

.form-input:required:valid {
  border-color: #28a745;
}

/* 無障礙支援 */
.form-input:required {
  /* 為使用螢幕閱讀器的用戶添加提示 */
  aria-required: "true";
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items:self-start;
  justify-content: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 10px;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  height: 90vh; /* 設置高度為視窗高度的 90% */
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-body {
  flex: 1;
  overflow-y: auto; /* 內容過多時可以滾動 */
  padding: 20px 0;
  background-color: #f3f3f3;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.decline-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #f3f3f3;
}

.accept-btn {
  color: white;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #019ee7;
  border: none;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  
}

/* 為了確保標題和按鈕不會被擠壓 */
h2 {
  margin: 0;
  padding-bottom: 10px;
}
</style>