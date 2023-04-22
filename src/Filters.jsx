import React from "react";

export default function Filters({tags,setSearchByFilter}){

    function handleClick(event){
        let targetTag=event.target.innerHTML

        setSearchByFilter(prev=>{
            if(prev.includes(targetTag)){                       //if targetedTag is already selected ,deselecting it
                event.target.classList.remove("activeTag")
                return (prev.filter((tag)=>tag!=targetTag))
            }
            else{
                event.target.classList.add("activeTag")
            return [...prev,targetTag]
        }
        })
    }
    return(
        <section>
            <h2>Tags</h2>
            <span><em>(Select tags to apply filters</em>)</span>
            <div id="filters">
            {tags.map((tag)=>
            <span className="tags" style={{cursor:"pointer",margin:"3% 2%"}} onClick={handleClick}>{tag}</span>
            )}
            </div>
        </section>
    )
}