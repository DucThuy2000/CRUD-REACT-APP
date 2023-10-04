import { format } from 'date-fns';

export const validation = () => {

}

/** 
 * @params: Date
 * @return: Date was formatted to MM/dd/yyyy
*/
export const birtdayFormat = (date: Date): string => {
    return format(date, 'MM/dd/yyyy');
}
