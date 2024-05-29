export class Employe {
  employeId?: number;
  firstName?: string;
  secondName?: string;
  born?: string;
  position?: string;
  constructor(
    employeId: number,
    firsname: string,
    secondname: string,
    born: string,
    position: string
  ) {
    this.employeId = employeId;
    this.firstName = firsname;
    this.secondName = secondname;
    this.born = born;
    this.position = position;
  }
}
