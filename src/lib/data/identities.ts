/**
 * Identity Data - Information about the identity contracts
 * Thông tin về các hợp đồng định danh
 */

export interface Identity {
  id: string;
  contractAddress: string;
  image: string;
  name: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  location: {
    vi: string;
    en: string;
  };
  established: string;
  childrenCount: number;
  mission: {
    vi: string;
    en: string;
  };
  impact: {
    vi: string;
    en: string;
  };
  features: {
    vi: string[];
    en: string[];
  };
}

export const identities: Identity[] = [
  {
    id: "identity-1",
    contractAddress: "0x52644f6d5AEFaB1567D33b13C809D6Eb6cc3E0dB",
    image: "/anhnuoi/identity_dien_bien.jpg",
    name: {
      vi: "Trung tâm Nuôi Em Điện Biên",
      en: "Dien Bien Nuoi Em Center",
    },
    description: {
      vi: "Trung tâm hỗ trợ trẻ em vùng cao tỉnh Điện Biên, nơi những bữa cơm ấm áp níu chân các em đến trường mỗi ngày. Chúng tôi cam kết mang đến cơ hội giáo dục bình đẳng cho mọi trẻ em.",
      en: "A support center for highland children in Dien Bien Province, where warm meals encourage children to attend school every day. We are committed to providing equal educational opportunities for all children.",
    },
    location: {
      vi: "Huyện Tủa Chùa, Tỉnh Điện Biên",
      en: "Tua Chua District, Dien Bien Province",
    },
    established: "2020",
    childrenCount: 156,
    mission: {
      vi: "Đảm bảo mỗi em nhỏ vùng cao đều có đủ cơm ăn, áo mặc và sách vở để đến trường. Mỗi bữa cơm là một cơ hội, mỗi ngày đến lớp là một tương lai tươi sáng.",
      en: "Ensuring every highland child has enough food, clothing, and school supplies to attend school. Every meal is an opportunity, every school day is a brighter future.",
    },
    impact: {
      vi: "Đã hỗ trợ hơn 500 em nhỏ trong 5 năm qua, giúp tỷ lệ đến trường tăng 85% tại các bản vùng sâu.",
      en: "Supported over 500 children in the past 5 years, helping increase school attendance by 85% in remote villages.",
    },
    features: {
      vi: [
        "Bữa trưa miễn phí cho học sinh",
        "Hỗ trợ đồ dùng học tập",
        "Quần áo ấm mùa đông",
        "Theo dõi tiến độ học tập",
        "Kết nối trực tiếp với nhà tài trợ",
      ],
      en: [
        "Free lunch for students",
        "School supplies support",
        "Winter warm clothing",
        "Learning progress tracking",
        "Direct connection with sponsors",
      ],
    },
  },
  {
    id: "identity-2",
    contractAddress: "0x8FA7520731649B6838c4dB3561f2dFbedd2d006f",
    image: "/anhnuoi/identity_lai_chau.jpg",
    name: {
      vi: "Trung tâm Nuôi Em Lai Châu",
      en: "Lai Chau Nuoi Em Center",
    },
    description: {
      vi: "Trung tâm hoạt động tại vùng núi Lai Châu, nơi có nhiều em nhỏ dân tộc thiểu số cần được hỗ trợ. Chúng tôi không chỉ mang đến cơm ăn mà còn là niềm hy vọng và tương lai cho các em.",
      en: "A center operating in the mountainous region of Lai Chau, where many ethnic minority children need support. We bring not only food but also hope and a future for the children.",
    },
    location: {
      vi: "Huyện Sìn Hồ, Tỉnh Lai Châu",
      en: "Sin Ho District, Lai Chau Province",
    },
    established: "2021",
    childrenCount: 203,
    mission: {
      vi: "Xây dựng cầu nối giữa những tấm lòng hảo tâm và các em nhỏ vùng cao. Mỗi đóng góp đều được ghi nhận minh bạch trên blockchain, đảm bảo 100% đến tay các em.",
      en: "Building bridges between generous hearts and highland children. Every contribution is transparently recorded on the blockchain, ensuring 100% reaches the children.",
    },
    impact: {
      vi: "Hỗ trợ 12 trường học, 45 bản làng, giảm 70% tỷ lệ bỏ học trong khu vực hoạt động.",
      en: "Supporting 12 schools, 45 villages, reducing dropout rate by 70% in the operating area.",
    },
    features: {
      vi: [
        "Chương trình nội trú cho học sinh xa",
        "Hỗ trợ học phí và sách giáo khoa",
        "Chăm sóc sức khỏe định kỳ",
        "Dạy kèm và bổ trợ kiến thức",
        "Hoạt động văn nghệ và thể thao",
      ],
      en: [
        "Boarding program for distant students",
        "Tuition and textbook support",
        "Regular health care",
        "Tutoring and knowledge support",
        "Cultural and sports activities",
      ],
    },
  },
];

export const getIdentityById = (id: string): Identity | undefined => {
  return identities.find((identity) => identity.id === id);
};

export const getIdentityByAddress = (address: string): Identity | undefined => {
  return identities.find(
    (identity) =>
      identity.contractAddress.toLowerCase() === address.toLowerCase()
  );
};
