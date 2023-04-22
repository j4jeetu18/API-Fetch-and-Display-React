import React from 'react'
import Post from './Post'
import { Pagination } from '@mui/material'
import Filters from './Filters'

function App() {
  const [fetchedData, setFetchedData] = React.useState()
  const [activePage, setActivePage] = React.useState(1)
  const [searchByFilter, setSearchByFilter] = React.useState([])

  React.useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then(res => res.json())
      .then(data => setFetchedData(data.posts))
  }, [])

  function getUniqueTags() {
    let uniqueTags = new Set()
    fetchedData.map((post) =>
      post.tags.map((tag) => uniqueTags.add(tag))
    )
    return Array.from(uniqueTags)
  }
  
  //fetched data is not null only when the async request of fetch is fulfilled
  if (fetchedData != null) {
    let allTags = getUniqueTags()
    let totalPageNumbers = Math.floor(((fetchedData).length) / 5)

    return (
      <>
        <Filters tags={allTags} setSearchByFilter={setSearchByFilter} />

        {searchByFilter.length === 0 ?
        //In case of no filter selected
          <section id='allResults'>
            {[...Array(totalPageNumbers).keys()].map((pageNumber) =>
              <div id={`page-${pageNumber + 1}`} hidden={!(activePage === pageNumber + 1)}>
                {(fetchedData.slice((activePage - 1) * 5, activePage * 5)).map((iterator, index) => 
                  <Post data={iterator} key={index} searchByFilter={searchByFilter} />
                )}
              </div>
            )}
            <Pagination onChange={(event, value) => setActivePage(value)} count={totalPageNumbers} />
          </section>
          :
          //If any of the filter tag is selected 
          <section id='searchResults' hidden={searchByFilter.length === 0}>
            {fetchedData.map((iterator, index) =>
              <Post data={iterator} key={index} searchByFilter={searchByFilter} />
            )}
          </section>
        }
      </>
    )}}
export default App
