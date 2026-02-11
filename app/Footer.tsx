export default function Footer() {
  return (
    <footer>
      <div className="bg--blue-600 h-[80vh]">
        <div className="site-container flex h-full flex-col justify-between py-12">
          <p className="text-h1 leading-head text-white uppercase">
            đồng hành cùng <br></br> thế hệ trẻ việt nam
          </p>
          <div className="flex justify-between border-t border-neutral-50 pt-4 text-sm text-neutral-50">
            © {new Date().getFullYear()} YEO. All rights reserved.
            <p>
              Website by <a href="">Kao</a>{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
