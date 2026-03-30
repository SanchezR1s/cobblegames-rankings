import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-7xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-xl font-semibold text-white mb-2">Página no encontrada</h1>
        <p className="text-gray-400 text-sm mb-8">
          El jugador o la página que buscas no existe.
        </p>
        <Link href="/rankings" className="btn-primary">
          Ver Rankings
        </Link>
      </div>
    </div>
  );
}
