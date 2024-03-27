import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./blog";
// interface Data {
//     _id: string;
//     title: string;
//     description: string;
//     coverImage: string;
//     createdBy: string;
// }

// interface ExactData {
//     [key: string]: Data;
// }
const AllBlog = () => {
    const BaseUrl = "http://localhost:5000";
    const [allblogs, setAllBlogs] = useState<any[]>([]);
    useEffect(
        () => {
            const fetchallblog = async () => {
                const response = await axios.get(`${BaseUrl}/blog/fetchAllBlog`);
                // console.log(response);
                if (response) {
                    setAllBlogs(response.data.data);
                }
            }
            fetchallblog();
        }, []
    )

    return (
        <div className="allblog_container">
            <div className="grid">
                {
                    allblogs.map(
                        (item, index) => {
                            return <div key={index}>
                                <Blog key={item._id} blogId={item._id} imgUrl={item.coverImage} title={item.title} />
                            </div>
                        }
                    )
                }
            </div>

        </div>

    )
}

export default AllBlog