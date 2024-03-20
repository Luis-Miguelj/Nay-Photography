export function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-white h-24 px-10 overflow-hidden shadow fixed ">
      <div className="flex space-x-5">
        <img src="/logo-nay.jpg" alt="logo" className="h-20" />
        <ul className="flex gap-3 text-xs items-center font-medium">
          <a
            href="/"
            className="p-1 rounded hover:bg-purple-400 hover:bg-opacity-40 transition-all duration-300"
          >
            Inicio
          </a>
          <a
            href="/sobre-mim"
            className="p-1 rounded hover:bg-purple-400 hover:bg-opacity-40 transition-all duration-300"
          >
            Sobre mim
          </a>
          <a
            href="/contato"
            className="p-1 rounded hover:bg-purple-400 hover:bg-opacity-40 transition-all duration-300"
          >
            Contato
          </a>
        </ul>
      </div>
      <div>
        <h1>Conta</h1>
      </div>
    </header>
  )
}
