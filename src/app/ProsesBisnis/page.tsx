import Table from "@/components/pages/ProsesBisnis/Table/Table";
import HeaderProsesBisnis from "@/components/pages/ProsesBisnis/HeaderProsesBisnis";
import {ButtonSc} from "@/components/common/Button/Button";
import Image from "next/image";

const ProsesBisnis = () => {

  return (
    <>
      <div className="mb-3">
        <HeaderProsesBisnis />
      </div>
      <Table />
    </>
  );
};

export default ProsesBisnis;
