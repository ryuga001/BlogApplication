import { DeleteRounded, SendRounded } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// type commentType = {
//     content: string,
//     userProfileImage: string,
//     userName: string,
// }
interface BlogType {
    blogId: string,
    imgUrl: string,
    title: string,
    description: string,
    createdDate: string,
    createdBy: string,

}
interface AuthorType {
    username: string,
    email: string,
    profileImage: string,
}

const BlogDescription = () => {
    const navigate = useNavigate();
    const [comment, setComment] = useState<string>("");
    const [currentUserID, setCurrentUserID] = useState<string>("");
    const { id } = useParams();
    const [blog, setBlog] = useState<BlogType>({
        blogId: "",
        imgUrl: "",
        title: "",
        description: "",
        createdDate: "",
        createdBy: "",

    })

    const BaseUrl = "http://localhost:5000";
    const [author, setAuthor] = useState<AuthorType>({
        username: "",
        email: "",
        profileImage: "",
    })
    const [AllComments, setAllComments] = useState<any[]>([]);
    const fetchBlog = async () => {
        const response = await axios.get(`${BaseUrl}/blog/fetchBlog/${id}`);
        let tempComments: any[] = [];
        if (response.data.success) {
            response.data.comment.forEach((item: any) => {
                tempComments.push({
                    content: item.content,
                    userProfileImage: item.createdBy.profileImage,
                    userName: item.createdBy.username,
                })
            })
            setAllComments(tempComments);
            // console.log(AllComments.length);
            setBlog({
                blogId: response.data.data._id,
                imgUrl: response.data.data.coverImage,
                title: response.data.data.title,
                description: response.data.data.description,
                createdDate: response.data.data.createdAt.substr(0, 10),
                createdBy: response.data.data.createdBy,

            });
        } else {
            console.log("error in fetchBlog")
        }
        const res = await axios.post(`${BaseUrl}/auth/fetchUser`, {
            authorID: response.data.data.createdBy,
            token: localStorage.getItem("token")
        });

        if (res.data.success) {
            setAuthor({
                username: res.data.data.username,
                email: res.data.data.email,
                profileImage: res.data.data.profileImage,
            })
            if (res.data.currentUserID === response.data.data.createdBy) {
                setDel(true);
            }
            setCurrentUserID(res.data.currentUserID);
        } else {
            console.log("error in fetchUser")
        }

    }
    useEffect(() => {
        fetchBlog();

    }, []);


    const [del, setDel] = useState<boolean>(false);
    const handleDelete = async () => {
        const res = await axios.delete(`${BaseUrl}/blog/deleteBlog/${id}`);
        if (res.data.success) {
            console.log("BlOG DELETED!")
            navigate("/");
        } else {
            console.log("Error occured in deleteBlog");
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await axios.post(`${BaseUrl}/blog/creteComment`, {
            createdBy: currentUserID,
            blogID: blog.blogId,
            content: comment
        })
        if (!res.data.success) {
            alert(res.data.message);
        }
        fetchBlog();
    }

    return (

        <div className="blogDescription_page">
            <div className="blog_container">

                <img src={`.${blog.imgUrl}`} alt="" />

                <div>

                    <div className="content_container">
                        <h2>{blog.title}</h2>

                        <div>
                            <p>{blog.description}</p>
                        </div>
                    </div>
                    <div className="blog_footer">
                        <div className="userDetails">
                            <img src={`${author.profileImage}`} alt='' />
                            <span>{author.username}</span>
                        </div>
                        <div className="addDetails">
                            {del && <DeleteRounded style={{ fontSize: 30, cursor: "pointer" }} onClick={handleDelete} />}
                            <span>{blog.createdDate}</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* COMMENTS  */}
            <div className="comment_container">
                <h2>Comments ( {AllComments.length} )</h2>
                {
                    (localStorage.getItem("token")) && <div className="inputBox">
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="comment" id="comment" placeholder="add a comment ..." onChange={(e) => setComment(e.target.value)} />
                            <button type="submit"><SendRounded /></button>
                        </form>
                    </div>
                }
                <div className="allcommentsbox">
                    {
                        AllComments.map((item, index) => {
                            return <div key={index}>
                                <img src={`${item.userProfileImage}`} alt="" />
                                <div className="userComment" >
                                    <h4>{item.userName}</h4>
                                    <span>{item.content}</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogDescription