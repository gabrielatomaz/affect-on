import { userService } from '../services/services';
import { User, UserLogin, UserPermission } from '../models/models';
import {
    Post,
    Route,
    Body,
    Tags,
    Get,
    Queries,
    Delete,
    Patch,
    Put, 
    Path
} from "tsoa";

@Route('usuario')
@Tags('Usuários')
class UserController {
    @Get('/email/:email/permissao')
    findUserPermission(@Path('email') email: string): Promise<UserPermission[]> {
        return userService.findUserPermission(email);
    }
    @Post('/login')
    login(@Body() user: UserLogin): Promise<User> {
        return userService.getUserCredentials(user);
    }

    @Post()
    create(@Body() user: User): Promise<any> {
        return userService.create(user);
    }

    @Get('/email/:email')
    findByEmail(@Path('email') email: string): Promise<User> {
        return userService.findByEmail(email);
    }

    @Get('/todos')
    findAll(): Promise<User[]> {
        return userService.findAll();
    }

    @Get()
    findBy(@Queries() user: User): Promise<User[]> {
        return userService.findBy(user);
    }

    @Delete('/email/:email')
    async deleteBy(@Path("email") email: string): Promise<void> {
        userService.deleteBy(email);
    }

    @Patch('/email/:email')
    async updateBy(@Path("email") email: string, @Body() user: User): Promise<void> {
        userService.updateBy(email, user);
    }

    @Put('/email/:email')
    async upateAllFieldsBy(@Path("email") email: string, @Body() user: User): Promise<void> {
        userService.upateAllFieldsBy(email, user);
    }
}

export default new UserController();