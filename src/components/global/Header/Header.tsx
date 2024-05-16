function Header() {
    return(
        <>
            <div className="flex items-center border-b h-[77px] border-stone-300">
                    <div className="flex justify-between flex-row w-full p-5">
                        <div className="text-page flex flex-row">
                            <h1 className="text-stone-300">kota /</h1>
                            <h1 className="ml-3">Proses Bisnis</h1>
                        </div>
                        <input type="text" className="bg-stone-300 rounded-lg px-5" placeholder="Search"/>
                    </div>
            </div>
        </>
    )
}

export default Header