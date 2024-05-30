import Table from "@/components/pages/ProsesBisnis/Table/Table";
import HeaderProsesBisnis from "@/components/pages/ProsesBisnis/HeaderProsesBisnis";
import Button from "@/components/common/Button/Button";

const ProsesBisnis = () => {

  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <HeaderProsesBisnis />
        <Button halaman_url="/ProsesBisnis/TambahData" typee="reset">Tambah Data</Button>
      </div>
      <Table />
    </>
  );
};

export default ProsesBisnis;
