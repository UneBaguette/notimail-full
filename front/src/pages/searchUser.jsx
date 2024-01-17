import { useEffect, useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { useLocation, useNavigate } from "react-router-dom"

export const SearchUser=({setOpen})=>{

    const navigate = useNavigate();

    // useEffect(()=>{
    //     fetch(`http://localhost:3000/user/users/${user.id}`)
    //     .then((reponse)=>reponse.json())
    //     .then((data)=>{
    //         console.log(data);
    //         setResultat(data);
    //     })
    // },[])

    // const handlechange = e =>{
    //     setSearchText(e.target.value)
    // }

    // const handleSubmit = e =>{
    //     e.preventDefault()
    //     setOpen && setOpen(false)
    //     navigate('/result', {state:searchText}) 
    // }

    return(
        <>        
        {/* <form onSubmit={handleSubmit}> */}
            {/* <input type="text" value={searchText} onChange={handlechange}/> */}
            <button type="submit"><IoIosSearch /></button>
        {/* </form>  */}
        </>

    )
}