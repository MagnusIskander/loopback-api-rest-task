import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Person,
  Task,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonTaskController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Person has many Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Task>,
  ): Promise<Task[]> {
    return this.personRepository.tasks(id).find(filter);
  }

  @post('/people/{id}/tasks', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {
    return this.personRepository.tasks(id).create(task);
  }

  @patch('/people/{id}/tasks', {
    responses: {
      '200': {
        description: 'Person.Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
    task: Partial<Task>,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.personRepository.tasks(id).patch(task, where);
  }

  @del('/people/{id}/tasks', {
    responses: {
      '200': {
        description: 'Person.Task DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.personRepository.tasks(id).delete(where);
  }
}
