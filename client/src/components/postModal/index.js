import React, { useState } from "react";
import InputForm from "../formInput";
import axios from "axios";
import updated from "../../utils/update";
import { MainContext } from "../containerMain";

function PostModal({ setShow }) {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [language, setLanguage] = useState("");
    const [distributor, setDistributor] = useState("");
    const [date, setDate] = useState("");
    const [file, setFile] = useState("");

    const { setUpdate } = MainContext();

    const convertDate = new Date(date).toLocaleDateString("id", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleSubmit = async () => {
        const form = new FormData();

        form.append("cover", file);
        form.append("title", title);
        form.append("language", language);
        form.append("distributor", distributor);
        form.append("release_date", convertDate);
        form.append("director", director);

        const response = await axios.post("http://localhost:3001/film", form);
        updated(setUpdate);
        setShow(false);
    };

    return (
        <div className="absolute bg-slate-400/50 w-full h-full top-0 flex justify-center items-center">
            <section className="bg-slate-100 w-1/2 rounded-md shadow-xl p-4 relative">
                <section>
                    <button
                        className="bg-red-500 p-1 rounded-sm text-white"
                        onClick={() => setShow(false)}
                    >
                        Kembali
                    </button>
                </section>
                <section>
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
                    <section className="mt-2">
                        <label
                            htmlFor={"tanggal"}
                            className="font-semibold text-lg cursor-pointer"
                        >
                            Foto
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            accept="image/*"
                            id="tanggal"
                            className="w-full p-2 rounded-sm shadow-md"
                        />
                    </section>
                    <button
                        className="mt-2 p-2 bg-blue-500 w-full text-white rounded-sm"
                        onClick={() => handleSubmit()}
                    >
                        Tambah
                    </button>
                </section>
            </section>
        </div>
    );
}

export default PostModal;
