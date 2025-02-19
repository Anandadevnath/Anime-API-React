import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import Sidebar from './Sidebar';
import { useGlobalContext } from '../context/global';

function Popular({ rendered }) {

  const { popularAnime, isSearch, searchResults } = useGlobalContext()

  const conditionalRender = () => {
    if (!isSearch && rendered === 'popular') {
      return popularAnime?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt="" />
          <p>{anime.title}</p>
        </Link>
      })
    } else {
      return searchResults?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt="" />
          <p>{anime.title}</p>
        </Link>
      })
    }
  }

  return (
    <div>
       <Sidebar />
      <div className='popular-anime'>
        {conditionalRender()}
      </div>
       
    </div>
  )
}

export default Popular