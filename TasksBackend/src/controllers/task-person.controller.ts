import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Task,
  Person,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskPersonController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Task.prototype.id,
  ): Promise<Person> {
    return this.taskRepository.person(id);
  }
}
