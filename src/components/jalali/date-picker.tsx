import momentJalaaliGenerateConfig from './moment-jalaali';
import generatePicker from 'antd/es/date-picker/generatePicker';

const DatePicker = generatePicker(momentJalaaliGenerateConfig);

export default DatePicker;
