import { UserService } from '../services/services';
import { User, UserLogin } from '../models/models';
import {
    Post,
    Route,
    Body,
    Tags,
    Get,
    Query,
    Queries,
    Delete,
    Patch,
    Put, 
    Path
} from "tsoa";

@Route('usuario')
@Tags('Usuários')
class UserController {
    @Post('/login')
    login(@Body() user: UserLogin): Promise<User> {
        return UserService.getUserCredentials(user);
    }

    @Post()
    async create(@Body() user: User): Promise<void> {
        UserService.create(user);
    }

    @Get('/email/:email')
    findByEmail(@Path('email') email: string): Promise<User> {
        return UserService.findByEmail(email);
    }

    @Get('/todos')
    findAll(): Promise<User[]> {
        return UserService.findAll();
    }

    @Get()
    findBy(@Queries() user: User): Promise<User[]> {
        return UserService.findBy(user);
    }

    @Delete('/email/:email')
    async deleteBy(@Path("email") email: string): Promise<void> {
        UserService.deleteBy(email);
    }

    @Patch('/email/:email')
    updateBy(@Path("email") email: string, @Body() user: User): Promise<User> {
        return UserService.updateBy(email, user);
    }

    @Put('/email/:email')
    upateAllFieldsBy(@Path("email") email: string, @Body() user: User): Promise<User> {
        return UserService.upateAllFieldsBy(email, user);
    }
}

export default new UserController();