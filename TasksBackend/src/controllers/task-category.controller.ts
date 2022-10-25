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
  Category,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskCategoryController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof Task.prototype.id,
  ): Promise<Category> {
    return this.taskRepository.category(id);
  }
}
