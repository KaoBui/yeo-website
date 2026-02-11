export type ProjectData = {
  id: string;

  // Card (compact)
  title: string;
  subtitle: string;
  coverImage: string;
  imageAlt: string;
  buttonText: string;

  // Overlay (expanded)
  images: string[];
  paragraphs: [string, string];
};

export const projects: ProjectData[] = [
  {
    id: "vhbc",

    title: "Business Case Competition",
    subtitle: "Cuộc thi",
    coverImage: "/hero-1.jpg",
    imageAlt: "Project two cover",
    buttonText: "tìm hiểu thêm",

    images: ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"],
    paragraphs: [
      "Premier paragraphe projet 2.",
      "Deuxième paragraphe projet 2.",
    ],
  },
  {
    id: "summer-camp",

    title: "summer camp",
    subtitle: "trại hè hướng nghiệp",
    coverImage: "/hero-1.jpg",
    imageAlt: "Logo Yeo Vietnam",
    buttonText: "tìm hiểu thêm",

    images: ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"],
    paragraphs: [
      "Summer Camp là trại hè trải nghiệm nghề nghiệp do YEO Vietnam tổ chức vào mùa hè hàng năm. Với mục tiêu đem tới cho các em học sinh mùa hè ý nghĩa với những trải nghiệm chuyên sâu trong các ngành nghề mà các em quan tâm",
      "Tại Summer Camp, các bạn học sinh tham gia sẽ có cơ hội tham gia vào những hoạt động thú vị của trại hè do chính đội ngũ nhân lực của YEO Vietnam lên ý tưởng và tổ chức",
    ],
  },

  {
    id: "talkshow",

    title: "Pha chuyện",
    subtitle: "Talkshow",
    coverImage: "/hero-1.jpg",
    imageAlt: "Project three cover",
    buttonText: "tìm hiểu thêm",

    images: ["/hero-1.jpg", "/hero-1.jpg", "/hero-1.jpg"],
    paragraphs: [
      "Premier paragraphe projet 3.",
      "Deuxième paragraphe projet 3.",
    ],
  },
];
