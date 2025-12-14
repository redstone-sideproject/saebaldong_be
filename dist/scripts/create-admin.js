"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const user_service_1 = require("../user/user.service");
const admin_cli_module_1 = require("./admin-cli.module");
const bcrypt = require("bcrypt");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(admin_cli_module_1.AdminCliModule);
    const usersService = app.get(user_service_1.UserService);
    const userId = process.argv[2];
    const password = process.argv[3];
    if (!userId || !password) {
        console.log('사용법: yarn run create-admin <userId> <password>');
        process.exit(1);
    }
    const hash = await bcrypt.hash(password, 10);
    await usersService.create(userId, hash, true);
    console.log(`어드민 계정 생성 완료: ${userId}`);
    await app.close();
}
bootstrap();
//# sourceMappingURL=create-admin.js.map