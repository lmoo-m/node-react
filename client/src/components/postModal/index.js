import React, { useState } from "react";
import InputForm from "../formInput";
import { TbArrowBackUp } from "react-icons/tb";
import updated from "../../utils/update";
import { MainContext } from "../containerMain";
import Loading from "react-loading";
import { IoCloudUploadOutline } from "react-icons/io5";
import { postFilm } from "../../services/filmService";

function PostModal({ setShow, toast }) {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [language, setLanguage] = useState("");
    const [distributor, setDistributor] = useState("");
    const [date, setDate] = useState("");
    const [file, setFile] = useState("");
    const [btn, setBtn] = useState(false);
    const [preview, setPreview] = useState("");

    const { setUpdate } = MainContext();

    const handleSubmit = async () => {
        setBtn(true);
        const form = new FormData();

        form.append("cover", file);
        form.append("title", title);
        form.append("language", language);
        form.append("distributor", distributor);
        form.append("release_date", date);
        form.append("director", director);

        postFilm(form).then((res) => {
            if (res.data.status) {
                updated(setUpdate);
                setShow(false);
                setBtn(false);
                toast.success("Film berhasil Upload");
                return;
            }
            toast.error(res.data.msg);
            setBtn(false);
        });
    };

    return (
        <div className="absolute bg-slate-400/50 w-full h-full top-0 flex justify-center items-center">
            <section className="bg-slate-100 w-1/2 rounded-md shadow-xl p-4 relative">
                <section>
                    <button
                        className="bg-red-500 p-1 rounded-sm text-white flex items-center gap-2"
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
                                            alt="preview"
                                            src={preview}
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
                            "Tambah"
                        )}
                    </button>
                </section>
            </section>
        </div>
    );
}

export default PostModal;
