import React, { useEffect, useState } from "react";
import InputForm from "../formInput";
import updated from "../../utils/update";
import { MainContext } from "../containerMain";
import { editFilm, getFilmById } from "../../services/filmService";
import { IoCloudUploadOutline } from "react-icons/io5";
import Loading from "react-loading";
import env from "../../utils/environment";
import { TbArrowBackUp } from "react-icons/tb";

function EditModal({ setShow, toast, id }) {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [language, setLanguage] = useState("");
    const [distributor, setDistributor] = useState("");
    const [date, setDate] = useState("");
    const [file, setFile] = useState("");
    const [btn, setBtn] = useState(false);
    const [preview, setPreview] = useState("");

    const { setUpdate } = MainContext();

    useEffect(() => {
        getFilmById(id).then((res) => {
            const { data } = res.data;

            setTitle(data.title);
            setDirector(data.director);
            setLanguage(data.language);
            setDistributor(data.distributor);
            setDate(data.release_date);
            setPreview(data.cover);
        });
    }, []);
    const handleSubmit = async () => {
        setBtn(true);
        const form = new FormData();

        form.append("cover", file ? file : preview);
        form.append("title", title);
        form.append("language", language);
        form.append("distributor", distributor);
        form.append("release_date", date);
        form.append("director", director);

        const p = await toast.promise(editFilm(id, form), {
            pending: "Sedang Mengedit Film",
        });

        if (p.data.status) {
            updated(setUpdate);
            setShow(false);
            setBtn(false);
            toast.success("Film berhasil diedit");
        } else {
            setBtn(false);
            toast.error(p.data.msg);
        }
    };

    return (
        <div className="absolute bg-slate-400/50 w-full h-full top-0 flex justify-center items-center z-50">
            <section className="bg-slate-100 w-1/2 rounded-md shadow-xl p-4 relative">
                <section>
                    <button
                        className="bg-red-500 p-1 rounded-sm text-white"
                        onClick={() => setShow(false)}
                    >
                        <TbArrowBackUp size={"1.4rem"} />
                    </button>
                </section>

                <section>
                    <section className="flex gap-5">
                        <div>
                            <InputForm
                                id={"judul"}
                                setValue={setTitle}
                                value={title}
                                label={"Judul"}
                                placeholder={"Judul..."}
                            />
                            <InputForm
                                id={"sutradata"}
                                setValue={setDirector}
                                value={director}
                                label={"Sutradata"}
                                placeholder={"sutradara..."}
                            />
                            <InputForm
                                id={"bahas"}
                                setValue={setLanguage}
                                value={language}
                                label={"Bahasa"}
                                placeholder={"bahasa..."}
                            />
                            <InputForm
                                id={"distributor"}
                                setValue={setDistributor}
                                value={distributor}
                                label={"Distributor"}
                                placeholder={"distributor..."}
                            />
                            <section className="mt-2">
                                <label
                                    htmlFor={"tanggal"}
                                    className="font-semibold text-lg cursor-pointer"
                                >
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    id="tanggal"
                                    value={date}
                                    className="w-full p-2 rounded-sm shadow-md"
                                />
                            </section>
                        </div>

                        <section className="mt-2 w-1/2">
                            <label
                                htmlFor={"foto"}
                                className="font-semibold text-lg cursor-pointer "
                            >
                                <div className="shadow-xl border-dashed border-2 border-black w-full h-full max-h-full  grid place-content-center rounded-md text-4xl text-center p-5">
                                    {preview ? (
                                        <img
                                            src={
                                                preview.includes("blob")
                                                    ? preview
                                                    : env.base_url_image +
                                                      "/" +
                                                      preview
                                            }
                                            className="h-[21rem] w-full object-contain"
                                        />
                                    ) : (
                                        <>
                                            <span className="grid place-content-center">
                                                <IoCloudUploadOutline />
                                            </span>
                                            <p className="text-md font-semibold">
                                                Upload Cover
                                            </p>
                                        </>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    try {
                                        const prev = URL.createObjectURL(
                                            e.target.files[0]
                                        );
                                        setPreview(prev);
                                        setFile(e.target.files[0]);
                                    } catch {
                                        return;
                                    }
                                }}
                                accept="image/*"
                                hidden
                                id="foto"
                                className="w-full p-2 rounded-sm shadow-md"
                            />
                        </section>
                    </section>

                    <button
                        className="mt-2 p-2 bg-blue-500 w-full text-white rounded-sm h-[2.6rem] grid place-content-center"
                        disabled={btn}
                        onClick={() => handleSubmit()}
                    >
                        {btn ? (
                            <Loading type="spin" className="scale-50 " />
                        ) : (
                            "Edit"
                        )}
                    </button>
                </section>
            </section>
        </div>
    );
}

export default EditModal;
