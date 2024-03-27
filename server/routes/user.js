import { Router } from "express";
import User from "../models/user.js";
import { createTokenForUser, validateToken } from "../utils/auth.js";
const router = Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(406).json({
            message: "Complete All Fields ",
            success: false,
        })
    }
    const newUser = await User.findOne({ email });
    if (newUser) {
        return res.status(406).json({
            message: "User Already Exists",
            success: false,
            data: newUser,
        })
    }
    await User.create({
        username,
        email,
        password,
    })
    // await User.bulkSave()
    return res.status(200).json({
        message: "User successfully registered",
        success: true,
        // data: newUser,
    })
})


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(406).json({
            message: "Complete All Fields ",
            success: false,
        })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "User Not Registered",
            success: false,
        })
    }
    if (user.password !== password) {
        return res.status(406).json({
            message: "Incorrect Password",
            success: false,
        })
    }
    // const token = "token";

    const token = createTokenForUser(user);
    return res.status(200).json({
        message: "Signed In Successfully",
        success: true,
        user: user,
        token: token,
    })
})

// router.get('/logout', (req, res) => {
//     try {
//         return res.clearCookie("token").json({
//             message: "Logout Successfully",
//             success: true,
//         });
//     } catch (error) {
//         res.status(401).json({ status: 401, error })
//     }
// })

router.post('/getUser', async (req, res) => {
    const id = validateToken(req.body.token)._id;
    if (id) {
        const user = await User.findOne({ _id: id }).select("-password");
        return res.json({
            data: user,
        })
    } else {
        return res.json({
            msg: "token not received",
        })
    }
})
router.post('/fetchUser', async (req, res) => {
    const id = req.body.authorID;
    const currentUser = validateToken(req.body.token)._id;
    if (id) {
        const user = await User.findOne({ _id: id }).select("-password");
        return res.json({
            message: "user not found",
            success: true,
            data: user,
            currentUserID: currentUser,
        })
    } else {
        return res.json({
            message: "user not found",
            success: false,
        })
    }
})

export default router;