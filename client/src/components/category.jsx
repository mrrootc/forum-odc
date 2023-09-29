

export default function category(pros) {
  return (
    <div className="flex flex-row mx-2 transition-transform border border-gray-500 rounded-md shadow-md bg-slate-50 ">
      <img className="h-20 px-4 py-2 w-15" src={pros.image} alt={`Image de ${pros.name}`} />
      <div className="px-4 py-4">
        <h2 className="font-mono first-letter:text-2xl">{pros.name}</h2>
      </div>
    </div>
  )
}
