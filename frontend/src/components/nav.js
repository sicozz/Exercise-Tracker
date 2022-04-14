export default function Nav() {
  return (
    <nav className="bg-slate-600 w-full p-3 grid grid-cols-4">
      <div className="col-span-3">
        <ul className="flex space-x-4">
          <li>Exercise tracker</li>
          <li>Exercises</li>
          <li>Routines</li>
        </ul>
      </div>
      <p className="text-right">Hello</p>
    </nav>
  )
}
