import {notification} from 'antd'

export const notifyScreen = (type,message,description)=>{
    return notification[type]({
        message:message,
        description:description
    })
}
   
