/**
 * Hướng dẫn sử dụng:
 * 1. Truy cập https://script.google.com/
 * 2. Tạo dự án mới và dán đoạn mã này vào.
 * 3. Nhấn "Triển khai" (Deploy) -> "Triển khai mới" (New deployment).
 * 4. Chọn loại là "Ứng dụng Web" (Web App).
 * 5. Cấu hình:
 *    - Mô tả: Đồng bộ khách hàng Vinhomes
 *    - Thực thi dưới danh nghĩa: Tôi (Your email)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone) - Quan trọng để website có thể gửi dữ liệu.
 * 6. Copy URL của ứng dụng Web sau khi triển khai và dán vào biến môi trường VITE_GOOGLE_SCRIPT_URL.
 */

function doPost(e) {
  var spreadsheetId = '1mUsOpUi7pm7in71xsKFPWYK-DxRyHyCkMPXY6IFCuA0';
  var sheetName = 'Khach-Can-Gio';
  
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(sheetName);
    
    // Nếu trang tính chưa tồn tại, tạo mới và thêm tiêu đề
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(['Thời gian đăng ký', 'Họ và tên', 'Số điện thoại', 'Email', 'Sản phẩm quan tâm', 'Mã giao dịch']);
    }
    
    var timestamp = new Date();
    var rowData = [
      timestamp,
      data.name,
      data.phone,
      data.email,
      data.product,
      data.transactionCode
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
