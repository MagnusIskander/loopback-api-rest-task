import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Person} from './person.model';
import {Category} from './category.model';

@model()
export class Task extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @belongsTo(() => Person)
  personId: string;

  @belongsTo(() => Category)
  categoryId: string;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
