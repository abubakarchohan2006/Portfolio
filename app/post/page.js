"use client"

import { useEffect, useState } from "react"

export default function Page() {
    const [form, setform] = useState({
        title: "",
        desc: "",
        isProject: false,
        link: ""
    })

    const addPost = async () => {
        const response = await fetch("http://localhost:3000/backend/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: `${form.title}`,
                desc: `${form.desc}`,
                isproject: `${form.isProject}`,
                link:`${form.link}`
            }),
        });

        setform({
        title: "",
        desc: "",
        isProject: false,
        link: ""
    })
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setform({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (<>
        <div className="flex flex-col gap-4 ">
            <input name="title" onChange={(e) => handleChange(e)} value={form.title} type="text" className="bg-white border" placeholder="Enter the Title" />
            <input name="desc" onChange={(e) => handleChange(e)} value={form.desc} type="text" className="bg-white border" placeholder="Enter the desc" />
            <input name="link" onChange={(e) => handleChange(e)} value={form.link} type="text" className="bg-white border" placeholder="Enter the Link" />
            <input
                name="isProject"
                type="checkbox"
                checked={form.isProject}
                onChange={handleChange}
            />
            <button onClick={()=>addPost()} className="border cursor-pointer">Post it</button>
        </div>
    </>)
}