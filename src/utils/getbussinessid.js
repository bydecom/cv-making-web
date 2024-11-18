// Định nghĩa URL API
const url = 'https://intern.pantech.vn/hcmute/api/business/GetBusinessWithRecruitmentsPaging'

// Dữ liệu cần gửi (Request body)
const requestData = {
  totalPage: null,
  totalRecords: null,
  currentPage: 1,
  pageSize: -1,
  orders: [],
  filters: []
}

// Tạo Request Options
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestData)
}

// Gửi Request với Fetch
fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json() // Chuyển đổi response thành JSON
  })
  .then((data) => {
    console.log('Dữ liệu công việc:', data) // Xử lý dữ liệu trả về
  })
  .catch((error) => {
    console.error('Lỗi khi gọi API:', error)
  })
