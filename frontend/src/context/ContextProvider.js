import React, { createContext, useContext, useState } from 'react'

export const addProduct = createContext();

const ContextProvider = ({ children }) => {

  //online store
  const [productData, setProductData] = useState("")

    return (
        <>
            <addProduct.Provider value={{ productData, setProductData }}>
                {children}
            </addProduct.Provider>
        </>
    )
}

export default ContextProvider
