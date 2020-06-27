import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Calendar } from '../features/calendar/Calendar';

configure({ adapter: new Adapter() });

it('Calendar component working correctly', () => {
  shallow(<Calendar />);
});
