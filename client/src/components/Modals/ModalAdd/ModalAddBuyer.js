import React from 'react'
import {Modal,Form,Input,Select,Button,InputNumber} from 'antd';
import {createBuyer} from '../../../api/buyer';
import {notifyScreen} from '../../../utils/notify'

const ModalAddBuyer = ({hideModal,handleHideModal}) => {
    const handlerFormAdd=async (values)=>{
        try {
            let code = values.code || "";
            let name = values.name || "";
            let age = values.age || "";
            let sex = values.sex || "";
            let phone = values.phone || "";
            let address = values.address || "";
            let note = values.note || "";
            let buyer = {code,name,phone,address,note,sex,age}
            let res = await createBuyer(buyer);
            if (res.status === 200) {
              notifyScreen("success", res.data.statusCode, res.data.message);
              return handleHideModal();
            }
          } catch (error) {
            if (error.response) {
              if (error.response.data) {
                notifyScreen("error",error.response.data.statusCode,error.response.data.message)
              }
            }else{
              notifyScreen("error","500","Lỗi không xác định")
            }
        }
      }
    return (
        <Modal visible={hideModal} onCancel={handleHideModal} title="Thêm khách hàng" footer={null}>
            <Form onFinish={handlerFormAdd}>
                <span>Mã KH</span>
                <Form.Item 
                name="code"
                rules={[{ required: true, message: "Vui lòng nhập mã KH!" }]}
                >
                    <Input placeholder="Nhập mã KH - VD : 0001"/>
                </Form.Item>
                <span>Tên</span>
                <Form.Item 
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                    <Input placeholder="Nhập tên"/>
                </Form.Item>
                <span>Tuổi</span>
                <Form.Item 
                name="age"
                >
                    <InputNumber placeholder="Nhập tuổi"/>
                </Form.Item>
                <span>Giới tính</span>
                <Form.Item name="sex" rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}>
                    <Select placeholder="--Lựa chọn--">
                        <Select.Option key="1" value="male">
                            Nam 
                        </Select.Option>
                        <Select.Option key="2" value="female">
                            Nữ
                        </Select.Option>
                    </Select>
                </Form.Item>
                <span>Số điện thoại</span>
                <Form.Item name="phone">
                    <Input placeholder="Nhập số điện thoại"/>
                </Form.Item>
                <span>Địa chỉ</span>
                <Form.Item name="address">
                    <Input placeholder="Nhập địa chỉ"/>
                </Form.Item>
                <span>Ghi chú</span>
                <Form.Item name="note">
                    <Input.TextArea placeholder="Nhập ghi chú"/>
                </Form.Item>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <Form.Item style={{marginRight:"10px"}}>
                        <Button type="primary" danger onClick={handleHideModal}>Thoát</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Thêm</Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAddBuyer
