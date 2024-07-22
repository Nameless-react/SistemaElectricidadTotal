export default function Inventario() {
    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-4xl font-bold">Gestion de Inventarios</h1>
            <div className="flex gap-2 mt-10">
                <div className="bg-blue-600 p-10 rounded-lg">
                    <h2 className="text-2xl font-bold">Inventario de materiales</h2>
                </div>
                <div className="bg-main-orange p-10 rounded-lg">
                    <h2 className="text-2xl font-bold">Inventario de Equipo</h2>
                </div>
            </div>
        </div>
    );
}