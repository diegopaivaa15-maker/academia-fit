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
exports.WorkoutsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WorkoutsService = class WorkoutsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const workouts = await this.prisma.workout.findMany({
            where: { userId: Number(userId) },
            include: {
                exercises: true
            },
            skip: skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
        const total = await this.prisma.workout.count({
            where: { userId: Number(userId) }
        });
        return {
            data: workouts,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async create(data) {
        return this.prisma.workout.create({
            data: {
                name: data.name,
                description: data.description,
                userId: data.userId,
                exercises: {
                    create: data.exercises,
                },
            },
            include: {
                exercises: true,
            },
        });
    }
    async delete(workoutId, userId) {
        const workout = await this.prisma.workout.findFirst({
            where: {
                id: workoutId,
                userId: userId
            },
        });
        if (!workout) {
            throw new Error('Treino não encontrado ou você não tem permissão.');
        }
        return this.prisma.workout.delete({
            where: { id: workoutId },
        });
    }
    async update(id, userId, data) {
        const workout = await this.prisma.workout.findFirst({
            where: { id, userId },
        });
        if (!workout) {
            throw new Error('Treino não encontrado ou você não tem permissão para editá-lo.');
        }
        return this.prisma.workout.update({
            where: { id },
            data: data,
        });
    }
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutsService);
//# sourceMappingURL=workouts.service.js.map