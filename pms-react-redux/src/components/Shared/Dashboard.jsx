import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@material-ui/core';
import '../../index.css';
import Select from 'react-select';
import {
  yearList,
  options,
  optionsForSkillwise,
  monthList,
} from '../../utils/data';
import * as skillsactions from '../../actions/skills';
import * as employeeSkillactions from '../../actions/employeeSkill';
import * as projectTechactions from '../../actions/projectTech';
import * as employeeActions from '../../actions/employee';
import * as projectActions from '../../actions/project';
import moment from 'moment';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2020);
  const [yearForProject, setYearForProject] = useState(2020);

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

  //Employee State
  const getEmployeeList = () => {
    dispatch(employeeActions.fetchAll());
  };
  useEffect(() => {
    getEmployeeList();
  }, []);
  const employeeState = useSelector((state) => state.employeeReducer.list);
  //Project State
  const getProjectList = () => {
    dispatch(projectActions.fetchAll());
  };
  useEffect(() => {
    getProjectList();
  }, []);
  const projectState = useSelector((state) => state.projectReducer.list);

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
  //Filtering of Employees by joining month and year
  let employeesJoined = [];
  for (let i = 1; i <= employeeState.length + 1; ++i) {
    const yearWiseEmployeeCount = employeeState.filter(
      (x) => moment(x.startDate).format('YYYY') == year
    );
    const monthWiseEmployeeCount = yearWiseEmployeeCount.filter(
      (x) => moment(x.startDate).format('MM') == i
    );
    employeesJoined.push(monthWiseEmployeeCount);
  }
  //Filtering of Employees by Releasing month and year
  let employeesReleased = [];
  for (let i = 1; i <= employeeState.length + 1; ++i) {
    const yearWiseEmployeeCount = employeeState.filter(
      (x) => moment(x.releaseDate).format('YYYY') == year
    );
    const monthWiseEmployeeCount = yearWiseEmployeeCount.filter(
      (x) => moment(x.releaseDate).format('MM') == i
    );
    employeesReleased.push(monthWiseEmployeeCount);
  }
  //Filtering of Projects by starting month and year
  let projectsStarted = [];
  for (let i = 1; i <= projectState.length + 1; ++i) {
    const yearWiseProjectStartedCount = projectState.filter(
      (x) => moment(x.startDate).format('YYYY') == yearForProject
    );
    const monthWiseProjectStartedCount = yearWiseProjectStartedCount.filter(
      (x) => moment(x.startDate).format('MM') == i
    );
    projectsStarted.push(monthWiseProjectStartedCount);
  }
  //Filtering of Projects by ending month and year
  let projectEnded = [];
  for (let i = 1; i <= employeeState.length + 1; ++i) {
    const yearWiseProjectEndedCount = projectState.filter(
      (x) => moment(x.endDate).format('YYYY') == yearForProject
    );
    const monthWiseProjectEndedCount = yearWiseProjectEndedCount.filter(
      (x) => moment(x.endDate).format('MM') == i
    );
    projectEnded.push(monthWiseProjectEndedCount);
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

  //MonthWiseEmployeeJoined
  const finalMonthWiseEmployeeJoinedArray = employeesJoined.map((data, id) => {
    return {
      Count: data.length,
    };
  });

  //MonthWiseEmployeeReleased
  const finalMonthWiseEmployeeReleasedArray = employeesReleased.map(
    (data, id) => {
      return {
        Count: data.length,
      };
    }
  );

  //MonthWiseProjectStarted
  const finalMonthWiseProjectStartedArray = projectsStarted.map((data, id) => {
    return {
      Count: data.length,
    };
  });

  //MonthWiseProjectEnded
  const finalMonthWiseProjectEndedArray = projectEnded.map((data, id) => {
    return {
      Count: data.length,
    };
  });

  //dataSets For SkillWiseEmployeeChart
  const dataSetsForSkillWiseEmployeeChart = {
    labels: skilllist,
    datasets: [
      {
        label: 'Skillwise Employee',
        data: filteredSkillWiseEmployeeArray.map((data) => {
          return data.Count;
        }),
        borderColor: 'rgba(255, 206, 86, 1.2)',
        backgroundColor: 'rgba(255, 206, 86, 1.2)',
      },
    ],
  };
  // dataSets For TechWise ProjectChart
  const dataSetsForTechWiseProjectChart = {
    labels: skilllist,
    datasets: [
      {
        label: 'Technologywise Project',
        data: filteredTechWiseProjectArray.map((data) => {
          return data.Count;
        }),
        borderColor: 'rgba(54, 162, 235,0.8)',
        backgroundColor: 'rgba(54, 162, 235,0.8)',
      },
    ],
  };
  // dataSets For MonthWise EmployeeChart
  const dataSetsForMonthWiseEmployeeChart = {
    labels: monthList,
    datasets: [
      {
        label: 'Employee Joined',
        data: finalMonthWiseEmployeeJoinedArray.map((data) => {
          return data.Count;
        }),
        borderColor: 'rgba(255, 206, 86, 0.4)',
        backgroundColor: 'rgba(255, 206, 86, 1.2)',
      },
      {
        label: 'Employee Released',
        data: finalMonthWiseEmployeeReleasedArray.map((data) => {
          return data.Count;
        }),
        borderColor: 'rgba(54, 162, 235,0.8)',
        backgroundColor: 'rgba(54, 162, 235,0.8)',
      },
    ],
  };
  // dataSets For MonthWise ProjectChart
  const dataSetsForMonthWiseProjectChart = {
    labels: monthList,
    datasets: [
      {
        label: 'Project Started',
        data: finalMonthWiseProjectStartedArray.map((data) => {
          return data.Count;
        }),
        borderColor: 'rgba(255, 206, 86, 0.4)',
        backgroundColor: 'rgba(255, 206, 86, 1.2)',
      },
      {
        label: 'Project Ended',
        data: finalMonthWiseProjectEndedArray.map((data) => {
          return data.Count;
        }),
        borderColor: 'rgba(54, 162, 235,0.8)',
        backgroundColor: 'rgba(54, 162, 235,0.8)',
      },
    ],
  };

  const handleChange = (selectedOption) => {
    setYear(selectedOption.value);
  };
  const handleChangeForProject = (selectedOption) => {
    setYearForProject(selectedOption.value);
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
                  onChange={handleChange}
                  defaultValue={{ value: 2020, label: '2020' }}
                />
              </div>
            </div>
            <CardContent className="pt-0">
              <Typography>
                <Bar
                  data={dataSetsForMonthWiseEmployeeChart}
                  options={options}
                />
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
                  onChange={handleChangeForProject}
                  defaultValue={{ value: 2020, label: '2020' }}
                />
              </div>
            </div>
            <CardContent className="pt-0">
              <Typography>
                <Bar
                  data={dataSetsForMonthWiseProjectChart}
                  options={options}
                />
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
