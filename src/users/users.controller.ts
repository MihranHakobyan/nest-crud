import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {next} from "../errors/apiErrors";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
   async create(@Body() createUserDto: CreateUserDto) {
        try{
            const user= await this.usersService.create(createUserDto);
            return {user,status:HttpStatus.CREATED}
        }catch (err){
            return next(err)
        }
    }

    @Get()
    async findAll(): Promise<object> {
        try {
            const users = await this.usersService.findAll();
            return {users, status: HttpStatus.OK};
        } catch (err) {
            return next(err)
        }

    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<object> {
        try {
            const user = await this.usersService.findById(id);
            return {
                user,
                status: HttpStatus.OK
            }
        } catch (err) {
            return next(err)
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const user = await this.usersService.update(id, updateUserDto);
            return {
                user,
                status: HttpStatus.OK
            }
        } catch (err) {
            return next(err)
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            const user = await this.usersService.remove(id);
            return {user, status: HttpStatus.OK}
        } catch (err) {
            return next(err)
        }

    }
}
