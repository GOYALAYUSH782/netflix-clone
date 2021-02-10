import React from 'react'
import './HomeScreen.css';
import Nav from '../Nav';
import Banner from '../Banner';
import requests from '../Requests';
import Row from '../Row';

function HomeScreen() {
  return (
    <div className='homescreen'>
      <Nav />
      <Banner />
      <Row
        title='NETFLIX ORIGINALS'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        title='Trending Now'
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title='Top Rated'
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        title='Acion Movies'
        fetchUrl={requests.fetchActionMovies}
        isLargeRow
      />
      <Row
        title='Horror Movies'
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title='Romance Moves'
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        title='Comedy Movies'
        fetchUrl={requests.fetchComedyMovies}
        isLargeRow
      />
      {/* <Row
        title='Documentaries'
        fetchUrl={requests.fetchDocumentaries}
      /> */}
    </div>
  )
}
 
export default HomeScreen
