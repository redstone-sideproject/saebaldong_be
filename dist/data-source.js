"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.getEnvFilePath = void 0;
require("tsconfig-paths/register");
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const typeorm_config_1 = require("./config/typeorm.config");
const dotenv_1 = require("dotenv");
const env = process.env.NODE_ENV || 'development';
const getEnvFilePath = () => {
    return '.env' + (env == 'development' ? '.development' : '.production');
};
exports.getEnvFilePath = getEnvFilePath;
(0, dotenv_1.config)({ path: (0, exports.getEnvFilePath)() });
const configService = new config_1.ConfigService();
exports.AppDataSource = new typeorm_1.DataSource((0, typeorm_config_1.typeOrmConfig)(env, configService));
//# sourceMappingURL=data-source.js.map