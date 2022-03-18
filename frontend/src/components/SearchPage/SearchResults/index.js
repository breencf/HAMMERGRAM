import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ActivityCard } from "../../ActivityPage/ActivityCard"
import { Link } from "react-router-dom"

export const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([])
    const results = useSelector((s) => s.search)

    useEffect(() =>{console.log(results)}, [results])

    return (
        <div>
            <h1>search results</h1>
            {window.searchName.length > 3 && results.map ((result) => {
                return(<Link key={result.id} to={`/users/${result.id}`}><div className="activity-card">
                <div className="activity-card-left">
                    <img className="userIcon" src={result.image}/>
                    <p>{result.username}</p>
                </div>
            </div><hr/></Link>)
            })}
        </div>

    )
}