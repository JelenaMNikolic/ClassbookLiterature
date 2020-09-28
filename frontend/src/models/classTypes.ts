import { FacultyInterface } from 'models/facultyTypes';
import { AnalogLiteratureInterface } from 'models/analogLiteratureType';
import { DigitalLiteratureInterface } from 'models/digitalLiteratureTypes';

export interface ClassInterface {
  id: string;
  acronym: string;
  name: string;
  type: string;
  semester: string;
  faculty: FacultyInterface;
  books: AnalogLiteratureInterface[];
  scripts: DigitalLiteratureInterface[];
}
