import React, { useState, useEffect } from "react";
import lodash from "lodash";
import Modal from "react-modal";
import { HeaderConatiner } from "../Layout";
import { FaTimes } from "react-icons/fa";
import { Button } from "../components/GlobalButton";
import { ProductList } from "../components/ProductList";
import { Form } from "../components/AddProductForm";
import LaodingSpinner from "../components/LoadingSpinner";
import styles from "../styles/shopApp.module.css";

export const ShopApp: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [numFavorites, setNumFavorites] = useState<number>(0);
  const [prodCount, setProdCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products").then((response) => {
      let jsonResponse = response.json();
      jsonResponse.then((rawData) => {
        let data = [];
        for (let i = 0; i < rawData.length; i++) {
          let updatedProd = rawData[i];
          data.push(updatedProd);
        }
        setProducts([...data]);
        setProdCount(data.length);
        setLoading(false);
      });
    });
  }, []);

  const favClick = (title: string) => {
    const prods = products;
    const idx = lodash.findIndex(prods, { title: title });
    let currentFavs = numFavorites;
    let totalFavs: any;

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs;
    } else {
      totalFavs = ++currentFavs;
      prods[idx].isFavorite = true;
    }
    setProducts(prods);
    setNumFavorites(totalFavs);
  };

  const handleModal = () => {
    setOpenModel(!openModel);
  };

  const onSubmit = (payload: {
    title: string | null;
    description: string | null;
    price: number | null;
  }) => {
    const updated = lodash.clone(products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price,
    });
    setProducts([...updated]);
    setProdCount(lodash.size(products) + 1);
    setOpenModel(false);
    setIsShowingMessage(true);
    setMessage("Adding Product...");
    // **this POST request doesn't actually post anything to any database**
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
        price: payload.price,
        description: payload.description,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        (function () {
          setTimeout(() => {
            setIsShowingMessage(false);
            setMessage("");
          }, 2000);
        })();
      });
  };

  return (
    <React.Fragment>
      {loading ? (
        <LaodingSpinner />
      ) : (
        <React.Fragment>
          <HeaderConatiner />
          <div
            className={["container", styles.main].join(" ")}
            style={{ paddingTop: 0 }}
          >
            <div className={styles.buttonWrapper}>
              <span role="button">
                {!isShowingMessage && (
                  <Button onClick={() => handleModal()}>
                    Send product proposal
                  </Button>
                )}
              </span>
              {isShowingMessage && (
                <div className={styles.messageContainer}>
                  <i>
                    {message}
                    <LaodingSpinner />
                  </i>
                </div>
              )}
            </div>
            <div className={styles.statsContainer}>
              <span>Total product: {prodCount}</span>
              {" - "}
              <span>Number of favorites: {numFavorites}</span>
            </div>
            {products && !!products.length ? (
              <ProductList products={products} onFav={favClick} />
            ) : (
              <div></div>
            )}
          </div>
          <React.Fragment>
            <Modal
              isOpen={openModel}
              className={styles.reactModalContent}
              overlayClassName={styles.reactModalOverlay}
            >
              <div className={styles.modalContentHelper}>
                <div
                  className={styles.modalClose}
                  onClick={() => handleModal()}
                >
                  <FaTimes />
                </div>
                <Form on-submit={onSubmit} />
              </div>
            </Modal>
          </React.Fragment>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
