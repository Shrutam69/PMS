import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/project';
import * as actionsEmployee from '../../actions/employee';
import * as actionsSkills from '../../actions/skills';

const Dashboard = () => {
  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.projectReducer.list);

  const getProjectList = () => {
    dispatch(actions.fetchAll());
  };

  useEffect(() => {
    getProjectList();
  }, []);
  console.log('project list', projectState);

  const employeeState = useSelector((state) => state.employeeReducer.list);
  const getEmployeeList = () => {
    dispatch(actionsEmployee.fetchAll());
  };
  useEffect(() => {
    getEmployeeList();
  }, []);
  console.log('employee list', employeeState);

  const skillState = useSelector((state) => state.skillsReducer.list);
  const getSkillsList = () => {
    dispatch(actionsSkills.fetchAll());
  };
  useEffect(() => {
    getSkillsList();
  }, []);
  console.log('skill list', skillState);

  return (
    <>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
