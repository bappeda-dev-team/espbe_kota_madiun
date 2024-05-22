import Table from "@/components/global/Table/Table";
import Link from "next/link";

const ProsesBisnis = () => {
  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <h1 className="uppercase font-bold ">
          Proses Bisnis Badan Perencanaan, Penelitian dan Pengembangan Daerah
          Tahun 2024
        </h1>
        <Link href="/ProsesBisnis/TambahData">
          <button className="bg-emerald-300 p-3 text-white rounded-lg hover:bg-emerald-500">
            tambah data
          </button>
        </Link>
      </div>
      <Table />
    </>
  );
};

export default ProsesBisnis;
