// создаеть пробелы между цифрами || пример: 90000 - 90 000
const numberWithSpaces = (numbers:number)=> {
    return numbers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

}
export default numberWithSpaces