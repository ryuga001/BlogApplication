// import { useState } from "react";
import { LoginRounded, LogoutRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type PropsType = {
    User?: string,
    ImgUrl?: string,
}

const NavBar = ({ User, ImgUrl }: PropsType) => {
    const navigate = useNavigate();
    return (
        <div className="navbar-container">
            <nav>
                <div>
                    <div>

                        <img src="../images/Logo.png" alt="LOGO" />
                    </div>

                </div>
                <div className="user_continer"> {User && <img src={ImgUrl} alt=""></img>}

                    {
                        !User && <button onClick={() => navigate("/login")}><LoginRounded /></button>
                    }
                    {
                        User && <button>
                            <LogoutRounded onClick={() => {
                                navigate("/login")
                                localStorage.removeItem("token");
                            }} />
                        </button>
                    }

                </div>

            </nav>
        </div>
    )
}

export default NavBar