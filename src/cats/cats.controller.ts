import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import type { CreateCatDto, UpdateCatDto } from './dto';
import type { ApiResponseSuccess } from '../common/interfaces';
import { ResponseHelper } from '../common/helpers';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): ApiResponseSuccess {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const result = this.catsService.findWithPagination(pageNum, limitNum);

    return ResponseHelper.success('Cats retrieved successfully', result);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ApiResponseSuccess {
    const cat = this.catsService.findOne(id);

    return ResponseHelper.success('Cat found successfully', cat);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): ApiResponseSuccess {
    const newCat = this.catsService.create(createCatDto);

    return ResponseHelper.success('Cat created successfully', newCat);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): ApiResponseSuccess {
    const updatedCat = this.catsService.update(id, updateCatDto);

    return ResponseHelper.success('Cat updated successfully', updatedCat);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): ApiResponseSuccess {
    const deletedCat = this.catsService.remove(id);

    return ResponseHelper.success('Cat deleted successfully', {
      id: deletedCat.id,
      deletedAt: new Date(),
    });
  }
}
