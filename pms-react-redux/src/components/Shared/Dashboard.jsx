import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@material-ui/core';
import '../../index.css';
import Select from 'react-select';
import { yearList, data, options, optionsForSkillwise } from '../../utils/data';
import * as skillsactions from '../../actions/skills';
import * as employeeSkillactions from '../../actions/employeeSkill';
import * as projectTechactions from '../../actions/projectTech';

const Dashboard = () => {
  const dispatch = useDispatch();
  // Skills State
  const getSkillsList = () => {
    dispatch(skillsactions.fetchAll());
  };
  useEffect(() => {
    getSkillsList();
  }, []);
  const skillsState = useSelector((state) => state.skillsReducer.list);

  // EmployeeWiseSkills State
  const getEmployeeWiseSkillList = () => {
    dispatch(employeeSkillactions.fetchAll());
  };
  useEffect(() => {
    getEmployeeWiseSkillList();
  }, []);
  const employeeWiseSkillState = useSelector(
    (state) => state.employeeSkillReducer.list
  );

  // TechWiseProject State
  const getTechWiseProjectList = () => {
    dispatch(projectTechactions.fetchAll());
  };
  useEffect(() => {
    getTechWiseProjectList();
  }, []);
  const techWiseProjectState = useSelector(
    (state) => state.projectTechReducer.list
  );

  const skilllist = skillsState.map((data, index) => {
    return data.name;
  });

  let skillWiseEmployee = [];
  let techWiseProjects = [];
  for (let i = 1; i <= skillsState.length + 1; ++i) {
    const skillWiseEmployeeCount = employeeWiseSkillState.filter(
      (x) => x.skillId == i
    );
    skillWiseEmployee.push(skillWiseEmployeeCount);
    const techWiseEmployeeCount = techWiseProjectState.filter(
      (x) => x.skillId == i
    );
    techWiseProjects.push(techWiseEmployeeCount);
  }

  //SkillWiseEmployee
  const finalSkillWiseEmployyeArray = skillWiseEmployee.map((data, id) => {
    let newCount = data.length;
    return {
      Count: newCount,
    };
  });
  const filteredSkillWiseEmployeeArray = finalSkillWiseEmployyeArray.filter(
    (x) => x.Count > 0
  );

  //TechWiseProject
  const finalTechWiseProjectArray = techWiseProjects.map((data, id) => {
    let newCount = data.length;
    return {
      Count: newCount,
    };
  });
  const filteredTechWiseProjectArray = finalTechWiseProjectArray.filter(
    (x) => x.Count > 0
  );

  const dataSetsForSkillWiseEmployeeChart = {
    labels: skilllist,
    datasets: [
      {
        label: 'Skillwise Employee',
        data: filteredSkillWiseEmployeeArray.map((data) => {
          return data.Count;
        }),
        borderColor: 'rgba(255, 206, 86, 0.4)',
        backgroundColor: 'rgba(255, 206, 86, 0.4)',
      },
    ],
  };

  const dataSetsForTechWiseProjectChart = {
    labels: skilllist,
    datasets: [
      {
        label: 'TechnologyWise Project',
        data: filteredTechWiseProjectArray.map((data) => {
          return data.Count;
        }),
        borderColor: 'rgba(255, 206, 86, 0.4)',
        backgroundColor: 'rgba(255, 206, 86, 0.4)',
      },
    ],
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Card className="pt-0">
            <div className="text-light text-center card-header-chart p-2">
              Employee
              <div className="mt-1 text-left text-dark">
                <Select
                  name="SelectedSkillList"
                  options={yearList}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  // onRemove={onRemove}
                  // onChange={onSelect}
                  defaultValue={{ value: 2021, label: '2021' }}
                />
              </div>
            </div>
            <CardContent className="pt-0">
              <Typography>
                <Bar data={data} options={options} />
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-6 col-sm-12">
          <Card>
            <div className="text-light text-center card-header-chart p-2">
              Project
              <div className="mt-1 text-left text-dark">
                <Select
                  name="SelectedSkillList"
                  options={yearList}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  // onRemove={onRemove}
                  // onChange={onSelect}
                  defaultValue={{ value: 2021, label: '2021' }}
                />
              </div>
            </div>
            <CardContent className="pt-0">
              <Typography>
                <Bar data={data} options={options} />
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 col-sm-12">
          <Card>
            <div className="text-light text-center card-header-chart p-2">
              Skillwise Employee
            </div>
            <CardContent className="pt-0">
              <Typography>
                <Bar
                  data={dataSetsForSkillWiseEmployeeChart}
                  options={optionsForSkillwise}
                />
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-6 col-sm-12">
          <Card>
            <div className="text-light text-center card-header-chart p-2">
              Technologywise Project
            </div>
            <CardContent className="pt-0">
              <Typography>
                <Bar
                  data={dataSetsForTechWiseProjectChart}
                  options={optionsForSkillwise}
                />
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
