import { useEffect, useState } from "react";
import "./App.css";
import PostModal from "./components/postModal";
import { deleteFilm, getFilm } from "./services/filmService";
import { MainContext } from "./components/containerMain";
import updated from "./utils/update";
import EditModal from "./components/editModal";
import Loading from "react-loading";

function App() {
    const [films, setFilms] = useState([]);
    const [showModalPost, setShowModalPost] = useState(false);
    const [id, setId] = useState();
    const [btn, setBtn] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const { update, setUpdate } = MainContext();

    useEffect(() => {
        getFilm().then((res) => {
            const { data } = res;
            setFilms(data.data);
        });
    }, [update]);

    const deleteHandle = async (id) => {
        setBtn(true);
        await deleteFilm(id);
        updated(setUpdate);
        setBtn(false);
    };

    return (
        <div className="App border mx-auto h-screen flex justify-center">
            {showModalPost && <PostModal setShow={setShowModalPost} />}
            {showModalEdit && <EditModal setShow={setShowModalEdit} id={id} />}
            <main className="w-5/6">
                <h1 className="mt-5 text-2xl font-semibold">test</h1>
                <button
                    className="bg-blue-500 text-white rounded-md py-1 px-2 mt-2"
                    onClick={() => setShowModalPost(!showModalPost)}
                >
                    Tambah
                </button>
                <section className="gap-2 mt-5 grid lg:grid-cols-3 ">
                    {!films ? (
                        <h1>tidak ada data</h1>
                    ) : (
                        films?.map((film, i) => {
                            return (
                                <div
                                    key={i}
                                    className="flex gap-2 shadow-md   px-3 py-2 rounded-md bg-slate-300 transition hover:scale-95 "
                                >
                                    <img
                                        src={`https://testanod.s3.us-east-2.amazonaws.com/${film.cover}`}
                                        // src="https://sdasaa.s3.us-east-2.amazonaws.com/code-snapshot.png"
                                        alt="sda"
                                        className="w-[7rem] aspect-[9/16] object-cover rounded-sm"
                                    />
                                    <section className="w-full h-full">
                                        <h2 className="text-xl font-semibold">
                                            {film.title}
                                        </h2>
                                        <section className="mt-1 ">
                                            <p>Tayang : {film.release_date}</p>
                                            <p>Sutradara : {film.director}</p>
                                            <p>Bahasa : {film.language}</p>
                                            <p>
                                                Distributor: {film.distributor}
                                            </p>
                                        </section>
                                        <section className="mt-8 flex justify-end gap-2">
                                            <button
                                                className="bg-yellow-500 w-14 rounded-sm p-1 font-bold text-white"
                                                onClick={() => {
                                                    setShowModalEdit(
                                                        !showModalEdit
                                                    );
                                                    setId(film.id);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteHandle(film.id);
                                                }}
                                                disabled={btn}
                                                className="bg-red-500 w-14 rounded-sm p-1 font-bold text-white grid place-content-center"
                                            >
                                                {btn ? (
                                                    <Loading
                                                        type="spin"
                                                        className="scale-50 "
                                                    />
                                                ) : (
                                                    "Hapus"
                                                )}
                                            </button>
                                        </section>
                                    </section>
                                </div>
                            );
                        })
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
