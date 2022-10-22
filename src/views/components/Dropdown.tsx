/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import BSDropdown from 'react-bootstrap/esm/Dropdown';

const Dropdown = ({
  displayValue,
  values,
  selected,
  setSelected
}: {
  displayValue: string,
  values: string[],
  selected: any,
  setSelected: Dispatch<SetStateAction<any>>
}) => {
  return (
    <BSDropdown className={'px-1'} onSelect={(e) => setSelected(e)}>
      <BSDropdown.Toggle variant={`${selected?'success':'secondary'}`} id="dropdown-basic">
        {selected || displayValue}
      </BSDropdown.Toggle>
      <BSDropdown.Menu>
        <BSDropdown.Item eventKey={undefined}>none</BSDropdown.Item>
        {values.map((value) => (
          <BSDropdown.Item eventKey={value}>{value}</BSDropdown.Item>
        ))}
      </BSDropdown.Menu>
    </BSDropdown>
  );
};

export default Dropdown;