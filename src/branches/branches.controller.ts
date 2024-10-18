import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BranchService } from './branches.service';

@ApiTags('branches')
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch' })
  async create(@Body() createBranchDto: CreateBranchDto) {
    return await this.branchService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches' })
  async findAll() {
    return await this.branchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a branch by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.branchService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a branch' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBranchDto: UpdateBranchDto) {
    return await this.branchService.update(id, updateBranchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a branch' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.branchService.remove(id);
    return { message: 'Branch deleted successfully' };
  }
}