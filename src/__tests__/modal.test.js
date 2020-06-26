import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalImplementation from '../components/modal';

configure({ adapter: new Adapter() });

it('Modal component working correctly', () => {
  shallow(<ModalImplementation />);
});
