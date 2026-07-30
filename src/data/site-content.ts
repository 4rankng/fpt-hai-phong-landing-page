export type PlanCategory = 'internet' | 'combo' | 'game';

export type Plan = {
  id: string;
  name: string;
  priceLabel: string;
  monthlyPrice: number;
  category: PlanCategory;
  isPopular?: boolean;
  summary: string;
  specs: string[];
  bullets: string[];
};

export type Area = {
  id: string;
  name: string;
  accentClassName: string;
  note: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProofPanel = {
  title: string;
  description: string;
  caption: string;
};

export type ContactDetails = {
  phoneDisplay: string;
  phoneHref: string;
  zaloHref: string;
  email: string;
  address: string;
  logoPath: string;
  heroImagePath: string;
};

export type SiteContent = {
  badge: string;
  title: string;
  intro: string;
  heroBullets: string[];
  disclaimer: string;
  plansHeading: string;
  plansIntro: string;
  plans: Plan[];
  proofHeading: string;
  proofIntro: string;
  proofPanels: ProofPanel[];
  coverageHeading: string;
  coverageIntro: string;
  areas: Area[];
  faqHeading: string;
  faqs: FaqItem[];
  contact: ContactDetails;
  seo: {
    pageTitle: string;
    description: string;
  };
};

export const siteContent: SiteContent = {
  badge: 'Trang tư vấn khu vực Hải Phòng',
  title: 'Lắp mạng FPT Hải Phòng với tư vấn đúng khu vực, đúng gói và đầu mối liên hệ rõ ràng.',
  intro:
    'Trang này phục vụ nhu cầu đăng ký lắp mới tại Hải Phòng. Bạn xem trước gói cước tham khảo, chọn khu vực cần khảo sát và gọi trực tiếp khi cần chốt lịch nhanh.',
  heroBullets: [
    'Hotline trực tiếp 0931.50.55.56, không qua tổng đài vòng ngoài.',
    'Thời gian khảo sát và lắp đặt thường từ 24 đến 48 giờ, tùy hạ tầng thực tế từng tuyến phố.',
    'Giá dưới đây là giá tham khảo đang được công khai ngày 30/07/2026 và có thể thay đổi theo khu vực hoặc thời điểm.'
  ],
  disclaimer:
    'Bảng giá chỉ dùng để tham khảo trước khi đăng ký. Giá, quà tặng và tình trạng hạ tầng có thể thay đổi theo địa chỉ lắp đặt, thời điểm xác nhận hồ sơ và chính sách FPT tại Hải Phòng.',
  plansHeading: 'Gói cước đang được hỏi nhiều',
  plansIntro:
    'Mỗi gói đều dùng cùng một biểu mẫu tư vấn. Chọn gói bạn đang quan tâm để điền sẵn thông tin, sau đó xác nhận lại địa chỉ lắp đặt.',
  plans: [
    {
      id: 'sky',
      name: 'SKY',
      priceLabel: '195.000đ/tháng',
      monthlyPrice: 195000,
      category: 'internet',
      summary: 'Gói internet cơ bản cho nhu cầu học tập, xem phim và làm việc tại nhà.',
      specs: ['Tải xuống tới 1 Gbps', 'Tải lên 300 Mbps'],
      bullets: [
        'Phù hợp hộ gia đình cần kết nối ổn định hằng ngày.',
        'Ưu tiên khách cần mức phí đầu vào gọn.'
      ]
    },
    {
      id: 'sky-f1',
      name: 'SKY F1',
      priceLabel: '215.000đ/tháng',
      monthlyPrice: 215000,
      category: 'internet',
      summary: 'Bản nâng hơn cho nhà có nhiều thiết bị hoạt động cùng lúc.',
      specs: ['Tải xuống tới 1 Gbps', 'Tải lên 300 Mbps', 'Kèm 1 Access Point'],
      bullets: [
        'Phù hợp căn hộ hoặc nhà phố có nhu cầu dùng mạng dày hơn.',
        'Dễ cân bằng giữa ngân sách và độ linh hoạt khi mở rộng thiết bị.'
      ]
    },
    {
      id: 'combo-giga',
      name: 'Combo GIGA',
      priceLabel: '209.000đ/tháng',
      monthlyPrice: 209000,
      category: 'combo',
      summary: 'Combo internet và nội dung giải trí ở mức khởi điểm dễ tiếp cận.',
      specs: ['Kèm FPT Play Box'],
      bullets: [
        'Phù hợp gia đình muốn gom mạng và xem nội dung vào cùng một đầu mối.',
        'Dễ tư vấn thêm theo thiết bị có sẵn tại nhà.'
      ]
    },
    {
      id: 'combo-sky',
      name: 'Combo SKY',
      priceLabel: '219.000đ/tháng',
      monthlyPrice: 219000,
      category: 'combo',
      isPopular: true,
      summary: 'Lựa chọn cân bằng giữa internet gia đình và nhu cầu xem nội dung cơ bản.',
      specs: ['Kèm FPT Play Box'],
      bullets: [
        'Thường được hỏi khi cần trọn bộ internet và truyền hình với mức phí gọn.',
        'Phù hợp hộ gia đình muốn chốt nhanh một gói dễ dùng.'
      ]
    },
    {
      id: 'f-game',
      name: 'F-Game',
      priceLabel: '230.000đ/tháng',
      monthlyPrice: 230000,
      category: 'game',
      summary: 'Gói dành cho khách ưu tiên chơi game tại nhà và vẫn cần đường truyền ổn định.',
      specs: ['Tải xuống tới 1 Gbps', 'Tải lên 300 Mbps', 'Tích hợp Ultra Fast'],
      bullets: [
        'Phù hợp người dùng chú ý nhiều đến độ ổn định khi chơi game online.',
        'Nên kiểm tra kỹ hạ tầng thực tế tại địa chỉ để tư vấn sát nhu cầu.'
      ]
    },
    {
      id: 'combo-f-game',
      name: 'Combo F-Game',
      priceLabel: '275.000đ/tháng',
      monthlyPrice: 275000,
      category: 'game',
      summary: 'Kết hợp nhu cầu chơi game tại nhà với nhu cầu giải trí của cả gia đình.',
      specs: ['Tích hợp Ultra Fast', 'Kèm FPT Play Box'],
      bullets: [
        'Phù hợp nhà có người chơi game và vẫn cần xem nội dung trên TV.',
        'Thường được cân nhắc khi muốn gom chung dịch vụ ngay từ đầu.'
      ]
    }
  ],
  proofHeading: 'Quy trình tư vấn minh bạch trước khi chốt',
  proofIntro:
    'Trang này không hứa “lắp trong ngày” cho mọi địa chỉ. Mục tiêu là giúp bạn biết đúng phạm vi phục vụ, cách liên hệ và bước xác nhận tiếp theo.',
  proofPanels: [
    {
      title: 'Khảo sát và lắp đặt theo nhịp 24-48 giờ',
      description:
        'Sau khi chốt khu vực và xác nhận hồ sơ, thời gian xử lý thường nằm trong khoảng 24 đến 48 giờ. Tuyến ngoại thành hoặc điểm kéo cáp mới có thể cần lâu hơn.',
      caption: 'Không cam kết 24 giờ cho mọi địa chỉ.'
    },
    {
      title: 'Tư vấn trực tuyến trước khi đi thực địa',
      description:
        'Bạn có thể để lại số điện thoại, khu vực và ghi chú ngay trên trang. Nếu chưa dùng email trên thiết bị, hotline và Zalo vẫn luôn hiển thị để chuyển kênh liên hệ ngay.',
      caption: 'Ưu tiên xác nhận đúng khu vực trước khi báo lịch.'
    }
  ],
  coverageHeading: 'Khu vực đang nhận tư vấn tại Hải Phòng',
  coverageIntro:
    'Chọn quận hoặc huyện gần với địa chỉ cần lắp để biểu mẫu tự điền sẵn. Danh sách cố ý không bao gồm Cát Hải và Bạch Long Vỹ theo brief hiện tại.',
  areas: [
    {
      id: 'le-chan',
      name: 'Lê Chân',
      accentClassName: 'bg-brand-blue/8 text-brand-blue border-brand-blue/30',
      note: 'Phù hợp các tuyến dân cư trung tâm cần chốt nhanh lịch khảo sát.'
    },
    {
      id: 'ngo-quyen',
      name: 'Ngô Quyền',
      accentClassName: 'bg-brand-orange/10 text-brand-orange border-brand-orange/35',
      note: 'Thường cần xác nhận kỹ hẻm ngõ và vị trí đi dây trong nhà phố.'
    },
    {
      id: 'hong-bang',
      name: 'Hồng Bàng',
      accentClassName: 'bg-brand-green/10 text-brand-green border-brand-green/35',
      note: 'Phù hợp khách cần khảo sát tại các khu dân cư và tuyến phố thương mại.'
    },
    {
      id: 'hai-an',
      name: 'Hải An',
      accentClassName: 'bg-brand-sky/10 text-brand-sky border-brand-sky/35',
      note: 'Cần kiểm tra thêm nếu địa chỉ nằm sâu trong khu mới hoặc khu công nghiệp.'
    },
    {
      id: 'kien-an',
      name: 'Kiến An',
      accentClassName: 'bg-brand-ink/6 text-brand-ink border-brand-ink/20',
      note: 'Thường cần xác nhận lại hạ tầng từng tuyến để báo nhịp lắp sát hơn.'
    },
    {
      id: 'duong-kinh',
      name: 'Dương Kinh',
      accentClassName: 'bg-brand-orange/8 text-brand-ink border-brand-orange/30',
      note: 'Phù hợp khách muốn hỏi trước về phạm vi kéo cáp và lịch hẹn thực tế.'
    },
    {
      id: 'do-son',
      name: 'Đồ Sơn',
      accentClassName: 'bg-brand-blue/7 text-brand-ink border-brand-blue/25',
      note: 'Nên gọi trước để kiểm tra cung đường kỹ thuật và thời gian khảo sát.'
    },
    {
      id: 'an-duong',
      name: 'An Dương',
      accentClassName: 'bg-brand-green/8 text-brand-ink border-brand-green/30',
      note: 'Phù hợp khách ở khu dân cư mở rộng hoặc cần khảo sát đầu nối mới.'
    },
    {
      id: 'an-lao',
      name: 'An Lão',
      accentClassName: 'bg-brand-sky/8 text-brand-ink border-brand-sky/30',
      note: 'Nên để lại địa chỉ gần đúng để sắp lịch tư vấn sát hơn.'
    },
    {
      id: 'kien-thuy',
      name: 'Kiến Thụy',
      accentClassName: 'bg-brand-orange/7 text-brand-ink border-brand-orange/25',
      note: 'Một số xã xa trung tâm có thể cần xác nhận thêm về thời gian kéo cáp.'
    },
    {
      id: 'thuy-nguyen',
      name: 'Thủy Nguyên',
      accentClassName: 'bg-brand-blue/8 text-brand-ink border-brand-blue/25',
      note: 'Phù hợp khách cần kiểm tra kỹ giai đoạn hạ tầng ở khu đô thị mới.'
    },
    {
      id: 'vinh-bao',
      name: 'Vĩnh Bảo',
      accentClassName: 'bg-brand-green/8 text-brand-ink border-brand-green/25',
      note: 'Khu vực xa hơn nên ưu tiên để lại số để xác nhận lại lịch phù hợp.'
    },
    {
      id: 'tien-lang',
      name: 'Tiên Lãng',
      accentClassName: 'bg-brand-sky/7 text-brand-ink border-brand-sky/25',
      note: 'Có thể cần thêm bước chốt tuyến khảo sát trước khi báo thời gian lắp.'
    }
  ],
  faqHeading: 'Câu hỏi thường gặp trước khi đăng ký',
  faqs: [
    {
      question: 'Trang này có phải website chính thức của FPT Telecom không?',
      answer:
        'Không. Đây là trang tư vấn bán hàng tại khu vực Hải Phòng với đầu mối liên hệ cá nhân rõ ràng. Thông tin giá được đối chiếu từ nội dung công khai của FPT vào ngày 30/07/2026 và luôn cần xác nhận lại theo địa chỉ thực tế.'
    },
    {
      question: 'Có chắc chắn lắp xong trong 24 giờ không?',
      answer:
        'Không có cam kết tuyệt đối 24 giờ cho mọi trường hợp. Thời gian thường gặp là 24 đến 48 giờ sau khi xác nhận hồ sơ và kiểm tra hạ tầng, nhưng tuyến ngoại thành hoặc điểm kéo mới có thể lâu hơn.'
    },
    {
      question: 'Nếu chưa cài ứng dụng email trên điện thoại thì gửi biểu mẫu thế nào?',
      answer:
        'Nếu hệ thống chưa có endpoint nhận lead, nút gửi sẽ mở email soạn sẵn tới trangntm35@fpt.com. Nếu thiết bị không mở được email, bạn vẫn có thể gọi hotline hoặc nhắn Zalo ngay từ hai nút cố định trên trang.'
    },
    {
      question: 'Tôi ở Cát Hải hoặc Bạch Long Vỹ thì sao?',
      answer:
        'Hai khu vực này không nằm trong danh sách tư vấn trên landing page hiện tại theo brief triển khai. Bạn nên gọi trực tiếp để kiểm tra khả năng phục vụ thay vì dùng nút khu vực trong trang.'
    },
    {
      question: 'Giá trên trang đã gồm khuyến mại và phí phát sinh chưa?',
      answer:
        'Chưa thể xem là giá chốt cuối cùng. Giá trên trang chỉ là giá tham khảo tại thời điểm đối chiếu; chi phí thực tế còn phụ thuộc chương trình đang áp dụng, điều kiện lắp đặt và xác nhận cuối cùng từ phía FPT.'
    }
  ],
  contact: {
    phoneDisplay: '0931.50.55.56',
    phoneHref: 'tel:0931505556',
    zaloHref: 'https://zalo.me/0931505556',
    email: 'trangntm35@fpt.com',
    address: 'Đường Bùi Viện, Phường Lê Chân, Hải Phòng',
    logoPath: '/brand/fpt-telecom-logo.svg',
    heroImagePath: '/images/hero-fiber-technician.webp'
  },
  seo: {
    pageTitle: 'Lắp mạng FPT Hải Phòng | Tư vấn khu vực và báo giá tham khảo',
    description:
      'Trang tư vấn lắp mạng FPT tại Hải Phòng với hotline trực tiếp, Zalo, biểu mẫu để lại thông tin và bảng giá tham khảo cập nhật theo nội dung công khai ngày 30/07/2026.'
  }
};
