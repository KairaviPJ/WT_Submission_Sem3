import {Link} from 'react-router-dom'
import {format} from 'date-fns'
function Home(){
    let date = format(new Date(),'do MMMM yyyy');
    let paramDate = (format(new Date(),'MMMM do yyyy')).toString();
    console.log(paramDate);
    return(
        <div>
            <div className='container-fluid mt-5'>
                <div className='row text-center mb-5'>
                    <h1> Attendance </h1>
                    <h2>Date : {date}</h2>  
                </div>
                <div className='row d-flex justify-content-center mt-5'>
                    <div className='col-2 me-5'>
                        <Link to={'/fillAtt/'+paramDate}className='btn btn-primary mb-3'>Fill Attendance</Link>
                    </div>
                    <div className='col-2'>
                        <Link to='/viewAtt' className='btn btn-info'>View Attendance</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;