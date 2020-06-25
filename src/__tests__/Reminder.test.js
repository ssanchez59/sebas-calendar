import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Reminder } from '../features/calendar/Reminder';

configure({ adapter: new Adapter() });

it('Reminder component working correctly', () => {
  shallow(<Reminder />);
});
