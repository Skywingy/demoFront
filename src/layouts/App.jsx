import React, { useState, useEffect } from "react";
import { UserOutlined, FormOutlined, BulbOutlined, ExperimentOutlined } from "@ant-design/icons";
import { NavLink, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import {QuestionCircleOutlined, UsergroupAddOutlined,
} from "@ant-design/icons";
//Хэрэглэгчид
import UserForm from "../user/Form";
import UserList from "../user/List";
import StudentList from "../student/List";
import StudentForm from "../student/Form";
import LessonList from "../lesson/List";
import LessonForm from "../lesson/Form";
import TeacherView from "../teacherList/List";
import StudentClassList from "../studentClass/List";
import StudentClassForm from "../studentClass/Form";
import StudentChosenList from '../studentChosen/List';
import StudentChosenForm from '../studentChosen/Form';
import User from '../post/user';
import UseForm from '../post/form';

const App = () => {
  const [showNoti, setshowNoti] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/user");
  }

  if (!user){
    console.log('been here')
    return (
      <Navigate to='/' />
    );
  }
    
  if(user.roles === 'admin')
  return (
    <div className="flex flex-row bg-def-gray ">
      <div className="flex flex-row ">
        <div className="flex flex-col mt h-screen bg-white border-r">
          <div
            className="flex flex-row justify-center py-3 align-middle items-center"
            onClick={handleClick}>
              <NavLink
                id= "user"
                to={""}
                className={({ isActive }) =>
                  ` flex flex-row align-middle items-center p-4`
                }
              >
                { <img className="logo"
              src="../img/wb.png"
              style={{ width: 30, height: 30 }}
              alt="logo"
            />}
              </NavLink>
          </div>
          <div className="flex flex-col justify-between  h-full">
            <div>
              <NavLink
                id= "teacher"
                to={"teacher"}
                className={({ isActive }) =>
                  `${
                    isActive ? `bg-def-blue text-white` : `text-black`
                  } flex flex-row align-middle items-center p-4 hover:bg-def-blue hover:text-white`
                }
              >
                {<ExperimentOutlined style={{ fontSize: 20 }} />}
                {/* <div className="text-lg pl-3">{label}</div> */}
              </NavLink>
              <NavLink
                id= "student"
                to={"student"}
                className={({ isActive }) =>
                  `${
                    isActive ? `bg-def-blue text-white` : `text-black`
                  } flex flex-row align-middle items-center p-4 hover:bg-def-blue hover:text-white`
                }
              >
                {<BulbOutlined style={{ fontSize: 20 }} />}
                {/* <div className="text-lg pl-3">{label}</div> */}
              </NavLink>
              <NavLink
                id="lesson"
                to={"lesson"}
                className={({ isActive }) =>
                  `${
                    isActive ? `bg-def-blue text-white` : `text-black`
                  } flex flex-row align-middle items-center p-4 hover:bg-def-blue hover:text-white`
                }
              >
                {<FormOutlined style={{ fontSize: 20 }} />}
                {/* <div className="text-lg pl-3">{label}</div> */}
              </NavLink>
            </div>
            <div
              className="flex flex-row justify-center py-5 items-center"
              onClick={() => logout()}
            >
              <img
                src="../img/exit.svg"
                style={{ width: 20, height: 20 }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <header className="w-full ">
          <div className=" flex flex-row shadow-md p-2 justify-end bg-white h-16">
            <div className="flex flex-row items-center">
              <div className="mx-4 text-sm font-semibold">Тавтай морилно уу, Админ: 
                {"  " + user?.lastname?.substr(0, 1) + "." + user?.firstname}
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-col h-full bg-def-gray p-5 mt-1">
          <Routes>
            <Route key={0} path={"teacher"} element={<UserList />} />
            <Route key={1} path={"teacher/new"} element={<UserForm />} />
            <Route key={2} path={"teacher/edit/:id"} element={<UserForm />} />
            <Route key={3} path={"student"} element={<StudentList />} />
            <Route key={4} path={"student/new"} element={<StudentForm />} />
            <Route key={5} path={"student/edit/:id"} element={<StudentForm />} />
            <Route key={6} path={"lesson"} element={<LessonList />} />
            <Route key={7} path={"lesson/new"} element={<LessonForm />} />
            <Route key={8} path={"lesson/edit/:id"} element={<LessonForm />} />
            <Route key={9} path={""} element={<User />} />
            <Route key={9} path={"/new"} element={<UseForm />} />
            <Route key={9} path={"/edit/:postid"} element={<UseForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
  if(user.roles === 'student')
  return (
    <div className="flex flex-row bg-def-gray ">
      <div className="flex flex-row ">
        <div className="flex flex-col mt h-screen bg-white border-r">
          <div
            className="flex flex-row justify-center py-3 align-middle items-center"
            onClick={() => console.log("1")}>
            <NavLink
                id= "user"
                to={""}
                className={({ isActive }) =>
                  ` flex flex-row align-middle items-center p-4`
                }
              >
                { <img className="logo"
              src="../img/wb.png"
              style={{ width: 30, height: 30 }}
              alt="logo"
            />}
              </NavLink>
          </div>
          <div className="flex flex-col justify-between  h-full">
            <div>
              <NavLink
                to={"StudentClass"}
                className={({ isActive }) =>
                  `${
                    isActive ? `bg-def-blue text-white` : `text-black`
                  } flex flex-row align-middle items-center p-4 hover:bg-def-blue hover:text-white`
                }
              >
                {<UsergroupAddOutlined style={{ fontSize: 20 }} />}
                {/* <div className="text-lg pl-3">{label}</div> */}
              </NavLink>
              <NavLink
                to={`StudentChosen/${user.studentid}`}
                className={({ isActive }) =>
                  `${
                    isActive ? `bg-def-blue text-white` : `text-black`
                  } flex flex-row align-middle items-center p-4 hover:bg-def-blue hover:text-white`
                }
              >
                {<UsergroupAddOutlined style={{ fontSize: 20 }} />}
                {/* <div className="text-lg pl-3">{label}</div> */}
              </NavLink>
            </div>
            <div
              className="flex flex-row justify-center py-5 items-center"
              onClick={() => logout()}
            >
              <img
                src="../img/exit.svg"
                style={{ width: 20, height: 20 }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <header className="w-full ">
          <div className=" flex flex-row shadow-md p-2 justify-end bg-white h-16">
            <div className="flex flex-row items-center">
              <div className="mx-4 text-sm font-semibold">Тавтай морилно уу, Сурагч: 
                {"  " + user?.lastname?.substr(0, 1) + "." + user?.firstname}
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-col h-full bg-def-gray p-5 mt-1">
          <Routes>
            <Route key={0} path={"StudentClass"} element={<StudentClassList />} />
            <Route key={1} path={"StudentClass/add/:id"} element={<StudentClassForm />} />
            <Route key={2} path={"StudentChosen/:id"} element={<StudentChosenList />} />
            <Route key={3} path={"StudentChosen/:no/delete/:id"} element={<StudentChosenForm />} /> 
            <Route key={4} path={""} element={<User />} />
          </Routes>
        </div>
      </div>
    </div>
  );
  if(user.roles === 'teacher')
  return (
    <div className="flex flex-row bg-def-gray ">
      <div className="flex flex-row ">
        <div className="flex flex-col mt h-screen bg-white border-r">
          <div
            className="flex flex-row justify-center py-3 align-middle items-center"
            onClick={() => console.log("1")}>
            <NavLink
                id= "user"
                to={""}
                className={({ isActive }) =>
                  ` flex flex-row align-middle items-center p-4`
                }
              >
                { <img className="logo"
              src="../img/wb.png"
              style={{ width: 30, height: 30 }}
              alt="logo"
            />}
              </NavLink>
          </div>
          <div className="flex flex-col justify-between  h-full">
            <div>
              <NavLink
                id= "teacherView"
                to={`teacherView/${user.teacherid}`}
                className={({ isActive }) =>
                  `${
                    isActive ? `bg-def-blue text-white` : `text-black`
                  } flex flex-row align-middle items-center p-4 hover:bg-def-blue hover:text-white`
                }>
                {<UsergroupAddOutlined style={{ fontSize: 20 }} />}
                {/* <div className="text-lg pl-3">{label}</div> */}
              </NavLink>
            </div>
            <div
              className="flex flex-row justify-center py-5 items-center"
              onClick={() => logout()}>
              <img
                src="../img/exit.svg"
                style={{ width: 20, height: 20 }}
                alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <header className="w-full ">
          <div className=" flex flex-row shadow-md p-2 justify-end bg-white h-16">
            <div className="flex flex-row items-center">
              <div className="mx-4 text-sm font-semibold">Тавтай морилно уу, Багш: 
                {"  " + user?.lastname?.substr(0, 1) + "." + user?.firstname}
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-col h-full bg-def-gray p-5 mt-1">
          <Routes>
            <Route key={0} path={"teacherView/:id"} element={<TeacherView />} />
            <Route key={1} path={""} element={<User />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
