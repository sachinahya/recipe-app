import { FindConditions, Repository } from 'typeorm';

export default class CustomRepositoryBase<T> extends Repository<T> {
  async saveIfNotExists(
    category: T,
    prop: keyof T | FindConditions<T> | FindConditions<T>[]
  ): Promise<T> {
    const whereConditions = typeof prop == 'object' ? prop : { [prop]: category[prop] };

    const existing = await this.findOne({
      where: whereConditions,
      /**
       * This is important!
       *
       * You must load the user relation here otherwise the user property will not be included in
       * the returned entity. When it is attached to the recipe and saved, this entity will not be
       * in a valid state as user is part of  the primary key (not nullable). However, TypeORM will
       * still appear to save the recipe and it's relation just fine but the relation will not
       * actually be stored in the database.
       *
       * We can either use "relations" (loads the entire user entity) or "loadRelationIds" (loads
       * only the user ID). I've used the latter so that we don't need to do an extra join on the
       * user table.
       */
      // relations: ['user'],
      loadRelationIds: true,
    });

    if (existing) return existing;

    const newCategory = this.create(category);
    return this.save(newCategory);
  }
}
