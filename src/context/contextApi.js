import React, { createContext, useState, useEffect } from 'react';
import { fetchDataFromApi } from "../utils/api"

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectCategories, setSelectCategories] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCatagoryData(selectCategories);
    }, [selectCategories]);


    const fetchSelectedCatagoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`)
            .then(({contents}) => {
                console.log(contents);
                setSearchResults(contents);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };




    return (
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectCategories,
                setSelectCategories,
                mobileMenu,
                setMobileMenu
            }}
        >
            {props.children}
        </Context.Provider>
    )

};