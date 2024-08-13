"use client";

const HeaderArsitektur = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <h1 className="uppercase font-bold">
          Arsitektur Badan Perencanaan, Penelitian dan Pengembangan Daerah
          Tahun
        </h1>
        <select
          className="border-0 rounded-lg uppercase font-bold"
          name="Tahun Proses Bisnis"
          id="Tahun Proses Bisnis"
          defaultValue={2024}
        >
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
      </div>
    </>
  );
};

export default HeaderArsitektur;
