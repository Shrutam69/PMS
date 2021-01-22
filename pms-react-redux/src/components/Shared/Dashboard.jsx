import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/project';
import * as actionsEmployee from '../../actions/employee';
import * as actionsSkills from '../../actions/skills';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core';
import '../../index.css';
import Select from 'react-select';
import {
  yearList,
  data,
  dataForSkillwiswProjects,
  options,
  optionsForSkillwise,
} from '../../utils/data';
import * as skillsactions from '../../actions/skills';
import * as employeeSkillactions from '../../actions/employeeSkill';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
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

  const skilllist = skillsState.map((data, index) => {
    return data.name;
  });
  const skillWiseEmployeeCount = employeeWiseSkillState.filter(
    (x) => x.skillId == 2
  );

  // const countResult = () => {
  let newArray = [...filteredEmployeeList];
  for (let i = 1; i <= skillsState.length + 1; ++i) {
    const skillWiseEmployeeCount = employeeWiseSkillState.filter(
      (x) => x.skillId == i
    );
    newArray.push(skillWiseEmployeeCount);
  }
  const finalArray = newArray.map((data, id) => {
    let newCount = data.length;
    return {
      SkillId: data.map((skilldata) => {
        return skilldata.skillId;
      }),
      // Skill: SkillId.skillId,
      Count: newCount,
    };
  });
  console.log('newArray', newArray);
  console.log('finalArray', finalArray);

  const newData = {
    labels: skilllist,
    datasets: dataForSkillwiswProjects.datasets,
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
                <Bar data={newData} options={optionsForSkillwise} />
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
                <Bar data={newData} options={optionsForSkillwise} />
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
