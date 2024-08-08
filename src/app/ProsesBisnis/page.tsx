import Table from "@/components/pages/ProsesBisnis/Table/Table";
import HeaderProsesBisnis from "@/components/pages/ProsesBisnis/HeaderProsesBisnis";
import {ButtonSc} from "@/components/common/Button/Button";

const ProsesBisnis = () => {

  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <HeaderProsesBisnis />
        <ButtonSc halaman_url="/ProsesBisnis/TambahData" typee="button">Tambah Data</ButtonSc>
      </div>
      <Table />
    </>
  );
};

export default ProsesBisnis;
