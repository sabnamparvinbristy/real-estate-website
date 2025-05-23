import jwt from "jsonwebtoken"

// //FIX:

export const t= async (req, res) => {
    res.status(200).json({ message: "ttttttttttttt" })
};

export const shouldBeLoggedIn = async (req, res) => {

    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not Autjenticated!" })

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not valid!" })
    })

    res.status(200).json({ message: "you are autheticated" })

};

export const shouldBeAdmin = async (req, res) => {

}
