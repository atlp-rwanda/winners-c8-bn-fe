import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
export default function BasicTable({ requests = [], headers = [] }) {
  return (
    <div style={{ height: '500px' }}>
      <DataGrid
        columns={headers}
        rows={requests}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
      />
    </div>
  );
}
