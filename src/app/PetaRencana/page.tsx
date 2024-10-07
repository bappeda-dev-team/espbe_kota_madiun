"use client"

import Table from "@/components/pages/PetaRencana/Table";
import HeaderPetaRencana from "@/components/pages/PetaRencana/HeaderPetaRencana";

const PetaRencana = () => {

  return(
    <>
      <div className="flex flex-col mb-4">
          <HeaderPetaRencana />
      </div>
      <Table />
    </>
  )
}

export default PetaRencana;
