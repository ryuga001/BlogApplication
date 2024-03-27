import { useNavigate } from "react-router-dom"

interface PrpsType {
    blogId: string,
    imgUrl: string,
    title: string,
}

const Blog = ({ blogId, imgUrl, title }: PrpsType) => {
    const navigate = useNavigate();
    return (
        <div className="single_blog_container">
            <div onClick={() => navigate(`/blog/${blogId}`)}>
                <img src={imgUrl} alt="" />

                <h3> {title.length > 27 ? title.substr(0, 27) + "..." : title}</h3>

            </div>
        </div>
    )
}

export default Blog