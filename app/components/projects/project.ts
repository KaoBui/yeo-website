type BaseSlide = {
  id: string;
  kind: "project" | "notice";
};

export type ProjectData = BaseSlide & {
  kind: "project";
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

export type NoticeSlide = BaseSlide & {
  kind: "notice";
  messageKey: "moreComing";
};

export type CarouselSlide = ProjectData | NoticeSlide;

export const projects: CarouselSlide[] = [
  {
    id: "project",
    kind: "project",

    title: "From beans to dreams",
    subtitle: "dự án",
    coverImage: "/workshop.jpg",
    imageAlt: "Logo Yeo Vietnam",
    buttonText: "tìm hiểu thêm",

    images: ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"],
    paragraphs: [
      "YEO Vietnam tin rằng mỗi em nhỏ đều mang trong mình một “hạt giống nghề nghiệp” đó là tiềm năng, ước mơ và khả năng riêng biệt của mỗi em. Nhưng giống như một hạt giống trong tự nhiên, không phải hạt nào cũng có đủ điều kiện để nảy mầm.",
      "Trong dự án này, YEO Vietnam sẽ tập trung xây dựng, cải tạo trường học, nhà vệ sinh, nước sạch cho các điểm trường còn nhiều hạn chế. Ngoài ra, YEO Vietnam cũng sẽ tập trung phát triển chương trình định hướng nghề nghiệp, là thế mạnh của YEO Vietnam để định hướng cho các em học sinh có những bước đi rõ ràng hơn cho tương lai, biết phát huy điểm mạnh kinh tế địa phương với những ngành và trường học phù hợp.",
    ],
  },
  {
    id: "summer-camp",
    kind: "project",

    title: "summer camp",
    subtitle: "trại hè hướng nghiệp",
    coverImage: "/summer-camp-yeo.jpg",
    imageAlt: "Logo Yeo Vietnam",
    buttonText: "tìm hiểu thêm",

    images: ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"],
    paragraphs: [
      "Summer Camp là trại hè trải nghiệm nghề nghiệp do YEO Vietnam tổ chức vào mùa hè hàng năm. Với mục tiêu đem tới cho các em học sinh mùa hè ý nghĩa với những trải nghiệm chuyên sâu trong các ngành nghề mà các em quan tâm",
      "Tại Summer Camp, các bạn học sinh tham gia sẽ có cơ hội tham gia vào những hoạt động thú vị của trại hè do chính đội ngũ nhân lực của YEO Vietnam lên ý tưởng và tổ chức",
    ],
  },
  {
    id: "vhbc",
    kind: "project",

    title: "Business Case Competition",
    subtitle: "Cuộc thi",
    coverImage: "/vhbc-final.jpg",
    imageAlt: "Project two cover",
    buttonText: "tìm hiểu thêm",

    images: ["/vhbc-final.jpg", "/vhbc-2022.jpg", "/vhbc-candidat.jpg"],
    paragraphs: [
      "VHBC - Vietnam High School Business Case Competition là cuộc thi giải quyết tình huống kinh doanh đầu tiên tại Việt Nam dành cho học sinh THPT, được tổ chức bởi The Trainee Club - YEO Vietnam - Student Consulting Group.",
      "Cuộc thi được xây dựng với mục tiêu tạo ra một môi trường học tập và trải nghiệm kinh doanh chuyên sâu cho các bạn trẻ có đam mê lĩnh vực Business, giúp học sinh phát triển các kỹ năng thực tiễn theo chuẩn doanh nghiệp, đồng thời hỗ trợ các bạn trong hành trình định hướng nghề nghiệp, chuẩn bị nền tảng vững chắc cho thế hệ nhà lãnh đạo kinh doanh tương lai.",
    ],
  },
  {
    id: "talkshow",
    kind: "project",

    title: "Pha chuyện",
    subtitle: "Talkshow",
    coverImage: "/talkshow.jpg",
    imageAlt: "Project three cover",
    buttonText: "tìm hiểu thêm",

    images: ["/talkshow.jpg", "/talkshow-2.jpg", "/talkshow-3.jpg"],
    paragraphs: [
      "Pha Chuyện là chuỗi talkshow được tổ chức tại nhiều trường Đại học trên toàn quốc, tạo không gian kết nối trực tiếp giữa sinh viên và các diễn giả – những người đi trước giàu kinh nghiệm. Tại đây, sinh viên có cơ hội cùng nhau “Pha chuyện” xoay quanh những vấn đề thực tế mà các bạn đang đối diện trong quá trình học tập, phát triển bản thân và chuẩn bị bước vào thị trường lao động.",
      "Thông qua Pha Chuyện, YEO Vietnam mong muốn trở thành cầu nối đồng hành cùng sinh viên trên nhiều chặng đường khác nhau, giúp các bạn có sự chuẩn bị vững vàng về tư duy, kỹ năng và định hướng nghề nghiệp trước khi chính thức bước vào hành trình “Người trẻ đi làm”.",
    ],
  },
  {
    id: "more-coming",
    kind: "notice",
    messageKey: "moreComing",
  },
];
