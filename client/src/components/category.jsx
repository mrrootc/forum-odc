

export default function category(pros) {
  return (
    <div className="flex flex-row justify-between transition-transform border border-gray-500 rounded-md shadow-md x-2 i w-72 bg-slate-50 ">
      <img className="h-20 px-4 py-2 w-25" src={pros.image} alt={`Image de ${pros.name}`} />
      <div className="items-end justify-end px-4 py-4">
        <h2 className="font-mono first-letter:text-2xl">{pros.name}</h2>
      </div>
    </div>
  )
}
