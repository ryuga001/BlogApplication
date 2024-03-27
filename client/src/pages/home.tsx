import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import AllBlog from "../components/allblogs";
import { AddAPhotoRounded, AddBoxRounded, AddCircleRounded } from "@mui/icons-material";
type userType = {
    username?: string,
    email?: string,
    profileImage?: string,
}
const Home = () => {
    const BaseUrl = "http://localhost:5000";
    const [user, setUser] = useState<userType>({
        username: "",
        email: "",
        profileImage: ""
    });
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {

            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.post(`${BaseUrl}/auth/getUser`, {
                    token: token
                }
                )
                if (response) {
                    setUser({
                        username: response.data.data.username,
                        email: response.data.data.email,
                        profileImage: response.data.data.profileImage

                    })
                }

            } else {
                console.log("NOTING");
            }
        }
        fetchUser();
    }, [])
    return (
        <div className="home_container">
            <NavBar User={user.username} ImgUrl={user.profileImage} />
            {(user.username) &&

                <div className="addblogcontainer">
                    <button onClick={() => navigate("/addBlog")}>Create a blog
                    </button>
                </div>

            }

            <AllBlog />

        </div >
    )
}

export default Home