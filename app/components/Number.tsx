"use client";
import Image from "next/image";

export default function Numbers() {
  return (
    <section id="numbers" className="">
      <div className="site-container grid grid-cols-12 gap-4">
        <div className="number-bloc col-start-1 col-end-5 row-start-1">
          <p className="text-h1 text--blue-600">+15</p>
          <p className="text-tertiary text-md uppercase">
            chương trình hướng nghiệp
          </p>
        </div>
        <div className="number-bloc col-start-5 col-end-10 row-start-1">
          <p className="text-h1 text--blue-600">+40</p>
          <p className="text-tertiary text-md uppercase">đối tác đồng hành</p>
        </div>
        <div className="number-bloc col-start-3 col-end-7 row-start-2">
          <p className="text-h1 text--blue-600">+50,000</p>
          <p className="text-tertiary text-md uppercase">
            người theo dõi trên các nền tảng
          </p>
        </div>
        <div className="number-bloc col-start-7 col-end-13 row-start-2">
          <p className="text-h1 text--blue-600">+10,000</p>
          <p className="text-tertiary text-md uppercase">
            phụ huynh, học sinh trên toàn quốc
          </p>
        </div>
      </div>
    </section>
  );
}
