const SIGNUP_SUCCESS={
    statusCode:200,
    message:"Đăng kí thành công !"
}

const LOGIN_SUCCESS={
    statusCode:200,
    message:"Đăng nhập thành công !"
}

const USER_EXIST={
    statusCode:401,
    message:"Email hoặc username đã tồn tại !"
}

const USER_NOTEXIST={
    statusCode:401,
    message:"Username is not exist !"
}

const ERROR_SERVER={
    statusCode:500,
    message:"Server Error !"
}

const ERROR_TOKEN={
    statusCode:500,
    message:"Error save token !"
}

const ERROR_PASSWORD={
    statusCode:401,
    message:"Mật khẩu không đúng !"
}

const INVALID_TOKEN={
    statusCode:500,
    message:"Token invalid !"
}

const NOT_PERMISSON = {
    statusCode: 400,
    message: 'You are not permission'
}

const CREATE_PARTNER_SUCCESS = {
    statusCode: 200,
    message: 'Tạo NCC thành công !'
}
const UPDATE_PARTNER_SUCCESS = {
    statusCode: 200,
    message: 'Cập nhật NCC thành công !'
}

const DELETE_PARTNER_SUCCESS = {
    statusCode: 200,
    message: 'Xóa NCC thành công !'
}

const CREATE_UNIT_SUCCESS = {
    statusCode: 200,
    message: 'Tạo đơn vị thành công !'
}
const UPDATE_UNIT_SUCCESS = {
    statusCode: 200,
    message: 'Cập nhật đơn vị thành công !'
}

const DELETE_UNIT_SUCCESS = {
    statusCode: 200,
    message: 'Xóa đơn vị thành công !'
}

const CREATE_BUYER_SUCCESS = {
    statusCode: 200,
    message: 'Tạo khách hàng thành công !'
}
const UPDATE_BUYER_SUCCESS = {
    statusCode: 200,
    message: 'Cập nhật khách hàng thành công !'
}

const DELETE_BUYER_SUCCESS = {
    statusCode: 200,
    message: 'Xóa khách hàng thành công !'
}

const CREATE_TRANSACTION_SUCCESS = {
    statusCode: 200,
    message: 'Transaction thành công !'
}
const UPDATE_TRANSACTION_SUCCESS = {
    statusCode: 200,
    message: 'Update transaction success !'
}

const DELETE_TRANSACTION_SUCCESS = {
    statusCode: 200,
    message: 'Transaction is deleted !'
}

const CREATE_PRODUCT_SUCCESS = {
    statusCode: 200,
    message: 'Tạo sản phẩm thành công !'
}
const UPDATE_PRODUCT_SUCCESS = {
    statusCode: 200,
    message: 'Cập nhật sản phẩm thành công !'
}

const DELETE_PRODUCT_SUCCESS = {
    statusCode: 200,
    message: 'Sản phẩm dã được xóa thành công !'
}

const CREATE_CATEGORY_SUCCESS = {
    statusCode: 200,
    message: 'Tạo nhóm hàng thành công !'
}
const UPDATE_CATEGORY_SUCCESS = {
    statusCode: 200,
    message: 'Cập nhật nhóm hàng thành công !'
}

const DELETE_CATEGORY_SUCCESS = {
    statusCode: 200,
    message: 'Xóa nhóm hàng thành công !'
}

const CREATE_BILL_SELL_SUCCESS = {
    statusCode: 200,
    message: 'Hóa đơn đã được tạo !'
}
const UPDATE_BILL_SELL_SUCCESS = {
    statusCode: 200,
    message: 'Cập nhật hóa đơn thành công !'
}

const DELETE_BILL_SELL_SUCCESS = {
    statusCode: 200,
    message: 'Xóa hóa đơn thành công !'
}


const UPLOAD_FAILED = {
    statusCode: 500,
    message: 'Upload failed !'
}

const NO_FILE_SELECT = {
    statusCode: 400,
    message: 'No file selected !'
}

const EXIST_CODE_PARTNER = {
    statusCode: 400,
    message: 'Trùng mã nhà cung cấp vui lòng nhập lại !'
}

const EXIST_CODE_BUYER = {
    statusCode: 400,
    message: 'Trùng mã khách hàng vui lòng nhập lại !'
}

const EXIST_CODE_PRODUCT= {
    statusCode: 400,
    message: 'Trùng mã sản phẩm vui lòng nhập lại !'
}

module.exports={
    USER_EXIST,
    USER_NOTEXIST,
    ERROR_SERVER,
    SIGNUP_SUCCESS,
    LOGIN_SUCCESS,
    ERROR_TOKEN,
    ERROR_PASSWORD,
    INVALID_TOKEN,
    NOT_PERMISSON,
    CREATE_PARTNER_SUCCESS,
    UPDATE_PARTNER_SUCCESS,
    DELETE_PARTNER_SUCCESS,
    CREATE_BUYER_SUCCESS,
    UPDATE_BUYER_SUCCESS,
    DELETE_BUYER_SUCCESS,
    CREATE_UNIT_SUCCESS,
    UPDATE_UNIT_SUCCESS,
    DELETE_UNIT_SUCCESS,
    CREATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    CREATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    CREATE_BILL_SELL_SUCCESS,
    UPDATE_BILL_SELL_SUCCESS,
    DELETE_BILL_SELL_SUCCESS,
    UPLOAD_FAILED,
    NO_FILE_SELECT,
    EXIST_CODE_BUYER,
    EXIST_CODE_PARTNER,
    EXIST_CODE_PRODUCT
}