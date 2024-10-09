import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";
import navigate from "navigate";

function EditStudent(){
    const navigate = useNavigate();
    const {rollno,date} = useParams();
    const [present,setPresent] = useState(false);

    return(
        <>  
           <div className="row mt-3 mb-4">
                <div className="row justify-content-evenly">
                    <div className="col-2">
                        <h2> {rollno} </h2>
                    </div>
                </div>
                <div className="col-2">
                    <input type="radio" onClick={()=>{
                                setPresent(true);
                            }}/>
                </div>Present
                <div className="col-2">
                    <input type="radio" onClick={()=>{
                                setPresent(false);
                            }}/>
                </div>Absent        
            </div>
            <div className="row d-flex justify-content-evenly">
                <div className="col-2">
                    <button className="btn btn-info" onClick={()=>{

                        const apiUrl = "http://localhost:3001/students/"+rollno+"/"+date;

                            fetch(apiUrl,{
                                method: "PUT",
                                body : JSON.stringify({"present" : present}),
                                headers : {
                                    "Content-Type" : "application/json"
                                }
                            })
                            .then(()=>{
                                navigate(-1);
                            })
                            .catch((err)=>{
                                console.log(err);
                            });
                        }}>Submit</button>
                </div>
                <div className="col-2">        
                    <button className="btn btn-danger" onClick={()=>{
                            navigate(-1);
                    }}>Back</button>
                </div>
            </div>  
        </>
    )
}
function ViewStudent(){
    const navigate = useNavigate();
    const {rollno} = useParams();
    const apiUrl = "http://localhost:3001/students/"+rollno;
   
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch(apiUrl)
                .then((res)=>{return res.json()})
                .then((res)=>{
                    return setData(res.Att);
                })
                .catch((err)=>{
                    console.log(err);
                });
    },[]);
    const formatAtt = data.map((o)=>{
        let style= {
            backgroundColor : 'rgb(247, 78, 78)'
        }
        if(o.Pre==true){
            o.Pre = "Present";
            style = {
                backgroundColor : 'rgb(42, 129, 42)'
            }
        }
        else {
            o.Pre = "Absent";
        }
        return(
            <tr>
                <td>
                 {o.Date}
                </td>

                <td style={style}>
                    {o.Pre}
                </td>
                <td>
                    <Link to ={'/edit/'+rollno+'/'+o.Date} className="btn btn-warning">Edit</Link>
                </td>
            </tr>
            
        )
    })
    return(
        <>
        <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="row align-items-center">
                <div className="row d-flex justify-content-evenly mb-4">
                    <div className="col-2">
                        <button className="btn btn-danger" onClick={()=>{
                            navigate(-1);
                        }}>Back</button>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-info" onClick={()=>{
                            navigate('/');
                        }}>Home</button>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Attendance</th>
                        <th scope="col">Edit</th>
                    </tr>
                    </thead>
                    <tbody> 
                        {formatAtt}
                   </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export {ViewStudent,EditStudent};
