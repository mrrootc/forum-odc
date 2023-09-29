

export default function Question(pros) {
  return (

  <div className="flex flex-row flex-wrap max-w-screen-xl my-3">

  <div className=" w-[900px] justify-center ml-9">
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold">{pros.name}</h2>
      <p className="text-gray-600">Description du questionnaire...</p>
    </div>
  </div>
</div>
  )
}
