import customError from "../utils/customErr";

const manageError = (err, req, res, next) => {
    console.log(err);
    if (err instanceof customError) {
        return res.status(err.statusCode|| 400).json({
            message: err.message,
            status: "failed",
        });
    }
    return res.status(500).json({
        message:err.message || "something went wrong",
        status: "failed",
    });
}

export default manageError;