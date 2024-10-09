import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter , Routes , Route ,Link} from 'react-router-dom';
import FillAtt from './Attendance';
import Home from './Home';
import View from './View';
import {EditStudent,ViewStudent} from './Edit';
import './styles.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/fillAtt/:date' element={<FillAtt/>}></Route>
              <Route path='/viewAtt' element={<View/>}></Route>
              <Route path='/view/:rollno' element={<ViewStudent/>}></Route>
              <Route path='/edit/:rollno/:date' element={<EditStudent/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </>
);
