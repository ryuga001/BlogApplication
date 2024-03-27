import { Home } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface FormValues {
    title: string;
    description: string;
    coverImage: string;
    token: string | null;
}


const AddBlog = () => {
    const navigate = useNavigate();
    const BaseUrl = "http://localhost:5000";
    const [formValues, setFormValues] = useState<FormValues>({

        title: '',
        description: '',
        coverImage: "./public/images/defaultCoverImageBlog.png",
        token: localStorage.getItem("token"),
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const [image, setImage] = useState<string>("./public/images/defaultCoverImageBlog.png");


    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (photo) {
            const formData = new FormData();
            formData.append("photo", photo);
            const response = await axios.post(`${BaseUrl}/blog/upload`, formData);
            if (!response) {
                console.log("Not Getting Response");
            }
            else {
                setImage(
                    `./public/images/${response.data.filename}`
                );
                setFormValues((prevState) => ({
                    ...prevState, coverImage: `./public/images/${response.data.filename}`
                }))
            }
        }
    };

    /*
        error : coverImage is not changing >>>>
    */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post(`${BaseUrl}/blog/createBlog`, formValues);
        console.log(response);
    }
    return (
        <div className='AddBlogPage'>
            <div onClick={() => navigate("/")}>
                <Home />
            </div>
            <div className='coverImage'>
                <img src={image} alt='' />
            </div>
            <div className='blogDescription'>
                <form onSubmit={handleUpload}>
                    <label htmlFor='photo' >Cover Image :</label>
                    <input type='file' id='photo' name='photo' onChange={(e) => (setPhoto(e.target.files ? e.target.files[0] : null))} ></input>
                    <button type='submit'>upload</button>
                </form>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <textarea
                            id="title"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                    </div>
                    <button type="submit">Add</button>
                </form>

            </div>
        </div>
    )
}

export default AddBlog