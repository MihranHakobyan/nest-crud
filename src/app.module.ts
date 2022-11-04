import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from "@nestjs/config";
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersModule} from "./users/users.module";

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ".env",
    }), MongooseModule.forRoot(process.env.MONGODB), UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
