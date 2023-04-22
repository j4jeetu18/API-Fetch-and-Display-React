import styled from "@emotion/styled";
import {Container} from "@mui/material";
import Card from '@mui/material/Card';

export default function Post({data,searchByFilter}){
    let shouldShow=false
    const BigBox=styled('span')(({theme})=>({
        textAlign:"center",
        display:"block",
        color:"black",
        height:"100%",
        padding:"3%",
        fontSize:"3em",
        margin:"auto 3%"
    }))

    // Code only executed when some filter tags are selected
    if(searchByFilter.length===0)
    shouldShow=true
    else
    for (let i = 0; i < searchByFilter.length; i++) {
        if(data.tags.includes(searchByFilter[i])){
        shouldShow=true
        continue
    }
        else{
        shouldShow=false
        break
    }
    }

    function handleExpansion(event){
        let bodyToExpand=event.target.previousElementSibling
        if(bodyToExpand.hasAttribute("hidden")){
        bodyToExpand.removeAttribute("hidden")
        event.target.innerText="show less"
    }
    else{
    bodyToExpand.setAttribute("hidden","hidden")
    event.target.innerText="...show more"
}
    }

    
    if(shouldShow===true)
    return(
        <Card id={data.id} className="posts" sx={{display:"flex",padding:"2% 3%",margin:"4% auto",justifyContent:"space-between",maxWidth:"90vw"}}>
            <BigBox>{data.id}</BigBox>
            <Container>
            <h2>{data.title}</h2>
            <span>{data.body.slice(0,200)}</span>
            <span hidden>{data.body.slice(200,-1)}</span>
            <button style={{fontWeight:600,color:"rgb(86, 118, 191)",backgroundColor:"transparent",border:"none",cursor:"pointer"}} onClick={handleExpansion}>&nbsp;...show more</button>
            <div style={{marginTop:"6%"}}>
                <h3 style={{display:"inline"}}>tags:</h3>
                {(data.tags).map((iterator)=>
                <span key={iterator} className="tags">{iterator}</span>
                )}
            </div>
            </Container>
        </Card>
    )
}