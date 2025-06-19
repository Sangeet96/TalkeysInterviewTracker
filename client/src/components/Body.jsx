import React, { useEffect } from 'react'
import {useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendUrl = import.meta.env.VITE_API_URL;

const Body = () => {
    const [form, setform] = useState({ candidate: "", role: "", status: "" });
    const [candidates, setcandidates] = useState([]);

    const getInfo = async () => {
        console.log("Backend URL:", backendUrl);
        try {
            let req = await fetch(`${backendUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!req.ok) {
                throw new Error(`Error: ${req.status}`);
            }
            let candidates = await req.json();
            console.log(candidates);
            setcandidates(candidates);
        } catch (error) {
            console.error('Failed to fetch candidates:', error);
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savecandidate = async () => {
        if (form.candidate === "" || form.role === "" || form.status === "") {
            toast.error("Please fill all the fields");
        }
        else {
            setcandidates([...candidates, { ...form, id: uuidv4() }]);
            let res = await fetch(`${backendUrl}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) });

            console.log([...candidates, form]);
            setform({ candidate: "", role: "", status: "" });
            toast("🦄 Candidate Saved!!");
        }
    }

    const handledelete = async (id) => {
        const newcandidates = candidates.filter((candidate) => candidate.id !== id);
        setcandidates(newcandidates);
        let res = await fetch(`${backendUrl}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        toast("🦄 Deleted Successfully!!");
    }

    const handleEdit = async (id) => {
        const editCandidate = candidates.filter((candidate) => candidate.id === id);
        const newcandidates = candidates.filter((candidate) => candidate.id !== id);
        await fetch(`${backendUrl}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) });
        setcandidates(newcandidates);
        setform({ ...editCandidate[0], id: id });
    }
    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce} />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white">
                <div className="Container 2xl:w-[55vw] lg:w-[77vw] rounded-2xl">
                    <input value={form.candidate} onChange={handlechange} name='candidate' className='h-12 p-2 w-full text-black rounded-lg' type="text" placeholder='Enter the Candidate Name' />
                    <input value={form.role} onChange={handlechange} name='role' className='h-12 mt-2 p-2 w-full text-black rounded-lg' type="text" placeholder='Enter the Role Applied' />
                    <div className=' w-full mt-2 flex justify-between gap-2'>
                        <div className="pass w-3/4 flex items-center relative">
                            <input value={form.status} onChange={handlechange} name='status' className='h-12 p-2 w-full text-black rounded-lg' type="status" id='status' placeholder='Enter the Application Status' />
                        </div>
                        <button onClick={savecandidate} className='w-1/4 rounded-xl flex justify-center items-center gap-2 text-base sm:text-lg'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="loop"
                                delay="1000"
                                colors="primary:#ffffff"
                                style={{ width: "26px", height: "26px" }}>
                            </lord-icon>
                            Save</button>
                    </div>

                    <div className="relative shadow-md sm:rounded-lg mt-2 overflow-y-auto h-[53vh]">
                        <table className=" w-full text-sm text-left rtl:text-right text-white table-fixed">
                            <thead className="sm:text-base text-xs text-white uppercase table_head h-14">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-1/3">
                                        Candidate Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 w-1/4 ">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3 w-1/4">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 w-1/6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            {candidates.length === 0 && <div className='text-lg'> No Candidate in Process</div>}
                            {candidates.length != 0 && <tbody>
                                {candidates.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="px-6 py-4 font-medium break-words">
                                            <a href={item.candidate} target="_blank">{item.candidate}</a>
                                        </td>
                                        <td className="px-6 py-4 font-medium break-words">
                                            {item.role}
                                        </td>
                                        <td className="px-6 py-4 font-medium break-words">
                                            {item.status}
                                        </td>
                                        <td className="px-6 py-4 text-right flex flex-wrap sm:flex-nowrap justify-center items-center gap-2">
                                            <div className='flex items-center justify-center cursor-pointer min-w-6 min-h-6'><img onClick={() => { { handleEdit(item.id) } }} src="icons/Edit.svg" alt="" /></div>
                                            <div onClick={() => { { handledelete(item.id) } }} className='flex items-center justify-center cursor-pointer'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="loop-on-hover"
                                                    colors="primary:#ffffff"
                                                    delay="500"
                                                    style={{ width: "24px", height: "24px" }}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body