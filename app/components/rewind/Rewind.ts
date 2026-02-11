export type RewindCardData = {
  name: string;
  location: string;
  date: string;
  projectName: string;
  projectDescription: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const rewindCards: RewindCardData[] = [
  {
    name: "summer camp",
    location: "Hà Nội",
    date: "2019",
    projectName: "Summer Starter 2019",
    projectDescription:
      "Summer Starter 2019: F&B Business là chương trình trại hè trải nghiệm nghề nghiệp đầu tiên của YEO Vietnam, tập trung vào lĩnh vực Ẩm thực và Đồ uống (F&B), với hơn 20 bạn học sinh trong thời gian 7 ngày.",
    image: {
      src: "/yeo-team.jpg",
      alt: "Logo Yeo Vietnam",
      width: 1000,
      height: 1000,
    },
  },
  {
    name: "summer camp",
    location: "Hà Nội",
    date: "2020",
    projectName: "Summer Starter 2020",
    projectDescription:
      "Summer Starter 2020: How I Met My Future là chương trình trại hè trải nghiệm và định hướng nghề nghiệp dành cho học sinh THCS, tập trung vào 5 nhóm ngành chính: Kinh doanh, Truyền thông, Quản trị dịch vụ, Công nghệ và Nghệ thuật.",
    image: {
      src: "/yeo-team.jpg",
      alt: "Logo Yeo Vietnam",
      width: 1000,
      height: 1000,
    },
  },
  {
    name: "spring camp",
    location: "Hà Nội",
    date: "2021",
    projectName: "CAREER STARTER",
    projectDescription:
      "Career Starter Spring Camp là trại xuân hướng nghiệp dành cho học sinh cấp 3 được tổ chức vào mùa xuân 2021, tại ĐH Swinburne, Hà Nội.",
    image: {
      src: "/yeo-team.jpg",
      alt: "Logo Yeo Vietnam",
      width: 1000,
      height: 1000,
    },
  },
  {
    name: "summer camp",
    location: "Hà Nội & TP.HCM",
    date: "2022",
    projectName: "CAREER STARTER",
    projectDescription:
      "Career Starter 2022 là trại hè hướng nghiệp dành cho học sinh cấp 3 tại ĐH Swinburne, Hà Nội và TP.HCM. Tham gia 7 ngày trại hè, các bạn học sinh có cơ hội tìm hiểu về các nhóm ngành kinh tế, truyền thông và công nghệ - IT.",
    image: {
      src: "/yeo-team.jpg",
      alt: "Logo Yeo Vietnam",
      width: 1000,
      height: 1000,
    },
  },
  {
    name: "YEO VIETNAM - IVY PREP",
    location: "Hà Nội",
    date: "2022",
    projectName: "Career Glow Up",
    projectDescription:
      "YEO đồng hành cùng IVY PREP tổ chức chương trình Hướng nghiệp Career Glow Up, nơi các bạn học sinh được trải nghiệm các buổi học định hướng và các hoạt động như Thuyết trình về Vision Board cá nhân, Viết thư gửi bản thân",
    image: {
      src: "/yeo-team.jpg",
      alt: "Logo Yeo Vietnam",
      width: 1000,
      height: 1000,
    },
  },
  {
    name: "VHBC",
    location: "Hà Nội",
    date: "2022 & 2023",
    projectName: "Vietnam Business Case Competiton",
    projectDescription:
      "YEO đồng hành cùng IVY PREP tổ chức chương trình Hướng nghiệp Career Glow Up, nơi các bạn học sinh được trải nghiệm các buổi học định hướng và các hoạt động như Thuyết trình về Vision Board cá nhân, Viết thư gửi bản thân",
    image: {
      src: "/yeo-team.jpg",
      alt: "Logo Yeo Vietnam",
      width: 1000,
      height: 1000,
    },
  },
];
