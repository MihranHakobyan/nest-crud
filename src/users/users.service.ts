import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Users, UsersDocument} from "../schemas/users.schema";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) public usersModel: Model<UsersDocument>) {
    }

    async create(createUserDto: CreateUserDto) {
        const exist = await this.findByEmail(createUserDto.email);
        if (exist) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'user already exist',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = new this.usersModel(createUserDto);
        user.save();
        return user;
    }

    findAll() {
        return this.usersModel.find();
    }

    async findById(id: string) {
        const valid = mongoose.Types.ObjectId.isValid(id);
        if (!valid) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Invalid id',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = await this.usersModel.findById(id);
        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'user does not exist',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        return user
    }
    async findByEmail(email:string){
            return this.usersModel.findOne({ email }).exec();
    }
    async update(id: string, updateUserDto: UpdateUserDto) {
        const valid = mongoose.Types.ObjectId.isValid(id);
        if (!valid) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Invalid id',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = await this.usersModel.findByIdAndUpdate(id, updateUserDto);
        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Invalid id',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.usersModel.findById(id);
    }

    async remove(id: string) {
        const valid = mongoose.Types.ObjectId.isValid(id);
        if (!valid) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Invalid id',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = await this.usersModel.findByIdAndRemove(id);
        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Invalid id',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        return user;
    }
}
