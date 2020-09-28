import { LiteratureInterface } from 'models/LiteratureType';

export interface AnalogLiteratureInterface extends LiteratureInterface {
  classes: [];
  publisher: '';
  address: '';
  editor: '';
  edition: '';
  number: '';
  series: '';
  volume: '';
}
