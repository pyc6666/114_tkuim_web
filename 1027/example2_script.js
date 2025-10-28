// example2_script.js
// 驗證 Email 與手機欄位，拋出自訂訊息後再提示使用者

const form = document.getElementById('contact-form');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

// 顯示欄位錯誤訊息
function showValidity(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('這個欄位必填');
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity('格式不正確，請確認輸入內容');
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.title || '格式不正確');
  } else {
    input.setCustomValidity('');
  }
  return input.reportValidity();
}

// 新增：自訂 Email 網域檢查函式
function validateEmailDomain(input) {
  const emailValue = input.value.trim();
  const allowedDomain = '@o365.tku.edu.tw';

  // 檢查是否以指定網域結尾
  if (emailValue && !emailValue.endsWith(allowedDomain)) {
    input.setCustomValidity(`Email 必須使用 ${allowedDomain} 結尾`);
  } else {
    input.setCustomValidity('');
  }

  return input.reportValidity();
}

// 監聽表單送出事件
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // 先做基本格式驗證
  const emailOk = showValidity(email);
  const phoneOk = showValidity(phone);

  // 額外做 email 網域驗證
  const domainOk = validateEmailDomain(email);

  if (emailOk && phoneOk && domainOk) {
    alert('表單驗證成功，準備送出資料');
    form.reset();
  }
});

// 失焦時即時驗證 email 與 phone
email.addEventListener('blur', () => {
  showValidity(email);
  validateEmailDomain(email);
});

phone.addEventListener('blur', () => {
  showValidity(phone);
});
