/**
 * Translations for Vietnamese and English
 */

export const translations = {
  vi: {
    // Common
    common: {
      backToHome: "Quay lại trang chủ",
      login: "Đăng nhập",
      logout: "Đăng xuất",
      loading: "Đang tải...",
      error: "Lỗi",
      success: "Thành công",
      cancel: "Hủy",
      confirm: "Xác nhận",
      save: "Lưu",
      edit: "Sửa",
      delete: "Xóa",
      search: "Tìm kiếm",
      filter: "Lọc",
      all: "Tất cả",
      viewMore: "Xem thêm",
      viewDetails: "Xem chi tiết",
      share: "Chia sẻ",
      copy: "Sao chép",
      copied: "Đã sao chép",
      verifiedOnBlockchain: "Đã xác thực trên Blockchain",
      transparent100: "Minh bạch 100%",
      children: "em nhỏ",
      established: "Thành lập",
      location: "Địa điểm",
      viewOnExplorer: "Xem trên Explorer",
      supportNow: "Ủng hộ ngay",
      connecting: "Đang kết nối...",
    },

    // Header
    header: {
      aboutProject: "Về dự án",
      howItWorks: "Cách thức",
      childrenList: "Danh sách em",
      history: "Lịch sử",
      exit: "Thoát",
    },

    // Home page
    home: {
      heroTitle: "Nuôi Em",
      heroSubtitle: "Mỗi bữa cơm là một cơ hội",
      heroDescription:
        "Cùng chung tay mang đến bữa ăn ấm áp cho các em nhỏ vùng cao, giúp các em có thể đến trường mỗi ngày.",
      ctaButton: "Đỡ đầu ngay",
      learnMore: "Tìm hiểu thêm",
      joinNow: "Tham gia ngay",
      getMealCode: "Nhận mã Nuôi Em",
      season: "Mùa 12 • 2025—2026",
      tagline: "Bữa cơm níu chân trẻ tới trường",
      description:
        "Dự án từ thiện phi tập trung đầu tiên tại Việt Nam, sử dụng blockchain để đảm bảo mọi đóng góp đều minh bạch và đến đúng người cần.",
      stats: {
        childrenSupported: "Em nhỏ được hỗ trợ",
        mealsServed: "Bữa ăn đã phục vụ",
        sponsors: "Nhà tài trợ",
        provinces: "Tỉnh thành",
        schools: "Điểm trường",
        costPerMeal: "Đồng/bữa ăn",
      },
      howItWorks: {
        title: "Cách thức hoạt động",
        step1Title: "Đăng nhập",
        step1Desc:
          "Đăng nhập bằng email hoặc mạng xã hội qua Web3Auth. Không cần cài đặt ví crypto.",
        step2Title: "Nạp tiền",
        step2Desc:
          "Nạp VNĐ qua VNPay để nhận token tương ứng. Tỷ lệ quy đổi minh bạch và cố định.",
        step3Title: "Ủng hộ",
        step3Desc:
          "Chọn em nhỏ cần đỡ đầu và sử dụng token để ủng hộ. Mọi giao dịch đều ghi nhận trên blockchain.",
        step4Title: "Theo dõi",
        step4Desc:
          "Nhận thông báo khi bữa ăn được phục vụ. Xem ảnh và chứng từ minh bạch trên blockchain.",
      },
      story: {
        title: "Câu chuyện của chúng tôi",
        description:
          "Từ những bữa cơm nghĩa tình đến hành trình số hóa với blockchain",
      },
      contact: {
        title: "Liên hệ",
        email: "Email",
        phone: "Điện thoại",
        website: "Website",
      },
      pricing: {
        label: "Chi phí",
        perYear: "/ năm học",
        breakdown: "150.000đ/tháng × 9 tháng học + 100.000đ cơ sở vật chất",
        equivalent: "Tương đương khoảng",
        perDay: "/ngày",
        lessThan: "— ít hơn một ly trà đá",
        startNow: "Bắt đầu ngay",
      },
      gallery: {
        label: "Hình ảnh",
        title: "Những nụ cười từ vùng cao",
        childrenEating: "Trẻ em ăn cơm",
        thankYou: "Em cảm ơn",
        nuoiEm: "Nuôi em",
        founder: "Người sáng lập",
      },
      locations: {
        label: "Địa bàn hoạt động",
        title: "900+ xã khó khăn nhất",
        description:
          "Trải dài từ Tây Bắc đến Tây Nguyên, nơi những đứa trẻ cần sự giúp đỡ nhất",
      },
      cta: {
        title: "Mỗi bữa cơm là một ước mơ được chắp cánh",
        description:
          "Cảm ơn bạn đã dành thời gian tìm hiểu. Sự quan tâm của bạn đã là một món quà quý giá.",
      },
      footer: {
        brandSubtitle: "Anh Nuôi",
        brandDescription:
          "Phiên bản phi tập trung của dự án Nuôi Em, sử dụng blockchain để minh bạch hóa từ thiện. Mỗi đồng bạn góp đều được ghi nhận và có thể truy vết.",
        contact: "Liên hệ",
        copyright: "© 2026 Nuôi Em — Decentralized Charity",
        poweredBy: "Powered by",
      },
    },

    // Children page
    children: {
      title: "Danh sách em nhỏ",
      subtitle: "Các em nhỏ đang cần sự giúp đỡ của bạn",
      searchPlaceholder: "Tìm theo tên, mã số...",
      filterByProvince: "Lọc theo tỉnh",
      filterByGrade: "Lọc theo lớp",
      filterByStatus: "Lọc theo trạng thái",
      status: {
        waiting: "Đang chờ",
        sponsored: "Đã có người đỡ đầu",
      },
      age: "tuổi",
      grade: "Lớp",
      school: "Trường",
      needs: "Nhu cầu",
      monthlySupport: "Hỗ trợ hàng tháng",
      sponsorNow: "Đỡ đầu ngay",
      noChildren: "Không tìm thấy em nhỏ nào",
      totalChildren: "Tổng số em nhỏ",
      waitingForSponsor: "Đang chờ đỡ đầu",
      alreadySponsored: "Đã có người đỡ đầu",
      showing: "Hiển thị",
      children: "em nhỏ",
      noResults: "Không tìm thấy kết quả",
      noResultsDesc: "Hãy thử thay đổi bộ lọc để xem thêm các em nhỏ khác.",
      ctaTitle: "Mỗi sự đỡ đầu là một tia sáng",
      ctaDescription:
        "Chỉ với 150.000 VNĐ mỗi tháng, bạn có thể giúp một em nhỏ có bữa ăn đủ đầy và cơ hội đến trường.",
    },

    // Child detail page
    childDetail: {
      story: "Câu chuyện",
      needs: "Nhu cầu hỗ trợ",
      sponsorInfo: "Thông tin người đỡ đầu",
      noSponsor: "Chưa có người đỡ đầu",
      becomeSponsor: "Trở thành người đỡ đầu",
      shareProfile: "Chia sẻ hồ sơ",
      schoolInfo: "Thông tin trường học",
      locationInfo: "Địa điểm",
      schoolYear: "Năm học",
    },

    // Payment page
    payment: {
      title: "Thanh toán ủng hộ",
      subtitle:
        "Mỗi đóng góp của bạn đều được ghi nhận minh bạch trên blockchain",
      selectAmount: "Chọn số tiền",
      customAmount: "Hoặc nhập số tiền khác",
      enterAmount: "Nhập số tiền...",
      selectBank: "Chọn ngân hàng",
      allBanks: "Tất cả ngân hàng",
      exchangeRate: "Quy đổi hiện tại",
      youWillReceive: "Bạn sẽ nhận",
      tokens: "token",
      payNow: "Thanh toán ngay",
      processing: "Đang xử lý...",
      minAmount: "Số tiền tối thiểu là 10,000 VNĐ",
      loginRequired: "Vui lòng đăng nhập để thanh toán",
      noWallet: "Không tìm thấy địa chỉ ví. Vui lòng đăng nhập lại.",
      paymentError: "Đã xảy ra lỗi. Vui lòng thử lại.",
      cannotCreatePayment: "Không thể tạo thanh toán",
      recentTransactions: "Giao dịch gần đây",
      noTransactions: "Chưa có giao dịch nào",
      transactionsWillAppear: "Các giao dịch của bạn sẽ hiển thị ở đây",
      viewAllTransactions: "Xem tất cả giao dịch",
      sponsorFor: "Đỡ đầu cho",
      securePayment: "Thanh toán an toàn với VNPay",
      instantTransfer: "Chuyển đổi tức thì",
      transparentRecord: "Ghi nhận minh bạch",
      totalPayment: "Tổng thanh toán",
      depositAmount: "Số tiền nạp",
      conversion: "Quy đổi",
      transactionFee: "Phí giao dịch",
      free: "Miễn phí",
      tokensReceived: "Token nhận được",
      securedByVnpay: "Bảo mật bởi VNPay",
      benefits: "Lợi ích khi đóng góp",
      benefit1: "Minh bạch 100% trên blockchain",
      benefit2: "Theo dõi đóng góp realtime",
      benefit3: "Không phí ẩn, không trung gian",
      benefit4: "Hỗ trợ trực tiếp cho các em",
      viewTx: "Xem TX",
    },

    // Payment result page
    paymentResult: {
      title: "Kết quả thanh toán",
      success: "Thanh toán thành công!",
      failed: "Thanh toán thất bại",
      processing: "Đang xử lý giao dịch...",
      thankYou: "Cảm ơn bạn đã ủng hộ!",
      amount: "Số tiền",
      orderId: "Mã đơn hàng",
      transactionHash: "Mã giao dịch blockchain",
      backToPayment: "Quay lại thanh toán",
      viewTransaction: "Xem giao dịch",
      tryAgain: "Thử lại",
    },

    // History page
    history: {
      title: "Lịch sử hoạt động",
      subtitle: "Theo dõi giao dịch và bằng chứng bữa ăn của các em",
      tabTransactions: "Giao dịch",
      tabProofs: "Bằng chứng bữa ăn",
      transactions: "giao dịch",
      mealProofs: "bằng chứng bữa ăn",
      refresh: "Làm mới",
      noTransactions: "Chưa có giao dịch nào",
      noTransactionsDesc: "Bạn chưa thực hiện giao dịch ủng hộ nào",
      loginToView: "Đăng nhập để xem lịch sử",
      loginToViewDesc: "Bạn cần đăng nhập để xem lịch sử giao dịch của mình",
      loginNow: "Đăng nhập ngay",
      cannotLoadData: "Không thể tải dữ liệu",
      tryAgain: "Thử lại",
      loadingHistory: "Đang tải lịch sử giao dịch...",
      status: {
        completed: "Thành công",
        pending: "Đang chờ",
        processing: "Đang xử lý",
        failed: "Thất bại",
        expired: "Hết hạn",
      },
      proofInfo: {
        title: "Minh bạch 100% trên Blockchain",
        description:
          "Mỗi bữa ăn được chụp ảnh và lưu trữ trên IPFS, ghi nhận trên blockchain Mantle để đảm bảo tính minh bạch và không thể thay đổi.",
      },
      verified: "Đã xác thực",
      submittedBy: "Gửi bởi",
      mealTypes: {
        breakfast: "Bữa sáng",
        lunch: "Bữa trưa",
        dinner: "Bữa tối",
      },
    },

    // Identities page
    identities: {
      title: "Các Trung tâm Nuôi Em",
      subtitle:
        "Danh sách các trung tâm hỗ trợ trẻ em được xác thực trên blockchain",
      totalCenters: "Trung tâm",
      totalChildren: "Em nhỏ được hỗ trợ",
      mission: "Sứ mệnh",
      impact: "Tác động",
      features: "Chương trình hỗ trợ",
      contractAddress: "Địa chỉ hợp đồng",
    },

    // Errors
    errors: {
      somethingWentWrong: "Đã xảy ra lỗi",
      pageNotFound: "Không tìm thấy trang",
      networkError: "Lỗi kết nối mạng",
      serverError: "Lỗi máy chủ",
      unauthorized: "Không có quyền truy cập",
      sessionExpired: "Phiên đăng nhập đã hết hạn",
    },
  },

  en: {
    // Common
    common: {
      backToHome: "Back to Home",
      login: "Login",
      logout: "Logout",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      all: "All",
      viewMore: "View More",
      viewDetails: "View Details",
      share: "Share",
      copy: "Copy",
      copied: "Copied",
      verifiedOnBlockchain: "Verified on Blockchain",
      transparent100: "100% Transparent",
      children: "children",
      established: "Established",
      location: "Location",
      viewOnExplorer: "View on Explorer",
      supportNow: "Support Now",
      connecting: "Connecting...",
    },

    // Header
    header: {
      aboutProject: "About",
      howItWorks: "How it Works",
      childrenList: "Children",
      history: "History",
      exit: "Exit",
    },

    // Home page
    home: {
      heroTitle: "Nuoi Em",
      heroSubtitle: "Every meal is an opportunity",
      heroDescription:
        "Join us in bringing warm meals to highland children, helping them attend school every day.",
      ctaButton: "Sponsor Now",
      learnMore: "Learn More",
      joinNow: "Join Now",
      getMealCode: "Get Nuoi Em Code",
      season: "Season 12 • 2025—2026",
      tagline: "Meals that keep children in school",
      description:
        "Vietnam's first decentralized charity project, using blockchain to ensure all contributions are transparent and reach those in need.",
      stats: {
        childrenSupported: "Children Supported",
        mealsServed: "Meals Served",
        sponsors: "Sponsors",
        provinces: "Provinces",
        schools: "Schools",
        costPerMeal: "VND/meal",
      },
      howItWorks: {
        title: "How it Works",
        step1Title: "Login",
        step1Desc:
          "Login with email or social media via Web3Auth. No crypto wallet installation required.",
        step2Title: "Top Up",
        step2Desc:
          "Top up VND via VNPay to receive corresponding tokens. Transparent and fixed exchange rate.",
        step3Title: "Support",
        step3Desc:
          "Choose a child to sponsor and use tokens to support. All transactions are recorded on blockchain.",
        step4Title: "Track",
        step4Desc:
          "Receive notifications when meals are served. View photos and transparent receipts on blockchain.",
      },
      story: {
        title: "Our Story",
        description:
          "From charity meals to digital transformation with blockchain",
      },
      contact: {
        title: "Contact",
        email: "Email",
        phone: "Phone",
        website: "Website",
      },
      pricing: {
        label: "Pricing",
        perYear: "/ school year",
        breakdown: "150,000đ/month × 9 school months + 100,000đ facilities",
        equivalent: "Equivalent to about",
        perDay: "/day",
        lessThan: "— less than a cup of iced tea",
        startNow: "Start Now",
      },
      gallery: {
        label: "Gallery",
        title: "Smiles from the highlands",
        childrenEating: "Children eating",
        thankYou: "Thank you",
        nuoiEm: "Nuoi Em",
        founder: "Founder",
      },
      locations: {
        label: "Operating Areas",
        title: "900+ most disadvantaged communes",
        description:
          "Spanning from the Northwest to the Central Highlands, where children need help the most",
      },
      cta: {
        title: "Every meal is a dream taking flight",
        description:
          "Thank you for taking the time to learn more. Your interest is already a precious gift.",
      },
      footer: {
        brandSubtitle: "Big Brother",
        brandDescription:
          "A decentralized version of the Nuoi Em project, using blockchain to make charity transparent. Every donation you make is recorded and traceable.",
        contact: "Contact",
        copyright: "© 2026 Nuôi Em — Decentralized Charity",
        poweredBy: "Powered by",
      },
    },

    // Children page
    children: {
      title: "Children List",
      subtitle: "Children who need your help",
      searchPlaceholder: "Search by name, code...",
      filterByProvince: "Filter by Province",
      filterByGrade: "Filter by Grade",
      filterByStatus: "Filter by Status",
      status: {
        waiting: "Waiting",
        sponsored: "Sponsored",
      },
      age: "years old",
      grade: "Grade",
      school: "School",
      needs: "Needs",
      monthlySupport: "Monthly Support",
      sponsorNow: "Sponsor Now",
      noChildren: "No children found",
      totalChildren: "Total Children",
      waitingForSponsor: "Waiting for Sponsor",
      alreadySponsored: "Already Sponsored",
      showing: "Showing",
      children: "children",
      noResults: "No results found",
      noResultsDesc: "Try changing the filters to see more children.",
      ctaTitle: "Every sponsorship is a ray of light",
      ctaDescription:
        "With just 150,000 VND per month, you can help a child have nutritious meals and the opportunity to go to school.",
    },

    // Child detail page
    childDetail: {
      story: "Story",
      needs: "Support Needs",
      sponsorInfo: "Sponsor Information",
      noSponsor: "No sponsor yet",
      becomeSponsor: "Become a Sponsor",
      shareProfile: "Share Profile",
      schoolInfo: "School Information",
      locationInfo: "Location",
      schoolYear: "School Year",
    },

    // Payment page
    payment: {
      title: "Support Payment",
      subtitle:
        "Every contribution is transparently recorded on the blockchain",
      selectAmount: "Select Amount",
      customAmount: "Or enter a custom amount",
      enterAmount: "Enter amount...",
      selectBank: "Select Bank",
      allBanks: "All Banks",
      exchangeRate: "Current Exchange Rate",
      youWillReceive: "You will receive",
      tokens: "tokens",
      payNow: "Pay Now",
      processing: "Processing...",
      minAmount: "Minimum amount is 10,000 VND",
      loginRequired: "Please login to make payment",
      noWallet: "Wallet address not found. Please login again.",
      paymentError: "An error occurred. Please try again.",
      cannotCreatePayment: "Cannot create payment",
      recentTransactions: "Recent Transactions",
      noTransactions: "No transactions yet",
      transactionsWillAppear: "Your transactions will appear here",
      viewAllTransactions: "View All Transactions",
      sponsorFor: "Sponsor for",
      securePayment: "Secure Payment with VNPay",
      instantTransfer: "Instant Transfer",
      transparentRecord: "Transparent Record",
      totalPayment: "Total Payment",
      depositAmount: "Deposit Amount",
      conversion: "Conversion",
      transactionFee: "Transaction Fee",
      free: "Free",
      tokensReceived: "Tokens Received",
      securedByVnpay: "Secured by VNPay",
      benefits: "Benefits of Donating",
      benefit1: "100% Transparent on blockchain",
      benefit2: "Track donations in realtime",
      benefit3: "No hidden fees, no middleman",
      benefit4: "Direct support for children",
      viewTx: "View TX",
    },

    // Payment result page
    paymentResult: {
      title: "Payment Result",
      success: "Payment Successful!",
      failed: "Payment Failed",
      processing: "Processing transaction...",
      thankYou: "Thank you for your support!",
      amount: "Amount",
      orderId: "Order ID",
      transactionHash: "Blockchain Transaction Hash",
      backToPayment: "Back to Payment",
      viewTransaction: "View Transaction",
      tryAgain: "Try Again",
    },

    // History page
    history: {
      title: "Activity History",
      subtitle: "Track transactions and meal proofs for the children",
      tabTransactions: "Transactions",
      tabProofs: "Meal Proofs",
      transactions: "transactions",
      mealProofs: "meal proofs",
      refresh: "Refresh",
      noTransactions: "No transactions yet",
      noTransactionsDesc: "You have not made any support transactions",
      loginToView: "Login to view history",
      loginToViewDesc: "You need to login to view your transaction history",
      loginNow: "Login Now",
      cannotLoadData: "Cannot load data",
      tryAgain: "Try Again",
      loadingHistory: "Loading transaction history...",
      status: {
        completed: "Completed",
        pending: "Pending",
        processing: "Processing",
        failed: "Failed",
        expired: "Expired",
      },
      proofInfo: {
        title: "100% Transparent on Blockchain",
        description:
          "Every meal is photographed and stored on IPFS, recorded on the Mantle blockchain to ensure transparency and immutability.",
      },
      verified: "Verified",
      submittedBy: "Submitted by",
      mealTypes: {
        breakfast: "Breakfast",
        lunch: "Lunch",
        dinner: "Dinner",
      },
    },

    // Identities page
    identities: {
      title: "Nuoi Em Centers",
      subtitle: "List of verified child support centers on the blockchain",
      totalCenters: "Centers",
      totalChildren: "Children Supported",
      mission: "Mission",
      impact: "Impact",
      features: "Support Programs",
      contractAddress: "Contract Address",
    },

    // Errors
    errors: {
      somethingWentWrong: "Something went wrong",
      pageNotFound: "Page not found",
      networkError: "Network error",
      serverError: "Server error",
      unauthorized: "Unauthorized access",
      sessionExpired: "Session expired",
    },
  },
};

export type Language = "vi" | "en";

// Helper type to extract string values from translation object
type DeepStringRecord<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepStringRecord<T[K]>
    : string;
};

export type TranslationKeys = DeepStringRecord<typeof translations.vi>;
