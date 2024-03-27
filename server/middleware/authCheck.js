import { validateToken } from "../utils/auth.js"

const AuthCheck = () => {
    return (req, res, next) => {
        try {
            const token = req.body.token;

            if (!token) {
                return res.status(402).json({
                    message: "you are not authorized ",
                    success: false,
                })
            }
            const payload = validateToken(token);
            req.user = payload;
            next();
        } catch (error) {
            return res.json({
                message: error,
                success: false,
            })
        }
        next();
    }
}
export default AuthCheck