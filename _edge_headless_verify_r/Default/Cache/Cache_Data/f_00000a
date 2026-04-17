(() => {
  const STORAGE_KEY = "__cdk_fe_locale__";
  const ATTRIBUTES = ["placeholder", "title", "aria-label"];
  const LOOKUP_BUTTON_SELECTOR = "[data-cdk-lookup-link]";
  const BACK_BUTTON_SELECTOR = "[data-cdk-back-link]";
  const BOUND_TOGGLE_ATTR = "data-cdk-toggle-bound";
  const MOBILE_BREAKPOINT = 720;
  const MOBILE_STYLE_ID = "cdk-mobile-optimizations";

  const REDEEM_GUIDE_MARKERS = [
    "Access token guide",
    "Hướng dẫn lấy Access Token",
    "Guide",
    "Hướng dẫn",
    "Step 1: Enter CDK and check",
    "Bước 1: Nhập CDK và kiểm tra",
    "Step 2: Sign in to ChatGPT",
    "Bước 2: Đăng nhập ChatGPT",
    "Step 3: Get AuthSession",
    "Bước 3: Lấy AuthSession",
    "Step 4: After successful validation, click the recharge button to finish.",
    "Bước 4: Sau khi xác thực thành công, bấm nút nạp để hoàn tất."
  ];

  const QUERY_COLUMN_MARKERS = ["cdk", "code", "email", "user", "app", "product", "status", "redeem"];

  const VI_EXACT = [
    ["Redeem ChatGPT CDK", "Nạp CDK ChatGPT"],
    ["\u5151\u6362 ChatGPT CDK", "Nạp CDK ChatGPT"],
    ["Redeem CDK", "Nạp CDK"],
    ["CDK \u5151\u6362", "Nạp CDK"],
    ["\u5151\u6362 CDK", "Nạp CDK"],
    ["Safe and fast account recharge service", "Dịch vụ nạp tài khoản an toàn và nhanh"],
    ["\u5b89\u5168\u6781\u901f\u7684\u8d26\u53f7\u50a8\u503c\u670d\u52a1", "Dịch vụ nạp tài khoản an toàn và nhanh"],
    ["Guide", "Hướng dẫn"],
    ["\u64cd\u4f5c\u6307\u5357", "Hướng dẫn"],
    ["Access token guide", "Hướng dẫn lấy Access Token"],
    ["\u83b7\u53d6\u8d26\u53f7\u5bc6\u94a5\u6307\u5357", "Hướng dẫn lấy Access Token"],
    ["Enter access token", "Nhập Access Token"],
    ["\u8f93\u5165\u8d26\u53f7\u5bc6\u94a5\uff08Access Token\uff09", "Nhập Access Token"],
    ["Enter CDK", "Nhập CDK"],
    ["\u8f93\u5165 CDK \u5361\u5bc6", "Nhập CDK"],
    ["Enter AuthSession", "Nhập AuthSession"],
    ["\u8f93\u5165\u8d26\u53f7 AuthSession \u4fe1\u606f", "Nhập AuthSession"],
    ["Paste the access token retrieved from the browser", "Dán Access Token lấy từ trình duyệt"],
    ["\u7c98\u8d34\u6d4f\u89c8\u5668\u4e2d\u83b7\u53d6\u5230\u7684 Access Token", "Dán Access Token lấy từ trình duyệt"],
    ["Input and then click check button.", "Nhập dữ liệu và bấm kiểm tra."],
    ["\u8f93\u5165\u5b8c\u8bf7\u70b9\u51fb\u9a8c\u8bc1\u6309\u94ae\u3002", "Nhập dữ liệu và bấm kiểm tra."],
    ["Data stays within your browser for verification and is never stored on our servers.", "Tất cả dữ liệu chỉ dùng để xác thực trong trình duyệt của bạn, chúng tôi không lưu trữ."],
    ["\u6240\u6709\u6570\u636e\u4ec5\u5728\u60a8\u7684\u6d4f\u89c8\u5668\u4e2d\u7528\u4e8e\u9a8c\u8bc1\uff0c\u6211\u4eec\u4e0d\u4f1a\u5b58\u50a8\u3002", "Tất cả dữ liệu chỉ dùng để xác thực trong trình duyệt của bạn, chúng tôi không lưu trữ."],
    ["Start recharge", "Bắt đầu nạp"],
    ["\u5f00\u59cb\u5145\u503c", "Bắt đầu nạp"],
    ["Check", "Kiểm tra"],
    ["\u9a8c\u8bc1", "Kiểm tra"],
    ["Got it", "Đã hiểu"],
    ["\u77e5\u9053\u4e86", "Đã hiểu"],
    ["Confirm", "Xác nhận"],
    ["\u786e\u8ba4", "Xác nhận"],
    ["Close", "Đóng"],
    ["\u5173\u95ed", "Đóng"],
    ["Cancel", "Hủy"],
    ["\u53d6\u6d88", "Hủy"],
    ["Access token is empty.", "Vui lòng nhập Access Token"],
    ["\u8bf7\u8f93\u5165\u8d26\u53f7\u5bc6\u94a5", "Vui lòng nhập Access Token"],
    ["Access token does not meet the requirements for recharge", "Access Token không đáp ứng điều kiện nạp"],
    ["\u8d26\u53f7\u5bc6\u94a5\u4e0d\u6ee1\u8db3\u5145\u503c\u8981\u6c42", "Access Token không đáp ứng điều kiện nạp"],
    ["Can't redeem, user is already a premium member", "Tài khoản hiện đã là gói cao cấp, không thể redeem thêm"],
    ["\u5f53\u524d\u8d26\u6237\u5df2\u7ecf\u662f\u9ad8\u7ea7\u4f1a\u5458\uff0c\u65e0\u6cd5\u518d\u6b21\u5151\u6362", "Tài khoản hiện đã là gói cao cấp, không thể redeem thêm"],
    ["Please validate the access token first", "Vui lòng kiểm tra Access Token trước"],
    ["\u8bf7\u5148\u9a8c\u8bc1\u8d26\u53f7\u5bc6\u94a5", "Vui lòng kiểm tra Access Token trước"],
    ["This account has already redeemed, cannot redeem again", "Tài khoản này đã redeem, không thể thực hiện lại"],
    ["\u8be5\u8d26\u6237\u5df2\u5b8c\u6210\u5151\u6362\uff0c\u65e0\u6cd5\u91cd\u590d\u5151\u6362", "Tài khoản này đã redeem, không thể thực hiện lại"],
    ["Invalid CDK, please try again", "CDK không hợp lệ, vui lòng nhập lại"],
    ["CDK \u65e0\u6548\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165", "CDK không hợp lệ, vui lòng nhập lại"],
    ["This CDK has already been used", "CDK này đã được sử dụng, không thể redeem lại"],
    ["\u8be5 CDK \u5df2\u88ab\u4f7f\u7528\uff0c\u65e0\u6cd5\u518d\u6b21\u5151\u6362", "CDK này đã được sử dụng, không thể redeem lại"],
    ["Please enter the CDK code", "Vui lòng nhập CDK"],
    ["\u8bf7\u8f93\u5165 CDK \u5361\u5bc6", "Vui lòng nhập CDK"],
    ["This CDK exists in local records and cannot be reused", "CDK này đã có trong lịch sử cục bộ và không thể gửi lại"],
    ["\u8be5 CDK \u5df2\u5728\u672c\u5730\u8bb0\u5f55\u4e2d\u4f7f\u7528\uff0c\u4e0d\u80fd\u91cd\u590d\u63d0\u4ea4", "CDK này đã có trong lịch sử cục bộ và không thể gửi lại"],
    ["Network error, please try again later", "Lỗi mạng, vui lòng thử lại sau"],
    ["\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5", "Lỗi mạng, vui lòng thử lại sau"],
    ["Recharge successful", "Nạp thành công"],
    ["\u5145\u503c\u6210\u529f", "Nạp thành công"],
    ["Redeem succeeded!", "Redeem thành công!"],
    ["\u5151\u6362\u6210\u529f\uff01", "Redeem thành công!"],
    ["Redeem another", "Tiếp tục redeem"],
    ["\u7ee7\u7eed\u5151\u6362", "Tiếp tục redeem"],
    ["Current user", "Thông tin tài khoản"],
    ["\u5f53\u524d\u7528\u6237\u4fe1\u606f", "Thông tin tài khoản"],
    ["No user detail available", "Không có thông tin chi tiết"],
    ["\u672a\u83b7\u53d6\u5230\u7528\u6237\u8be6\u60c5", "Không có thông tin chi tiết"],
    ["Redeem failed", "Redeem thất bại"],
    ["\u5151\u6362\u5931\u8d25", "Redeem thất bại"],
    ["Step 1: Enter CDK and check", "Bước 1: Nhập CDK và kiểm tra"],
    ["\u6b65\u9aa41\uff1a\u8f93\u5165CDK \u5e76\u9a8c\u8bc1", "Bước 1: Nhập CDK và kiểm tra"],
    ["\u6b65\u9aa41\uff1a\u8f93\u5165CDK\u5e76\u9a8c\u8bc1", "Bước 1: Nhập CDK và kiểm tra"],
    ["Ensure the CDK is valid and matches the correct product.", "Đảm bảo CDK hợp lệ và đúng sản phẩm."],
    ["Ensure the CDK is valid and matches the correct product", "Đảm bảo CDK hợp lệ và đúng sản phẩm."],
    ["\u786e\u4fdd CDK \u6709\u6548\u4e14\u662f\u6b63\u786e\u7684\u5546\u54c1", "Đảm bảo CDK hợp lệ và đúng sản phẩm."],
    ["Step 2: Sign in to ChatGPT", "Bước 2: Đăng nhập ChatGPT"],
    ["\u6b65\u9aa42\uff1a\u767b\u5f55 ChatGPT", "Bước 2: Đăng nhập ChatGPT"],
    ["Open and sign in to ChatGPT.", "Mở và đăng nhập ChatGPT."],
    ["\u6253\u5f00\u5e76\u767b\u5f55 ChatGPT", "Mở và đăng nhập ChatGPT."],
    ["Open ChatGPT", "Mở ChatGPT"],
    ["\u6253\u5f00 ChatGPT", "Mở ChatGPT"],
    ["Step 3: Get AuthSession", "Bước 3: Lấy AuthSession"],
    ["\u6b65\u9aa43\uff1a\u83b7\u53d6\u8d26\u53f7 AuthSession \u4fe1\u606f", "Bước 3: Lấy AuthSession"],
    ["Open the page, copy the full JSON, then validate it.", "Mở trang và sao chép toàn bộ JSON rồi kiểm tra."],
    ["\u6253\u5f00\u7f51\u9875\u5e76\u590d\u5236\u5b8c\u6574\u7684JSON\u6570\u636e\uff0c\u70b9\u51fb\u6821\u9a8c\u3002", "Mở trang và sao chép toàn bộ JSON rồi kiểm tra."],
    ["Open AuthSession page", "Mở trang AuthSession"],
    ["\u6253\u5f00 AuthSession \u9875\u9762", "Mở trang AuthSession"],
    ["Step 4: After successful validation, click the recharge button to finish.", "Bước 4: Sau khi xác thực thành công, bấm nút nạp để hoàn tất."],
    ["\u6b65\u9aa44\uff1a\u9a8c\u8bc1\u6210\u529f\u540e\uff0c\u70b9\u51fb\u5145\u503c\u6309\u94ae\u5b8c\u6210\u5145\u503c", "Bước 4: Sau khi xác thực thành công, bấm nút nạp để hoàn tất."],
    ["The recharge process may take a while. Please wait patiently.", "Quá trình nạp có thể mất thời gian, vui lòng chờ."],
    ["\u5145\u503c\u8fc7\u7a0b\u53ef\u80fd\u6f2b\u957f\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85\uff01", "Quá trình nạp có thể mất thời gian, vui lòng chờ."],
    ["Note: package update delay", "Lưu ý: độ trễ cập nhật gói"],
    ["\u6ce8\u610f\uff1a\u5145\u503c\u5ef6\u8fdf\u95ee\u9898", "Lưu ý: độ trễ cập nhật gói"],
    ["Refresh the ChatGPT page a few times to update the subscription status.", "Hãy làm mới trang ChatGPT vài lần để cập nhật trạng thái gói."],
    ["\u5c1d\u8bd5\u591a\u6b21\u5237\u65b0ChatGPT\u7f51\u9875\uff0c\u7f51\u9875\u4f1a\u81ea\u5df1\u518d\u5237\u65b0\u4e00\u6b21\u66f4\u65b0\u8ba2\u9605\u72b6\u6001\u3002", "Hãy làm mới trang ChatGPT vài lần để cập nhật trạng thái gói."],
    ["Task Lookup", "Tra cứu task"],
    ["\u67e5\u8be2\u4efb\u52a1", "Tra cứu task"],
    ["Enter task ID", "Nhập task ID"],
    ["\u8bf7\u8f93\u5165\u4efb\u52a1ID", "Nhập task ID"],
    ["Query", "Tra cứu"],
    ["\u67e5\u8be2", "Tra cứu"],
    ["Waiting for input", "Đang chờ nhập"],
    ["\u7b49\u5f85\u8f93\u5165", "Đang chờ nhập"],
    ["Validated", "Đã xác thực"],
    ["\u9a8c\u8bc1\u6210\u529f", "Đã xác thực"],
    ["Validation failed", "Xác thực thất bại"],
    ["\u9a8c\u8bc1\u5931\u8d25", "Xác thực thất bại"],
    ["Cancel task", "Hủy task"],
    ["\u53d6\u6d88\u4efb\u52a1", "Hủy task"],
    ["The current task state cannot be cancelled", "Trạng thái task hiện tại không hỗ trợ hủy"],
    ["\u5f53\u524d\u4efb\u52a1\u72b6\u6001\u4e0d\u652f\u6301\u53d6\u6d88", "Trạng thái task hiện tại không hỗ trợ hủy"],
    ["Task cancelled", "Task đã bị hủy"],
    ["\u4efb\u52a1\u5df2\u53d6\u6d88", "Task đã bị hủy"],
    ["Cancel task failed", "Hủy task thất bại"],
    ["\u53d6\u6d88\u5931\u8d25", "Hủy task thất bại"],
    ["Task failed", "Task thất bại"],
    ["\u4efb\u52a1\u6267\u884c\u5931\u8d25", "Task thất bại"],
    ["Query failed", "Tra cứu thất bại"],
    ["\u67e5\u8be2\u5931\u8d25", "Tra cứu thất bại"],
    ["Task processing", "Task đang xử lý"],
    ["\u4efb\u52a1\u5904\u7406\u4e2d", "Task đang xử lý"],
    ["Task completed successfully", "Task thành công"],
    ["\u4efb\u52a1\u6267\u884c\u6210\u529f", "Task thành công"],
    ["Query succeeded", "Tra cứu thành công"],
    ["\u67e5\u8be2\u6210\u529f", "Tra cứu thành công"],
    ["Network error", "Lỗi mạng"],
    ["\u7f51\u7edc\u9519\u8bef", "Lỗi mạng"],
    ["User", "Người dùng"],
    ["\u7528\u6237", "Người dùng"],
    ["© 2025 Official Agent stored-value system. All rights reserved. By using this service, you agree to our terms of service and privacy policy.", "© 2025 Hệ thống nạp chính thức. Bảo lưu mọi quyền. Việc sử dụng dịch vụ này đồng nghĩa bạn đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư của chúng tôi."],
    ["© 2025 \u5b98\u65b9\u4ee3\u7406\u50a8\u503c\u7cfb\u7edf. \u4fdd\u7559\u6240\u6709\u6743\u5229. \u4f7f\u7528\u672c\u670d\u52a1\u5373\u8868\u793a\u60a8\u540c\u610f\u6211\u4eec\u7684\u670d\u52a1\u6761\u6b3e\u548c\u9690\u79c1\u653f\u7b56\u3002", "© 2025 Hệ thống nạp chính thức. Bảo lưu mọi quyền. Việc sử dụng dịch vụ này đồng nghĩa bạn đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư của chúng tôi."],
    ["\u5b98\u65b9\u4ee3\u7406\u50a8\u503c\u7cfb\u7edf. \u4fdd\u7559\u6240\u6709\u6743\u5229. \u4f7f\u7528\u672c\u670d\u52a1\u5373\u8868\u793a\u60a8\u540c\u610f\u6211\u4eec\u7684\u670d\u52a1\u6761\u6b3e\u548c\u9690\u79c1\u653f\u7b56", "© 2025 Hệ thống nạp chính thức. Bảo lưu mọi quyền. Việc sử dụng dịch vụ này đồng nghĩa bạn đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư của chúng tôi."],

    ["CDK Batch Query Tool", "Tra cứu CDK"],
    ["CDK\u6279\u91cf\u67e5\u8be2\u5de5\u5177", "Tra cứu CDK"],
    ["Batch check permissions for multiple CDKs", "Tra cứu hàng loạt thông tin sử dụng của nhiều CDK"],
    ["\u6279\u91cf\u67e5\u8be2\u591a\u4e2aCDK\u7684\u6743\u9650\u4fe1\u606f", "Tra cứu hàng loạt thông tin sử dụng của nhiều CDK"],
    ["Enter CDKs", "Nhập CDK"],
    ["\u8bf7\u8f93\u5165CDK\u5b57\u6bb5", "Nhập CDK"],
    ["Enter CDKs, one per line", "Nhập CDK, mỗi dòng một mã"],
    ["\u8bf7\u8f93\u5165CDK\uff0c\u6bcf\u884c\u4e00\u4e2a", "Nhập CDK, mỗi dòng một mã"],
    ["Start Query", "Bắt đầu tra cứu"],
    ["\u5f00\u59cb\u67e5\u8be2", "Bắt đầu tra cứu"],
    ["Clear", "Xóa"],
    ["\u6e05\u7a7a\u8f93\u5165", "Xóa"],
    ["Copy All", "Sao chép tất cả"],
    ["\u590d\u5236\u5168\u90e8", "Sao chép tất cả"],
    ["Copy Used", "Sao chép đã dùng"],
    ["\u590d\u5236\u5df2\u4f7f\u7528", "Sao chép đã dùng"],
    ["Copy Unused", "Sao chép chưa dùng"],
    ["\u590d\u5236\u672a\u4f7f\u7528", "Sao chép chưa dùng"],
    ["Querying…", "Đang tra cứu…"],
    ["\u67e5\u8be2\u4e2d…", "Đang tra cứu…"],
    ["Total", "Tổng số"],
    ["\u603b\u6570\u91cf", "Tổng số"],
    ["Used", "Đã dùng"],
    ["\u5df2\u4f7f\u7528", "Đã dùng"],
    ["Unused", "Chưa dùng"],
    ["\u672a\u4f7f\u7528", "Chưa dùng"],
    ["All", "Tất cả"],
    ["\u5168\u90e8", "Tất cả"],
    ["No data yet", "Chưa có dữ liệu"],
    ["\u6682\u65e0\u6570\u636e", "Chưa có dữ liệu"],
    ["Paste CDKs and click Start Query. Results will appear here.", "Nhập CDK rồi bấm bắt đầu tra cứu, kết quả sẽ hiển thị tại đây."],
    ["\u8f93\u5165CDK\u540e\u70b9\u51fbB\u1eaft \u0111\u1ea7u tra c\u1ee9u\uff0c\u7ed3\u679c\u4f1a\u663e\u793a\u5728\u8fd9\u91cc", "Nhập CDK rồi bấm bắt đầu tra cứu, kết quả sẽ hiển thị tại đây."],
    ["\u8f93\u5165CDK\u540e\u70b9\u51fb\u5f00\u59cb\u67e5\u8be2\uff0c\u7ed3\u679c\u4f1a\u663e\u793a\u5728\u8fd9\u91cc\u3002", "Nhập CDK rồi bấm bắt đầu tra cứu, kết quả sẽ hiển thị tại đây."],
    ["\u8f93\u5165CDK\u540e\u70b9\u51fb\u5f00\u59cb\u67e5\u8be2\uff0c\u7ed3\u679c\u4f1a\u663e\u793a\u5728\u8fd9\u91cc", "Nhập CDK rồi bấm bắt đầu tra cứu, kết quả sẽ hiển thị tại đây."],
    ["Invalid", "Không hợp lệ"],
    ["\u65e0\u6548", "Không hợp lệ"],
    ["Copy", "Sao chép"],
    ["\u4e2d\u6587", "VI"],
    ["\u4e2d", "VI"],

    ["Huong dan", "Hướng dẫn"],
    ["Bat dau nap", "Bắt đầu nạp"],
    ["Tra cuu task", "Tra cứu task"],
    ["Nhap task ID", "Nhập task ID"],
    ["Tra cuu", "Tra cứu"],
    ["Kiem tra", "Kiểm tra"],
    ["Bat dau tra cuu", "Bắt đầu tra cứu"],
    ["Sao chep tat ca", "Sao chép tất cả"],
    ["Sao chep da dung", "Sao chép đã dùng"],
    ["Sao chep chua dung", "Sao chép chưa dùng"]
  ];

  const EN_EXACT = [
    ["Nạp CDK ChatGPT", "Redeem ChatGPT CDK"],
    ["Nạp CDK", "Redeem CDK"],
    ["CDK \u5151\u6362", "Redeem CDK"],
    ["Dịch vụ nạp tài khoản an toàn và nhanh", "Safe and fast account recharge service"],
    ["Hướng dẫn", "Guide"],
    ["Hướng dẫn lấy Access Token", "Access token guide"],
    ["Nhập Access Token", "Enter access token"],
    ["Nhập CDK", "Enter CDK"],
    ["Nhập AuthSession", "Enter AuthSession"],
    ["Dán Access Token lấy từ trình duyệt", "Paste the access token retrieved from the browser"],
    ["Nhập dữ liệu và bấm kiểm tra.", "Input and then click check button."],
    ["Tất cả dữ liệu chỉ dùng để xác thực trong trình duyệt của bạn, chúng tôi không lưu trữ.", "Data stays within your browser for verification and is never stored on our servers."],
    ["Bắt đầu nạp", "Start recharge"],
    ["Kiểm tra", "Check"],
    ["Đã hiểu", "Got it"],
    ["Xác nhận", "Confirm"],
    ["Đóng", "Close"],
    ["Hủy", "Cancel"],
    ["Vui lòng nhập Access Token", "Access token is empty."],
    ["Access Token không đáp ứng điều kiện nạp", "Access token does not meet the requirements for recharge"],
    ["Tài khoản hiện đã là gói cao cấp, không thể redeem thêm", "Can't redeem, user is already a premium member"],
    ["Vui lòng kiểm tra Access Token trước", "Please validate the access token first"],
    ["Tài khoản này đã redeem, không thể thực hiện lại", "This account has already redeemed, cannot redeem again"],
    ["CDK không hợp lệ, vui lòng nhập lại", "Invalid CDK, please try again"],
    ["CDK này đã được sử dụng, không thể redeem lại", "This CDK has already been used"],
    ["Vui lòng nhập CDK", "Please enter the CDK code"],
    ["CDK này đã có trong lịch sử cục bộ và không thể gửi lại", "This CDK exists in local records and cannot be reused"],
    ["Lỗi mạng, vui lòng thử lại sau", "Network error, please try again later"],
    ["Nạp thành công", "Recharge successful"],
    ["Redeem thành công!", "Redeem succeeded!"],
    ["Tiếp tục redeem", "Redeem another"],
    ["Thông tin tài khoản", "Current user"],
    ["Không có thông tin chi tiết", "No user detail available"],
    ["Redeem thất bại", "Redeem failed"],
    ["Bước 1: Nhập CDK và kiểm tra", "Step 1: Enter CDK and check"],
    ["Đảm bảo CDK hợp lệ và đúng sản phẩm.", "Ensure the CDK is valid and matches the correct product."],
    ["Bước 2: Đăng nhập ChatGPT", "Step 2: Sign in to ChatGPT"],
    ["Mở và đăng nhập ChatGPT.", "Open and sign in to ChatGPT."],
    ["Mở ChatGPT", "Open ChatGPT"],
    ["Bước 3: Lấy AuthSession", "Step 3: Get AuthSession"],
    ["Mở trang và sao chép toàn bộ JSON rồi kiểm tra.", "Open the page, copy the full JSON, then validate it."],
    ["Mở trang AuthSession", "Open AuthSession page"],
    ["Bước 4: Sau khi xác thực thành công, bấm nút nạp để hoàn tất.", "Step 4: After successful validation, click the recharge button to finish."],
    ["Quá trình nạp có thể mất thời gian, vui lòng chờ.", "The recharge process may take a while. Please wait patiently."],
    ["Lưu ý: độ trễ cập nhật gói", "Note: package update delay"],
    ["Hãy làm mới trang ChatGPT vài lần để cập nhật trạng thái gói.", "Refresh the ChatGPT page a few times to update the subscription status."],
    ["Tra cứu task", "Task Lookup"],
    ["Nhập task ID", "Enter task ID"],
    ["Tra cứu", "Query"],
    ["Đang chờ nhập", "Waiting for input"],
    ["Đã xác thực", "Validated"],
    ["Xác thực thất bại", "Validation failed"],
    ["Hủy task", "Cancel task"],
    ["Trạng thái task hiện tại không hỗ trợ hủy", "The current task state cannot be cancelled"],
    ["Task đã bị hủy", "Task cancelled"],
    ["Hủy task thất bại", "Cancel task failed"],
    ["Task thất bại", "Task failed"],
    ["Tra cứu thất bại", "Query failed"],
    ["Task đang xử lý", "Task processing"],
    ["Task thành công", "Task completed successfully"],
    ["Tra cứu thành công", "Query succeeded"],
    ["Lỗi mạng", "Network error"],
    ["Người dùng", "User"],
    ["© 2025 Hệ thống nạp chính thức. Bảo lưu mọi quyền. Việc sử dụng dịch vụ này đồng nghĩa bạn đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư của chúng tôi.", "© 2025 Official Agent stored-value system. All rights reserved. By using this service, you agree to our terms of service and privacy policy."],

    ["Tra cứu CDK", "CDK Batch Query Tool"],
    ["Tra cứu hàng loạt thông tin sử dụng của nhiều CDK", "Batch check permissions for multiple CDKs"],
    ["Nhập CDK, mỗi dòng một mã", "Enter CDKs, one per line"],
    ["Bắt đầu tra cứu", "Start Query"],
    ["Xóa", "Clear"],
    ["Sao chép tất cả", "Copy All"],
    ["Sao chép đã dùng", "Copy Used"],
    ["Sao chép chưa dùng", "Copy Unused"],
    ["Đang tra cứu…", "Querying…"],
    ["Tổng số", "Total"],
    ["Đã dùng", "Used"],
    ["Chưa dùng", "Unused"],
    ["Tất cả", "All"],
    ["Chưa có dữ liệu", "No data yet"],
    ["Nhập CDK rồi bấm bắt đầu tra cứu, kết quả sẽ hiển thị tại đây.", "Paste CDKs and click Start Query. Results will appear here."],
    ["Không hợp lệ", "Invalid"],
    ["Sao chép", "Copy"],

    ["CDK\u6279\u91cf\u67e5\u8be2\u5de5\u5177", "CDK Batch Query Tool"],
    ["\u6279\u91cf\u67e5\u8be2\u591a\u4e2aCDK\u7684\u6743\u9650\u4fe1\u606f", "Batch check permissions for multiple CDKs"],
    ["\u8bf7\u8f93\u5165CDK\u5b57\u6bb5", "Enter CDKs"],
    ["\u8bf7\u8f93\u5165CDK\uff0c\u6bcf\u884c\u4e00\u4e2a", "Enter CDKs, one per line"],
    ["\u5f00\u59cb\u67e5\u8be2", "Start Query"],
    ["\u6e05\u7a7a\u8f93\u5165", "Clear"],
    ["\u590d\u5236\u5168\u90e8", "Copy All"],
    ["\u590d\u5236\u5df2\u4f7f\u7528", "Copy Used"],
    ["\u590d\u5236\u672a\u4f7f\u7528", "Copy Unused"],
    ["\u67e5\u8be2\u4e2d…", "Querying…"],
    ["\u603b\u6570\u91cf", "Total"],
    ["\u5df2\u4f7f\u7528", "Used"],
    ["\u672a\u4f7f\u7528", "Unused"],
    ["\u5168\u90e8", "All"],
    ["\u6682\u65e0\u6570\u636e", "No data yet"],
    ["\u8f93\u5165CDK\u540e\u70b9\u51fb\u5f00\u59cb\u67e5\u8be2\uff0c\u7ed3\u679c\u4f1a\u663e\u793a\u5728\u8fd9\u91cc\u3002", "Paste CDKs and click Start Query. Results will appear here."],
    ["\u65e0\u6548", "Invalid"]
  ];

  const VI_REGEX = [
    [/CDK\s*\u6279\u91cf\s*Tra cứu\s*\u5de5\u5177/giu, "Tra cứu CDK"],
    [/\u6279\u91cf\s*Tra cứu\u591a\u4e2aCDK\u7684\u6743\u9650\u4fe1\u606f/giu, "Tra cứu hàng loạt thông tin sử dụng của nhiều CDK"],
    [/\u5f00\u59cb\s*Tra cứu/giu, "Bắt đầu tra cứu"],
    [/\u6b65\u9aa41[:\uff1a]?\s*\u8f93\u5165CDK\s*\u5e76\s*(\u9a8c\u8bc1|Kiểm tra)/giu, "Bước 1: Nhập CDK và kiểm tra"],
    [/\u6b65\u9aa44[:\uff1a]?.*\u5145\u503c\u6309\u94ae\u5b8c\u6210\u5145\u503c/giu, "Bước 4: Sau khi xác thực thành công, bấm nút nạp để hoàn tất."],
    [/\u8f93\u5165CDK\u540e\u70b9\u51fb(?:\u5f00\u59cb\u67e5\u8be2|B\u1eaft \u0111\u1ea7u tra c\u1ee9u)[^\u3002.]*/giu, "Nhập CDK rồi bấm bắt đầu tra cứu, kết quả sẽ hiển thị tại đây."],
    [/Kiểm tra\u5931\u8d25/giu, "Xác thực thất bại"],
    [/\u8bf7\s*Nhập CDK/giu, "Vui lòng nhập CDK"],
    [/©\s*2025\s*©\s*2025/giu, "© 2025"],
    [/\u4e2d\u6587/giu, "VI"],
    [/\u4e2d/giu, "VI"]
  ];

  const EN_REGEX = [
    [/CDK\s*\u6279\u91cf\s*Tra cứu\s*\u5de5\u5177/giu, "CDK Batch Query Tool"],
    [/\u6279\u91cf\s*Tra cứu\u591a\u4e2aCDK\u7684\u6743\u9650\u4fe1\u606f/giu, "Batch check permissions for multiple CDKs"],
    [/\u5f00\u59cb\s*Tra cứu/giu, "Start Query"],
    [/\u6b65\u9aa41[:\uff1a]?\s*\u8f93\u5165CDK\s*\u5e76\s*(\u9a8c\u8bc1|Kiểm tra)/giu, "Step 1: Enter CDK and check"],
    [/\u6b65\u9aa44[:\uff1a]?.*\u5145\u503c\u6309\u94ae\u5b8c\u6210\u5145\u503c/giu, "Step 4: After successful validation, click the recharge button to finish."],
    [/\u8f93\u5165CDK\u540e\u70b9\u51fb(?:\u5f00\u59cb\u67e5\u8be2|B\u1eaft \u0111\u1ea7u tra c\u1ee9u)[^\u3002.]*/giu, "Paste CDKs and click Start Query. Results will appear here."],
    [/Kiểm tra\u5931\u8d25/giu, "Validation failed"],
    [/\u8bf7\s*Nhập CDK/giu, "Please enter the CDK code"],
    [/©\s*2025\s*©\s*2025/giu, "© 2025"],
    [/\u4e2d\u6587/giu, "VI"],
    [/\u4e2d/giu, "VI"]
  ];

  let isApplying = false;
  let isScheduled = false;

  function isMobileViewport() {
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
  }

  function ensureMobileStyle() {
    if (document.getElementById(MOBILE_STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = MOBILE_STYLE_ID;
    style.textContent = `
      @media (max-width: ${MOBILE_BREAKPOINT}px) {
        body[data-cdk-mobile-redeem] [data-cdk-mobile-guide="true"] {
          display: none !important;
        }

        body[data-cdk-mobile-query] .truncate {
          white-space: normal !important;
          overflow: visible !important;
          text-overflow: clip !important;
        }

        body[data-cdk-mobile-query] .overflow-hidden,
        body[data-cdk-mobile-query] [class*="overflow-hidden"] {
          overflow: visible !important;
        }

        body[data-cdk-mobile-query] td,
        body[data-cdk-mobile-query] th,
        body[data-cdk-mobile-query] [data-cdk-mobile-wrap="true"] {
          white-space: normal !important;
          word-break: break-word !important;
          overflow-wrap: anywhere !important;
        }

        body[data-cdk-mobile-query] table[data-cdk-mobile-table-source="true"] {
          display: none !important;
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-table-cards="true"] {
          display: grid !important;
          gap: 12px;
          margin-top: 12px;
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-card="true"] {
          padding: 12px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
        }

        body.dark[data-cdk-mobile-query] [data-cdk-mobile-card="true"] {
          background: rgba(30, 41, 59, 0.92);
          border-color: rgba(148, 163, 184, 0.24);
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-card-head="true"] {
          display: grid;
          gap: 6px;
          margin-bottom: 10px;
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-code="true"] {
          font-weight: 700;
          word-break: break-word;
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-email="true"] {
          opacity: 0.8;
          word-break: break-word;
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-card-grid="true"] {
          display: grid;
          gap: 8px;
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-field="true"] {
          display: grid;
          gap: 2px;
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-label="true"] {
          font-size: 12px;
          font-weight: 600;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        body[data-cdk-mobile-query] [data-cdk-mobile-value="true"] {
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        body[data-cdk-mobile-query] [data-cdk-query-result-row="true"] {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: start !important;
          gap: 8px 12px !important;
        }

        body[data-cdk-mobile-query] [data-cdk-query-result-code="true"] {
          grid-column: 1 / 2;
          grid-row: 1;
          margin-right: 0 !important;
        }

        body[data-cdk-mobile-query] [data-cdk-query-result-meta="true"] {
          grid-column: 1 / -1;
          grid-row: 2;
          width: 100%;
          white-space: normal !important;
          overflow: visible !important;
          text-overflow: clip !important;
          text-align: left !important;
          line-height: 1.45;
        }

        body[data-cdk-mobile-query] [data-cdk-query-result-actions="true"] {
          grid-column: 2 / 3;
          grid-row: 1;
          margin-left: 0 !important;
          justify-self: end;
        }
      }

      @media (min-width: ${MOBILE_BREAKPOINT + 1}px) {
        [data-cdk-mobile-table-cards="true"] {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function setMobileRouteFlags() {
    const isMobile = isMobileViewport();
    const pathname = window.location.pathname;
    if (isMobile && pathname.startsWith("/redeem/")) {
      document.body.setAttribute("data-cdk-mobile-redeem", "true");
    } else {
      document.body.removeAttribute("data-cdk-mobile-redeem");
    }

    if (isMobile && pathname.startsWith("/public/query-cdk")) {
      document.body.setAttribute("data-cdk-mobile-query", "true");
    } else {
      document.body.removeAttribute("data-cdk-mobile-query");
    }
  }

  function markRedeemGuideForMobile() {
    const shouldHideGuide = isMobileViewport() && window.location.pathname.startsWith("/redeem/");
    const candidates = Array.from(document.querySelectorAll("section, article, div"));

    for (const element of candidates) {
      element.removeAttribute("data-cdk-mobile-guide");
    }

    if (!shouldHideGuide) {
      return;
    }

    const matches = candidates.filter((element) => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      if (element.querySelector("input, textarea")) {
        return false;
      }

      const text = normalizeText(element.textContent);
      if (!text || text.length < 80 || text.length > 6000) {
        return false;
      }

      const markerHits = REDEEM_GUIDE_MARKERS.filter((marker) => text.includes(marker)).length;
      return markerHits >= 2;
    });

    const filtered = matches.filter((element) => {
      return !matches.some((other) => other !== element && other.contains(element));
    });

    for (const element of filtered) {
      element.setAttribute("data-cdk-mobile-guide", "true");
    }
  }

  function unwrapQueryTextForMobile() {
    if (!(isMobileViewport() && window.location.pathname.startsWith("/public/query-cdk"))) {
      return;
    }

    const leafNodes = Array.from(document.querySelectorAll("td, th, span, div, p, h1, h2, h3, h4"));
    for (const element of leafNodes) {
      if (!(element instanceof HTMLElement) || element.children.length > 0) {
        continue;
      }

      const text = normalizeText(element.textContent);
      if (!text) {
        continue;
      }

      if (text.includes("@") || text.length >= 20) {
        element.setAttribute("data-cdk-mobile-wrap", "true");
      }
    }
  }

  function markQueryResultRows() {
    const shouldEnhance = isMobileViewport() && window.location.pathname.startsWith("/public/query-cdk");
    const allMarked = document.querySelectorAll(
      "[data-cdk-query-result-row='true'], [data-cdk-query-result-code='true'], [data-cdk-query-result-meta='true'], [data-cdk-query-result-actions='true']"
    );

    for (const element of allMarked) {
      element.removeAttribute("data-cdk-query-result-row");
      element.removeAttribute("data-cdk-query-result-code");
      element.removeAttribute("data-cdk-query-result-meta");
      element.removeAttribute("data-cdk-query-result-actions");
    }

    if (!shouldEnhance) {
      return;
    }

    const buttons = Array.from(document.querySelectorAll("button"));
    const copyButtons = buttons.filter((button) => {
      const text = normalizeText(button.textContent);
      return text === "Copy" || text === "Sao chép";
    });

    for (const button of copyButtons) {
      const actions = button.parentElement;
      const row = actions?.parentElement;
      if (!(actions instanceof HTMLElement) || !(row instanceof HTMLElement)) {
        continue;
      }

      const children = Array.from(row.children).filter((child) => child instanceof HTMLElement);
      if (children.length < 3) {
        continue;
      }

      const codeEl = children.find((child) => child !== actions && /\b[A-Z0-9]{4,}(?:-[A-Z0-9]{2,})+\b/i.test(normalizeText(child.textContent)));
      const metaEl = children.find((child) => child !== actions && child !== codeEl && normalizeText(child.textContent).length > 0);

      if (!(codeEl instanceof HTMLElement) || !(metaEl instanceof HTMLElement)) {
        continue;
      }

      row.setAttribute("data-cdk-query-result-row", "true");
      codeEl.setAttribute("data-cdk-query-result-code", "true");
      metaEl.setAttribute("data-cdk-query-result-meta", "true");
      actions.setAttribute("data-cdk-query-result-actions", "true");
    }
  }

  function isRelevantQueryTable(table, headers) {
    if (!(table instanceof HTMLTableElement) || headers.length < 2) {
      return false;
    }

    const joined = headers.join(" ").toLowerCase();
    return QUERY_COLUMN_MARKERS.some((marker) => joined.includes(marker));
  }

  function getTableHeaders(table) {
    const headerCells = table.querySelectorAll("thead th");
    if (headerCells.length) {
      return Array.from(headerCells).map((cell) => normalizeText(cell.textContent));
    }

    const firstRow = table.querySelector("tr");
    if (!firstRow) {
      return [];
    }

    return Array.from(firstRow.children).map((cell) => normalizeText(cell.textContent));
  }

  function getTableRows(table) {
    const bodyRows = table.querySelectorAll("tbody tr");
    if (bodyRows.length) {
      return Array.from(bodyRows);
    }

    const rows = Array.from(table.querySelectorAll("tr"));
    return rows.slice(1);
  }

  function createField(label, value) {
    const field = document.createElement("div");
    field.setAttribute("data-cdk-mobile-field", "true");

    const labelEl = document.createElement("div");
    labelEl.setAttribute("data-cdk-mobile-label", "true");
    labelEl.textContent = label || "Field";

    const valueEl = document.createElement("div");
    valueEl.setAttribute("data-cdk-mobile-value", "true");
    valueEl.textContent = value || "-";

    field.appendChild(labelEl);
    field.appendChild(valueEl);
    return field;
  }

  function buildQueryMobileCards() {
    const shouldEnhance = isMobileViewport() && window.location.pathname.startsWith("/public/query-cdk");
    const existing = Array.from(document.querySelectorAll("[data-cdk-mobile-table-cards='true']"));

    if (!shouldEnhance) {
      for (const container of existing) {
        container.remove();
      }
      for (const table of document.querySelectorAll("table[data-cdk-mobile-table-source='true']")) {
        table.removeAttribute("data-cdk-mobile-table-source");
      }
      return;
    }

    const tables = Array.from(document.querySelectorAll("table"));
    for (const table of tables) {
      if (!(table instanceof HTMLTableElement)) {
        continue;
      }

      const headers = getTableHeaders(table);
      if (!isRelevantQueryTable(table, headers)) {
        continue;
      }

      const rows = getTableRows(table);
      if (!rows.length) {
        continue;
      }

      let tableId = table.getAttribute("data-cdk-mobile-table-id");
      if (!tableId) {
        tableId = `cdk-mobile-table-${Math.random().toString(36).slice(2, 10)}`;
        table.setAttribute("data-cdk-mobile-table-id", tableId);
      }

      let container = document.querySelector(`[data-cdk-mobile-table-cards-for='${tableId}']`);
      if (!container) {
        container = document.createElement("div");
        container.setAttribute("data-cdk-mobile-table-cards", "true");
        container.setAttribute("data-cdk-mobile-table-cards-for", tableId);
        table.insertAdjacentElement("afterend", container);
      } else {
        container.replaceChildren();
      }

      table.setAttribute("data-cdk-mobile-table-source", "true");

      for (const row of rows) {
        const cells = Array.from(row.children).map((cell) => normalizeText(cell.textContent));
        if (!cells.some(Boolean)) {
          continue;
        }

        const card = document.createElement("article");
        card.setAttribute("data-cdk-mobile-card", "true");

        const head = document.createElement("div");
        head.setAttribute("data-cdk-mobile-card-head", "true");

        const codeIndex = headers.findIndex((header) => /cdk|code/i.test(header));
        const emailIndex = headers.findIndex((header) => /email|user/i.test(header));
        const code = cells[codeIndex >= 0 ? codeIndex : 0] || "-";
        const email = cells[emailIndex >= 0 ? emailIndex : 1] || "";

        const codeEl = document.createElement("div");
        codeEl.setAttribute("data-cdk-mobile-code", "true");
        codeEl.textContent = code;
        head.appendChild(codeEl);

        if (email) {
          const emailEl = document.createElement("div");
          emailEl.setAttribute("data-cdk-mobile-email", "true");
          emailEl.textContent = email;
          head.appendChild(emailEl);
        }

        const grid = document.createElement("div");
        grid.setAttribute("data-cdk-mobile-card-grid", "true");

        headers.forEach((header, index) => {
          const value = cells[index];
          if (!header || !value) {
            return;
          }
          grid.appendChild(createField(header, value));
        });

        card.appendChild(head);
        card.appendChild(grid);
        container.appendChild(card);
      }
    }
  }

  function applyMobileOptimizations() {
    ensureMobileStyle();
    setMobileRouteFlags();
    markRedeemGuideForMobile();
    unwrapQueryTextForMobile();
    markQueryResultRows();
    buildQueryMobileCards();
  }

  function getMode() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "vi" || stored === "en") {
      return stored;
    }

    const text = document.body?.innerText || "";
    if (/Safe and fast account recharge service|CDK Batch Query Tool|Start Query|Enter CDKs|Access token guide/i.test(text)) {
      return "en";
    }

    return "vi";
  }

  function setMode(mode) {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }

  function nextMode(mode) {
    return mode === "vi" ? "en" : "vi";
  }

  function translate(value, mode) {
    if (!value || typeof value !== "string") {
      return value;
    }

    const exact = mode === "en" ? EN_EXACT : VI_EXACT;
    const regex = mode === "en" ? EN_REGEX : VI_REGEX;
    let output = value;

    for (const [from, to] of exact) {
      if (output.includes(from)) {
        output = output.split(from).join(to);
      }
    }

    for (const [pattern, to] of regex) {
      output = output.replace(pattern, to);
    }

    output = output.replace(/©\s*2025\s*©\s*2025/giu, "© 2025");
    return output;
  }

  function localizeNode(node, mode) {
    if (!node) {
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const localized = translate(node.nodeValue, mode);
      if (localized !== node.nodeValue) {
        node.nodeValue = localized;
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const element = node;

    for (const attr of ATTRIBUTES) {
      const value = element.getAttribute(attr);
      if (!value) {
        continue;
      }

      const localized = translate(value, mode);
      if (localized !== value) {
        element.setAttribute(attr, localized);
      }
    }

    for (const child of element.childNodes) {
      localizeNode(child, mode);
    }
  }

  function getLanguageToggleButtons() {
    return Array.from(document.querySelectorAll("button")).filter((button) => {
      const text = (button.textContent || "").trim();
      return text === "EN" || text === "VI" || text === "\u4e2d\u6587" || text === "\u4e2d";
    });
  }

  function bindLanguageToggles() {
    for (const button of getLanguageToggleButtons()) {
      if (button.getAttribute(BOUND_TOGGLE_ATTR) === "true") {
        continue;
      }

      button.setAttribute(BOUND_TOGGLE_ATTR, "true");
      button.addEventListener("click", () => {
        const mode = nextMode(getMode());
        setMode(mode);
        window.setTimeout(scheduleApply, 0);
        window.setTimeout(scheduleApply, 120);
        window.setTimeout(scheduleApply, 300);
      });
    }
  }

  function updateLanguageToggleLabels(mode) {
    const label = mode === "vi" ? "EN" : "VI";
    for (const button of getLanguageToggleButtons()) {
      if ((button.textContent || "").trim() !== label) {
        button.textContent = label;
      }
    }
  }

  function ensureLookupButton(mode) {
    if (!window.location.pathname.startsWith("/redeem/")) {
      return;
    }

    const buttons = Array.from(document.querySelectorAll("button"));
    const startButton = buttons.find((button) => {
      const text = (button.textContent || "").trim();
      return text === "Bắt đầu nạp" || text === "Start recharge" || text === "\u5f00\u59cb\u5145\u503c";
    });

    if (!startButton || !startButton.parentElement) {
      return;
    }

    const container = startButton.parentElement;
    let button = container.querySelector(LOOKUP_BUTTON_SELECTOR);
    const label = mode === "en" ? "CDK Lookup" : "Tra cứu CDK";

    if (!button) {
      button = startButton.cloneNode(true);
      button.setAttribute("data-cdk-lookup-link", "true");
      button.removeAttribute("disabled");
      button.disabled = false;
      button.type = "button";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.assign("/public/query-cdk");
      });
      container.style.display = "flex";
      container.style.flexWrap = "wrap";
      container.style.alignItems = "center";
      container.style.gap = "12px";
      container.appendChild(button);
    }

    button.textContent = label;
  }

  function ensureBackButton(mode) {
    if (!window.location.pathname.startsWith("/public/query-cdk")) {
      return;
    }

    const toggles = getLanguageToggleButtons();
    const anchor = toggles[0];
    if (!anchor || !anchor.parentElement) {
      return;
    }

    const container = anchor.parentElement;
    let button = container.querySelector(BACK_BUTTON_SELECTOR);
    const label = mode === "en" ? "Back to Redeem" : "Quay lại nạp CDK";

    if (!button) {
      button = anchor.cloneNode(true);
      button.setAttribute("data-cdk-back-link", "true");
      button.type = "button";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.assign("/redeem/chatgpt");
      });
      container.insertBefore(button, anchor);
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.gap = "12px";
    }

    button.textContent = label;
  }

  function applyLocalization() {
    if (isApplying) {
      return;
    }

    isApplying = true;
    try {
      const mode = getMode();
      localizeNode(document.body, mode);
      if (document.title) {
        document.title = translate(document.title, mode);
      }
      bindLanguageToggles();
      updateLanguageToggleLabels(mode);
      ensureLookupButton(mode);
      ensureBackButton(mode);
      applyMobileOptimizations();
    } finally {
      isApplying = false;
    }
  }

  function scheduleApply() {
    if (isScheduled) {
      return;
    }

    isScheduled = true;
    window.requestAnimationFrame(() => {
      isScheduled = false;
      applyLocalization();
    });
  }

  function boot() {
    applyLocalization();
    const observer = new MutationObserver(() => {
      scheduleApply();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

