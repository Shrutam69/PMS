export const BASE_URL = 'https://localhost:44329/api/';
export const EMPLOYEE_URL = BASE_URL + 'Employees/';
export const PROJECT_URL = BASE_URL + 'Projects/';

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
  },
  {
    title: 'Release Date',
    dataIndex: 'releaseDate',
    key: 'releaseDate',
  },
];
