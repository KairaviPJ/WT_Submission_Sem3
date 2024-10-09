import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

function FillAtt(){
    const navigate = useNavigate();
    const {date} = useParams();
    const [data,setData] = useState([]);
    const apiUrl = "http://localhost:3001/students";
    useEffect(()=>{
        fetch(apiUrl)
                .then((res)=>{return res.json()})
                .then((res)=>{
                    console.log((res));       
                    return setData(res);
                })
                .catch((err)=>{
                    console.log(err);
                });
    },[]);
                
    const formatStu = data.map((stu)=>{
        return(
            <>
                <tr>
                    <td> <input type="checkbox" id={`${stu.RollNo}`} /></td>
                    <td>{stu.RollNo}</td>
                    <td>{stu.Name}</td>
                </tr>
            </>
            
        );
    })
    
    return(
        <>   
            <table className="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>
                            Roll Numbers
                        </th>
                        <th>
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {formatStu}
                </tbody>
            </table>
            <button className="btn btn-info me-5" onClick={()=>{
                let obj = [];
                for (let i = 0; i < data.length; i++) {
                    let e = document.getElementById(data[i].RollNo);
                    let str = `${e.id}:${e.checked}`;
                    console.log(str);
                    obj.push(str);
                }
                const apiUrl = "http://localhost:3001/att"+"/"+date;
                console.log(apiUrl);
                
                fetch(apiUrl,
                    {method : 'POST',
                    body : JSON.stringify(obj),
                    headers : {
                    "Content-Type" : "application/json"}}
                ).then(()=>{
                    console.log("navigating");
                    navigate("/");
                })
                .catch((err)=>{
                    console.log("Error",err);
                });
            }}>Submit</button>
            <button className="btn btn-danger" onClick={()=>{
                navigate(-1);
            }}>
                Back
            </button>
        </>
    )
}
export default FillAtt;