"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExercisesService = class ExercisesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByMuscleGroup(group, subGroup, page = 1) {
        const limit = 20;
        const skip = (page - 1) * limit;
        const whereCondition = {
            muscleGroup: { equals: group, mode: 'insensitive' },
        };
        if (subGroup && subGroup !== 'Todos') {
            whereCondition.subGroup = { equals: subGroup, mode: 'insensitive' };
        }
        const exercisesFromDb = await this.prisma.exerciseLibrary.findMany({
            where: whereCondition,
            take: limit,
            skip: skip,
            orderBy: { name: 'asc' },
        });
        if (!exercisesFromDb || exercisesFromDb.length === 0) {
            throw new common_1.NotFoundException(`Nenhum exercício encontrado para ${group} ${subGroup ? `(${subGroup})` : ''}`);
        }
        return exercisesFromDb.map((exercise) => {
            var _a, _b, _c;
            return ({
                id: exercise.id,
                name: exercise.name,
                muscleGroup: exercise.muscleGroup,
                subGroup: (_a = exercise.subGroup) !== null && _a !== void 0 ? _a : undefined,
                instructions: (_b = exercise.instructions) !== null && _b !== void 0 ? _b : undefined,
                videoUrl: (_c = exercise.videoUrl) !== null && _c !== void 0 ? _c : undefined,
            });
        });
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map