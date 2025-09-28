import { Injectable, NotFoundException } from '@nestjs/common';
import type { Cat } from './interfaces';
import type { CreateCatDto, UpdateCatDto } from './dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    {
      id: 1,
      name: 'Fluffy',
      age: 3,
      breed: 'Persian',
      createdAt: new Date('2023-01-01'),
    },
    {
      id: 2,
      name: 'Whiskers',
      age: 2,
      breed: 'Siamese',
      createdAt: new Date('2023-02-01'),
    },
  ];

  private nextId = 3;

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return cat;
  }

  create(createCatDto: CreateCatDto): Cat {
    const newCat: Cat = {
      id: this.nextId++,
      ...createCatDto,
      createdAt: new Date(),
    };
    this.cats.push(newCat);
    return newCat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }

    const updatedCat: Cat = {
      ...this.cats[catIndex],
      ...updateCatDto,
      updatedAt: new Date(),
    };
    this.cats[catIndex] = updatedCat;
    return updatedCat;
  }

  remove(id: number): Cat {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }

    const deletedCat = this.cats[catIndex];
    this.cats.splice(catIndex, 1);
    return deletedCat;
  }

  findWithPagination(page: number = 1, limit: number = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCats = this.cats.slice(startIndex, endIndex);

    return {
      cats: paginatedCats,
      pagination: {
        page,
        limit,
        total: this.cats.length,
        totalPages: Math.ceil(this.cats.length / limit),
      },
    };
  }
}
