import { Person } from "./person.model";

 

export interface User {
  username: string;
  pessoa: Person;
  roles?: string[];
  mapedRoles?: string[];
}