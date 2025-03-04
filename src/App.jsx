
function App() {
  return (
    <>
      <div className="min-w-screen min-h-screen">
        <div className="fixed bg-[#279AF1] h-[70px] w-[100vw] flex items-center justify-center">
          <h1 className="font-bold text-2xl">Facility Counter</h1>
        </div>
        <div className="pt-[90px] flex-col flex">
          <div className="h-[61vh] items-start justify-center flex">
            <div className=" h-[40%] w-[70%] px-[10vh]">
              <h1 className="font-bold text-xl mb-[10px]">Input all your comments Here</h1>
              <textarea className="px-[20px] pt-[10px] bg-[#D9D9D9] w-[100%] h-[40vh] rounded-[20px]" name="" id=""></textarea>
              <div className="w-[100%] h-[100px] items-center flex justify-center">
                <button className="bg-[#EA526F] h-[50px] px-[20px] rounded box hover:scale-110 hover:bg-[#E385FD] transition-all duration-300">Count Facility</button>
              </div>
            </div>
          </div>
          <div className="h-[40vh] w-[100%]">
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
