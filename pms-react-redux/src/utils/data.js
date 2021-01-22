export const tableHeadersProject = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    sorter: (a, b) => {
      return a.code.localeCompare(b.code);
    },
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: (a, b) => {
      return a.startDate.localeCompare(b.startDate);
    },
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
    sorter: (a, b) => {
      return a.endDate.localeCompare(b.endDate);
    },
  },
];
export const tableHeaders = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    sorter: (a, b) => {
      return a.code.localeCompare(b.code);
    },
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: (a, b) => {
      return a.startDate.localeCompare(b.startDate);
    },
  },
  {
    title: 'Release Date',
    dataIndex: 'releaseDate',
    key: 'releaseDate',
    sorter: (a, b) => {
      return a.releaseDate.localeCompare(b.releaseDate);
    },
  },
];

export const tableHeadersAssignProject = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
];

export const yearList = [
  { value: 2015, label: '2015' },
  { value: 2016, label: '2016' },
  { value: 2017, label: '2017' },
  { value: 2018, label: '2018' },
  { value: 2019, label: '2019' },
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
];

const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const data = {
  labels: monthList,
  datasets: [
    {
      label: 'Employees joined',
      data: [3, 2, 2, 6, 4, 9, 0, 8, 1, 5, 2, 3],
      borderColor: [
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
      ],
      backgroundColor: [
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
      ],
    },
    {
      label: 'Employees Realsed',
      data: [4, 3, 2, 2, 3, 1, 2, 0, 3, 0, 0, 2],
      borderColor: [
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(54, 162, 235, 0.4)',
      ],
      backgroundColor: [
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
        'rgba(54, 162, 235,0.4)',
      ],
    },
  ],
};
export const options = {
  title: {
    display: true,
    // text: 'Bar Chart',
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 10,
          stepSize: 2,
        },
      },
    ],
  },
};
export const dataForSkillwiswProjects = {
  labels: ['React', 'Node', '.Net', 'Php', 'Angular'],
  datasets: [
    {
      label: 'Skillwise Employee',
      data: [10, 20, 2, 1, 15],
      borderColor: [
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
      ],
      backgroundColor: [
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 86, 0.4)',
      ],
    },
  ],
};
export const optionsForSkillwise = {
  title: {
    display: true,
    // text: 'Bar Chart',
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 40,
          stepSize: 5,
        },
      },
    ],
  },
};
