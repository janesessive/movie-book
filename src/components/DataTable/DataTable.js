import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const DataTable = props => {

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">
              {' '}
              <button onClick={props.onMultipleDelete}>Delete</button>
            </th>
            {props.columns.map(c => (
              <th key={c.header} scope="col">
                {c.header}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {props.records.map((item, recIndex) => (
            
            <tr key={item._id + ''+recIndex} className={item.isSelected ? 'table-active':''}>
              <td style={{ width: 30 }}>
                <input
                  type="checkbox"
                  onChange={function(e) {
                    props.onRecordSelected(item, e, this);
                  }}
                />
              </td>

              {props.columns.map((col, index) => {
                let currentRecord = props.records[recIndex];
                let currentValue = currentRecord[col.index];
                if (col.formatter && typeof col.formatter === 'function') {
                  currentValue = col.formatter(currentValue, currentRecord, recIndex);
                }

                return <td key={col.header + '' + index}>{currentValue}</td>;
              })}

              <td>
                <button
                  onClick={() => {
                    props.onRecordDelete(item._id);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <button
                  style={{ marginLeft: '12px' }}
                  onClick={() => props.onRecordEdit(item)}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
