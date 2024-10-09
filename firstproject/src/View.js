import { useState,useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
function View(){
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const apiUrl = "http://localhost:3001/students";
    useEffect(()=>{
        fetch(apiUrl)
                .then((res)=>{return res.json()})
                .then((res)=>{       
                    return setData(res);
                })
                .catch((err)=>{
                    console.log(err);
                });
    },[]);
    console.log(data);
    
    const formatStu = data.map((stu)=>{
        return(
            <tr>
                <td>{stu.RollNo}</td>
                <td>
                    <Link className="btn btn-info" to={'/view/'+stu.RollNo}>View</Link>
                </td>
           </tr>
        );
    })

    return(
        <>
            <div className = "row mt-5">
                <button className="btn btn-danger" onClick={()=>{
                    navigate(-1);
                }}>Back</button>
            </div>
            <table className="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th scope="col">
                            Roll Number
                        </th>
                        <th scope="col">
                            View
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {formatStu}
                </tbody>
            </table>
        </>
    )
}
export default View;