import React, { useState, useEffect } from "react";
import { Tabs, Form, Select, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Navbar from "../../components/Sale/Navbar";
import ScreenListProduct from "../../components/Sale/ScreenListProduct";
import ContentTab from "../../components/TabUp/ContentTab";
import { getProduct } from "../../api/product";
import { getBuyer } from "../../api/buyer";
import { notifyScreen } from "../../utils/notify";
import "./Sale.scss";

const Sale = () => {
  const [listProduct, setListProduct] = useState([]);
  const [listBuyer, setListBuyer] = useState([]);
  const [newTabIndex, setNewTabIndex] = useState(1);
  const [listTab, setListTab] = useState([
    { title: "Hóa đơn 1", key: "hd1", closeIcon: true, products: [] },
  ]);
  const [targetKeyTabCurrent, setTargetKeyCurrent] = useState("hd1");

  const __getListBuyer = async () => {
    try {
      let res = await getBuyer();
      if (res.status === 200) {
        return setListBuyer(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const __getListProduct = async () => {
    try {
      let res = await getProduct();
      if (res.status === 200) {
        return setListProduct(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const addTab = () => {
    if (listTab.length === 5) {
      return;
    }
    const activeKey = `hd${newTabIndex + 1}`;
    listTab.push({
      title: `Hóa đơn ${newTabIndex + 1}`,
      key: activeKey,
      products: [],
    });
    setListTab(listTab);
    return setNewTabIndex(newTabIndex + 1);
  };

  const removeTab = (targetKey) => {
    let newListTab = listTab.filter((tab) => tab.key != targetKey);
    if (targetKeyTabCurrent === targetKey) {
      setTargetKeyCurrent("hd1");
    }
    if (newListTab.length === 1) {
      setTargetKeyCurrent(newListTab[0].key);
    }
    return setListTab(newListTab);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      addTab();
    } else {
      removeTab(targetKey);
    }
  };

  const handleSelectProduct = (newProduct) => {
    let newListTab = listTab.map((tab) => {
      if (tab.key === targetKeyTabCurrent) {
        let count = 0;
        tab.products.map((product) => {
          if (newProduct._id === product._id) {
            product.countNum += 1;
            product.totalMoney = product.moneyOut * product.countNum;
            count++;
          }
          return product;
        });
        if (count>0) {
          return tab;
        }
        if (count === 0) {
          let keyIndexProduct = tab.products.length + 1;
          newProduct.keyIndex = keyIndexProduct;
          newProduct.totalMoney = newProduct.moneyOut;
          newProduct.countNum = 1;
          tab.products.push(newProduct);
        }
      }
      return tab;
    });
    return setListTab(newListTab);
  };

  const handleRemoveProduct =(id)=>{
    let newListTab = listTab.map((tab) => {
      if (tab.key === targetKeyTabCurrent) {
       let newListProduct= tab.products.filter((product) => product._id !=id)
       tab.products=[...newListProduct];
      }
      return tab;
    });
    return setListTab(newListTab);
  }

  useEffect(() => {
    __getListProduct();
    __getListBuyer();
  }, []);

  return (
    <div className="sale">
      <div className="sale-pc">
        <Navbar
          listProduct={listProduct.length > 0 ? listProduct : []}
          valueSelectProduct={handleSelectProduct}
        />
        <div className="sale-tab">
          <Tabs
            defaultActiveKey={targetKeyTabCurrent}
            activeKey={targetKeyTabCurrent}
            type="editable-card"
            size="middle"
            tabBarGutter={-16}
            onEdit={onEdit}
            onChange={(value) => setTargetKeyCurrent(value)}
          >
            {listTab.map((tab) => (
              <Tabs.TabPane
                tab={tab.title}
                key={tab.key}
                closeIcon={listTab.length > 1 ? false : true}
              >
                <ContentTab
                  listBuyer={listBuyer.length > 0 ? listBuyer : []}
                  keyBill={tab.title}
                  listSell={tab.products}
                  removeProduct={(id)=>handleRemoveProduct(id)}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
        <ScreenListProduct
          listProduct={listProduct.length > 0 ? listProduct : []}
          valueSelect={handleSelectProduct}
        />
      </div>
      <div className="sale-mobile"></div>
    </div>
  );
};

export default Sale;
