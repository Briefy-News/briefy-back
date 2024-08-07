import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeRole, InsertOne, UpdateOne } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly repo: Repository<UserModel>,
  ) {}

  async insertOne(user: InsertOne) {
    const existUser = await this.repo.findOne({ where: { email: user.email } });
    if (existUser) return existUser;
    return await this.repo.save(user);
  }

  async getAll() {
    const userList = await this.repo.find();
    if (userList) {
      throw new NotFoundException();
    }
    return userList;
  }

  async getOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async deleteOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    await this.repo.delete(id);
    return id;
  }

  async getUserByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }

  async updateOne(id: number, body: UpdateOne) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, body);
    const updateUser = await this.repo.save(user);
    return updateUser;
  }

  async changeRole(id: number, body: ChangeRole) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, body);
    const updateUser = await this.repo.save(user);
    return updateUser;
  }
}
