import jwt from "jsonwebtoken";

const checkTokken = (req, res, next) => {
  if (
    req.originalUrl.toLowerCase().trim() == "/api/user/login" ||
    req.originalUrl.toLowerCase().trim() == "/api/user/register" ||
    req.originalUrl.toLowerCase().trim() == "/" ||
    req.originalUrl.toLowerCase().trim() == "/api/user/get"
  ) {  //bắt đc cả chữ hoa và thêm khoảng cách
    next();
    return;
  }
  debugger
  const token = req?.headers?.token?.split(" ")[1]; //lấy ra tokken
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET); //jwtObject là đối tượng user
    const isExpired = Date.now() >= jwtObject.exp * 1000 //kiểm tra thời hạn của tokken
    if (isExpired) {
      res.status(500).json({
        message: 'Tokken is expired'
      })
      res.end();
    } else {
      console.log('Done check tokken');
      next();
    }

  } catch (error) {
    res.json({
      error
    })
    console.log(error);
  }
}


export default checkTokken