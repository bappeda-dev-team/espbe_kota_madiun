import Table from "@/components/global/Table/Table";
import HeaderProsesBisnis from "@/components/pages/ProsesBisnis/HeaderProsesBisnis";
import Link from "next/link";

const ProsesBisnis = () => {
  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <HeaderProsesBisnis />
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
