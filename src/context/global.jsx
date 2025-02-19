import React, { createContext, useContext, useReducer } from "react";
import axios from 'axios';

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";

//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case GET_POPULAR_ANIME:
            return { ...state, popularAnime: action.payload, loading: false }
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false }
        case GET_UPCOMING_ANIME:
            return { ...state, upcomingAnime: action.payload, loading: false }
        case GET_AIRING_ANIME:
            return { ...state, airingAnime: action.payload, loading: false }
        case GET_PICTURES:
            return { ...state, pictures: action.payload, loading: false }
        default:
            return state;
    }
}

export const GlobalContextProvider = ({ children }) => {
    //initial state
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = React.useState('');

    //handle change
    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            state.isSearch = false;
        }
    }

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            searchAnime(search);
            state.isSearch = true;
        } else {
            state.isSearch = false;
            alert('Please enter a search term')
        }
    }

    //fetch popular anime
    const getPopularAnime = async () => {
        dispatch({ type: LOADING })
        const response = await axios.get(`${baseUrl}/top/anime?filter=bypopularity`);
        dispatch({ type: GET_POPULAR_ANIME, payload: response.data.data })
    }

    //fetch upcoming anime
    const getUpcomingAnime = async () => {
        dispatch({ type: LOADING })
        const response = await axios.get(`${baseUrl}/top/anime?filter=upcoming`);
        dispatch({ type: GET_UPCOMING_ANIME, payload: response.data.data })
    }

    //fetch airing anime
    const getAiringAnime = async () => {
        dispatch({ type: LOADING })
        const response = await axios.get(`${baseUrl}/top/anime?filter=airing`);
        dispatch({ type: GET_AIRING_ANIME, payload: response.data.data })
    }

    //search anime
    const searchAnime = async (anime) => {
        dispatch({ type: LOADING })
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        dispatch({ type: SEARCH, payload: response.data.data })
    }

    //get anime pictures
    const getAnimePictures = async (id) => {
        dispatch({ type: LOADING })
        const response = await axios.get(`https://api.jikan.moe/v4/characters/${id}/pictures`);
        dispatch({ type: GET_PICTURES, payload: response.data.data })
    }

    //initial render
    React.useEffect(() => {
        getPopularAnime();
    }, [])

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getUpcomingAnime,
            getAiringAnime,
            getAnimePictures
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}